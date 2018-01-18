/**
 * To transform the Array into other version;
 * @param data
 */
const cleanData = (data)=>{
    const actualEntropyList = [];
    const keys = Object.keys(data[0]);
    const studentIdIndex = keys.indexOf('student_id');
    keys.splice(studentIdIndex,1);

    const keyName = keys[0];
    data.forEach((line)=>{
        actualEntropyList.push(line[keyName]);
    });
    return actualEntropyList;
};


module.exports = cleanData;