/**
 * 合并两个数据, 以数据量少的为主来合并;
 * @param datasetA 数据列表1
 * @param datasetB 数据列表2;
 * @returns {{}}
 */
const combineData = function (datasetA, datasetB) {

    const lengthA = Object.keys(datasetA).length;
    const lengthB = Object.keys(datasetB).length;
    let datasetWithLessData, datasetWithMoreData;

    if (lengthA <= lengthB) {
        datasetWithLessData = datasetA;
        datasetWithMoreData = datasetB;
    } else {
        datasetWithLessData = datasetB;
        datasetWithMoreData = datasetA;
    }
    let lessDataObj, moreDataObj;
    let result = {};
    Object.keys(datasetWithLessData).forEach(function (studentId) {
        lessDataObj = datasetWithLessData[studentId];
        moreDataObj = datasetWithMoreData[studentId];
        result[studentId] = Object.assign({}, lessDataObj, moreDataObj);
    });
    return result;
};

/**
 * 把数据两者的传入,并且来updates Student Info Table;
 * @param gapData
 * @param entropyData
 */
const getSelectedData = function (gapData = window.parcoods.data.gap, entropyData = window.parcoods.data.entropy) {

    const formatData = function (dataArray) {
        let tempGap = {};

        dataArray.forEach(function (studentObj) {
            tempGap[studentObj['student_id']] = studentObj;
        });
        return tempGap;
    };
    if (Array.isArray(gapData)) {
        gapData = formatData(gapData)
    }
    if (Array.isArray(entropyData)) {
        entropyData = formatData(entropyData)
    }

    const dataset = combineData(gapData, entropyData);
    clearCurrentTable();
    generateTableDOM(dataset);

};


const clearCurrentTable = function () {
    $('#selected-student-info').empty();
};

/**
 * 需要把模块暴露到windows对象以供parallel使用;
 */
const exportModuleToWindow = function () {
    window.component = {};
    window.component.selectStudentTable = {
        getSelectedData
    };
};

const init = function () {
    exportModuleToWindow();
};

/**
 * 拿着选中的学生再去数据查询.
 */
const queryWithchoosenStudentId = function () {
    $('#table-submit').click()
};

/**
 * 生成table的dom;
 */
const generateTableDOM = function (dataset, sortedStudentIdArray = Object.keys(dataset)) {
    const headOrder = ['student_id', 'ae1s', 'ae2s', 'ae3s', 'ae4s', 'ae5s', 'ae6s', 'score_1s', 'score_2s', 'score_3s', 'score_4s', 'score_5s', 'score_6s'];
    const theadOrderHtmlString = `<tr>${headOrder.map(function (trName) {
        return `<th scope="col">${trName}</th>`
    }).join("")}</tr>`;

    const tbodyOrderHtmlString =
        `
        ${sortedStudentIdArray.map(function (studentId) {
            const studentObj = dataset[studentId];
            const studentHtmlString = headOrder.map(function (columnName) {
                return `<td>${studentObj[columnName]}</td>`
            });
            return `<tr>
               ${studentHtmlString}
                   </tr>`
        })}

        `;

    const $html =
        $(`<table class="table table-hover table-dark">
            <thead>
             ${theadOrderHtmlString}
            </thead>
            <tbody>
            ${tbodyOrderHtmlString}
            </tbody>
        </table>`);

    document.getElementById('selected-student-info').appendChild($html[$html.length - 1])
};

export {
    init,
    getSelectedData
}