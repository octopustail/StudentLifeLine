(function (window) {
    let data = null;
    let previousSelectedStudentsIdString = '';
    let setTimeoutId = null;

    if (window['parcoods'] == null) {
        window['parcoods'] = {};
    }

    const init = function (data) {

        clearDom();
        const pc = d3.parcoords()("#parcoord-gap");

        storeDataInWindow(data);
        storeParcoordsInstanceInWindows(pc);
        const range = pc.height() - pc.margin().top - pc.margin().bottom;
        const log = d3.scale.linear()
            .domain([40, 100])
            .range([range, 1]);
        const dimensions = {
            "score_1s": {
                title: "Term1",
                ticks:4,
                yscale:log,
                tickValue:[40,60,80,100]
            },
            "score_2s": {
                title: "Term2",
                ticks:4,
                yscale:log,
                tickValue:[40,60,80,100]
            },
            "score_3s": {
                title: "Term3",
                ticks:4,
                yscale:log,
                tickValue:[40,60,80,100]
            },
            "score_4s": {
                title: "Term4",
                ticks:4,
                yscale:log,
                tickValue:[40,60,80,100]
            },
            "score_5s": {
                title: "Term5",
                ticks:4,
                yscale:log,
                tickValue:[40,60,80,100]
            },
            "score_6s": {
                title: "Term6",
                ticks:4,
                yscale:log,
                tickValue:[40,60,80,100]
            },
        };

        pc.data(data)
            .bundlingStrength(2) // set bundling strength
            .smoothness(.25)
            .dimensions(dimensions)
            // .bundleDimension("score_1s")
            .hideAxis(["student_id"])
            .showControlPoints(false)
            .composite('lighter')
            .alpha(0.1)
            .color('#4ccb61')
            .mode("queue")
            .render()
            .brushMode("1D-axes")
            .reorderable()
            .interactive()
        ;


        pc.on('brush', function (d) {

            // 如果是全部的数据,那么就不变,如果是空也不变;
            if (d.length === data.length || d.length === 0) {
                return null;
            }


            // 如果数据没有发生改变, 也不用发生任何改变;
            if (!isSelectedStudentIdChanged(d)) {
                return null;
            }

            debounceFunction(function () {
                const highlightenData = findHighLightenData(previousSelectedStudentsIdString);
                const getSelectedData = window.component.selectStudentTable.getSelectedData;

                if (hasHighlightData(pc) === false) {
                    // 没有高亮数据, 直接显示;
                    highLightLinkedView(highlightenData);

                    getSelectedData(d);
                } else {
                    // 有高亮数据;
                    const commonData = findCommonData(previousSelectedStudentsIdString, pc);
                    if (commonData.length !== 0) {

                        const entropyDataset = window['parcoods']['data']['entropy'];
                        const commonDataInEntropyView = commonData.map(function (studentId) {
                            return entropyDataset[studentId];
                        });

                        highLightLinkedView(commonDataInEntropyView);

                        getSelectedData(window.parcoods.data.gap,commonDataInEntropyView);

                    }


                }


            })

        });
        bindDblClickToClearHighlight(pc);

    };

    /**
     * 判断函数有没有高亮;
     */
    const hasHighlightData = function (parcoordsInstance) {
        const highlightData = parcoordsInstance.highlight();
        return !!highlightData.length;
    };

    /**
     * 找到两份数据中公共的部分
     * @param previousSelectedStudentsIdString 这是选中数据的studentid的字符串
     * @param parcoordsInstance 这个视图的实例;
     */
    const findCommonData = function (previousSelectedStudentsIdString, parcoordsInstance) {
        const highlightData = parcoordsInstance.highlight();
        const selectStudentIdArray = parcoordsInstance.brushed();
        const commonData = [];
        highlightData.forEach(function (studentObj) {
            selectStudentIdArray.forEach(function (selectStudentObj) {
                if (selectStudentObj['student_id'] === studentObj['student_id']) {
                    commonData.push(studentObj['student_id'])
                }
            });
        });

        return commonData;


    };

    //更新视图的时候 需要先把以前的dom清除
    const clearDom = function () {
        const $parcoordGap = $('#parcoord-gap');
        $parcoordGap.empty();
    };

    // 把数据存储到windows对象下;
    const storeDataInWindow = function (data) {
        if (window['parcoods']['data'] == null) {
            window['parcoods']['data'] = {};
        }

        const storedObject = {};
        data.forEach(function (studentObj) {
            storedObject[studentObj['student_id']] = studentObj;
        });

        window['parcoods']['data']['gap'] = storedObject;
    };

    //为了两个图的联动,必须要把pc这个事例暴露出去到全局变量;
    const storeParcoordsInstanceInWindows = function (parcoordsInstance) {
        if (window['parcoods']['parcoordsInstance'] == null) {
            window['parcoods']['parcoordsInstance'] = {};
        }
        window['parcoods']['parcoordsInstance']['gap'] = parcoordsInstance;
    };

    /**
     * 判断选中的学生id有没有发生变化
     * @param d
     * @returns {boolean}
     */
    const isSelectedStudentIdChanged = function (d) {
        let selectedStudentsIdString = d.map(function (studentObj) {
            return studentObj.student_id;
        });

        selectedStudentsIdString = selectedStudentsIdString.sort(function (a, b) {
            return parseInt(a) - parseInt(b)
        }).toString();

        const result = selectedStudentsIdString !== previousSelectedStudentsIdString;
        previousSelectedStudentsIdString = selectedStudentsIdString;

        return result;
    };

    /**
     * 只有在你停止了之后才会运行,实现防抖,可以看看debounce和throttle
     * @param callback
     * @param timeout
     */
    const debounceFunction = function (callback, timeout = 1000) {

        if (setTimeoutId != null) {
            clearTimeout(setTimeoutId)
        }
        setTimeoutId = setTimeout(function () {
            callback();
        }, 1000)
    };

    const findHighLightenData = function (studentListString) {
        const studentListArray = studentListString.split(',');

        const highlightenArray = studentListArray.map(function (studentId) {
            return window['parcoods']['data']['entropy'][studentId];
        });
        return highlightenArray
    };

    // 高亮另外一个view的图
    const highLightLinkedView = function (highlightData) {
        const parcoordsInstance = window['parcoods']['parcoordsInstance']['entropy'];
        parcoordsInstance.highlight(highlightData);
    };

    //绑定双击坐标轴时间来清除highlight效果以及fade的class;
    const bindDblClickToClearHighlight = function (parcoordsInstance) {
        const clearHighlight = function(parcoordsInstance){
            const highlightData = parcoordsInstance.highlight();
            parcoordsInstance.unhighlight(highlightData)
        };

        $('#parcoord-gap svg .dimension').dblclick(function (e) {
            clearHighlight(parcoordsInstance);
            $('#parcoord-gap .foreground').removeClass('faded');
            $('#parcoord-gap .brushed').removeClass('faded');
        })
    };

    window['parcoods']['parcoodsGap'] = {
        init
    }

})(window);

