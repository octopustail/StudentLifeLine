import 'normalize.css';
import './style/global.less';
import './style/index.less';

import {init as entropyInit, reloadData as entropyReload} from './component/entropyDistribution'
import {init as calendarInit} from './component/calendarView';
import {init as dailyEntropyViewInit, reloadData as dailyEntropyViewReloadData} from './component/dailyEntropyView';

import {init as selectConditionInit} from './component/selectCondition';
import {init as selectStudentInfoTableInit} from './component/selectStudentInfoTable';
import {init as queryWithStudentInputInit} from './component/queryWithStudentInput';

import progressToggle from './component/progressHandler';

/**
 * 项目的总开关，初始化其他的模块
 */
function init() {
    selectConditionInit();
    dailyEntropyViewInit();
    entropyInit();
    calendarInit();
    selectStudentInfoTableInit();
    queryWithStudentInputInit();

    setTimeout(()=>{
        progressToggle('close');
    },6000)
}


init();

