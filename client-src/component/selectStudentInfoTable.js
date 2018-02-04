const combineData = function () {
    const tempDataset = window.parcoods.data;
    let entropyObj, gapObj;
    let result = {};
    Object.keys(tempDataset.entropy).forEach(function (studentId) {
        entropyObj = tempDataset.entropy[studentId];
        gapObj = tempDataset.gap[studentId];
        result[studentId] = Object.assign({}, entropyObj, gapObj);
    });
    return result;
};


const getSelectedData = function () {


    const dataset = combineData();
    generateTableDOM(dataset);
    // clearCurrentTable();
    // fillCurrentTable();
};

const clearCurrentTable = function () {

};

const fillCurrentTable = function () {

};

/**
 * 拿着选中的学生再去数据查询.
 */
const queryWithchoosenStudentId = function () {
    $('#table-submit').click()
}

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
            debugger;
            const studentObj = dataset[studentId];
            const studentHtmlString = headOrder.map(function (columnName) {
                return `<td>${studentObj[columnName]}</td>`
            });
            return `<tr>
               ${studentHtmlString}
                   </tr>`
        })}

        `;



    const html =
        `<table class="table table-hover table-dark">
            <thead>
             ${theadOrderHtmlString}
            </thead>
            <tbody>
            ${tbodyOrderHtmlString}
            </tbody>
        </table>`;

    document.getElementById('selected-student-info').appendChild($(html)[1])
};

export {
    getSelectedData
}