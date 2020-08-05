var express = require('express');
var router = express.Router();
var conn = require('../db');



// ----------------------socket.io-------------------------------

router.get('/:ID', function(req, res, next) {
  // req.session.userName = "be";
    // console.log(req.params.ID);
    // if(req.session.userName){
    conn.query('SELECT * FROM chatroom where userId=? or friendId=?',[req.params.ID,req.params.ID], function(err, rows) {
      if (err) {
        console.log(err);
      }
        // console.log(rows);
        res.json(rows);
    });

    // }
});
router.post('/friendinfo', function(req, res, next){

  var data = req.body.info;
  var queryData = [data] ;
  // console.log(data);
  let sql = `SELECT m_ID,m_name,m_profile FROM member WHERE m_ID IN ?`;
  
  conn.query(sql,[queryData], function(err, rows) {
    if (err) {
      console.log(err);
    }
      res.json(rows);
    });



})




module.exports = router;

