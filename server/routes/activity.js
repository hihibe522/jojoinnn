var express = require("express");
var router = express.Router();
var conn = require("../db");
const { request } = require("express");

// var m_ID = "req.session.m_ID";
// var activityID = "req.session.a_ID";
var activityID = 50;
var m_ID = 5;
var m_name = "fk";
var dataTransfer = {};
router.get("/", function(req, res, next) {
  console.log("refresh");
  conn.query(
    `SELECT b.m_name,b.m_ID,b.m_profile,a.*,c.c_category from current_activity as a, member as b,category as c where  a.a_host=b.m_ID and c.c_ID=a.c_ID and a.a_ID=${activityID}`,
    function(err, rows) {
      if (err) {
        // console.log(JSON.stringify(err));
        return;
      }
      // console.log(rows);
      // console.log(JSON.stringify(rows))
      // res.send(JSON.stringify(rows));
      dataTransfer.a_data = rows;
      next();
    }
  );
});

router.get("/", function(req, res, next) {
  conn.query(
    `SELECT count(*),a_ID FROM transaction where (m_pay+m_free>0) and a_ID=${activityID}`,
    function(err, rows) {
      if (err) {
        console.log(JSON.stringify(err));
        return;
      }
      dataTransfer.a_attendNo = rows;
      // res.send(dataTransfer);
      next();
    }
  );
});

router.get("/", function(req, res, next) {
  conn.query(
    `SELECT t.*,m.m_name,m_profile FROM transaction as t, member as m where (t.m_pay+t.m_free>0) and (t.m_ID=m.m_ID) and t.a_ID=${activityID}`,
    function(err, rows) {
      if (err) {
        console.log(JSON.stringify(err));
        return;
      }
      dataTransfer.a_attendPer = rows;
      // res.send(dataTransfer);
      next();
    }
  );
});

router.get("/", function(req, res, next) {
  console.log(dataTransfer);
  // console.log(typeof dataTransfer);

  conn.query(
    `SELECT a.msg_content as content,a.updateTime, b.m_name as name,b.m_profile as profile FROM chatboard as a,member as b where a.m_ID=b.m_ID and a.a_ID=${activityID}`,
    function(err, rows) {
      if (err) {
        console.log(JSON.stringify(err));
        return;
      }
      console.log(rows);
      dataTransfer.msg_ContentList = rows;
      console.log(dataTransfer);
      res.send(dataTransfer);
    }
  );
});

/* GET home page. */
router.post("/", function(req, res, next) {

  conn.query(
    "insert into transaction set a_ID = ? , c_ID = ? , a_host = ? , a_price = ? , m_ID = ? , m_name = ? ,m_free = ? ",
    [
      activityID,
      req.body.data.c_ID,
      req.body.data.a_host,
      req.body.data.a_price,
      m_ID,
      m_name,
      req.body.data.m_free,
    ],

    function(err, rows) {
      if (err) {
        console.log("error");
      } else {
        res.send("OKDONE");
      }
    }
  );
});

module.exports = router;
