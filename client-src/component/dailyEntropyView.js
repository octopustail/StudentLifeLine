import * as d3 from "d3";
import progressToggle from './progressHandler';
import $ from 'jquery';

import config from './../config';

/**
 * 初始化只执行一次
 */
const init = function () {
    progressToggle('open');
    drawDailyEntropy();
    // reloadData();
    progressToggle('close');
};

const RADIUS = 45;

let svg;

const drawDailyEntropy = function(){
    const width = 780;
    const height =  490;

    const r = Math.min(width,height) / 2 ;

    svg = d3.select('#daily-entropy-view').append('svg')
        .attr('width',width)
        .attr('height',height)
        .append('g')
        .attr('transform',`translate(${width/2},${height/2})`);

    /**
     * 画circile的圈
     */
    const circle = svg.selectAll('circle')
        .data([5,4,3,2,1]) // 有4个标签,分别是library,hotwater,food,shower;生成5个环;
        .enter()
        .append('circle')
        .style('stroke',config.defaultColor.textColor)
        .style('fill-opacity',0)
        .attr('r',function(value,index){
            return value * RADIUS;
        });
};


/**
 * 重载数据,可以多次执行
 */
const reloadData = function (data) {

    cleanPreviousChart(function(){
        ['library','hotwater','food','shower'].forEach(function(type,index){
            const radiusIndex = index +1;
            const radius = d3.scaleLinear()
                .domain([Math.min(...data[type]['countArray']),Math.max(...data[type]['countArray'])])
                .range([RADIUS * radiusIndex, RADIUS*(radiusIndex +1)]);

            const spiral = d3.lineRadial()
                .curve(d3.curveBasis)
                .angle(theta)
                .radius(radius);

            const entropyCircle = svg.selectAll('entropyCircle')
                .data([data[type]['countArray']])
                .enter()
                .append('path')
                .attr('class','entropyCircle')
                .style('fill-opacity',0)
                .style('stroke',config.defaultColor.highlightColor)
                .attr('d',spiral)
        });
    });


};

/**
 * 如果要画新的图, 首先需要把旧的图清掉;
 */
const cleanPreviousChart = function(callback){
    progressToggle('open');
    const $entropyCircle = $('.entropyCircle');
    if($entropyCircle.length){
        $entropyCircle.toggle(function(){
            debugger;

            $entropyCircle.remove();
            callback();
            progressToggle('close');
        });
    }else{
        callback();
        progressToggle('close');
    }




};

// 意思是会被划分成多少份.类似于角度;
const theta = function(r,index,array){
    return index/1440 * 2 * Math.PI
};

module.exports = {
    init,
    reloadData
};