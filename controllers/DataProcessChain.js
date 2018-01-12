/**
 * Data Process Clain is to process data clain with next func;
 *
 */
class DataProcessChain {
    constructor(payload) {
        this.payload = payload;
    }

    /**
     * execute the functions in the functionList(asynfunction is supported)
     * @param functionList,in the end of the function, you must use
     * Promise.resolve(data) to send the data to the next functions;
     * @returns {DataProcessChain}
     */
    addChain(functionList) {

        this.promise = new Promise((resolve, reject) => {
            resolve(this.payload);
        });
        functionList.forEach((functions) => {
            this.promise = this.promise.then((data) => {
                return functions(data);
            })
        });
        this.promise.catch((error) => {
            throw new Error(error);
        });
        return this;
    }

    sendToClient(func) {
        this.promise.then(func)
    }
}

module.exports = DataProcessChain;