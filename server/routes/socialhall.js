var express = require('express');
var router = express.Router();
var conn = require('../db');

// 搜尋玩家
router.get('/:name', function(req, res, next) {
                                              
    console.log(req.params.name);
     let sql = `SELECT a.m_ID,a.m_name,a.introduce,a.m_profile, ifnull(b.rate,0) rate,ifnull(b.counts,0) counts , b.a_host 
                FROM member as a LEFT JOIN ( (SELECT AVG(rate) as rate, COUNT(rate) as counts, a_host 
                FROM transaction GROUP by a_host)) as b 
                ON a.m_ID = b.a_host 
                WHERE a.m_account LIKE ? or a.m_name LIKE ?`;

     conn.query(sql,[`%${req.params.name}%`,`%${req.params.name}%`],function(err,rows){
        if(err){
          console.log(err);
        }
        res.send(rows);
      })
      // res.send("search ok");
});
// 最佳主JO
router.get('/searchHost/:category', function(req, res, next) {
   console.log(req.params.category)
   let sql ="";
   if(req.params.category == "all"){

     sql = `SELECT b.*,a.m_ID,a.m_name,a.m_profile,a.introduce 
            FROM (SELECT AVG(rate) as rate, COUNT(rate) as counts ,a_host 
            FROM transaction GROUP by a_host) AS b LEFT JOIN member AS a 
            ON b.a_host = a.m_ID ORDER BY rate DESC LIMIT 5`;

     conn.query(sql,function(err,rows){
      if(err){
        console.log(err);
      }
      res.send(rows);
    })

  }
  else{
    sql = `SELECT b.*,a.m_ID,a.m_name,a.m_profile,a.introduce 
           FROM( SELECT AVG(rate) AS rate , SUM(rate) AS sum ,a_host ,c_ID FROM transaction WHERE c_ID =? GROUP BY a_host ) AS b
           LEFT JOIN member AS a ON b.a_host = a.m_ID ORDER BY rate DESC LIMIT 5`;

    conn.query(sql,[req.params.category],function(err,rows){
        if(err){
          console.log(err);
        }
          res.send(rows);
        }) 
   }
})

// 最佳JO粉
router.get('/searchFans/:category', function(req, res, next) {

  let sql = ""
  if(req.params.category == "all"){
    sql = `SELECT b.*,a.m_name,a.m_profile,a.introduce 
          FROM (SELECT m_ID, SUM(c_exp) AS points 
          FROM member_property GROUP BY m_ID ) AS b LEFT JOIN member as a 
          ON b.m_ID = a.m_ID ORDER BY points DESC LIMIT 5`;

    conn.query(sql,function(err,rows){
        if(err){
            console.log(err);
        }
          res.send(rows);
    })

  }else{
    sql=`SELECT b.*,a.m_name,a.m_profile,a.introduce 
         FROM (SELECT m_ID, SUM(c_exp) AS points 
         FROM member_property WHERE c_ID = ? GROUP BY m_ID) as b LEFT JOIN member as a 
         ON b.m_ID = a.m_ID ORDER BY points DESC LIMIT 5`

    conn.query(sql,[req.params.category],function(err,rows){
      if(err){
            console.log(err);
      }
            res.send(rows);
      })

  }
})

module.exports = router;