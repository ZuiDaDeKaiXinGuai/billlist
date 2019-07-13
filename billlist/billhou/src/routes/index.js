var express = require('express');
var router = express.Router();
var mongodb = require('mongodb-curd');
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

//获取icon列表
router.get('/iconlist', function(req, res) {
    var type = req.query.type;
    mongodb.find('bill', 'iconlist', { type: type }, function(result) {
        if (result.length) {
            res.send({ code: 0, data: result })
        } else {
            res.send({ code: 1, mes: "没有数据" })
        }
    })
});
//获取账单列表
router.get('/getlist', function(req, res) {
    mongodb.find('bill', 'renderlist', function(result) {
        if (result.length) {
            res.send({ code: 0, data: result })
        } else {
            res.send({ code: 1, mes: "没有数据" })
        }
    })
})

//添加单个账单接口
router.post('/addlist', function(req, res) {
    mongodb.insert('bill', 'renderlist', req.body, function(result) {
        if (!result) {
            res.send({ code: 1, mes: "添加失败" })
        } else {
            res.send({ code: 0, mes: "添加成功" })
        }
    })
})
module.exports = router;