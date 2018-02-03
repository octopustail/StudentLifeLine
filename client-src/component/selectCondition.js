let global = window['selectCondition'];

/**
 * 新建select初始化
 */
const init = function () {
    if (global == null) {
        global = {
            dates: [],
            studentId: [],
            time:[],
            location:[]
        };
    }
};

/**
 * 储存新的select内容
 * @param name
 * @param data
 * @returns {null}
 */
const store = function (name, data) {
    isExist(name);
    global[name].push(data);
};

/**
 * 清除以前写的内容;
 * @param name
 */
const clear = function (name) {
    isExist(name);

    global[name] = [];
};

/**
 * 获得数据;
 */
const get = function(){
    return global;
};
/**
 * 判断这个name是不是存在;
 * @param name
 * @returns {null}
 */
const isExist = function (name) {
    if (global[name] == null) {
        throw new Error('正在使用没有设定的select字段');
        return null;
    }
};

export {
    init, store,clear,get
}