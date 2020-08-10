var express = require("express");
var router = express.Router();
var conn = require("../db");
const { request } = require("express");

var activityID;
// var m_ID = 5;
// var m_name = "fk";
var dataList = {};
router.get("/:actID", function (req, res, next) {
  activityID = req.params.actID;
  conn.query(
    `SELECT * from current_activity  where a_ID=${activityID}`,
    function (err, rows) {
      if (err) {
        // console.log(JSON.stringify(err));
        return;
      }
      // console.log(rows)
      dataList.payment = rows;
      res.send(dataList);
    }
  )
})




router.put("/", function (req, res, next) {
  // console.log(activityID);
  // console.log(req.body)
  // console.log(req.body.m_ID)
  conn.query(
    `UPDATE transaction SET m_pay=1 WHERE m_ID=${req.body.deposit.m_ID} and a_ID=${activityID}`,
    function (err, row) {
      if (err) {
        console.log("error");
      } else {
        // res.send("OKDONE");
      }
      next()
    }
  );
});

router.put("/", function (req, res, next) {
  // console.log(activityID);
  // console.log(req.body)
  // console.log(req.body.m_ID)
  conn.query(
    `UPDATE member SET joCoin=${req.body.deposit.con_deposit} WHERE m_ID=${req.body.deposit.m_ID}`,
    function (err, row) {
      if (err) {
        console.log("error");
      } else {
        // res.send("交易成功");
      }
      next()
    }
  );

});

router.put("/", function (req, res, next) {
  // console.log(activityID);
  console.log(req.body)
  console.log(req.body)
  // console.log(req.body.m_ID)
  console.log(req.body.deposit.m_ID)
  console.log(req.body.deposit.con_deposit)
  console.log(req.body.deposit.a_price * (-1))


  conn.query(
    "insert into consumption set m_ID = ? , con_price=?,con_deposit = ? , con_event = ? ",
    [
      req.body.deposit.m_ID,
      req.body.deposit.con_deposit,
      req.body.deposit.a_price * (-1),
      "活動付款",
    ],
    function (err, rows) {
      if (err) {
        console.log("error");
      } else {
        res.send("rows");
      }

    }
  );

});





module.exports = router;
