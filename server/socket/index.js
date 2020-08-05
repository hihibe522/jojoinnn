const records = require('./chat_records.js');
var conn = require('../db');

let sockInfo = {};
let socket_List= [];
let onlineGroupCount = 0;
let onlineGroupPeople = [];


module.exports = (io) => {

  io.on('connection', (socket) => {

      socket.on("uInfo",(uInfo)=>{
        sockInfo ={...uInfo };
        // let sockInfo.myID = 
        sockInfo.sID = socket.id;
        // console.log(uInfo);
        // console.log(socket.id);
        // console.log(sockInfo);
        const found = socket_List.findIndex(ele=> ele.myID == sockInfo.myID);
        if(found > -1){
          socket_List[found].sID = socket.id;
        }
        else{
          socket_List.push(sockInfo);
        }
        console.log(socket_List);
        socket.emit("sockInfo",socket.id);
        io.sockets.emit('getOnlineMan', socket_List);
      })
      socket.on("leavechat",(sid)=>{
          // console.log("disconnect",socket.id)
          delectUser(socket.id);
          // console.log("disconnect",socket_List);
          io.sockets.emit('getOnlineMan', socket_List);
      })

      socket.on("sendchat",(myid,uid,msg)=>{

        var num = Math.random();
        // console.log(myid,uid,msg);
        console.log("1111",socket_List);
        var user = socket_List.filter((ele) =>{
            return ele.myID == uid;
        })
        console.log("222222",socket_List);
        console.log("1111",user);
        let sql ="INSERT INTO chatroom (userID, friendID,msg,time) VALUES (?,?,?,?)";
          conn.query(sql,[myid,uid,msg,currTime()],function(err, rows){
            if (err) {
              console.log(err);
            }
              // res.json(rows);
              console.log("insert OK")
          })
        if(user != "" ){
            // console.log(user[0].sID);
            io.sockets.to(user[0].sID).emit('reply', {num:num, id: myid, self: false, date:currTime(), msg});
        }

        socket.emit('reply', {num:num,id:myid,self: true , date: currTime(),msg});
        // num++;
      })

      // console.log("sockInfo socialll",sockInfo);
    //  if(sockInfo !== "" ){
      
      // 接收由socialhall 發出的請求
      socket.on("group",(room,n)=>{
        let name = n;
        //加入前檢查是否已有所在房間
        const nowRoom = Object.keys(socket.rooms).find(room =>{
          return room !== socket.id
        })
        if(nowRoom){
          socket.leave(nowRoom);
        }
        //再加入新的
        socket.join(room);
        console.log("socialhall",socket.rooms);
        onlineGroupCount++;
        onlineGroupPeople.push(name);
    
        // 發送人數給網頁
        io.sockets.in(room).emit('online', onlineGroupCount);
        io.sockets.in(room).emit('onlinePeople', onlineGroupPeople);
    
        // 發送紀錄
        socket.emit("chatRecord", records.get());
    
        socket.on("send", (a) => {
          a["name"] = name;
          // let d = new Date();
          let time = currTime();
          a["time"] = time;
          if (Object.keys(a).length < 3) return;
          records.push(a);
        });
    
        socket.on('leaveGroup',()=>{
          const room = Object.keys(socket.rooms).find(room => {
            return room !== socket.id
          })
    
          // 有人離開群聊了，扣人
          onlineGroupCount = (onlineGroupCount < 0) ? 0 : onlineGroupCount -= 1;
          onlineGroupPeople = onlineGroupPeople.filter( item=> item != name);
          io.sockets.in(room).emit('online', onlineGroupCount);
          io.sockets.in(room).emit('onlinePeople', onlineGroupPeople);
          socket.leave(room);
    
        })
    
          // 當發生離線事件
        socket.on('disconnect', () => {
            
        });
      })
    //  }
    });
    
    records.on("new_message", (re) => {
      // 廣播訊息到聊天室
      console.log(re);
      io.emit("msg", re);
    });
  
// ------------------------------socket.io_end----------------------------

}
const delectUser = (sockId)=>{
  let i = socket_List.findIndex((user) => user.sID == sockId);
  // console.log()
  if (i > -1) {
    delete sockInfo[socket_List[i].sid];
    socket_List.splice(i, 1);
  }
}

const currTime = () => {
  let d = new Date();
  let time = d.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
  return time ;
};