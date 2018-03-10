import $ from 'jquery';

/**
 * 合并两个数据, 以数据量少的为主来合并;
 * @param datasetA 数据列表1
 * @param datasetB 数据列表2;
 * @returns {{}}
 */

//保存选中的checkbox的studentid
let selectedStudentId = [];
let isSelectedAll = false;

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
    generateTableDOM(dataset, Object.keys(dataset));

    sortTableDOM(dataset);
    selectCheckbox();

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
const generateTableDOM = function (dataset, sortedStudentIdArray) {

    const headOrder = ['student_id', 'ae1s', 'ae2s', 'ae3s', 'ae4s', 'ae5s', 'ae6s', 'score_1s', 'score_2s', 'score_3s', 'score_4s', 'score_5s', 'score_6s'];
    const theadOrderHtmlString = `<tr><td><input type="checkbox" class = "all-checked" id="all-checked"><label for="all-checked"></label></td>${headOrder.map(function (trName) {
        return `<th scope="col">${trName}</th>`
    }).join("")}</tr>`;


    const tbodyOrderHtmlString =
        `
        ${sortedStudentIdArray.map(function (studentId) {
            const studentObj = dataset[studentId];

            const studentHtmlString = headOrder.map(function (columnName) {
                return `<td>${studentObj[columnName]}</td>`
            });
            return `<tr><td><input type="checkbox" class="checkstudents" id=${studentObj.student_id}><label for=${studentObj.student_id}></label></td>
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

    if(isSelectedAll == true){
        $('.all-checked').prop("checked",true);
    }else{
        $('.all-checked').prop("checked",false);
    }

};

/**
 * table点击表头
 */
const sortTableDOM = function (dataset, sortedStudentIdArray = Object.keys(dataset)) {
    let flag = false;
    $('#selected-student-info').on('click', 'th', function (e) {
        clearCurrentTable();

        let col = $(this).text();

        let studentObj = [];
        let sortedIdArray = []
        let studentId;

        for (let i = 0; i < sortedStudentIdArray.length; i++) {
            studentId = sortedStudentIdArray[i];
            studentObj.push(dataset[studentId]);

        }

        //根据选择的表头排序
        const sortedByclick = studentObj.sort(function (a, b) {
            let val1 = a[col];
            let val2 = b[col];
            return val1 - val2;
        });

        //取出排序后的学生id顺序放入数组
        for (let i = 0; i < sortedByclick.length; i++) {
            sortedIdArray.push(sortedByclick[i].student_id);
        }

        //再次点击逆序

        if (flag == 1) {
            sortedIdArray = sortedIdArray.reverse();
        }
        flag = !flag;
        generateTableDOM(dataset, sortedIdArray);

        //排序表格后依然保持checked状态
        for (let i = 0; i < sortedStudentIdArray.length; i++) {
            for (let j = 0; j < selectedStudentId.length; j++)
                if (sortedStudentIdArray[i] === selectedStudentId[j]) {
                    $(`td:contains(${selectedStudentId[j]})`).prev().children().prop('checked', true);

                }
        }

        if(isSelectedAll == true){
            $('.all-checked').prop("checked",true);
        }else{
            $('.all-checked').prop("checked",false);
        }


    })
};

const selectCheckbox = function () {

    $('#selected-student-info').on('click', '.checkstudents', function (e) {
        let target = e.target;
        let ischeck = $(this).prop("checked");
        let selectedList = [];

        let $studentid = $(target).parent().next().text();

        if (ischeck == true) {

            selectedStudentId.push($studentid);

        } else {

            removeByValue(selectedStudentId, $studentid);

        }

        //保存选中的学生id
        selectedList = selectedStudentId.toString();

        $('.form-control ').attr('value', selectedList);

    });

    $('#selected-student-info').on('click','.all-checked',function () {
            isSelectedAll = $(this).prop("checked");
        let selectedList = [];
        if(isSelectedAll == true){
            $("tbody tr").each(function () {

                $(this).children("td:nth-child(1)").children().prop('checked',true)
                let text = $(this).children("td:nth-child(2)").text();
                selectedStudentId.push(text);
                selectedList = selectedStudentId.toString();


            });
            $('.form-control ').attr('placeholder', selectedList);
        }else{
            $("tbody tr").each(function () {
                $(this).children("td:nth-child(1)").children().prop('checked', false)

            });
            $('.form-control ').attr('placeholder', 'Query With StudentId');
            selectedStudentId = [];
        }
    })

}
/**
 * 实现从数组中删除某个值
 */

const removeByValue = function (arr, val, a) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == val) {
            arr.splice(i, 1);
            break;
        }

    }
}

export {
    init,
    getSelectedData
}