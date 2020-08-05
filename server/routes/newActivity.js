var express = require("express");
var router = express.Router();
var conn = require("../db");
const { request } = require("express");

/* GET home page. */
router.post("/", function(req, res, next) {

  conn.query(
    "insert into current_activity set c_ID = ? , a_name = ? , c_in_out = ? , a_address = ? , a_city = ? , a_explain = ? , a_start = ? , a_end = ? , a_confirm = ? , a_limit = ? , a_deadline = ? ",
    [
      req.body.data.category,
      req.body.data.activityName,
      req.body.data.inOrOut,
      req.body.data.a_cityDetail,
      req.body.data.a_city,
      req.body.data.a_explain,
      req.body.data.a_startTime,
      req.body.data.a_endTime,
      req.body.data.pLSL,
      req.body.data.pUSL,
      req.body.data.a_deadlineTime
    ],

    function(err, row) {
      if (err) {
        console.log("error");
      } else {
        res.send("OKDONE");
      }
    }
  );

});

module.exports = router;
