<template>
  <div id="socialhall">
      <div class="section1">
          <h1>線上 Jo聊</h1>
          <section class="mySection row no-gutters animation">
              <div class="chatBoard col-8">
                  <div class="topBoard">
                  <!-- 跑馬燈內容 -->
                  <div :key="index"  v-for="(item,index) in connectPeople" class="gogoMsg"><img src="../assets/img/jo_images/jo_flag.svg" alt="">歡迎<span class="chatName">{{item}}</span>加入JO聊天室😆 上線中</div>
                  </div>
                  <!-- 多人聊天大廳 -->
                  <div class="mainBoard">
                      <div :style="item.color" v-for="(item,index) in msgArray" :key="index" class="chatMsg">
                          <p><span class="chatName">{{item.name}}</span>{{item.msg}}</p>
                      </div>
                  </div>
                  <div class="footerBoard">
                      <input @keyup.13="msgBoardTextIn" v-model="sendMsg" id="msgText" type="text" name="chatMsg">
                      <input @click="msgBoardTextIn" id="msgSend" class="jo_btn jo_btn_s jo_btnWater" type="submit" value="送出">
                  </div>
              </div>
              <div class="chatList col-3">
                  <ul>
                      <li  v-for="(item,index) in msgArray" :key="index">
                          <span>{{item.time}}</span><span class="chatName">{{item.name}}</span>
                          <div class="chatText">{{item.msg}}</div>
                      </li>
                  </ul>
              </div>
          </section>
      </div>
      <div class="sectionArea">
        <div class="sectionTitle animateItem">
        <h1>搜尋 Jo友</h1>
        <div class="searchBox">請輸入玩家暱稱或帳號搜尋 <input v-model="serchText" type="search" name="" id="" placeholder="搜尋玩家"> <button @click="searchPeople" class="jo_btn jo_btn_s jo_btnWater"><i class="fa fa-search"></i></button></div>
        </div>
        <section class="mySection row no-gutters animateItem">
            <div class="catoContent">
                <!-- <div v-if="serchPeoples"> -->
                    <div v-for="item in serchPeoples" :key="item.m_ID" class="joManCard">
                        <div class="imgBox">  
                            <img :src ="require(`../../static/img/head/${item.m_profile}`)" alt="">
                        </div>
                        <div class="contentBox">
                            <div class="joManTitle">
                                <span class="joManName">{{item.m_name}}</span>
                                <!-- 星星評價元件 -->
                                <StarRate :m_rate="item.rate"></StarRate>

                                <span>({{item.counts}}人評價)</span>
                            </div>
                            <div class="contentText">
                                {{item.introduce}}
                            </div>
                            <div class="btnBox">
                                <button class="jo_btn jo_btn_s jo_btnWater">查看</button>
                            </div>
                        </div>
                    </div>
                <!-- </div> -->
            </div>
        </section>
      </div>

      <div class="sectionArea">
          <div class="animateItem">
              <h1>最佳 Jo主</h1>
              <h2>評價最高</h2>
          </div>
          <section class="mySection animateItem">
              <div class="leaderboard">
                  <div class="row no-gutters">
                      <div class="number1 col-6">
                          <div class="num1"><img src="../../static/img/socialhall/rank1.png" alt=""></div>
                          <img class="head" :src="require(`../../static/img/head/${masterHost[0].m_profile}`)" alt="">
                          <div class="num1Name">{{masterHost[0].m_name}}</div>
                           <StarRate :m_rate="masterHost[0].rate"></StarRate>
                          <div class="num1text">
                              {{masterHost[0].introduce}}
                          </div>
                          <div>
                            <!-- <router-link :to="{ name: 'FAQ', params: { mID:masterHost[0].m_ID } }"> -->
                                <button class="jo_btn jo_btn_s jo_btnWater">查看</button>
                            <!-- </router-link> -->
                          </div>
                      </div>
                      <div class="numberelse col-6">
                          <select @change="SearchMasterHost(selHostCategory)" v-model="selHostCategory" id="">
                              <option selected value="all">全部</option>
                              <option v-for="item in category" :key="item.c_ID" :value="item.c_ID">{{item.c_category}}</option>
                           
                          </select>
                          <div class="numbercard" v-for="(item,index) in masterHostTo4" :key="index">
                              <div class="num"><img :src="require(`../../static/img/socialhall/rank${index+2}.png`)" ></div>
                              <div><img :src="require(`../../static/img/head/${item.m_profile}`)" alt=""></div>
                              <div class="num_content">
                                  <div>
                                      <h4>{{item.m_name}}</h4>
                                        <StarRate :m_rate="item.rate"></StarRate>
                                  </div>
                                  <div class="numSum">
                                      <div>{{item.introduce}}</div>
                                      <div>
                                          <!-- <router-link :to="{ name: 'FAQ', params: { mID:masterHost[0].m_ID } }"> -->
                                              <button class="jo_btn jo_btn_s jo_btnWater">查看</button>
                                          <!-- </router-link> -->
                                      </div>
                                  </div>
                              </div>
                          </div>
                              </div>
                          </div>
                      </div>
          </section>
      </div>
      <div class="sectionArea animateItem">
          <div class="animateItem">
              <h1>超級 Jo粉</h1>
              <h2>參與經驗值最高</h2>
          </div>
          <section class="mySection animateItem">
                      <div class="leaderboard">
                          <div class="row no-gutters">
                              <div class="number1 col-6">
                                  <div class="num1"><img src="../../static/img/socialhall/rank1.png" alt=""></div>
                                  <img class="head" :src="require(`../../static/img/head/${masterPlayer[0].m_profile}`)" alt="">
                                  <div class="num1Name">{{masterPlayer[0].m_name}}</div>
                                  <div class="expPoint">
                                      <span>{{selPlayerCategory}}</span>經驗值<span>{{masterPlayer[0].points}}</span>exp
                                  </div>

                                  <div class="num1text">
                                      {{masterPlayer[0].introduce}}
                                  </div>
                                  <!-- <div>
                                      <span>{{masterPlayer[0].follow_people_num}}人追蹤中</span>

                                  </div> -->
                                  <button class="jo_btn jo_btn_s jo_btnWater">查看</button>
                              </div>
                              <div class="numberelse col-6">
                                  <select @change="searchMasterPlayer(selPlayerCategory)" v-model="selPlayerCategory" id="">
                                    <option selected value="all">全部</option>
                                    <option v-for="item in category" :key="item.c_ID" :value="item.c_ID">{{item.c_category}}</option>
                                </select>
                                  <div v-for="(item,index) in playerTo4" :key="index" class="numbercard">
                                      <div class="num"><img :src="require(`../../static/img/socialhall/rank${index+2}.png`)" alt=""></div>
                                      <div><img :src="require(`../../static/img/head/${item.m_profile}`)" alt=""></div>
                                      <div class="num_content">
                                          <div>
                                              <h4>{{item.m_name}}</h4>
                                              <span  class="numbercardExp">{{item.points}}exp</span>
                                          </div>
                                          <div class="numSum">
                                              <div>{{item.introduce}}</div>
                                              <div><router-link :to="{ name: 'FAQ', params: { mID:masterHost[0].m_ID } }"><button class="jo_btn jo_btn_s jo_btnWater">查看</button></router-link></div>
                                          </div>
                                      </div>
                                  </div>                                
                              </div>
                          </div>
                      </div>
          </section>
      </div>
  </div>

