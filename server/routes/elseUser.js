var express = require('express');
var router = express.Router();
var conn = require('../db');


router.get('/:m_ID', function(req, res, next) {
    let sql =`SELECT b.*,a.m_ID,a.m_name,a.m_profile,a.introduce 
              FROM (SELECT AVG(rate) as rate, COUNT(rate) as counts ,a_host 
              FROM transaction GROUP by a_host) AS b LEFT JOIN member AS a 
              ON b.a_host = a.m_ID WHERE a.m_ID =? ;

              SELECT SUM(c_exp) as expSum from member_property where m_ID =?`;

    conn.query(sql,[[req.params.m_ID],[req.params.m_ID]],function(err,rows,next){

        res.send(rows)
    })


})




module.exports = router;







