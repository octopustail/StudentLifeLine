import 'normalize.css';
import './style/global.less';

import './style/index.less';

import {init as entropyInit, reloadData as entropyReload} from './component/entropy_distribution'

/**
 * 项目的总开关，初始化其他的模块
 */
function init() {
    entropyInit();
    setTimeout(entropyReload, 5000);
}


init();

