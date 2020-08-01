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
var socialhallRouter = require('./routes/socialhallRouter');
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

// console.log(req);
// let chatinfo = {
//   name:Math.floor(Math.random()*100),
//   sid:socket.id,
//   userList:[],
//   sendfrend:'',
// };
// var socket_Map=[]

// let onlineCount = 0;
// let onlinePeople = [];


// io.on('connection', (socket) => {
//   console.log(socket.id)
  
//   let name = Math.floor(Math.random()*100);
//   // 接收由socialhall 發出的請求
//   socket.on("group",(room)=>{
//     //加入前檢查是否已有所在房間
//     const nowRoom = Object.keys(socket.rooms).find(room =>{
//       return room !== socket.id
//     })
//     if(nowRoom){
//       socket.leave(nowRoom);
//     }
//     //再加入新的
//     socket.join(room);
//     console.log(socket.rooms);
//     onlineCount++;
//     onlinePeople.push(name);

//     // 發送人數給網頁
//     io.sockets.in(room).emit('online', onlineCount);
//     io.sockets.in(room).emit('onlinePeople', onlinePeople);

//     // 發送紀錄
//     socket.emit("chatRecord", records.get());

//     socket.on("send", (a) => {
//       a["name"] = name;
//       let d = new Date();
//       let time = d.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
//       a["time"] = time;
//       if (Object.keys(a).length < 3) return;
//       records.push(a);
//     });

//     socket.on('leaveGroup',()=>{
//       const room = Object.keys(socket.rooms).find(room => {
//         return room !== socket.id
//       })

//       // 有人離開群聊了，扣人
//       onlineCount = (onlineCount < 0) ? 0 : onlineCount -= 1;
//       onlinePeople = onlinePeople.filter( item=> item != name);
//       io.sockets.in(room).emit('online', onlineCount);
//       io.sockets.in(room).emit('onlinePeople', onlinePeople);
//       socket.leave(room)

//     })

//       // 當發生離線事件
//       socket.on('disconnect', () => {

//     });
//   })

// });

// records.on("new_message", (re) => {
//   // 廣播訊息到聊天室
//   console.log(re);
//   io.emit("msg", re);
// });

// ------------------------------socket.io_end----------------------------

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