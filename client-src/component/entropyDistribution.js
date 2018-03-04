import echarts from 'echarts'
import config from '../config';
import $ from 'jquery';

import progressToggle from './progressHandler';

const entropyDistributionInstance = echarts.init(document.getElementById('entropy-distribution'));
let option;
const loadingOption = config.loading;
const FIXEDNUMBER = 2;
let selectSection = null;

import entropyKDE from './../mockdata/entropyKDE';

let xAxisForMeal, yAxisForMeal, xAxisForShower, yAxisForShower;


/**
 * 模块初始化，显示 loading 效果，等待数据reload;
 */
export function init() {
    progressToggle('open');
    entropyDistributionInstance.showLoading(loadingOption);
    reloadData();

    // 暴露给全局变量;
    window.highlightByOrder = highlightByOrder;
}

/**
 * 把数据转化成未echarts支持的格式
 * @param data
 * @returns {{xAxisForMeal: Array, yAxisForMeal: Array, xAxisForShower: Array, yAxisForShower: Array}}
 */
const transformDataForEcharts = function (data) {

    const transformData = function (data) {
        const transformDataObject = {};
        let sortedKeys = Object.keys(data).sort(function (a, b) {
            return parseFloat(a) - parseFloat(b);
        });

        sortedKeys.forEach(function (key) {
            let fixedKey = parseFloat(key).toFixed(FIXEDNUMBER);
            let fixedValue = parseFloat(data[key]);
            if (transformDataObject[fixedKey] = null) {
                transformDataObject[fixedKey] = fixedValue;
            } else {
                transformDataObject[fixedKey] += fixedValue;
            }
        });

        const xAxis = Object.keys(transformDataObject).sort(function (a, b) {
            return parseFloat(a) - parseFloat(b);
        });
        const yAxis = xAxis.map(function (key) {
            return transformDataObject[key]
        });
        return [xAxis, yAxis];
    };
    const [xAxisForMeal, yAxisForMeal] = transformData(data['meal']);
    const [xAxisForShower, yAxisForShower] = transformData(data['shower']);

    return [xAxisForMeal, yAxisForMeal, xAxisForShower, yAxisForShower];
};


/**
 * 重新载入数据
 */
export function reloadData() {

    [xAxisForMeal, yAxisForMeal, xAxisForShower, yAxisForShower] = transformDataForEcharts(entropyKDE);

    option = {
        color: [config.defaultColor.highlightColor, config.defaultColor.highlightSecondColor],
        backgroundColor: config.defaultColor.cardColor,
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: xAxisForMeal,
            axisLine: {
                lineStyle: {
                    color: config.defaultColor.textColor //坐标轴线颜色
                }
            }
        },
        legend: {
            selectedMode: true,
            show: true,
            data: [{
                name: 'Meal'
            }, {
                name: 'Shower'
            }, {
                name: 'Shower Bar',
                show: false,
                textStyle: {
                    color: config.defaultColor.cardColor
                }
            }, {
                name: 'Meal Bar',
                show: false,
                textStyle: {
                    color: config.defaultColor.cardColor
                }
            }],
            right: 10,
            top: 40,
            orient: 'vertical',
            textStyle: {
                color: config.defaultColor.textColor
            },
            inactiveColor: config.defaultColor.textColor,
            align: 'right',

        },
        yAxis: {
            splitLine: {show: false},
            type: 'value',
            axisLine: {
                lineStyle: {
                    color: config.defaultColor.textColor //坐标轴线颜色
                }
            }
        },
        toolbox: {
            feature: {
                dataZoom: {
                    yAxisIndex: false
                },
                brush: {
                    type: ['lineX', 'clear']
                }
            }
        },
        brush: {
            xAxisIndex: 'all',
            inBrush: {
                color: '#222'
            },
            outOfBrush: {
                colorAlpha: 0
            }
        },
        series: [
            {
                name: 'Meal',
                type: 'line',
                data: yAxisForMeal,
                symbol: 'none',
                lineStyle: {
                    normal: {
                        color: config.defaultColor.highlightColor
                    }
                },
                smooth: true,
            },
            {
                name: 'Meal Bar',
                type: 'bar',
                data: yAxisForMeal,
                itemStyle: {
                    normal: {
                        color: config.defaultColor.cardColor
                    },
                    emphasis: {
                        color: config.defaultColor.highlightColor,
                        barBorderRadius: 10
                    }
                },
                barWidth: '100%',
            },
            {
                name: 'Shower',
                type: 'line',
                data: yAxisForShower,
                symbol: 'none',
                lineStyle: {
                    normal: {
                        color: config.defaultColor.highlightSecondColor
                    }
                },
                smooth: true,
            },
            {
                name: 'Shower Bar',
                type: 'bar',
                data: yAxisForShower,
                itemStyle: {
                    normal: {
                        color: config.defaultColor.cardColor
                    },
                    emphasis: {
                        color: config.defaultColor.highlightSecondColor,
                        barBorderRadius: 10
                    }
                },
                barWidth: '100%',
            },

        ],
        grid: {
            left: '40',
            top: '20',
            bottom: '35',
            right: '30'
        }
    };

    changeLegendEvents();
    addAPatchOnTheUnwantedLegend();
    bindInstanceWithBrush();


    entropyDistributionInstance.setOption(option);
    entropyDistributionInstance.hideLoading();
    progressToggle('close');
}

