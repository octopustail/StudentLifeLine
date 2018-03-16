import $ from 'jquery';

/**
 * 合并两个数据, 以数据量少的为主来合并;
 * @param datasetA 数据列表1
 * @param datasetB 数据列表2;
 * @returns {{}}
 */

//保存选中的checkbox的studentid 数组
let selectedStudentId = [];
let isSelectedAll = false;
// //字符串 保存选中的学生id数组转化成的字符串
// let selectedList;
// //数组 保存input中的*处理之后的id
// let selectedListforInput = [];


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
    selectCheckbox();
    generateTableDOM(dataset, Object.keys(dataset));

    sortTableDOM(dataset);


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
    //为每个student_id DOM节点增加studentid属性
    addStudentAttr();
    //保持生成的表格中checkbox的状态
    selectedStudentId = studentidStayChecked(sortedStudentIdArray, selectedStudentId);
    //在搜索框中同步selectedStudentid
    selectedIdtoFormconctrl(selectedStudentId)
};
/**
 * 将选择的id同步到搜索框 .form-control 中
 */
const selectedIdtoFormconctrl = function (selectedId) {
    //用于保存替换*之后的学号
    let selectedListforInput;
    selectedListforInput = repalceStaredId(selectedId);

    $('.form-control ').attr('value', selectedListforInput);
    return selectedId;

};
/**
 * 用于将为学号加*
 *parameter:数组 selectedidlist 或者第一列td的值 所在的数组
 *  返回 ：字符串 加完*的学号字符串
 */
const repalceStaredId = function (idArray) {
    let studentidtext = [];
    console.log('idArray', idArray);
    //判断学生id格式 对应将其班级位数替换成*号
    for (let i = 0; i < idArray.length; i++) {
        let studentIdHead = idArray[i].indexOf('29');


        if (studentIdHead == 0) {
            studentidtext[i] = idArray[i].replace(/(\d{6})\d{2}(\d{2})/, '$1**$2');

        } else {
            studentidtext[i] = idArray[i].replace(/(\d{8})\d{2}(\d{3})/, '$1**$2');
        }

    }
    studentidtext.toString();
    return studentidtext;
};
/**
 * 为学号列添加自定义属性 studentid
 */

const addStudentAttr = function () {
    $('tbody tr').each(function () {
        let text = []
        text[0] = $(this).children("td:nth-child(2)").text();
        let $studentidTd = $(this).children("td:nth-child(2)");
        let studentidtext;
        $studentidTd.attr('studentid', text);

        studentidtext = repalceStaredId(text);

        $studentidTd.text(studentidtext);
    })
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


    })
};
/**
 * 保持在筛选过后checked的id依然保持checked状态
 * tableArr: 表格中展示的arry selectArr：之前选中的array
 */

const studentidStayChecked = function (tableArr, selectArr) {
    // 保存tableArr selectArr的公共部分作为新的selectedStudentId[]
    let IdArrUnion = []
    for (let i = 0; i < tableArr.length; i++) {

        for (let j = 0; j < selectArr.length; j++) {
            if (tableArr[i] === selectArr[j]) {
                $(`td[studentid = ${selectArr[j]}]`).prev().children().prop('checked', true);
                IdArrUnion.push(selectArr[j])
            }
        }
    }
    return IdArrUnion;


};

/**
 * checked的学生 保存在selectedStudentId[]中
 */
const selectCheckbox = function () {

    $('#selected-student-info').on('click', '.checkstudents', function (e) {
        //在全选状态下如果点击了checkbox 应该取消全选
        if (isSelectedAll == true) {
            $('.all-checked').prop("checked", false);
        }
        let target = e.target;
        let ischeck = $(this).prop("checked");
        let $studentid = $(target).parent().next();

        //studentidAttr:保存学生真实id
        let studentidAttr = $studentid.attr('studentid');

        //idgot:$studentid是否已在selectedStudentId中 防止重复添加id
        let idgot = selectedStudentId.indexOf(studentidAttr);

        if (ischeck == true && idgot == -1) {
            selectedStudentId.push(studentidAttr);

        } else if (ischeck == false) {
            removeByValue(selectedStudentId, studentidAttr);

        }

        //保存选中的学生id

        selectedIdtoFormconctrl(selectedStudentId);


    });
    /*
    * 修改多次筛选会重复将值放入inselectedStudentId的bug
    * solution：判断该值是否在inselectedStudentId中
    * 不知道为什么多次筛选函数会执行多次
    * */
    $('#selected-student-info').on('click', '.all-checked', function () {
        isSelectedAll = $(this).prop("checked");

        if (isSelectedAll == true) {
            $("tbody tr").each(function () {

                $(this).children("td:nth-child(1)").children().prop('checked', true)
                ;
                let $studentid = $(this).children("td:nth-child(2)");
                let studentidAttr = $studentid.attr('studentid');

                let inselectedStudentId = selectedStudentId.indexOf(studentidAttr);
                if (inselectedStudentId == -1) {
                    selectedStudentId.push(studentidAttr);


                }


            });
        } else {

            $("tbody tr").each(function () {
                $(this).children("td:nth-child(1)").children().prop('checked', false)

            });
            selectedStudentId = [];
        }
        selectedIdtoFormconctrl(selectedStudentId);

    });
};
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