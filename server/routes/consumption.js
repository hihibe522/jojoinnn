var express = require('express');
var router = express.Router();
var conn = require('../db');


router.get('/:id', function (req, res, next) {
    conn.query('select * from consumption where m_ID=? order by con_ID Desc', [req.params.id], function (err, rows) {

        res.send(JSON.stringify(rows))
    });
    // console.log(req.params.id);
    // res.send("req.params.id")

});

module.exports = router;