import progressToggle from './progressHandler';
import $ from 'jquery';
import d3 from 'd3-svg-circularbrush'

import config from './../config';
import {
    store as selectConditionInitStore,
    clear as selectConditionInitClear,
    get as selectConditionInitGet
} from './selectCondition'
import {getSelectedData} from './selectStudentInfoTable';

/**
 * 初始化只执行一次
 */
const init = function () {
    progressToggle('open');
    drawDailyEntropy();
    progressToggle('close');
};

const RADIUS = 45;

const PIECES = 1440;


let svg;

//brush在哪一个type上?
let brushType = "",
    //brush选中的数据;
    brushData = null;


const radiusMap = {
    library: {
        innerRadiusRatio: 1,
        outerRadiusRatio: 2
    },
    hotwater: {
        innerRadiusRatio: 2,
        outerRadiusRatio: 3
    },
    food: {
        innerRadiusRatio: 3,
        outerRadiusRatio: 4
    },
    shower: {
        innerRadiusRatio: 4,
        outerRadiusRatio: 5
    },

};

const piebrush = d3.svg.circularbrush();

const drawDailyEntropy = function () {
    const width = 780;
    const height = 490;

    const r = Math.min(width, height) / 2;

    svg = d3.select('#daily-entropy-view').append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${width / 2},${height / 2})`);

    /**
     * 画circile的圈
     */
    const circle = svg.selectAll('circle')
        .data([5, 4, 3, 2, 1]) // 有4个标签,分别是library,hotwater,food,shower;生成5个环;
        .enter()
        .append('circle')
        .style('stroke', config.defaultColor.textColor)
        .style('fill-opacity', 0)
        .attr('r', function (value, index) {
            return value * RADIUS;
        });

    piebrush
        .range([1, PIECES])
        .handleSize(0.1)
        // .on("brushstart", pieBrushStart)
        .on("brushend", pieBrushEnd)
        .on("brush", pieBrush);
    bindBrushClickToPath();

};

/**
 * 通过点击
 */
const bindBrushClickToPath = function () {
    $('#daily-entropy-view').dblclick(function (event) {

            if ($('.circularbrush').length !== 0) {
                removeBrushElement();
                return null;
            }

            const dataset = event.target.dataset;

            if (dataset.type == null) {
                return null;
            }
            const {innerRadiusRatio, outerRadiusRatio} = radiusMap[dataset.type];
            piebrush
                .innerRadius(RADIUS * innerRadiusRatio)
                .outerRadius(RADIUS * outerRadiusRatio);

            //这里需要记录下你的正在使用的brush的类别;
            brushType = dataset.type;

            // 添加circular-brush
            svg.call(piebrush);
            bindSearchWithBrush()

        }
    )

};

/**
 * 如果有brush的话,就先移除,只允许一个;
 */
const removeBrushElement = function () {
    const $circularbrush = $('g.circularbrush');
    $circularbrush.remove();
    $circularbrush.unbind('click');
    brushType = "";
};

/**
 * 加上点击brush查询的功能
 */
const bindSearchWithBrush = function () {
    $('g.circularbrush').click(function (element) {
        //@TODO 加上Ajax来获得数据;
        // brushType;

        const timeRange = getBrushedTime(brushData);
        // 记录选中的时间和选择的地点类型;
        selectConditionInitClear('time');
        selectConditionInitClear('location');

        selectConditionInitStore('time',timeRange);
        selectConditionInitStore('location',brushType);

        const selectCondition = selectConditionInitGet();
        const dates= selectCondition.dates.toString();
        const location = selectCondition.location.toString();
        const time = selectCondition.time.toString();

        progressToggle('open');
        $.ajax({
            url:`/calendardayfordistinctstudentid?dates=${dates}&location=${location}&time=${time}`
        }).done(function(data){
            progressToggle('close');
            highlightParcoods(data);


        })

    })
};


const findHighlightDataArray = function(studentIdArray,parcoordData){
    const resultArray = [];
    studentIdArray.forEach(function(studnetId){
        if(parcoordData[studnetId] != null){
            resultArray.push(parcoordData[studnetId] )
        }
    });
    return resultArray;
};

/**
 * 根据学生的idarray来高亮两个parcoords views
 * @param studentIdArray
 */
const highlightParcoods = function(studentIdArray){
    const {gap,entropy} = window.parcoods.parcoordsInstance;
    const gapData = findHighlightDataArray(studentIdArray,window.parcoods.data.gap);
    const entropyData = findHighlightDataArray(studentIdArray,window.parcoods.data.entropy);

    getSelectedData(gapData,entropyData);
    gap.highlight(gapData);
    entropy.highlight(entropyData);
};


const getBrushedTime = function (brushData) {
    const [startPoint, endPoint] = brushData;
    let startTime, endTime;

    /**
     * 根据brush选择的点返回时间;
     * @param timePoint
     * @returns {string}
     */
    const getTime = function (timePoint) {
        let pointMinute, pointHour;

        pointMinute = timePoint / PIECES * 1440; // 说明从0开始了多少分钟
        pointHour = Math.floor(pointMinute / 60); // 说明从0开始了多少小时
        if (pointHour <= 9) {
            // 1-9的小时需要加上0,变成09:01等;
            pointHour = '0' + pointHour;
        }

        pointMinute = Math.floor(pointMinute % 60); // 多了多少分钟
        if (pointMinute <= 9) {
            // 1-9的分钟需要加上0,变成09:01等;
            pointMinute = '0' + pointMinute;
        }
        return `${pointHour}:${pointMinute}`;
    };

    startTime = getTime(startPoint);
    endTime = getTime(endPoint);

    if (startPoint >= endPoint) {
        // 说明经过了12点整,需要变成两个区间;
        return [`00:00:00-${endTime}:00`,`${startTime}:00-23:59:00`]
    } else {
        return [`${startTime}:00-${endTime}:00`]
    }
};

/**
 * brush reference: http://bl.ocks.org/emeeks/905c4691f343fc4780bd
 *
 */
/**
 * brush开始刷的那个点
 */
const pieBrushStart = function () {
    const _e = piebrush.extent();
};

/**
 * brush刷了结束的那个点
 */
const pieBrushEnd = function () {
    brushData = piebrush.extent();
};

const pieBrush = function () {
    d3.selectAll("path.piehours")
        .style("fill", piebrushIntersect)
};

function piebrushIntersect(d, i) {
    const _e = piebrush.extent();
    let intersect;
    if (_e[0] < _e[1]) {
        intersect = (d.data >= _e[0] && d.data <= _e[1]);
    }
    else {
        intersect = (d.data >= _e[0]) || (d.data <= _e[1]);
    }

    return intersect ? "rgb(241,90,64)" : "rgb(231,231,231)"
}


/**
 * 重载数据,可以多次执行
 */
const reloadData = function (data) {

    cleanPreviousChart(function () {
        ['shower', 'food', 'hotwater', 'library'].forEach(function (type, index) {
            const {innerRadiusRatio, outerRadiusRatio} = radiusMap[type];

            const radius = d3.scale.linear()
                .domain([Math.min(...data[type]['countArray']), Math.max(...data[type]['countArray'])])
                .range([RADIUS * innerRadiusRatio, RADIUS * outerRadiusRatio]);

            const spiral = d3.svg.line.radial()
            // .curve(d3.curve.basis)
                .interpolate("basis")
                .angle(theta)
                .radius(radius);

            const entropyCircle = svg.selectAll('entropyCircle')
                .data([data[type]['countArray']])
                .enter()
                .append('path')
                .attr('data-type', type)
                .attr('class', 'entropyCircle')
                .style('fill-opacity', 0)
                .style('stroke', config.defaultColor.highlightColor)
                .attr('d', spiral)
                .attr('d', spiral)
        });

    });


};

/**
 * 如果要画新的图, 首先需要把旧的图清掉;
 */
const cleanPreviousChart = function (callback) {
    progressToggle('open');
    const $entropyCircle = $('.entropyCircle');
    if ($entropyCircle.length) {
        $entropyCircle.toggle(function () {

            $entropyCircle.remove();
            callback();
            progressToggle('close');
        });
    } else {
        callback();
        progressToggle('close');
    }


};

// 意思是会被划分成多少份.类似于角度;
const theta = function (r, index, array) {
    return index / PIECES * 2 * Math.PI
};

export  {
    init,
    reloadData
};