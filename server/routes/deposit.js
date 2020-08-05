var express = require('express');
var router = express.Router();
var conn = require('../db');


// 儲值
router.post('/', function (req, res, next) {

    conn.query('insert into consumption set m_ID=? ,con_price=? ,con_deposit=? ,con_event=? ', [req.body.id, req.body.money, req.body.select, "儲值"], function (err, rows) {
        next();
    });
    // res.send(req.body.id);

});

router.post('/', function (req, res, next) {

    conn.query('update member set joCoin=? where m_ID=?', [req.body.money, req.body.id], function (err, rows) {
        res.send("OK");
    });


});


module.exports = router;