import 'normalize.css';
import './style/global.less';

import './style/index.less';

import {init as entropyInit, reloadData as entropyReload} from './component/entropy_distribution'
import {init as calendarInit} from './component/calendar_view';
import progressToggle from './component/progressHandler';

/**
 * 项目的总开关，初始化其他的模块
 */
function init() {

    entropyInit();
    calendarInit();

    setTimeout(()=>{
        progressToggle('close');
    },6000)
}


init();

