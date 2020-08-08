var express = require('express');
var router = express.Router();
var conn = require('../db');


router.get('/:m_ID', function(req, res, next) {

    let sql =`SELECT a.m_ID,a.m_name,a.introduce,a.m_profile, ifnull(b.rate,0) rate,ifnull(b.counts,0) counts , b.a_host 
              FROM member as a LEFT JOIN ( (SELECT AVG(rate) as rate, COUNT(rate) as counts, a_host 
              FROM transaction GROUP by a_host)) as b 
              ON a.m_ID = b.a_host WHERE a.m_ID= ? `;
              
    conn.query(sql,[req.params.m_ID],function(err,rows,next){

        res.send(rows);
    })

})

router.get('/exp/:m_ID',function(req,res,next){

    let sql =`SELECT a.c_ID,a.c_category,ifnull(b.exp,0) exp 
              FROM category AS a LEFT JOIN (SELECT c_ID, SUM(c_exp) as exp  
              FROM member_property WHERE m_ID = ? GROUP BY c_ID) AS b 
              ON a.c_ID = b.c_ID ;
              
              SELECT SUM(c_exp) as expSum from member_property where m_ID =?`;

    conn.query(sql,[[req.params.m_ID],[req.params.m_ID]],function(err,rows,next){
        res.send(rows)
    })

})

router.get('/follower/:m_ID/:userID',function(req,res,next){
    let sql = `SELECT * FROM follower WHERE m_ID = ? and follow_list = ?`;
    // console.log( req.params.m_ID,req.params.userID);
    conn.query(sql,[req.params.m_ID,req.params.userID],function(err,rows,next){
        // console.log(rows);
        res.send(rows);
    })




})





module.exports = router;







