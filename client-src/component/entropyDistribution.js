import echarts from 'echarts'
import config from '../config';
import $ from 'jquery';

import progressToggle from './progressHandler';

const entropyDistributionInstance = echarts.init(document.getElementById('entropy-distribution'));
let option;
const loadingOption = config.loading;
const FIXEDNUMBER = 2;

import entropyKDE from './../mockdata/entropyKDE';

let xAxisForMeal, yAxisForMeal, xAxisForShower, yAxisForShower;


/**
 * 模块初始化，显示 loading 效果，等待数据reload;
 */
export function init() {
    progressToggle('open');
    entropyDistributionInstance.showLoading(loadingOption);
    reloadData();
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
            show: false,
            data: ['Meal', 'Shower'],
            right: 10,
            top: 40,
            orient: 'vertical',
            textStyle: {
                color: config.defaultColor.textColor
            },
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
export function highlightData(orderArray) {
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
 * 绑定brush events
 */
const bindInstanceWithBrush = function () {
    entropyDistributionInstance.on('brushSelected', function (e) {
        console.log(e);
    })
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

