var distfit = require("distfitjs/lib/distfit");

/**
 * This function is used to estimate kernel Density Estimation of Data;
 * @param data Input data should be array;
 */
const kernelDensityEstinmation = function (data) {
    // console.log(data);
    // data = [1,2,3,4,5,6,7];
    const KDE = distfit.KDE;
    const xDomainMin = Math.min(...data);
    const xDomainMax = Math.max(...data);
    const xDomainNumber = 100;
    const xLeastLength = (xDomainMax - xDomainMin) / xDomainNumber;
    const result = [];

    console.log(xDomainMin,xDomainMax,xLeastLength);
    const kdfit = new KDE.KDEDist(KDE.Kernel.Gaussian, data);

    let x = xDomainMin,y;

    for(let i = 0; i< xDomainNumber; i++){
        x +=  xLeastLength;
        y = kdfit.pdf(x);

        result.push([x,y]);
    }
    return result;
};

module.exports = kernelDensityEstinmation;