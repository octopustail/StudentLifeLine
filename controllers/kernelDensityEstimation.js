var distfit = require("distfitjs/lib/distfit");

/**
 * This function is used to estimate kernel Density Estimation of Data;
 * @param data Input data should be array;
 */
const kernelDensityEstinmation = function (data) {
    const KDE = distfit.KDE;
    const xDomainMin = Math.min(...data);
    const xDomainMax = Math.max(...data);

    const result = {};

    const kdfit = new KDE.KDEDist(KDE.Kernel.Gaussian, data);

    let x = xDomainMin,y;

    for(let i = xDomainMin; i<= xDomainMax; i++){
        y = kdfit.pdf(x);
        result[x]=y;
        x += 1;
    }

    return result;
};

module.exports = kernelDensityEstinmation;