/**
 * 刷新数据
 * @param data
 */
export function updateData(data) {
    entropyDistributionInstance.showLoading(loadingOption);
}

/**
 * 传入一个order的Array然后来高亮
 * @param orderArray
 */
function highlightData(orderArray) {
    let mealHighlightIndex = [], showerHighlightIndex = [];

    if (orderArray['meal'] != null) {
        orderArray['meal']['highlight'].forEach(function (order) {

            order = parseFloat(order).toFixed(FIXEDNUMBER);
            mealHighlightIndex.push(xAxisForMeal.indexOf(order));
        });

        entropyDistributionInstance.dispatchAction({
            type: 'highlight',
            // 可选，系列 index，可以是一个数组指定多个系列
            seriesIndex: 1,
            // 可选，系列名称，可以是一个数组指定多个系列
            seriesName: 'Meal Bar',
            // 可选，数据的 index
            dataIndex: mealHighlightIndex,
        })
    }
}

/**
 * 传入order的list
 */
export function highlightByOrder(data) {

    debugger;

    highlightData({
        meal: {
            hiighlight: []
        },
        shower: {}
    })
}

/**
 * 获得entropy的范围
 * @param dataIndex
 * @param xAxis
 */
const getEntropyRange = function(dataIndex,xAxis){
    return [xAxis[dataIndex[0]],xAxis[dataIndex[dataIndex.length-1]]]
};


/**
 * 绑定brush events
 */
const bindInstanceWithBrush = function () {
    entropyDistributionInstance.on('brushSelected', function (e) {
        selectSection = e.batch[0].selected
    });
    $('#entropy-distribution-search').click(function () {
        let selectedSearchObj = {};
        if (selectSection == null || !selectSection.length) {
            return null;
        }
        selectSection.forEach(function(select){
            let xAxis;
            if(select.seriesName === 'Meal Bar'){
                xAxis = xAxisForMeal
            }else{
                xAxis = xAxisForShower

            }
            if(select.dataIndex.length === 0){
                return null;
            }
            selectedSearchObj[select.seriesName.split(' ')[0]] = getEntropyRange(select.dataIndex,xAxis)
        });

        const param = encodeURIComponent(JSON.stringify(selectedSearchObj));
        $.ajax({
            url: `/entropyDistributionBrush?brushed=${param}`
        }).done(function (data) {
            console.log(data);
        });


    })
};


/**
 * 绑定点击legend事件；
 */
const changeLegendEvents = function () {
    entropyDistributionInstance.on('legendselectchanged', function (e) {
        let changeLegend, changeLegendBar;
        if (e.name === 'Meal') {
            changeLegend = 'Meal';
            changeLegendBar = 'Meal Bar'
        } else {
            changeLegend = 'Shower';
            changeLegendBar = 'Shower Bar'
        }

        //Meal从开到关
        if (e.selected[changeLegendBar] === true && e.selected[changeLegend] === false) {
            entropyDistributionInstance.dispatchAction({
                type: 'legendUnSelect',
                name: changeLegendBar
            })
        }
        //Meal从关到开
        else if (e.selected[changeLegendBar] === false && e.selected[changeLegend] === true) {
            entropyDistributionInstance.dispatchAction({
                type: 'legendSelect',
                name: changeLegendBar
            })
        }


    })
};

/**
 * 创建一个小的div来覆盖下面的多出来的legend
 */
const addAPatchOnTheUnwantedLegend = function () {
    const entropyDistributionDiv = document.getElementById('entropy-distribution');
    const patch = document.createElement('div');
    patch.setAttribute("id", 'patch-in-entropy-distribution');
    entropyDistributionDiv.appendChild(patch);
    $(entropyDistributionDiv).append(`<button type="button" class="btn btn-success btn-sm" id="entropy-distribution-search">Search</button>`)
};

/**
 * 根据选择的数据去 fetch 新的数据;
 */
function queryData(year, term) {
    $.ajax({
        url: `/data`,
    }).done(function (data) {


    })


}

