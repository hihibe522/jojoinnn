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

router.get('/search/:area/:cost/:category/:doorType/:activityTime',function(req,res,next){

    let area = (req.params.area == "all") ? `` : req.params.area ;
    let category = (req.params.category == "all") ? ``: req.params.category ;
    let str = (req.params.cost == 1) ? `a_price != 0`: `a_price = 0` ;

    let sql = `SELECT ifnull(b.collect,0) collect,a.* FROM current_activity AS a 
               LEFT JOIN (SELECT COUNT(a_ID) AS collect ,a_ID 
               FROM member_collect GROUP BY a_ID) as b 
               ON a.a_ID = b.a_ID WHERE ${str} AND c_in_out = ? AND a_start > ? AND c_ID LIKE ? AND a_city LIKE ? 
               ORDER BY a_creatTime DESC`

        conn.query(sql,[req.params.doorType,req.params.activityTime,`%${category}`,`%${area}`],function(err,rows){
            if(err){
                console.log(err);
            }
            res.send(rows);
    
        })
})

router.get('/myfavList/:m_ID',function(req,res,next){
        console.log( req.params.m_ID);
        if(!req.params.m_ID){
            return;
        }
        let sql =`SELECT a_ID FROM member_collect WHERE m_ID = ?`;

        conn.query(sql,[req.params.m_ID],function(err,rows){

            res.send(rows);
        })
})







module.exports = router;