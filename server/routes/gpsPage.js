var express = require("express");
var router = express.Router();
var conn = require("../db");
const { request } = require("express");

// var m_ID = "req.session.m_ID";
// var activityID = "req.session.a_ID";

router.get("/", function(req, res, next) {
  // console.log("get");
  // res.send("getdsada");
  conn.query(
    'SELECT `a_ID`, `c_ID`, `a_name` as text, `a_host`, `c_in_out`, `c_category`, CONCAT(a_city,a_address) as addr, `a_pic`, `a_start`, `a_end`, `a_confirm`, `a_limit`, `a_deadline`, `a_price`, `a_avalible` FROM `current_activity` where a_deadline > now() LIMIT 10 ',
    function(err, rows) {
      if (err) {
        // console.log(JSON.stringify(err));
        return;
      }
  //     // console.log(rows);
  //     // console.log(JSON.stringify(rows))
      res.send(rows);
  //     dataTransfer.a_data = rows;
  //     next();
    }
  );
});




module.exports = router;
