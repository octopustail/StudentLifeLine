const combineData = function (gapData,entropyData) {
    let entropyObj, gapObj;
    let result = {};
    Object.keys(entropyData).forEach(function (studentId) {
        entropyObj = entropyData[studentId];
        gapObj = gapData[studentId];
        result[studentId] = Object.assign({}, entropyObj, gapObj);
    });
    return result;
};

/**
 * 把数据两者的传入,并且来updates Student Info Table;
 * @param gapData
 * @param entropyData
 */
const getSelectedData = function (gapData = window.parcoods.data.gap, entropyData = window.parcoods.data.entropy) {
    debugger;
    const dataset = combineData(gapData,entropyData);
    clearCurrentTable();
    generateTableDOM(dataset);

};

const clearCurrentTable = function () {
    $('#selected-student-info').empty();
};

const fillCurrentTable = function () {

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

    document.getElementById('selected-student-info').appendChild($html[$html.length-1])
};

export {
    getSelectedData
}