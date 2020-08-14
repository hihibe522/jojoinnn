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


// 新增取消訊息
router.post('/', function (req, res, next) {
    var reason = `您所參加的活動 <span>${req.body.aName}</span> 已被取消。`
    var memberInfo = JSON.parse(cancelAc.memberInfo);

    memberInfo.forEach(function (e) {
        conn.query('INSERT INTO  reminder set m_ID=? ,reminder_content=?,read_or_not=?', [e.m_ID, reason, 0], function (err, rows) {
        });
        next();
    })
});


// 退款
router.post('/', function (req, res, next) {
    var memberInfo = JSON.parse(cancelAc.memberInfo);
    memberInfo.forEach(function (e) {
        conn.query('update member inner join transaction on member.m_ID = transaction.m_ID set member.joCoin = member.joCoin+ transaction.a_price where transaction.a_ID=? and transaction.m_pay=1', [req.body.aId], function (err, rows) {
        });
        next();
    })
});



// 新增取消訊息
router.post('/', function (req, res, next) {
    var memberInfo = JSON.parse(cancelAc.memberInfo);
    memberInfo.forEach(function (event) {
        if (event.m_pay == 1 && event.m_free == 0) {
            var reason = `由於活動 <span>${req.body.aName}</span> 被取消，<span>${event.a_price}Jo幣</span>已經退還給您。`
            conn.query('INSERT INTO  reminder set m_ID=? ,reminder_content=?,read_or_not=?', [event.m_ID, reason, 0], function (err, rows) {
            });

        }
        next();
    })
    // res.send(memberInfo);
});


// 退款紀錄
router.post('/', function (req, res, next) {
    var memberInfo = JSON.parse(cancelAc.memberInfo);
    memberInfo.forEach(function (event) {
        if (event.m_pay == 1 && event.m_free == 0) {
            conn.query('INSERT INTO consumption set con_price =(SELECT joCoin FROM member WHERE m_ID=?),m_ID=?,con_event=?,con_deposit=?', [event.m_ID,event.m_ID, "活動退款", event.a_price], function (err, rows) {
            });
}
    })
res.send(memberInfo);
});


module.exports = router;