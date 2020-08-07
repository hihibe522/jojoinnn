var express = require('express');
var router = express.Router();
var conn = require('../db');
var getmemberInfo = {};

// 獲得經驗值
router.get('/memberInfo/:id', function (req, res, next) {
    conn.query('select SUM(c_exp) as expSum from member_property where m_ID=?', [req.params.id], function (err, rows) {
        // navInfo.mamberExp = JSON.stringify(rows);
        getmemberInfo.memberExp = rows
        next();

    });

});

// 獲得平均
router.get('/memberInfo/:id', function (req, res, next) {
    conn.query('SELECT AVG(rate) as rate,COUNT(m_ID) as count from transaction where a_host = ?', [req.params.id], function (err, rows) {
        getmemberInfo.memberRate = rows
        // console.log(getmemberInfo);
        res.send(getmemberInfo);
    });


});

router.get('/memberCollect/:id', function (req, res, next) {

    conn.query('SELECT m.* ,c.* from member_collect as m inner join current_activity as c on m.a_ID=c.a_ID where m.m_ID =? and c.a_avalible<=?', [req.params.id, 1], function (err, rows) {
        res.send(rows);
        // next();
    });


});

router.get('/memberJoing/:id', function (req, res, next) {

    conn.query('select * from (transaction join member ON transaction.a_host=member.m_ID )INNER JOIN current_activity on transaction.a_ID = current_activity.a_ID WHERE transaction.m_ID=? and current_activity.a_avalible<=?', [req.params.id, 2], function (err, rows) {
        res.send(rows);
        // next();
    });


});

router.get('/memberHosting/:id', function (req, res, next) {

    conn.query('select * from current_activity where a_host=? and a_avalible<=?', [req.params.id, 2], function (err, rows) {
        res.send(rows);
        // next();
    });


});

router.get('/memberFollow/:id', function (req, res, next) {

    conn.query('select follower.*, member.*  from follower inner join member on follower.follow_list = member.m_ID where follower.m_ID=?', [req.params.id, 2], function (err, rows) {
        res.send(rows);
        // next();
    });


});

router.get('/memberbanList/:id', function (req, res, next) {

    conn.query('select banlist.*, member.*  from banlist inner join member on banlist.banlist = member.m_ID where banlist.m_ID=?', [req.params.id, 2], function (err, rows) {
        res.send(rows);
        // next();
    });


});



// 轉盤
router.get('/gift', function (req, res, next) {

    conn.query('SELECT * FROM gift', function (err, rows) {
        res.send(rows);
        // next();
    });


});

module.exports = router;