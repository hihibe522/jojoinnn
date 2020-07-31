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
        <div class="searchBox">請輸入玩家暱稱或帳號搜尋 <input type="search" name="" id="" placeholder="搜尋玩家"> <button @click="searchPeople" class="jo_btn jo_btn_s jo_btnWater"><i class="fa fa-search"></i></button></div>
        </div>
        <section class="mySection row no-gutters animateItem">
            <div class="catoContent">
                <!-- <div v-if="serchPeoples"> -->
                    <div v-for="item in serchPeoples" :key="item.m_ID" class="joManCard">
                        <div class="imgBox">
                        <!-- require('../assets/'+pic) -->
                            <img :src ="item.m_pic" alt="">
                        </div>
                        <div class="contentBox">
                            <div class="joManTitle">
                                <span class="joManName">{{item.m_name}}</span>
                                <!-- 星星評價元件 -->
                                <StarRate :m_rate="item.m_rate"></StarRate>

                                <span>({{item.rate_count}}人評價)</span>
                            </div>
                            <div class="contentText">
                                {{item.introduce}}
                            </div>
                            <div class="btnBox">
                                <button class="jo_btn jo_btn_s jo_btnWater">查看</button>
                                <button class="jo_btn jo_btn_s jo_btnOrange">關注</button>
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
                          <img class="head" :src="masterHost[0].m_profile" alt="">
                          <div class="num1Name">{{masterHost[0].m_name}}</div>
                           <StarRate :m_rate="masterHost[0].rate_star"></StarRate>
                          <div class="num1text">
                              {{masterHost[0].introduce}}
                          </div>
                          <div>
                              <span>{{masterHost[0].follow_people_num}}人追蹤中</span>
                          </div>
                          <router-link :to="{ name: 'FAQ', params: { mID:masterHost[0].m_ID } }"><button class="jo_btn jo_btn_s jo_btnWater">查看</button></router-link>
                      </div>
                      <div class="numberelse col-6">
                          <select @change="SearchMasterHost(selHostCategory)" v-model="selHostCategory" id="">
                              <option selected value="all">全部</option>
                              <option v-for="item in category" :key="item.c_ID" :value="item.c_ID">{{item.c_category}}</option>
                           
                          </select>
                          <div class="numbercard" v-for="(item,index) in masterHostTo4" :key="index">
                              <div class="num"><img :src="require(`../../static/img/socialhall/rank${index+2}.png`)" ></div>
                              <div><img :src="item.m_profile" alt=""></div>
                              <div>
                                  <div>
                                      <h4>{{item.m_name}}</h4>
                                        <StarRate :m_rate="item.rate_star"></StarRate>
                                  </div>
                                  <div class="numSum">
                                      {{item.introduce}}
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
                                  <img class="head" :src="masterPlayer[0].m_profile" alt="">
                                  <div class="num1Name">{{masterPlayer[0].m_name}}</div>
                                  <div class="expPoint">
                                      <span>{{selPlayerCategory}}</span>經驗值<span>{{masterPlayer[0].points}}</span>pt
                                  </div>

                                  <div class="num1text">
                                      {{masterPlayer[0].introduce}}
                                  </div>
                                  <div>
                                      <span>{{masterPlayer[0].follow_people_num}}人追蹤中</span>

                                  </div>
                                  <button class="jo_btn jo_btn_s jo_btnWater">查看</button>
                              </div>
                              <div class="numberelse col-6">
                                  <select @change="searchMasterPlayer(selPlayerCategory)" v-model="selPlayerCategory" id="">
                                    <option selected value="all">全部</option>
                                    <option v-for="item in category" :key="item.c_ID" :value="item.c_ID">{{item.c_category}}</option>
                                </select>
                                  <div v-for="(item,index) in playerTo4" :key="index" class="numbercard">
                                      <div class="num"><img :src="require(`../../static/img/socialhall/rank${index+2}.png`)" alt=""></div>
                                      <div><img :src="item.m_profile" alt=""></div>
                                      <div>
                                          <div>
                                              <h4>{{item.m_name}}</h4>
                                              <span  class="numbercardExp">{{item.points}}pt</span>
                                          </div>
                                          <div class="numSum">
                                              {{item.introduce}}
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

    <!-- <script src="/js/socialhall.js"></script> -->

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
                masterHost:[],
                masterPlayer:[],
                rankPic:[]
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
                //   console.log(vm.selHostCategory);
                 
                  let ajax_data = [
                      {m_ID: 111,
                       m_name:"椰子",
                       m_profile:"../static/img/socialhall/1.png",
                       follow_people_num:1000,
                       rate_star:5,
                       introduce:"疑 是不是自己開發了業配新型態 🤔漂白水廠商快來"
                      },
                      {m_ID: 12,
                       m_name:"馬克",
                       m_profile:"../static/img/socialhall/2.png",
                       follow_people_num:200,
                       rate_star:4.5,
                       introduce:"【日本氣球藝術家的創意設計合輯】登峰造極的氣球~"
                      },
                      {m_ID: 18,
                       m_name:"鬥士",
                       m_profile:"../static/img/socialhall/2.png",
                       follow_people_num:245,
                       rate_star:4,
                       introduce:"看來勢必又會引領一波風潮了～～🔥搭編回家也來練練好了哈哈哈🤣🤣🤣"
                      },
                      {m_ID: 45,
                       m_name:"珊瑚橘",
                       m_profile:"../static/img/socialhall/2.png",
                       follow_people_num:555,
                       rate_star:3.8,
                       introduce:"喜歡暖色調髮色可以嘗試看看橘色這種入門款色，保證讓你一開始就愛不釋手。"
                      },
                      {m_ID: 111,
                       m_name:"巴哈姆特",
                       m_profile:"../static/img/socialhall/2.png",
                       follow_people_num:1000,
                       rate_star:3,
                       introduce:"巴哈姆特電玩瘋直播 PS4 人氣動漫畫改編角色扮演遊戲《FAIRY TAIL 魔導少年》"
                      }
                  ]
                  vm.masterHost = ajax_data;


                },
                searchMasterPlayer(selCategory){
                  var vm = this;
                 
                  let ajax_data = [
                      {m_ID: 111,
                       m_name:"椰子",
                       m_profile:"/static/img/socialhall/1.png",
                       follow_people_num:1000,
                       points:50000,
                       introduce:"疑 是不是自己開發了業配新型態 🤔漂白水廠商快來"
                      },
                      {m_ID: 12,
                       m_name:"馬克",
                       m_profile:"../static/img/socialhall/3.jpg",
                       follow_people_num:200,
                       points:12546,
                       introduce:"【日本氣球藝術家的創意設計合輯】登峰造極的氣球~"
                      },
                      {m_ID: 18,
                       m_name:"鬥士",
                       m_profile:"../static/img/socialhall/3.jpg",
                       follow_people_num:245,
                       points:7855,
                       introduce:"看來勢必又會引領一波風潮了～～🔥搭編回家也來練練好了哈哈哈🤣🤣🤣"
                      },
                      {m_ID: 45,
                       m_name:"珊瑚橘",
                       m_profile:"../static/img/socialhall/3.jpg",
                       follow_people_num:555,
                       points:5756,
                       introduce:"喜歡暖色調髮色可以嘗試看看橘色這種入門款色，保證讓你一開始就愛不釋手。"
                      },
                      {m_ID: 111,
                       m_name:"巴哈姆特",
                       m_profile:"../static/img/socialhall/3.jpg",
                       follow_people_num:1000,
                       points:2136,
                       introduce:"巴哈姆特電玩瘋直播 PS4 人氣動漫畫改編角色扮演遊戲《FAIRY TAIL 魔導少年》"
                      }
                    ]
                  vm.masterPlayer = ajax_data;
                },
                searchPeople(){
                    console.log(this.serchText);
                    var data = [{m_ID:1,
                                m_name:"鞋貓K",
                                m_account:"abc123",
                                m_pic:require('@/assets/img/socialhall/8.jpg'),
                                introduce:"大家好我是貓，很高興跟大家見面～買烘焙原材料、器具模具? 想學習 蛋糕麵包 製作知識?",
                                m_rate:4.5,
                                rate_count:20},
                                {m_ID:2,
                                m_name:"蛋頭",
                                m_account:"5555",
                                m_pic:require('@/assets/img/socialhall/3.jpg'),
                                introduce:"有時候不是你比例問題～😉靠對的穿搭也可以幫你修飾身材！😎",
                                m_rate:3.2,
                                rate_count:10}
                                ]

                    this.serchPeoples = data ;
                    // console.log()
                },
                topMsgBoard(people){
                    this.connectPeople = people;
                },
                showMsgOnBoard(msg){
                    console.log(msg);
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
            created() {
              // let.vm = this;
              console.log( this.$socket);
              this.inToMsgBoard();

              axios.get('modules/category').then(e=>{
                //   console.log(e);
                    this.category = e.data ;
                    // vm.getChatList();

              })
               this.SearchMasterHost();
               this.searchMasterPlayer();

            }
      }

    </script>
<style>
@import '../assets/css/socialhall.css';



</style>
