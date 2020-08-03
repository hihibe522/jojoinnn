<template>
  <div id="chatRoomApp">
    <div id="loginInput">
        <input v-model="myInfo.myId" type="text" name="" id="">
        <button @click="login" class="btn btn-primary">登入</button>
        <button @click="logout" class="btn btn-primary">登出</button>
    </div>
    <div class="btnww">
        <button id="be" @click="goChat" class="btn btn-success talkTo">be</button>
        <button id="apple" @click="goChat" class="btn btn-danger talkTo">Apple</button>
        <button id="cat" @click="goChat" class="btn btn-info talkTo">Cat</button>
        <button id="fish" @click="goChat" class="btn btn-warning talkTo">Fish</button>
    </div>
    <div v-if="loginOK" @click="showChatBox = true" class="chat_icon">
        <img class="ld ld-bounceAlt" src="../assets/img/jo_images/jo_i_chat.svg" alt="">
    </div>
    <div class="chatRoom" :class="{'chat_avtive': showChatBox}">
        <div class="chatTitle">
            <h4>{{chatMsg.toId}}</h4>
            <button @click="showChatBox = !showChatBox" class="modal_close chat_close" title="Close"><span></span></button>
        </div>
        <div class="chatBody">
          <div class="chatLeftbox">
                  <div class="msgBox">
                      <div v-for="item in friendRecords" :key="item.chat" :class="['msgList',item.userId == myInfo.myId ? 'myMsg':'otherMsg']">
                        {{item.msg}}
                      </div>
                      <div v-for="item in onlineChatMsgs[chatMsg.toId]" :key="item.num" :class="['msgList',item.id == myInfo.myId ? 'myMsg':'otherMsg']">
                        {{item.msg}}
                      </div>
                  </div>
                  <div class="inputMsg">
                      <input v-model="chatMsg.msg" @keyup.13="sendMsg" type="text" placeholder="請輸入訊息">
                  </div>
          </div>
          <div class="chatRightbox">
                <ul>
                    <li @click="selFriendToChat(item.friendId)" v-for="item in friendList" :key="item.friendId">
                        <img src="@/assets/img/socialhall/2.png" alt="">
                        <h5 :id="item.friendId">{{item.friendName}}</h5>
                    </li>
                </ul>
          </div>
        </div>
        </div>
  </div>


</template>

<script>
import $ from "jquery";
import axios from "axios";

export default{
  name:'chatRoomApp',
  data() {
    return {
      loginOK:false,
      myInfo:{
                myId:"",
                myName:"嗶波"
             },
      onlinePeople:[],
      chatMsg:{
                toId:"",
                toName:"",
                msg:""
              },
      onlineChatMsgs:{},
      recordsData:{},
      friendList:[],
      friendRecords:[],
      showChatBox:false
    }
  },
  sockets:{
       connect:function(){
            console.log("connect to chat");
        },
        sockInfo:function(sid){
            this.myInfo.sID = sid;
        },
        getOnlineMan:function(list){
            // console.log(list);
            this.onlinePeople = list;
        },
        reply:function(data){
            console.log(data);
            this.chatOnBox(data);
        }
    
  },

  methods: {
            chatOnBox(data){
                var vm = this ;
                vm.onlineChatMsgs[vm.chatMsg.toId].push(data);
                console.log( vm.onlineChatMsgs[vm.chatMsg.toId]);

            },  
            login(){
                var vm = this;
                let name = vm.myInfo.myId;
                // console.log(id);
                axios.post('login',{id:name}).then(
                  e=>{
                    // console.log(e)
                    // console.log(e.data);
                    vm.loginOK = true;
                    vm.getChatList();
                    vm.selfInfo();
                    vm.$bus.$emit('islogin',e.data);
                  }
                )
            },
            selfInfo(){
                var vm = this;
                let self = {
                            myID : vm.myInfo.myId,
                            myName : vm.myInfo.myName
                            };
                this.$socket.emit("uInfo", self);
                
            },
            logout(){
                 this.$socket.emit("leavechat",this.myInfo.sid);
            },
            getChatList(){
                var vm = this;
                axios.get("chat").then(e=>{
                    // console.log(e.data);
                    vm.recordsData = e.data;
                    e.data.forEach((item)=>{
                        let friendInfo = { };
                        if(item.userId == vm.myInfo.myId){
                            friendInfo['friendId'] = item.friendId;
                            friendInfo['friendName'] = item.friendId
                        }
                        if( item.friendId == vm.myInfo.myId){
                            friendInfo['friendId'] = item.userId;
                            friendInfo['friendName'] = item.userId;
                        }
                        vm.friendList.push(friendInfo);
                    })
                    const set = new Set();
                    vm.friendList = vm.friendList.filter(item => !set.has(item.friendId) ? set.add(item.friendId) : false);
                    // console.log(vm.friendList);
                    // vm.friendList = vm.friendList.filter(function(element, index, arr){
                    //     return arr.indexOf(element) === index;
                    // });
                })
            },
            goChat(e){
                this.showChatBox = true;
                this.chatMsg.toId = e.target.id;
                this.chatMsg.toName = e.target.innerText;
                // console.log(this.friendList);
                // console.log(this.chatMsg.toId);
                let friend = {friendId: this.chatMsg.toId,
                              friendName:this.chatMsg.toName
                             };

                console.log(friend);

                // 判斷對象是否已存在對話列表
                let isFriend = this.friendList.find(ele=>{
                    return ele.friendId == this.chatMsg.toId;
                })
                if(!isFriend){
                    // axios.get('')
                    this.friendList.push(friend);
                }
                else{
                    this.selFriendToChat(this.chatMsg.toId);
                }
            },
            sendMsg(){
                var vm = this;
                console.log(vm.myInfo.myId);
                console.log(vm.chatMsg.toId);
                this.$socket.emit("sendchat",vm.myInfo.myId,vm.chatMsg.toId,vm.chatMsg.msg);
                vm.chatMsg.msg = "";
                // console.log(vm.chatMsg);
                
            },
            selFriendToChat(id){
                let vm = this;
                vm.friendRecords = vm.recordsData.filter(item=>{
                        if(item.friendId == id ||item.userId == id ){
                            return item;
                        }
                })
                vm.chatMsg.toId = id;
                // 對話列表統整
                let has = vm.onlineChatMsgs.hasOwnProperty(vm.chatMsg.toId);
                if(!has){
                     vm.$set(vm.onlineChatMsgs,vm.chatMsg.toId,[])
                }
            }
        },
        updated() {
            // 維持對話視窗置底
            $(".msgBox").scrollTop($(".msgBox")[0].scrollHeight);
        }
}
</script>

<style scoped>
  @import '../assets/css/chatRoom.css';

  .btnww{
    text-align: center;
    margin-top: 100px;
  }
  .chatRoom{
    z-index: 100;
  }

  #loginInput{
   margin-top: 100px;
  }

</style>
