const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');

const sessionMiddleware = require('./sessionMiddleware')
const addSocket = require("./socket");
//--------------router路徑-----------------------------------

var chatRouter = require('./routes/chat');
var socialhallRouter = require('./routes/socialhall');
var modules = require('./routes/modules');
var elseuser = require('./routes/elseUser');
var login = require('./routes/login');

//0805 kuo
var newActivity = require('./routes/newActivity');
var activity = require('./routes/activity');
var payPage = require('./routes/payPage');
var actLocations = require('./routes/gpsPage');

//0805姍姍新增
// var checkSession = require('./routes/checkSession');
var navCheck = require('./routes/navCheck');
var cancelHost = require('./routes/cancelHost');
var deposit = require('./routes/deposit');
var consumption = require('./routes/consumption');
var member = require('./routes/member');

// 0805 Dan
// var register = require('./routes/register');
//--------------router路徑_end-----------------------------------


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(cookieParser());
app.use(cors({
  origin:['http://localhost:8080'],
  methods:['GET','POST'],
  alloweHeaders:['Conten-Type', 'Authorization']
}));
app.use(sessionMiddleware);


//----------------------router----------------------------

app.use('/modules', modules);
app.use('/login',login);
app.use('/socialhall', socialhallRouter);
app.use('/chat', chatRouter);
app.use('/user', elseuser);
app.use('/login', login);

//0805 kuo
app.use('/newActivity', newActivity);
app.use('/activity', activity);
app.use('/payPage', payPage);
app.use('/actLocations', actLocations); 

//0805姍姍新增
app.use('/navCheck', navCheck);
app.use('/cancelHost', cancelHost);
app.use('/deposit', deposit);
app.use('/consumption', consumption);
app.use('/member', member);

// 0805 Dan
// app.use('/register', register);


var server = http.createServer(app);
// ------------------------router_end---------------------------

var port = normalizePort(process.env.PORT || '5000');
app.set('port', port);


// ----------------------socket.io-------------------------------

var server = http.createServer(app);
var io = require('socket.io')(server);

addSocket(io);

// ----------------------socket.io_end----------------------------

server.listen(port, () => {
  // console.log(port);
  console.log(`Server Started-w. http://localhost:${port}`);
});


function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}