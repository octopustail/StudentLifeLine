var distfit = require("distfitjs/lib/distfit");

/**
 * This function is used to estimate kernel Density Estimation of Data;
 * @param data Input data should be array;
 */

const kernelDensityEstinmation = function (data, steps = 300) {
    const KDE = distfit.KDE;
    const sortedData = data.sort();
    const xDomainMin = sortedData[0];
    const xDomainMax = sortedData[sortedData.length - 1];

    const result = {};

    let stepLength = (xDomainMax - xDomainMin) / steps;
    if(stepLength === 0){
        stepLength = 1;
    }
    const kdfit = new KDE.KDEDist(KDE.Kernel.Gaussian, data);

    let x = xDomainMin, y;



    for (; x <= xDomainMax; x+=stepLength) {
        y = kdfit.pdf(x);
        result[x] = y;
    }

    return result;
};


//
// const kernelDensityEstinmation = function (data,steps = 1) {
//     const KDE = distfit.KDE;
//     const sortedData = data.sort();
//     const xDomainMin = sortedData[0];
//     const xDomainMax = sortedData[sortedData.length - 1];
//
//     const result = {};
//
//     const kdfit = new KDE.KDEDist(KDE.Kernel.Gaussian, data);
//
//     let x = xDomainMin,y;
//
//
//     for(let i = xDomainMin; i<= xDomainMax; i++){
//         y = kdfit.pdf(x);
//         result[x]=y;
//         x += 1;
//     }
//
//     return result;
// };

module.exports = kernelDensityEstinmation;