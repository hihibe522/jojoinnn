
const records = require('./chat_records.js');

module.exports = (io) => {

    let socket_Map= [];
    let onlineCount = 0;
    let onlinePeople = [];
    
    
    io.on('connection', (socket) => {
      console.log(socket.id)
      
      let name = Math.floor(Math.random()*100);
      // 接收由socialhall 發出的請求
      socket.on("group",(room)=>{
        //加入前檢查是否已有所在房間
        const nowRoom = Object.keys(socket.rooms).find(room =>{
          return room !== socket.id
        })
        if(nowRoom){
          socket.leave(nowRoom);
        }
        //再加入新的
        socket.join(room);
        console.log(socket.rooms);
        onlineCount++;
        onlinePeople.push(name);
    
        // 發送人數給網頁
        io.sockets.in(room).emit('online', onlineCount);
        io.sockets.in(room).emit('onlinePeople', onlinePeople);
    
        // 發送紀錄
        socket.emit("chatRecord", records.get());
    
        socket.on("send", (a) => {
          a["name"] = name;
          let d = new Date();
          let time = d.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
          a["time"] = time;
          if (Object.keys(a).length < 3) return;
          records.push(a);
        });
    
        socket.on('leaveGroup',()=>{
          const room = Object.keys(socket.rooms).find(room => {
            return room !== socket.id
          })
    
          // 有人離開群聊了，扣人
          onlineCount = (onlineCount < 0) ? 0 : onlineCount -= 1;
          onlinePeople = onlinePeople.filter( item=> item != name);
          io.sockets.in(room).emit('online', onlineCount);
          io.sockets.in(room).emit('onlinePeople', onlinePeople);
          socket.leave(room)
    
        })
    
          // 當發生離線事件
          socket.on('disconnect', () => {
    
        });
      })
    
    });
    
    records.on("new_message", (re) => {
      // 廣播訊息到聊天室
      console.log(re);
      io.emit("msg", re);
    });
    
// ------------------------------socket.io_end----------------------------










}