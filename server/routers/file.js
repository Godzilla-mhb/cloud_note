const fsOperator = require ('../modules/file.js');
const express = require('express')
const router = express.Router()
router.post('/get', async (req, res, next) => {
    console.log(req.body);
    var key = req.body.key;
    console.log('key',key)
    var value = fsOperator.getItem(key);
    res.send({msg: value, code: 200})
})
router.post('/set', async (req, res, next) => {
    var key = req.body.key;
    var value = req.body.value;
    fsOperator.setItem(key, value);
    res.send({msg: "success", code: 200})
})
router.post('/delete', async (req, res, next) => {
    var key = req.body.key;
    fsOperator.removeItem(key);
    res.send({msg: "success", code: 200})
})
module.exports = router