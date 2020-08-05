var express = require('express');
var router = express.Router();
var conn = require('../db');
var cancelAc = {};
var hostName;
var aName;




// 新增取消原因
router.post('/', function (req, res, next) {

    // console.log(req.body);
    conn.query('update current_activity set a_cancellReason=? ,a_avalible=? where a_ID=?', [req.body.cancelReason, 3, req.body.aId], function (err, rows) {

        // 目前的會員ID
        cancelAc.activityInfo = JSON.stringify(rows);
        next();
    });



});


// 選擇參加活動的會員
router.post('/', function (req, res, next) {

    conn.query('select * from transaction where a_ID=?', [req.body.aId], function (err, rows) {


        cancelAc.memberInfo = JSON.stringify(rows);
        // console.log(JSON.stringify(rows));
        next();
    });


});


// 新增訊息
router.post('/', function (req, res, next) {
    var reason = `您所參加的活動 <span>${req.body.aName}</span> 已被取消。`
    var memberInfo = JSON.parse(cancelAc.memberInfo);
    var mamberID = memberInfo.forEach(function (e) {
        conn.query('INSERT INTO  reminder set m_ID=? ,reminder_content=? ', [e.m_ID, reason], function (err, rows) {
        });
    })


});





module.exports = router;