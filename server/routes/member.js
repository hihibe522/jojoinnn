var express = require('express');
var router = express.Router();
var conn = require('../db');
var getmemberInfo = {};
var getmemberGift = {};

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
    conn.query('SELECT AVG(rate) as rate,COUNT(m_ID) as count from transaction where a_host = ? and rate>0', [req.params.id], function (err, rows) {
        getmemberInfo.memberRate = rows
        // console.log(getmemberInfo);
        res.send(getmemberInfo);
    });


});


// 收藏的活動
router.get('/memberCollect/:id', function (req, res, next) {

    conn.query('SELECT m.* ,c.* from member_collect as m inner join current_activity as c on m.a_ID=c.a_ID where m.m_ID =? and c.a_avalible<=?', [req.params.id, 1], function (err, rows) {
        res.send(rows);
        // next();
    });


});

// 正在參加的活動
router.get('/memberJoing/:id', function (req, res, next) {

    conn.query('select * from (transaction join member ON transaction.a_host=member.m_ID )INNER JOIN current_activity on transaction.a_ID = current_activity.a_ID WHERE transaction.m_ID=? and (current_activity.a_avalible<=1 or current_activity.a_avalible=4) order by t_D desc', [req.params.id], function (err, rows) {
        res.send(rows);
        // next();
    });


});


// 參加歷史
router.get('/memberJoinHis/:id', function (req, res, next) {

    conn.query('select * from (transaction join member ON transaction.a_host=member.m_ID )INNER JOIN current_activity on transaction.a_ID = current_activity.a_ID WHERE transaction.m_ID=? and current_activity.a_avalible>=5 order by t_D desc', [req.params.id], function (err, rows) {
        res.send(rows);
        // next();
    });


});


// 評價揪主
router.get('/hostMemberData/:aid', function (req, res, next) {

    conn.query('select member.*,current_activity.*  from member INNER JOIN current_activity on member.m_ID = current_activity.a_host WHERE current_activity.a_ID=?', [req.params.aid], function (err, rows) {
        res.send(rows);
        // console.log(rows)
        // next();
    });


});



// 正在舉辦的活動
router.get('/memberHosting/:id', function (req, res, next) {

    conn.query('select * from current_activity where (a_avalible<=1 or a_avalible=4) and a_host=? order by a_ID desc', [req.params.id], function (err, rows) {
        res.send(rows);
        // next();
    });

});


// 舉辦歷史
router.get('/memberHostHis/:id', function (req, res, next) {

    conn.query('select * from current_activity where a_avalible>=5 and a_host=? order by a_ID desc', [req.params.id], function (err, rows) {
        res.send(rows);
        // next();
    });
});







// 追蹤的成員
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



// 轉盤禮物
router.get('/gift', function (req, res, next) {

    conn.query('SELECT * FROM gift', function (err, rows) {
        res.send(rows);
        // next();
    });


});



// 轉盤獎品紀錄
router.get('/memberGift/:id', function (req, res, next) {
    // console.log("CCCCCC");
    conn.query('SELECT  member_gift.*,gift.* FROM member_gift inner join gift on member_gift.gift_ID = gift.gift_ID where m_ID=? ORDER BY get_ID DESC', [req.params.id, 2], function (err, rows) {
        getmemberGift.getmemberGiftData = rows;
        next();
    });

});

// 計算
router.get('/memberGift/:id', function (req, res, next) {
    conn.query('SELECT count(m_ID) as count FROM member_gift where m_ID=?', [req.params.id], function (err, rows) {
        // console.log(req.params.id)
        getmemberGift.getmemberGiftCount = rows;
        res.send(getmemberGift);

        // next();
    });

});

// 更新獎品
router.post('/memberGift', function (req, res, next) {
    // console.log(req.body.id);
    // console.log(req.body.gift_ID);
    conn.query("INSERT INTO member_gift SET m_ID=?,gift_ID=?,gift_avalible=?", [req.body.id, req.body.gift_ID, 1], function (err, rows) {
        res.send(rows);

        // next();
    });


});


// 領取獎品
router.put('/memberGift', function (req, res, next) {
    conn.query("UPDATE member_gift SET gift_avalible=? where get_ID = ?", [0, req.body.get_ID], function (err, rows) {
        res.send(rows);

        // next();
    });


});


// 查看評價
router.get('/memberCommand/:aid', function (req, res, next) {

    conn.query('SELECT * FROM transaction where a_ID =? order by t_D desc', [req.params.aid], function (err, rows) {
        res.send(rows);
        // console.log(rows)
        // next();
    });


});

// 給評價
router.put('/giveStar', function (req, res, next) {
    // console.log(this.a_ID, this.me_ID, this.commandText, this.a_starCount);
    conn.query("update transaction set rate=? ,a_text=? where a_ID=? and m_ID=?", [req.body.star, req.body.commandInfo, req.body.aid, req.body.id], function (err, rows) {
        res.send(rows);
        console.log(rows);
        // next();
    });

});


module.exports = router;