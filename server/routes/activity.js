var express = require("express");
var router = express.Router();
var conn = require("../db");
const { request } = require("express");

// var activityID = "req.session.a_ID";
var activityID;

var dataTransfer = {};
router.get("/:actID", function(req, res, next) {
  // console.log(req.params.actID);
  activityID = req.params.actID;
  // console.log("refresh");
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

// 參加人數
router.get("/:actID", function(req, res, next) {
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

// 參加人員
router.get("/:actID", function(req, res, next) {
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

router.get("/:actID", function(req, res, next) {
  conn.query(`SELECT m_ID FROM transaction where a_ID=${activityID}`, function(
    err,
    rows
  ) {
    if (err) {
      console.log(JSON.stringify(err));
      return;
    }
    dataTransfer.signUp = rows;
    // res.send(dataTransfer);
    next();
  });
});

// 留言區
router.get("/:actID", function(req, res, next) {
  // console.log(dataTransfer);
  // console.log(typeof dataTransfer);

  conn.query(
    `SELECT a.msg_content as content,a.updateTime, b.m_name as name,b.m_profile as profile FROM chatboard as a,member as b where a.m_ID=b.m_ID and a.a_ID=${activityID} order by msg_ID DESC`,
    function(err, rows) {
      if (err) {
        console.log(JSON.stringify(err));
        return;
      }
      // console.log(rows);
      dataTransfer.msg_ContentList = rows;
      // console.log(dataTransfer);
      res.send(dataTransfer);
    }
  );
});

// *****************團員參加活動*****************
router.post("/", function(req, res, next) {
  activityID = req.params.actID;
  console.log("POST");
  console.log(req.body.data);
  conn.query(
    "insert into transaction set a_ID = ? , c_category=?,c_ID = ? , a_host = ? , a_price = ? , m_ID = ? , m_name = ? ,m_free = ? ",
    [
      req.body.data.a_ID,
      req.body.data.c_category,
      req.body.data.c_ID,
      req.body.data.a_host,
      req.body.data.a_price,
      req.body.data.m_ID,
      req.body.data.m_name,
      req.body.data.m_free,
    ],

    function(err, rows) {}
  );
});

// *****************取消參加*****************

router.post("/cancel", function(req, res, next) {
  console.log("cancel 1");
  console.log(req.body.cancelAct);
  console.log(req.body);

  conn.query(
    "DELETE FROM transaction WHERE m_ID=? and a_ID=?",
    [req.body.cancelAct.m_ID, req.body.cancelAct.a_ID],

    function(err, rows) {
      if (err) {
        console.log("error");
      } else {
      }
    }
  );
});

// *****************主JO取消活動*****************

//取消活動改狀態
router.put("/", function(req, res, next) {
  console.log("cancel");
  // console.log(req.body.activity_ID)
  conn.query(
    "UPDATE current_activity SET a_avalible=3 WHERE a_ID=?",
    [req.body.activity_ID],

    function(err, rows) {
      if (err) {
        console.log("error");
      } else {
        res.send("OKDONE");
      }
    }
  );
});

// 主JO取消jo團  取消原因
router.post("/reason", function(req, res, next) {
  // console.log(req.body.reason)

  conn.query(
    "UPDATE `current_activity` SET `a_cancellReason`=? WHERE ?",
    [req.body.reason.a_ID, req.body.reason.cancellReason],

    function(err, rows) {
      if (err) {
        console.log("error");
      } else {
        res.send("OKDONE");
      }
      next();
    }
  );
});

var attendList;
// 主JO取消jo團 鈴鐺提醒會員取消
router.post("/reason", function(req, res, next) {
  attendList = dataTransfer.signUp;

  if (attendList == "") {
    return;
  }
  attendList.forEach(function(e) {
    conn.query(
      "INSERT INTO reminder set m_ID=?, reminder_content=?",
      [
        e.m_ID,
        `你所參加的活動<span>${dataTransfer.a_data[0].a_name}</span>已被取消。`,
      ],
      function(err, rows) {
        next();
      }
    );
  });
});

// 主JO取消jo團 活動退款 (尚未紀錄)
router.post("/reason", function(req, res, next) {
  console.log("退款");
  console.log(dataTransfer.a_data[0].a_price);
  attendList.forEach(function(e) {
    conn.query(
      "UPDATE member SET joCoin=joCoin+? where m_ID =?",
      [dataTransfer.a_data[0].a_price, e.m_ID],
      function(err, rows) {
        next();
      }
    );
  });
});

// 主JO取消jo團 活動退款紀錄
router.post("/reason", function(req, res, next) {
  console.log("紀錄");
  console.log(attendList);
  console.log(dataTransfer.a_data[0].a_price);

  attendList.forEach(function(e) {
    console.log(e.m_ID)
    console.log(dataTransfer.a_data[0].a_price)
    console.log(e.m_ID)
    conn.query(
      "INSERT INTO consumption set m_ID=?, con_deposit=?, con_event='活動退款',con_price=(SELECT joCoin from member where m_ID=?)",
      [e.m_ID, dataTransfer.a_data[0].a_price,e.m_ID],
    );
   
  });
});

// sendMsg
router.post("/msg", function(req, res, next) {
  console.log("msg");
console.log(req.body.m_ID)
console.log(req.body)
  conn.query(
    "INSERT INTO chatboard( a_ID, m_ID,msg_content) VALUES (?,?,?)",
    [activityID,   
    req.body.m_ID,
    req.body.msg
    ],
    function(err, rows) {
      if (err) {
        console.log(rows);
        console.log("error");
      } else {
        res.send("OKDONE");
      }
    }
  );
});

module.exports = router;

// router.post("/cancel", function (req, res, next) {
//   console.log("cancel 2")

//   conn.query(
//    "insert into consumption set m_ID = ? , con_price=?,con_deposit = ? , con_event = ? ",
//     [
//       req.body.cancelAct.m_ID,
//       req.body.cancelAct.joCoin,
//       req.body.cancelAct.a_price,
//       "活動退費"
//     ],
//     function (err, rows) {
//       if (err) {
//         console.log("error");
//       } else {

//       }
//       next()
//     }
//   );

// });

// router.post("/cancel", function (req, res, next) {
//   console.log("cancel 3")

//   conn.query(
//     "UPDATE member SET joCoin=? where m_ID=?",
//     [
//       req.body.cancelAct.joCoin+req.body.cancelAct.a_price,
//       req.body.cancelAct.m_ID,
//     ],

//     function (err, rows) {
//       if (err) {
//         console.log("error");
//       } else {

//       }

//     }
//   );

// });
