var express = require("express");
var router = express.Router();
var conn = require("../db");

router.get('/carouse',function(req,res,next){
    let sql = `SELECT * FROM current_activity  
               ORDER BY current_activity.a_creatTime  DESC LIMIT 5`;
    
        conn.query(sql,function(err,rows){
            res.send(rows);

        })
})







module.exports = router;