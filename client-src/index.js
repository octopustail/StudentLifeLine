import 'normalize.css';
import './style/global.less';
import './style/index.less';

import {init as entropyInit, reloadData as entropyReload} from './component/entropyDistribution'
import {init as calendarInit} from './component/calendarView';
import {init as dailyEntropyViewInit, reloadData as dailyEntropyViewReloadData} from './component/dailyEntropyView';

import progressToggle from './component/progressHandler';

/**
 * 项目的总开关，初始化其他的模块
 */
function init() {

    dailyEntropyViewInit();
    entropyInit();
    calendarInit();

    setTimeout(()=>{
        progressToggle('close');
    },6000)
}


init();

