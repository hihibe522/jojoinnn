var express = require('express');
var router = express.Router();
var conn = require('../db');
var navInfo = {};



// 目前主JO的活動
router.get('/:id', function (req, res, next) {

    conn.query(`SELECT m_ID, m_name, m_account, joCoin, introduce, m_profile 
    FROM member WHERE m_ID=?`, [req.params.id], function (err, rows) {

        navInfo.memberData = rows;
        next();

    });

});

// 目前主JO的活動
router.get('/:id', function (req, res, next) {

    conn.query('select * from current_activity where a_host=? and a_avalible=?', [req.params.id, 0], function (err, rows) {

        navInfo.hostingData = rows;
        next();

    });

});


// 目前參加的活動
router.get('/:id', function (req, res, next) {

    conn.query('select * from (transaction join member ON transaction.a_host=member.m_ID )INNER JOIN current_activity on transaction.a_ID = current_activity.a_ID WHERE transaction.m_ID=? and current_activity.a_avalible<=?', [req.params.id, 2], function (err, rows) {

        navInfo.joingData = rows;
        // console.log(navInfo.joingData)
        next();

    });

});


// EXP
router.get('/:id', function (req, res, next) {

    conn.query('select SUM(c_exp) as expSum from member_property where m_ID=?', [req.params.id], function (err, rows) {

        navInfo.mamberExp = rows;
        // res.send(JSON.stringify(navInfo));
        next();

    });

});

// 目前訊息
router.get('/:id', function (req, res, next) {

    conn.query('select * from reminder where m_ID=? ORDER BY r_ID DESC', [req.params.id], function (err, rows) {

        navInfo.msgData = rows;
        res.send(navInfo);

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



// // 登出
// router.post('/', function (req, res, next) {

//     req.session.userName = "";
//     res.send(false);

// });



module.exports = router;