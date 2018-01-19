//https://bl.ocks.org/mbostock/4063318
//http://www.teach.ustc.edu.cn/calendar/3081.html
//http://www.teach.ustc.edu.cn/calendar/3080.html
//http://www.teach.ustc.edu.cn/calendar/3079.html
//http://www.teach.ustc.edu.cn/calendar/3082.html
//http://www.teach.ustc.edu.cn/calendar/3083.html
//http://www.teach.ustc.edu.cn/calendar/3085.html
//http://gallery.echartsjs.com/editor.html?c=calendar-effectScatter
import $ from 'jquery';
import echarts from 'echarts';
import progressToggle from './progressHandler';
import config from './../config'

/**
 * 用来记录数据的一个缓冲，如果已经缓冲了，就不用再去访问服务器了
 * @type {{shower: {}, food: {}, library: {}, hotwater: {}}}
 */
const model = {};

export function init() {
    progressToggle('open');
    ulClickBind();
    dropdownMenuClickBind();
    queryServerWithTerm();
    progressToggle('close');

}

/**
 * 保持跟踪着高亮的选项
 * @type {string}
 */
let activeTab='library',activeTerm='2009-1';

/**
 * 根据 ul 的点击绑定事件
 */
const ulClickBind = function () {
    const $ulElement = $('#calendar-count ul');

    /**
     * 负责 UI 的变化函数
     * @param element
     */
    const uiChangeBinding = function (element) {
        //做这个 length 判断是为了判断是否点击到了 li 元素上面；后面的判断是为了让点击 li 的时候不会影响到 dropdown的样式；
        if (['Library','Hot Water', 'Food', 'Shower'].indexOf(element.target.innerText) !== -1) {

            $ulElement.find('.tab.active').removeClass('active');
            $(element.target.parentNode).addClass('active');
            activeTab = element.target.innerText.split(' ').join('').toLowerCase();

            progressToggle('open');
            calendarView(activeTab,activeTerm);
        }

        //判断下拉框的点击事件
        if($(element.target)[0].className === 'dropdown-toggle'){
            $ulElement.find('.dropdown-menu').toggle('normal');
        }

    };

    $ulElement.click(function (element) {
        uiChangeBinding(element);
    });
};

/**
 * dropdownMenu 点击绑定时事件
 */
const dropdownMenuClickBind = function () {
    const $dropdownMenu = $('.dropdown-menu');

    $dropdownMenu.click(function (element) {
        const clickedElementInnerText = element.target.innerText;
        activeTerm = clickedElementInnerText.split(' ')[0] + '-' + clickedElementInnerText.split(' ')[1][0];

        $('.dropdown-toggle')[0].innerHTML = clickedElementInnerText + '<span class="caret"></span>'
        $dropdownMenu.find('.active').removeClass('active');
        $(element.target).addClass('active');
        $dropdownMenu.toggle('normal');

        progressToggle('open');
        if(needChatWithServer()){
            // 如果需要从服务器获取数据，先打开 progress 等待；
            queryServerWithTerm();
        }else{
            calendarView(activeTab,activeTerm);
        }
    });

};

/**
 * 判断是否需要服务器去获取数据，还是直接从 model 获取
 * @returns {boolean}
 */
const needChatWithServer = function () {
    return model[activeTerm] == null
};


/**
 * 根据选的 term 查询数据库
 * @param activeTerm
 */
const queryServerWithTerm = function () {
    debugger
    const year = activeTerm.split('-')[0];
    const term = activeTerm.split('-')[1];
    $.ajax({
        url: `/calendar?year=${year}&term=${term}`,
    }).done(function (data) {
        model[activeTerm] = data;
        calendarView(activeTab,activeTerm);
    })
};

const calendarView = function (activeTab,activeTerm) {
    const calendarViewInstance = echarts.init(document.getElementById('calendar-view'));
    debugger;
    const fullKeys = model[activeTerm]['fullKeys'];
    const locationArray = model[activeTerm]['countObject'][activeTab];
    const data = [];
    const max = Math.max(...locationArray);

    fullKeys.forEach(function(value,index){
        data.push([value,locationArray[index]]);
    });

    const option = {
        backgroundColor: config.defaultColor.cardColor,
        tooltip : {
            trigger: 'item'
        },
        borderColor:config.defaultColor.contentColor,
        borderWidth:0,
        textStyle:{
            color:config.defaultColor.textColor
        },

        calendar: [{
            width:440,
            top: 30,
            left: 'center',
            range: [fullKeys[0], fullKeys[fullKeys.length-1]],
            splitLine: {
                show: true,
                lineStyle: {
                    color: config.defaultColor.contentColor,
                    width: 4,
                    type: 'solid'
                }
            },
            itemStyle: {
                normal: {
                    color: config.defaultColor.contentColor,
                    borderWidth: 1,
                    borderColor: config.defaultColor.contentColor
                }
            }
        }],
        visualMap: {
            inRange:{
                color: [config.defaultColor.backgroundColor, config.defaultColor.highlightColor],
            },
            calculable:true,
            itemWidth:10,
            itemHeight:150,
            align:'left',
            min: 0,
            max: max,
            orient: 'horizontal',
            right: 0,
            bottom: -4,
            textStyle: {
                color: config.defaultColor.textColor
            }
        },
        series : [
            {
                name: activeTab,
                type: 'heatmap',
                coordinateSystem: 'calendar',
                data: data,
                itemStyle: {
                    normal: {
                        color: config.defaultColor.highlightColor
                    }
                }
            },
            // {
            //     name: 'Top 12',
            //     type: 'effectScatter',
            //     coordinateSystem: 'calendar',
            //     calendarIndex: 1,
            //     data: data.sort(function (a, b) {
            //         return b[1] - a[1];
            //     }).slice(0, 12),
            //     symbolSize: function (val) {
            //         return val[1] / 500;
            //     },
            //     showEffectOn: 'render',
            //     rippleEffect: {
            //         brushType: 'stroke'
            //     },
            //     hoverAnimation: true,
            //     itemStyle: {
            //         normal: {
            //             color: '#f4e925',
            //             shadowBlur: 10,
            //             shadowColor: '#333'
            //         }
            //     },
            //     zlevel: 1
            // },

        ]
    };

    calendarViewInstance.setOption(option);

    calendarViewInstance.on('click',function (element) {
        console.log(element);
    });

    progressToggle('close');

};

