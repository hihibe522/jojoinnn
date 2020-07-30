var express = require('express');
var router = express.Router();

var conn = require('../db');

// 取得全部類別
router.get('/category', function(req, res, next){
  // req.body.category
  let sql = "SELECT * FROM category ";
  conn.query(sql,function(err, rows){
    if (err) {
      console.log(err);
    }
      res.json(rows);
  })


})


module.exports = router;
