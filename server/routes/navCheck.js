var express = require('express');
var router = express.Router();
var conn = require('../db');
var navInfo = {};
var memberID;

// 驗證
// router.get('/', function (req, res, next) {
//     conn.query('SELECT * FROM member', function (err, rows) {

//         navInfo.mamberCheck = JSON.stringify(rows);
//         // 目前的會員ID
//         memberAccount = JSON.parse(navInfo.mamberCheck);
//         next();
//     });
// });


// 會員登入
router.get('/', function (req, res, next) {
    req.session.userName = "";
    // memberAccount.forEach(function(e){
    //     console.log(e.m_account)
    // });
    if (req.session.userName != "") {

        conn.query('SELECT * FROM member where m_account=?', [req.session.userName], function (err, rows) {
            navInfo.mamberInfo = JSON.stringify(rows);
            // 目前的會員ID
            memberID = JSON.parse(navInfo.mamberInfo)[0].m_ID;
            // console.log(req.session.userName);
            next();
        });

    } else {
        res.send(false);
    }

});

// 目前主JO的活動
router.get('/', function (req, res, next) {

    conn.query('select * from current_activity where a_host=? and a_avalible=?', [memberID, 0], function (err, rows) {

        navInfo.hostingData = JSON.stringify(rows);
        next();

    });

});


// 目前參加的活動
router.get('/', function (req, res, next) {

    conn.query('select * from (transaction join member ON transaction.a_host=member.m_ID )INNER JOIN current_activity on transaction.a_ID = current_activity.a_ID WHERE transaction.m_ID=? and current_activity.a_avalible<=?', [memberID, 2], function (err, rows) {

        navInfo.joingData = JSON.stringify(rows);
        // console.log(navInfo.joingData)
        next();

    });

});


// EXP
router.get('/', function (req, res, next) {

    conn.query('select SUM(c_exp) as expSum from member_property where m_ID=?', [memberID], function (err, rows) {

        navInfo.mamberExp = JSON.stringify(rows);
        // res.send(JSON.stringify(navInfo));
        next();

    });

});

// 目前訊息
router.get('/', function (req, res, next) {

    conn.query('select * from reminder where m_ID=? ORDER BY r_ID DESC', [memberID], function (err, rows) {

        navInfo.msgData = JSON.stringify(rows);
        res.send(JSON.stringify(navInfo));
        
        // next();

    });

});




// 更新單筆訊息
router.put('/', function (req, res, next) {
    console.log(req.body.single);
    if (req.body.single == true) {
        conn.query('update reminder SET read_or_not=1 where r_ID=?', [req.body.mid], function (err, rows) {
            res.send(JSON.stringify(rows));
            // next();
        });
    } else {
        next();
    }


});


// 更新全部訊息
router.put('/', function (req, res, next) {
    conn.query('update reminder SET read_or_not=1 where m_ID=?', [req.body.memberid], function (err, rows) {
        res.send(JSON.stringify(rows));
    });
});



// 登出
router.post('/', function (req, res, next) {

    req.session.userName = "";
    res.send(false);

});



module.exports = router;