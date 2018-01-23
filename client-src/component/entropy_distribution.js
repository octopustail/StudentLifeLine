import echarts from 'echarts'
import config from '../config';
import $ from 'jquery';

import progressToggle from './progressHandler';


const entropyDistributionInstance = echarts.init(document.getElementById('entropy-distribution'));
let option;
const loadingOption = config.loading;

/**
 * 模块初始化，显示 loading 效果，等待数据reload;
 */
export function init() {
    progressToggle('open');
    entropyDistributionInstance.showLoading(loadingOption);
    reloadData();
}

/**
 * 重新载入数据
 * @param data
 */
export function reloadData(data) {
    data = [
        [
            0.0329584,
            0.19081385607128226
        ],
        [
            0.0659168,
            0.12655951618082795
        ],
        [
            0.0988752,
            0.0638414833063701
        ],
        [
            0.1318336,
            0.024492572214228757
        ],
        [
            0.164792,
            0.007146429120667015
        ],
        [
            0.1977504,
            0.001585868049104639
        ],
        [
            0.2307088,
            0.0002676506320413163
        ],
        [
            0.2636672,
            0.000034355222885675776
        ],
        [
            0.2966256,
            0.000003353845650144042
        ],
        [
            0.329584,
            2.4947034796234914e-7
        ],
        [
            0.3625424,
            2.2336364186111968e-8
        ],
        [
            0.3955008,
            1.1301642284074958e-7
        ],
        [
            0.4284592,
            0.0000011613301827418952
        ],
        [
            0.4614176,
            0.00000912441533499308
        ],
        [
            0.494376,
            0.000054523656404322864
        ],
        [
            0.5273344,
            0.00024779251710680924
        ],
        [
            0.5602928,
            0.0008564749554219685
        ],
        [
            0.5932512000000001,
            0.002251460947028408
        ],
        [
            0.6262096000000001,
            0.004501294951178233
        ],
        [
            0.6591680000000002,
            0.006844380260601252
        ],
        [
            0.6921264000000003,
            0.00791511329643634
        ],
        [
            0.7250848000000003,
            0.00696195839297107
        ],
        [
            0.7580432000000004,
            0.004659989561247092
        ],
        [
            0.7910016000000004,
            0.0023851230396338976
        ],
        [
            0.8239600000000005,
            0.0009749583288119701
        ],
        [
            0.8569184000000005,
            0.0004346872578302747
        ],
        [
            0.8898768000000006,
            0.0004421674694849263
        ],
        [
            0.9228352000000006,
            0.0008047839218544545
        ],
        [
            0.9557936000000007,
            0.0016631854254357023
        ],
        [
            0.9887520000000007,
            0.003528667893956462
        ],
        [
            1.0217104000000008,
            0.0068587729808050665
        ],
        [
            1.0546688000000009,
            0.011116193258357988
        ],
        [
            1.087627200000001,
            0.014492478034252465
        ],
        [
            1.120585600000001,
            0.015402262967810713
        ],
        [
            1.153544000000001,
            0.014301139956963272
        ],
        [
            1.186502400000001,
            0.013424807644689427
        ],
        [
            1.2194608000000011,
            0.015046160736825739
        ],
        [
            1.2524192000000012,
            0.020625219693896434
        ],
        [
            1.2853776000000012,
            0.0309428498192713
        ],
        [
            1.3183360000000013,
            0.04575904632240942
        ],
        [
            1.3512944000000013,
            0.06341138983699346
        ],
        [
            1.3842528000000014,
            0.08227645790957895
        ],
        [
            1.4172112000000014,
            0.10361994784145787
        ],
        [
            1.4501696000000015,
            0.13219316338691817
        ],
        [
            1.4831280000000016,
            0.17300228671650386
        ],
        [
            1.5160864000000016,
            0.22788946053951908
        ],
        [
            1.5490448000000017,
            0.29586764312084524
        ],
        [
            1.5820032000000017,
            0.37614461311285435
        ],
        [
            1.6149616000000018,
            0.46980257736725817
        ],
        [
            1.6479200000000018,
            0.5787078224552129
        ],
        [
            1.6808784000000019,
            0.7037843945641277
        ],
        [
            1.713836800000002,
            0.8442066593647145
        ],
        [
            1.746795200000002,
            0.9970356515691176
        ],
        [
            1.779753600000002,
            1.1571526201384523
        ],
        [
            1.812712000000002,
            1.3172676851028025
        ],
        [
            1.8456704000000022,
            1.467254101994717
        ],
        [
            1.8786288000000022,
            1.5942370735289153
        ],
        [
            1.9115872000000023,
            1.6852030604482306
        ],
        [
            1.9445456000000023,
            1.7304388789863452
        ],
        [
            1.9775040000000024,
            1.7257770558973153
        ],
        [
            2.0104624000000024,
            1.6740308932159307
        ],
        [
            2.0434208000000025,
            1.584739477395974
        ],
        [
            2.0763792000000025,
            1.4699690749793963
        ],
        [
            2.1093376000000026,
            1.3388760654334697
        ],
        [
            2.1422960000000026,
            1.197035655353429
        ],
        [
            2.1752544000000027,
            1.0500529519916244
        ],
        [
            2.2082128000000028,
            0.9053056624496251
        ],
        [
            2.241171200000003,
            0.7696765853677779
        ],
        [
            2.274129600000003,
            0.646808789482846
        ],
        [
            2.307088000000003,
            0.5372338252188946
        ],
        [
            2.340046400000003,
            0.44054982067202686
        ],
        [
            2.373004800000003,
            0.3565531293312736
        ],
        [
            2.405963200000003,
            0.28496402541533045
        ],
        [
            2.438921600000003,
            0.22547539536756703
        ],
        [
            2.471880000000003,
            0.17782462696291526
        ],
        [
            2.5048384000000032,
            0.14109760859071943
        ],
        [
            2.5377968000000033,
            0.11319059623549206
        ],
        [
            2.5707552000000033,
            0.09135460947125285
        ],
        [
            2.6037136000000034,
            0.07346747993398028
        ],
        [
            2.6366720000000035,
            0.058689301019094677
        ],
        [
            2.6696304000000035,
            0.04681850194696249
        ],
        [
            2.7025888000000036,
            0.03741466963486579
        ],
        [
            2.7355472000000036,
            0.02975228939908455
        ],
        [
            2.7685056000000037,
            0.023259848483307075
        ],
        [
            2.8014640000000037,
            0.01771085852465984
        ],
        [
            2.834422400000004,
            0.013082739564546505
        ],
        [
            2.867380800000004,
            0.009370820138200422
        ],
        [
            2.900339200000004,
            0.006512387145116466
        ],
        [
            2.933297600000004,
            0.0043970224021541915
        ],
        [
            2.966256000000004,
            0.0028894762954096765
        ],
        [
            2.999214400000004,
            0.0018417085632054418
        ],
        [
            3.032172800000004,
            0.0011177986959769511
        ],
        [
            3.065131200000004,
            0.0006239217643202864
        ],
        [
            3.098089600000004,
            0.0003099537341612877
        ],
        [
            3.1310480000000043,
            0.00014683331690657406
        ],
        [
            3.1640064000000043,
            0.00011337825368294998
        ],
        [
            3.1969648000000044,
            0.00019616796402908626
        ],
        [
            3.2299232000000044,
            0.00036869766806474217
        ],
        [
            3.2628816000000045,
            0.0005526714946223819
        ],
        [
            3.2958400000000045,
            0.0006333350224455496
        ]
    ];

    const xAxis = data.map(function (element) {
        return element[0];
    });
    const yAxis = data.map(function (element) {
        return element[1];
    });
    option = {
        backgroundColor: config.defaultColor.cardColor,
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: xAxis,
            axisLine: {
                lineStyle: {
                    color: config.defaultColor.textColor //坐标轴线颜色
                }
            }
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
        // visualMap: {
        //     show: false,
        //     dimension: 0,
        //     pieces: [{
        //         lte: 6,
        //         color: 'red'
        //     }, {
        //         gt: 6,
        //         lte: 8,
        //         color: 'red'
        //     }, {
        //         gt: 8,
        //         lte: 14,
        //         color: 'red'
        //     }, {
        //         gt: 14,
        //         lte: 17,
        //         color: 'red'
        //     }, {
        //         gt: 17,
        //         color: 'red'
        //     }]
        // },
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
                color: config.defaultColor.highlightColor
            },
            outOfBrush: {
                colorAlpha: 0
            }
        },
        series: [
            {
                type: 'line',
                data: yAxis,
                symbol: 'none',
                lineStyle: {
                    normal: {
                        color: config.defaultColor.highlightColor
                    }
                },
                smooth: true,
            },
            {
                type: 'bar',
                data: yAxis,
                itemStyle: {
                    normal: {
                        color: config.defaultColor.cardColor,
                        barBorderRadius: 10

                    }
                },
                barWidth: '100%',
            }
        ],
        grid: {
            left: '40',
            top: '20',
            bottom: '35',
            right: '30'
        }
    };

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
 * 根据选择的数据去 fetch 新的数据;
 */
function queryData(year,term) {
    $.ajax({
        url: `/data`,
    }).done(function (data) {



    })


}

