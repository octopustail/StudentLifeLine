import * as d3 from "d3";
import progressToggle from './progressHandler';

import config from './../config';

/**
 * 初始化只执行一次
 */
const init = function () {
    progressToggle('open');

    drawDailyEntropy();
    progressToggle('close');
};

const RADIUS =45;




const drawDailyEntropy = function(data){
    const width = 780;
    const height =  490;
    const start = 0;
    const end = 2;

    const theta = function(r,index,array){
        const length = array.length;
        return index/length * 2 * Math.PI
    };
    const r = Math.min(width,height) / 2 ;



    const svg = d3.select('#daily-entropy-view').append('svg')
        .attr('width',width)
        .attr('height',height)
        .append('g')
        .attr('transform',`translate(${width/2},${height/2})`);


    const circle = svg.selectAll('circle')
        .data([5,4,3,2,1]) // 有4个标签,分别是library,hotwater,food,shower;
        .enter()
        .append('circle')
        .style('stroke',config.defaultColor.textColor)
        .style('fill-opacity',0)
        .attr('r',function(value,index){
            return value * RADIUS;
        });

    const points = d3.range(start, end + 0.001, (end - start) / 1000);

    const radius = d3.scaleLinear()
        .domain([1,10])
        .range([RADIUS, RADIUS*2]);

    const spiral = d3.lineRadial()
        .curve(d3.curveBasis)
        .angle(theta)
        .radius(radius);

    const entropyCircle = svg.selectAll('entropyCircle')
        .data([[1,2,3,4,5,6,7,8,9,8,7,6,5,4,3,2,1]])
        .enter()
        .append('path')
        .attr('id','entropyCircle')
        .style('fill-opacity',0)
        .style('stroke',config.defaultColor.highlightColor)
        .attr('d',spiral)


    //

    // d3.range(0,4,1).forEach(function(value,index){
    //     svg.append("path")
    //         .datum(points)
    //         .attr("id", "spiral")
    //         .attr("d", spiral)
    //         .style("fill", "none")
    //         .style("stroke", "steelblue");
    //
    // });


};


/**
 * 重载数据,可以多次执行
 */
const reloadData = function () {

};



module.exports = {
    init,
    reloadData
};