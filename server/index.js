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
var login = require('./routes/login');
var modules = require('./routes/modules');

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
app.use('/', chatRouter);
app.use('/login',login);
app.use('/socialhall', socialhallRouter);

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