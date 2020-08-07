var express = require('express');
var router = express.Router();
// const mysql = require('mysql');
var conn = require('../db');
const { log } = require('debug');


router.post('/', function (req, res, next) {
       console.log( req.body.account)
       console.log( req.body.pwd)
    let sql = `SELECT m_ID, m_name, m_account, joCoin, introduce, m_profile 
                FROM member WHERE m_account=? AND m_password = ?`;
    conn.query(sql,[req.body.account, req.body.pwd],function(err,rows){
        if(err){
            console.log(err);
        }
        // console.log(rows)
        if(rows == ""){
            res.send("登入失敗");
            return ;
        }
        res.send(rows);

    })

    // console.log(req.body.id);
    // req.session.userName = req.body.id;
    // req.session.userName = "";

    // res.send("ok");
    // res.send(req.session.userName);

});





module.exports = router;