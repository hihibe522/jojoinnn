var express = require("express");
var router = express.Router();
var conn = require("../db");
const { request } = require("express");

/* GET home page. */
var categoryList = {
  outdoor: "戶外休閒",
  sport: "運動類",
  music: "音樂類",
  art: "藝文類",
  brainstorming: "益智類",
  audio: "視聽類",
  food: "飲食類",
  social: "社交聯誼",
  academic: "學術類",
  tourism: "旅遊類",
  charity: "社會服務類",
  otaku: "宅文化",
  tech: "科技類",
  handmake: "手做",
};

router.post("/", function(req, res, next) {
  console.log(req.body.data);
  conn.query(
    "insert into current_activity set a_host=?,c_ID = ?,c_category=? , a_name = ? , c_in_out = ? , a_address = ? , a_city = ? , a_explain = ? , a_start = ? , a_end = ? , a_confirm = ? , a_limit = ? , a_deadline = ? ",
    [
      req.body.data.m_ID,
      req.body.data.category,
      categoryList[req.body.data.category],
      req.body.data.activityName,
      req.body.data.inOrOut,
      req.body.data.a_cityDetail,
      req.body.data.a_city,
      req.body.data.a_explain,
      req.body.data.a_startTime,
      req.body.data.a_endTime,
      req.body.data.pLSL,
      req.body.data.pUSL,
      req.body.data.a_deadlineTime,
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
