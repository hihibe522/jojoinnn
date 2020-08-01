var express = require('express');
var router = express.Router();
var conn = require('../db');



// ----------------------socket.io-------------------------------


/* GET users listing. */
router.get('/chat', function(req, res, next) {
  // req.session.userName = "be";
    // console.log(req.session.userName);
    if(req.session.userName){

      conn.query('SELECT * FROM chatroom where userId=? or friendId=?',[req.session.userName,req.session.userName], function(err, rows) {
      if (err) {
        console.log(err);
      }
        // console.log("dsff",rows);
        res.json(rows);
      });

    }
    // next();
    // res.sendFile('/jo_chat/public/chatRoom.html');
});

module.exports = router;

