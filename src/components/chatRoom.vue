<template>
  <div id="chatRoomApp">
    <div id="loginInput">
        <!-- <input v-model="myInfo.myId" type="text" name="" id=""> -->
    <favicon :liked="like.likeit" :aid="like.aid" ></favicon>
        <!-- <button @click="login" class="btn btn-primary">登入</button>
        <button @click="logout" class="btn btn-primary">登出</button> -->
    </div>
    <div v-if="loginOK" @click="showChatBox = true" class="chat_icon">
        <img class="ld ld-bounceAlt" src="../assets/img/jo_images/jo_i_chat.svg" alt="">
    </div>
    <div class="chatRoom" :class="{'chat_avtive': showChatBox}">
        <div class="chatTitle">
            <h4>{{chatMsg.toName}}</h4>
            <button @click="showChatBox = !showChatBox" class="modal_close chat_close" title="Close"><span></span></button>
        </div>
        <div class="chatBody">
          <div class="chatLeftbox">
                  <div class="msgBox">
                      <div v-for="item in friendRecords" :key="item.chat" :class="['msgList',item.userId == myInfo.myId ? 'myMsg':'otherMsg']">
                        {{item.msg}}
                      </div>
                      <section v-if="chatMsg.toName">
                        <div v-for="item in onlineChatMsgs[chatMsg.toId]" :key="item.num" :class="['msgList',item.id == myInfo.myId ? 'myMsg':'otherMsg']">
                            {{item.msg}}
                        </div>
                      </section>
                  </div>
                  <div class="inputMsg">
                      <input v-model="chatMsg.msg" @keyup.13="sendMsg" type="text" placeholder="請輸入訊息">
                  </div>
          </div>
          <div class="chatRightbox">
                <ul>
                    <li @click="selFriendToChat(item.m_ID,item.m_name)" v-for="item in friendList" :key="item.m_ID">
                        <img v-if="item.m_ID" :src="require(`../../static/img/head/${item.m_profile}`)" alt="">
                        <h5 :id="item.m_ID">{{item.m_name}}</h5>
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
import favicon from "./Favicon";

export default{
  name:'chatRoomApp',
  components:{
      favicon
  },
  data() {
    return {
      localStorage:"",
      loginOK:false,
      myInfo:{
                myId:"",
                myName:""
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
      showChatBox:false,
      like:{
          likeit:0,
          aid:""
      }
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
            this.chatMsg.toId = data.id;
            this.chatOnBox(data);
        }
    
  },

  methods: {
            chatOnBox(data){
                var vm = this ;
                // 對話列表統整
                let has = vm.onlineChatMsgs.hasOwnProperty(vm.chatMsg.toId);
                if(!has){
                     vm.$set(vm.onlineChatMsgs,vm.chatMsg.toId,[])
                }
                console.log(data);
                console.log(vm.onlineChatMsgs)
                console.log(vm.onlineChatMsgs[vm.chatMsg.toId])
                // vm.onlineChatMsgs
                
                vm.onlineChatMsgs[vm.chatMsg.toId].push(data);
                console.log( vm.onlineChatMsgs[vm.chatMsg.toId]);

            },  
            checklogin(a){
                var vm = this;
                console.log(a);
                vm.myInfo.myId = a.m_ID;
                vm.myInfo.myName = a.m_name;
                vm.loginOK = true;
                vm.getChatList();
                vm.selfInfo();
                // vm.loginOK = true;
                // vm.getChatList();
                // vm.selfInfo();
                // vm.$bus.$emit('islogin',myInfo);
                // axios.post('login',{id:name}).then(
                //   e=>{
                //     // console.log(e)
                //     // console.log(e.data);
                //     vm.loginOK = true;
                //     vm.getChatList();
                //     vm.selfInfo();
                //     vm.$bus.$emit('islogin',e.data);
                //   }
                // )
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
                 this.loginOK = false;
                 this.showChatBox = false;
            },
            getChatList(){
                var vm = this;
                axios.get(`chat/${vm.myInfo.myId}`)
                .then(e=>{
                    // console.log(e.data);
                    vm.recordsData = e.data;
                    e.data.forEach((item)=>{
                        let friendInfo = { };
                        if(item.userId == vm.myInfo.myId){
                            friendInfo['friendId'] = item.friendId;
                        }
                        if( item.friendId == vm.myInfo.myId){
                            friendInfo['friendId'] = item.userId;
                        }
                        vm.friendList.push(friendInfo);
                    })
                    const set = new Set();
                    vm.friendList = vm.friendList.filter(item => !set.has(item.friendId) ? set.add(item.friendId) : false);
                    // console.log(vm.friendList);
                    // vm.friendList = vm.friendList.filter(function(element, index, arr){
                    //     return arr.indexOf(element) === index;
                    // });
                    console.log(vm.friendList)
                })
                .then(()=>{
                    let data = vm.friendList.map(item=>{
                        return item.friendId
                    })
                    console.log(data);
                    axios.post("chat/friendinfo",{info:data})
                    .then(e=>{
                        console.log(e)
                        vm.friendList = [... e.data];

                    })
                })
            },
            goChatBox(e){
            this.showChatBox = true;
             console.log(e)
             console.log(e.a_host)
             console.log(e.m_name)
                this.chatMsg.toId = e.a_host;
                this.chatMsg.toName = e.m_name;
                console.log(this.chatMsg.toName)
                let friend = e;
                // 判斷對象是否已存在對話列表
                let isFriend = this.friendList.find(ele=>{
                    return ele.m_ID == this.chatMsg.toId;
                })
                if(!isFriend){
                    // axios.get('')
                    this.friendList.push(friend);
                }
                else{
                    this.selFriendToChat(this.chatMsg.toId,this.chatMsg.toName);
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
            selFriendToChat(id,name){
                let vm = this;
                vm.friendRecords = vm.recordsData.filter(item=>{
                        if(item.friendId == id ||item.userId == id ){
                            return item;
                        }
                })
                vm.chatMsg.toId = id;
                vm.chatMsg.toName = name;

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
        },
        mounted() {
            // this.checklogin();
        },
        created() {
            var vm = this;
            vm.localStorage = JSON.parse( localStorage.getItem('myinfo'));
            // console.log( vm.localStorage);
            if(vm.localStorage){
                vm.checklogin(vm.localStorage);

            }
            this.$bus.$on('islogin', (myinfo) => {
                console.log(myinfo)
                vm.checklogin(myinfo);
            });
            
            this.$bus.$on('gogochat', (userinfo) => {
                 console.log(userinfo);
                 console.log(vm);
                 vm.goChatBox(userinfo);
                // vm.updateMessage(message, status);
            });



          setTimeout(function(){
              vm.like.likeit = 1;
              vm.like.aid = 50;


          },3000)  
        },
        beforeDestroy() {
            this.$bus.$off("islogin");
            this.$bus.$off("gogochat");
        },
        
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
