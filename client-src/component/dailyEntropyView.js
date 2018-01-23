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




const drawDailyEntropy = function(data){
    const width = 780;
    const height =  490;
    const start = 0;
    const end = 2;

    const theta = function(r){
        return Math.PI * r;
    };
    const r = Math.min(width,height) / 2 ;

    const radius = d3.scaleLinear()
        .domain([start, end])
        .range([50, 50]);

    const svg = d3.select('#daily-entropy-view').append('svg')
        .attr('width',width)
        .attr('height',height)
        .append('g')
        .attr('transform',`translate(${width/2},${height/2})`);

    const points = d3.range(start, end + 0.001, (end - start) / 1000);

    const spiral = d3.lineRadial()
        .curve(d3.curveBasis)
        .angle(theta)
        .radius(radius);

    const path = svg.append("path")
        .datum(points)
        .attr("id", "spiral")
        .attr("d", spiral)
        .style("fill", "none")
        .style("stroke", "steelblue");

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