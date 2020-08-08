var express = require('express');
var router = express.Router();

var conn = require('../db');

// 取得全部類別
router.get('/category', function (req, res, next) {
  // req.body.category
  let sql = "SELECT * FROM category ";
  conn.query(sql, function (err, rows) {
    if (err) {
      console.log(err);
    }
    res.json(rows);
  })
})

router.post('/collect', function (req, res, next) {
  let sql = `INSERT INTO member_collect VALUES (?,?) `;
  conn.query(sql, [req.body.info.m_ID, req.body.info.a_ID], function (err, rows) {
    if (err) {
      console.log(err);
    }
    res.send("post ok")
  })
})
router.post('/delcollect', function (req, res, next) {
  let sql = `DELETE FROM member_collect WHERE m_ID = ? AND a_ID= ? `;
  conn.query(sql, [req.body.info.m_ID, req.body.info.a_ID], function (err, rows) {
    if (err) {
      console.log(err);
    }
    res.send("delete ok")
  })

})

router.put('/cancelFollow', function (req, res, next) {
  let sql = `DELETE FROM follower WHERE m_ID =? AND follow_list=? `;
  conn.query(sql, [req.body.info.m_ID, req.body.info.f_ID], function (err, rows) {
    if (err) {
      console.log(err);
    }
    res.send("delete ok")
  })

})
router.put('/goFollow', function (req, res, next) {
  let sql = `INSERT INTO follower (m_ID,follow_list) VALUES (?,?)`;
  conn.query(sql, [req.body.info.m_ID, req.body.info.f_ID], function (err, rows) {
    if (err) {
      console.log(err);
    }
    res.send("insert ok");
  })

})


module.exports = router;
