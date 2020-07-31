var express = require('express');
var router = express.Router();
// const mysql = require('mysql');
var conn = require('../db');
const { log } = require('debug');

/* GET home page. */
router.post('/', function(req, res, next) {
    console.log(req.body);
    console.log(req.body.id);
    req.session.userName = req.body.id;
    console.log( req.session.userName);
    res.send("ok");
    
});



module.exports = router;