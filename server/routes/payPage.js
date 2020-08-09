var express = require("express");
var router = express.Router();
var conn = require("../db");
const { request } = require("express");

var activityID;
// var m_ID = 5;
// var m_name = "fk";
var dataList={};
router.get("/:actID", function(req, res, next) {
  activityID= req.params.actID;
  conn.query(
    `SELECT * from current_activity  where a_ID=${activityID}`,
    function(err, rows) {
      if (err) {
        // console.log(JSON.stringify(err));
        return;
      }
      // console.log(rows)
      dataList.payment=rows;
      res.send(dataList);
    }
  )
})




router.put("/", function(req, res, next) {
  // console.log(activityID);
  // console.log(req.body)
  // console.log(req.body.m_ID)
  conn.query(
    `UPDATE transaction SET m_pay=1 WHERE m_ID=${req.body.m_ID} and a_ID=${activityID}`,
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
