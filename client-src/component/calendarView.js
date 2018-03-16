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
import {highlightByOrder} from './entropyDistribution';


import {reloadData as dailyEntropyViewReloadData} from './dailyEntropyView';
import {getSelectedData} from './selectStudentInfoTable';

import {
    store as selectConditionInitStore,
    clear as selectConditionInitClear
} from './selectCondition'

/**
 * 用来记录数据的一个缓冲，如果已经缓冲了，就不用再去访问服务器了
 * @type {{shower: {}, food: {}, library: {}, hotwater: {}}}
 */
const model = {
    "selectedDate": []
};

export function init() {
    progressToggle('open');
    ulClickBind();
    calendarClickBind();
    calendarSearchBtnClickBind();
    dropdownMenuClickBind();
    queryServerWithTerm();
    progressToggle('close');

}

/**
 * 保持跟踪着高亮的选项
 * @type {string}
 */
let activeTab = 'library', activeTerm = '2009-1';
const calendarViewInstance = echarts.init(document.getElementById('calendar-view'));

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
        if (['Library', 'Hot Water', 'Food', 'Shower'].indexOf(element.target.innerText) !== -1) {

            $ulElement.find('.tab.active').removeClass('active');
            $(element.target.parentNode).addClass('active');
            activeTab = element.target.innerText.split(' ').join('').toLowerCase();

            progressToggle('open');
            calendarView();
        }

        //判断下拉框的点击事件
        if ($(element.target)[0].className === 'dropdown-toggle') {
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
        if (needChatWithServer()) {
            // 如果需要从服务器获取数据，先打开 progress 等待；
            queryServerWithTerm();
        } else {
            calendarView(activeTab, activeTerm);
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
export const queryServerWithTerm = function (studentIdList) {
    const year = activeTerm.split('-')[0];
    const term = activeTerm.split('-')[1];
    let url = `/calendar`;
    const data = {
        year,
        term,
    };
    if (studentIdList != null) {
        progressToggle('open');

        //需要同步学生学号数据
        model['studentIdList'] = studentIdList;
        data['studentid'] = studentIdList
    }
    $.ajax({
        url,
        type: 'POST',
        data
    }).done(function (returnData) {
        if (studentIdList != null) {
            progressToggle('close');
        }
        model[activeTerm] = returnData;
        calendarView(activeTab, activeTerm);
    })
};


/**
 * 在切换的时候,把上次选中的selectedDate清空
 */
const clearChosenData = function () {
    model.selectedDate = [];
};

const calendarView = function () {
    const fullKeys = model[activeTerm]['fullKeys'];
    const locationArray = model[activeTerm]['countObject'][activeTab];
    const data = [];
    const max = Math.max(...locationArray);

    fullKeys.forEach(function (value, index) {
        data.push([value, locationArray[index]]);
    });

    clearChosenData();

    const option = {
        backgroundColor: config.defaultColor.cardColor,
        tooltip: {
            trigger: 'item'
        },
        borderColor: config.defaultColor.contentColor,
        borderWidth: 0,
        textStyle: {
            color: config.defaultColor.textColor
        },

        calendar: [{
            width: 440,
            top: 30,
            left: 'center',
            range: [fullKeys[0], fullKeys[fullKeys.length - 1]],
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
            inRange: {
                color: [config.defaultColor.backgroundColor, config.defaultColor.highlightColor],
            },
            seriesIndex: [0],
            calculable: true,
            itemWidth: 10,
            itemHeight: 150,
            align: 'left',
            min: 0,
            max: max,
            orient: 'horizontal',
            right: 0,
            bottom: -4,
            textStyle: {
                color: config.defaultColor.textColor
            }
        },
        series: [
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
            {
                name: 'selected date',
                type: 'heatmap',
                coordinateSystem: 'calendar',
                data: model.selectedDate,
                itemStyle: {
                    normal: {
                        color: '#2db9ff',
                        shadowColor: 'rgba(0, 0, 0, 0.7)',
                        shadowBlur: 20,
                        shadowOffsetX: 5,
                        shadowOffsetY: 5,
                        opacity: 0.5

                    }
                },
                zlevel: 2
            },

            {
                name: 'Selected',
                type: 'effectScatter',
                coordinateSystem: 'calendar',
                data: data.sort((a, b) => {
                    return b[1] - a[1];
                }).slice(1, 10),
                showEffectOn: 'render',
                rippleEffect: {
                    brushType: 'fill',
                    scale: 4
                },
                hoverAnimation: true,
                itemStyle: {
                    normal: {
                        color: config.defaultColor.highlightColor,
                        shadowBlur: 10,
                        shadowColor: '#333'
                    }
                },
                zlevel: 1
            }

        ]
    };

    calendarViewInstance.setOption(option);

    progressToggle('close');
};

const calendarClickBind = function () {
    calendarViewInstance.on('click', function (element) {
        const selectDate = element.data.toString();

        const selectModel = model['selectedDate'];
        const selectDateIndex = selectModel.indexOf(selectDate);

        if (selectDateIndex === -1) {
            //说明这个数据是没有重复的
            selectModel.push(selectDate);
        } else {
            selectModel.splice(selectDateIndex, 1);
        }

        let temp ;
        $('.form-control ').attr('value', '');
        temp = $('.form-control ').attr('value');
        console.log('.form-control',temp);
        calendarViewInstance.setOption({
            series: [{
                name: 'selected date',
                data: model.selectedDate.map((val) => {
                    return val.split(',')
                }),
            }]
        });
    });
};

const updateParallelView = function (distinctStudentId) {
    $.ajax({
        url: `/parallelgap?studentid=${distinctStudentId}`
    }).done(function (data) {
        parcoods.parcoodsGap.init(data);
        progressToggle('close');
    });

    $.ajax({
        url: `/entropybystudents?studentid=${distinctStudentId}`
    }).done(function (data) {
        parcoods.parcoodsEntropy.init(data.meal);
        //@TODO 完善;
        getSelectedData();
        progressToggle('close');
    });
}

const calendarSearchBtnClickBind = function () {
    const calendarBtn = $('#calendar-search');

    calendarBtn.click(function () {
        const parcoods = window.parcoods;

        let selectedDate = model.selectedDate;
        if (selectedDate.length === 0) return null;

        selectedDate = selectedDate.map((val) => {
            return val.split(',')[0];
        }).join(',');

        // 记录选中的天数;
        selectConditionInitClear('dates');
        selectConditionInitStore('dates', selectedDate.split(','));

        progressToggle('open');
        const data = {};
        let url = `/calendarday`;
        data['dates'] = selectedDate;

        if (model['studentIdList'] !=null) {
            data['studentid'] = model['studentIdList']
        }

        $.ajax({
            url,
            type:'POST',
            data
        }).done(function (returnData) {
            console.log(returnData);
            dailyEntropyViewReloadData(returnData);
            progressToggle('close');
        });

        //开了2个ajax所以有2个缓存进度;
        progressToggle('open');
        progressToggle('open');

        if (model['studentIdList']) {
            updateParallelView(model['studentIdList'])

        } else {
            $.ajax({
                url: `/calendardayfordistinctstudentid?dates=${selectedDate}&location=${activeTab}`
            }).done(function (data) {
                // 这是选中的天数的学生列表合集;
                const distinctStudentId = data.toString();
                updateParallelView(distinctStudentId)
            });
        }


    })
};