</template>
<script>
import $ from "jquery";
import axios from "axios";
import StarRate from "./StarRate";

export default{
        name:"socialhall",
        components:{
          StarRate,
        },
        data() {
          return {
                sendMsg:"",
                selHostCategory:"all",
                selPlayerCategory:"all",
                category:[],
                msgArray:[],
                connectPeople:[],
                serchText:"",
                serchPeoples:[],
                masterHost:[{
                    m_ID:"",
                    m_name:"",
                    m_profile:"",
                    rate:0,
                    introduce:""
                }],
                masterPlayer:[{
                    m_ID:"",
                    m_name:"",
                    m_profile:"",
                    points:0,
                    introduce:""   
                }],
                rankPic:[],
                isLogin:false
          }
        },
        sockets:{
          connect:function(){
            console.log("connect to socialhall");
          },
          online:function(amount){
              console.log(amount);
          },
          onlinePeople:function(people){
            this.topMsgBoard(people);
          },
          chatRecord:function(msgs){
            var vm = this;
             $.each(msgs,function(key,item){
                  vm.showMsgOnBoard(item);
              })
          },
          msg:function(msg){
              this.showMsgOnBoard(msg);
          },
        },
        methods: {
                inToMsgBoard(){
                  console.log("inToMsgBoard");
                  let room = "socialhall";
                  if(room){
                    // console.log(this.$socket.id);
                    // socket.emit("greet");
                    this.$socket.emit("group",room);
                  }
                },
                SearchMasterHost(selCategory){
                  var vm = this;
                  axios.get(`/socialhall/searchHost/${selCategory}`)
                  .then(e=>{
                      console.log(e);
                      vm.masterHost = e.data;
                  })
                },
                searchMasterPlayer(selCategory){
                  var vm = this;
                   axios.get(`/socialhall/searchFans/${selCategory}`)
                  .then(e=>{
                    //   console.log(e);
                    vm.masterPlayer = e.data;

                  })
                },
                searchPeople(){
                    console.log(this.serchText);
                    axios.get(`/socialhall/${this.serchText}`)
                    .then(e=>{
                        console.log(e);
                        console.log(e.data);
                        this.serchPeoples = e.data ;

                    })
                },
                topMsgBoard(people){
                    this.connectPeople = people;
                },
                showMsgOnBoard(msg){
                    // console.log(msg);
                    msg["color"] = {color:`rgb(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)})`,
                                    top:`${Math.floor(Math.random()*255)}px`}
                    this.msgArray.push(msg);
                    console.log(this.msgArray);

                },
                msgBoardTextIn(e){
                    let msgIn = this.sendMsg ;
                    let msgData = {};
                    let ok = true;
                    if(!msgIn || msgIn ==""){
                        ok = false;
                    }
                    if(ok){
                        msgData['msg'] = msgIn;
                        // console.log(msgData);
                        // console.log(this.$socket);
                        this.$socket.emit("send", msgData);
                        this.sendMsg = "";
                    }
                },
                revealOnScroll(e) {
                    var scrolled = $(window).scrollTop();
                    var w_height;
                    var offsetTop;
                    // viewport，頁面可視範圍
                    $(".animateItem").each(function() {
                        var current = $(this);
                        w_height = $(window).outerHeight(), //視窗高度
                        offsetTop = current.offset().top;   //元素離頂部的高
                        if (scrolled + w_height - 50 > offsetTop) {
                        current.addClass("animation");
                        }
                        else{
                        current.removeClass("animation");
                        }
                    });
                },
            },
            mounted() {
                var vm = this;
                $(window).on("scroll", vm.revealOnScroll);
                //留言板彈幕動畫結束即刪除該元素
                $(document).on("webkitAnimationEnd",".chatMsg",function(){
                $(this).remove();
                })

                window.addEventListener("beforeunload",function(){
                        vm.$socket.emit("leaveGroup");
                })
              
            },
            updated() {
                // 維持對話視窗置底
                $(".chatList").scrollTop($(".chatList")[0].scrollHeight);
            },
            computed: {
                masterHostTo4:function(){
                    var data =  this.masterHost.splice(1);
                    return data;
                },
                playerTo4:function(){
                     var data = this.masterPlayer.splice(1);
                    return data;
                }
            },
            // watch: {
            //     isLogin:function(){
            //         this.inToMsgBoard();
            //     }
            // },
            created() {
            // this.$toasted.show('hello billo😉');
               this.$bus.$on('islogin', (data) => {
                   console.log(data);
                   this.inToMsgBoard();
                });
              axios.get('modules/category').then(e=>{
                //   console.log(e);
                    this.category = e.data ;
                    // vm.getChatList();

              })
               this.SearchMasterHost("all");
               this.searchMasterPlayer("all");

            },
            beforeDestroy() {
               this.$bus.$off('islogin'); 
            },
      }

    </script>
<style>
@import '../assets/css/socialhall.css';



</style>
