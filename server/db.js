const mysql = require('mysql');

const conn = mysql.createConnection({
    host: '127.0.0.1',
	user: 'root',
	password: '',
    database: "jojo",
    multipleStatements: true,
    timezone:"08:00"
});

conn.connect(function(err) {
    if (err) {
        console.log('connecting error');
        return;
    }
    console.log('connecting success');
});


module.exports =  conn  ;
