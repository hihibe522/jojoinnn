var express = require("express");
var router = express.Router();
var conn = require("../db");
const { request } = require("express");


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

var favMember;
// router.post("/", function(req, res, next) {
//   console.log(req.body.data);
//   console.log(categoryList[req.body.data.category]);
//   conn.query(
   
//     "insert into current_activity set a_price=?,a_host=?,c_ID = ?,c_category=? , a_name = ? , c_in_out = ? , a_address = ? , a_city = ? , a_explain = ? , a_start = ? , a_end = ? , a_confirm = ? , a_limit = ? , a_deadline = ? ",
//     [
//       req.body.data.a_price,
//       req.body.data.m_ID,
//       req.body.data.category,
//       categoryList[req.body.data.category],
//       req.body.data.activityName,
//       req.body.data.inOrOut,
//       req.body.data.a_cityDetail,
//       req.body.data.a_city,
//       req.body.data.a_explain,
//       req.body.data.a_startTime,
//       req.body.data.a_endTime,
//       req.body.data.pLSL,
//       req.body.data.pUSL,
//       req.body.data.a_deadlineTime,
//     ],

//     function(err, row) {
//       if (err) {
//         console.log("error");
//         return;
//       } else {
//         // res.send("OKDONE");
//         next();
//       }
//     }
//   );
// });

router.post("/", function(req, res, next) {
  conn.query(
   
    "select a.*,b.m_name as hostName from (SELECT m_ID,follow_list FROM follower where follow_list =?) as a,member as b where a.follow_list = b.m_ID",
    [
      req.body.data.m_ID
    ],

    function(err, rows) {
      if (err) {
        console.log("error");
        return;
      } else {
        console.log(rows)
        favMember=rows
        next();
        // res.send("rows");
      }

    }
  );
});



router.post("/", function(req, res, next) {

  var actName= req.body.data.activityName
  // var remindContent=<span>你所追蹤的${hostID}</span>
  var remindContent="";
 
  for(var i=0;i<favMember.length;i++){
  remindContent+=`(${favMember[i].m_ID},'<span>你所追蹤的${favMember[i].hostName}開團${actName}囉</span>'),`
  };

  remindContent=remindContent.substr(0,remindContent.length-1)
  console.log(remindContent)
  conn.query(
   
    `INSERT INTO reminder(m_ID, reminder_content) VALUES ${remindContent}`,
    function(err, rows) {
      if (err) {
        console.log("error");
        return;
      } else {
        console.log(rows)
        favMember=row
        next();
        // res.send("rows");
      }

    }
  );
});
module.exports = router;
