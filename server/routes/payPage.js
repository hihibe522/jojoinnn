var express = require("express");
var router = express.Router();
var conn = require("../db");
const { request } = require("express");

var activityID = 50;
var m_ID = 5;
var m_name = "fk";
var dataList={};
router.get("/", function(req, res, next) {
  conn.query(
    `SELECT * from current_activity  where a_ID=${activityID}`,
    function(err, rows) {
      if (err) {
        // console.log(JSON.stringify(err));
        return;
      }
      console.log(rows)
      dataList.payment=rows;
      next();
    }
  )
})
router.get("/", function(req, res, next) {
  conn.query(
    `SELECT m_ID,m_name,joCoin from member  where m_ID=${m_ID}`,
    function(err, rows) {
      if (err) {
        // console.log(JSON.stringify(err));
        return;
      }
      console.log(rows)
      dataList.member=rows;
      res.send(dataList);

    }
  )
})



router.put("/", function(req, res, next) {
  conn.query(
    `UPDATE transaction SET m_pay=1 WHERE m_ID=${m_ID} and a_ID=${activityID}`,
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
