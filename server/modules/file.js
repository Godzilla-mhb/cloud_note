/**
 * 与文件相关操作的模块、默认操作_cache/index.json
 */
/* eslint-disable*/
const fs = require("fs")
const path = require('path')
const source = path.resolve(__dirname, '../_cache/index.json') // 文件源
const fsOperator = {
    // 根据key存储
    setItem(key, value) {
        var _data = fs.readFileSync(source);
        var data = JSON.parse(_data);
        data[key] = value // 修改值
        fs.writeFileSync(path.resolve(source), JSON.stringify(data, null, 2));
    },
    // 根据key获取
    getItem(key) {
        var _data = fs.readFileSync(path.resolve(source));
        var data = JSON.parse(_data);
        if (data[key]) {
            return data[key]
        } else {
            return null
        }
    },
    // 根据key删除
    removeItem(key) {
        var _data = fs.readFileSync(path.resolve(source));
        var data = JSON.parse(_data);
        if (data[key]) { // 若存在此key
            delete data[key]
            fs.writeFileSync(path.resolve(source), JSON.stringify(data, null, 2));
        } else {
            throw new Error('不存在此key')
        }
    }   
}
module.exports = fsOperator