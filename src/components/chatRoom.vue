<template>
  <div id="chatRoomApp">
    <div id="loginInput">
        <input v-model="myInfo.myId" type="text" name="" id="">
        <button @click="login" class="btn btn-primary">登入</button>
    </div>
    <div class="btnww">
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
                  </div>
                  <div class="inputMsg">
                      <input v-model="chatMsg.msg" @keyup.enter="sendMsg" type="text" placeholder="請輸入訊息">
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
      chatMsg:{
                fromId:"",
                toId:"",
                msg:""
              },
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
    
  },

  methods: {
            login(){
                var vm = this;
                let name = vm.myInfo.myId;
                // console.log(id);
                axios.post('login',{id:name}).then(
                  e=>{
                    console.log(e)
                    console.log(e.data)
                    vm.loginOK = true;
                    vm.getChatList();
                  }
                )
                //  $.post("http://localhost:4000/login",{id:id},function(e){
                //     console.log(e);
                //  }).then(e=>{
                //     vm.loginOK = true;
                //     vm.getChatList();
                //  })
            },
            getChatList(){
                var vm = this;
                axios.get("chat").then(e=>{
                    console.log(e)
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
                    console.log(vm.friendList);
                    // vm.friendList = vm.friendList.filter(function(element, index, arr){
                    //     return arr.indexOf(element) === index;
                    // });
                })
            },
            goChat(e){
                this.showChatBox = true;
                // this.chatMsg
                console.log(e.target.id);
                this.chatMsg.toId = e.target.id;

            },
            sendMsg(){

            },
            selFriendToChat(id){
                let vm = this;
                vm.friendRecords = vm.recordsData.filter(item=>{
                        if(item.friendId == id ||item.userId == id ){
                            return item;
                        }
                })
                console.log( vm.friendRecords);
            }
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

<!-- <script src="js/jquery-3.5.1.min.js"></script> -->
<!-- <script src="js/chatRoom.js"></script> -->
<!-- <script>
    var app = new Vue({
        el:"#app",
        data:{
            loginOK:false,
            myInfo:{
                myId:"",
            },
            chatMsg:{
                fromId:"",
                toId:"",
                msg:""
            },
            recordsData:{},
            friendList:[],
            friendRecords:[],
            showChatBox:false
        },
        methods: {
            login(){
                var vm = this;
                let id = vm.myInfo.myId;
                // console.log(id);
                 $.post("/login",{id:id},function(e){
                    console.log(e);
                 }).then(e=>{
                    vm.loginOK = true;
                    vm.getChatList();
                 })
            },
            getChatList(){
                var vm = this;
                $.get("/").then(data=>{
                    console.log(data)
                    vm.recordsData = data;
                    data.forEach((item)=>{
                        let friendInfo = { };
                        if(item.userId == vm.myInfo.myId){
                            friendInfo['friendId'] = item.friendId;
                            friendInfo['friendName'] = item.friendId
                        }
                        if( item.friendId == vm.myInfo.myId){
                            friendInfo['friendId'] = item.userId;
                            friendInfo['friendName'] = item.userId;
                        }
                        vm.friendList.push(friendInfo)
                    })
                    const set = new Set();
                    vm.friendList = vm.friendList.filter(item => !set.has(item.friendId) ? set.add(item.friendId) : false);
                    console.log(vm.friendList);
                    // vm.friendList = vm.friendList.filter(function(element, index, arr){
                    //     return arr.indexOf(element) === index;
                    // });
                })
            },
            goChat(e){
                this.showChatBox = true;
                // this.chatMsg
                console.log(e.target.id);
                this.chatMsg.toId = e.target.id;

            },
            sendMsg(){

            },
            selFriendToChat(id){
                let vm = this;
                vm.friendRecords = vm.recordsData.filter(item=>{
                        if(item.friendId == id ||item.userId == id ){
                            return item;
                        }
                })
                console.log( vm.friendRecords);
            }
                // getFriends(){
            //     var vm = this;
            //     console.log(vm.recordsData);
            //     return vm.recordsData.map(function(item,index,arr){
            //     return vm.myInfo.Id.indexOf(item.userId) > -1;

            //     })
            // }
        },
        created() {

        },
        mounted() {
            // this.getChatList()
        },
        computed: {

        },
    })
</script> -->
