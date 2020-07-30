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
                          <div class="num1"><img src="../assets/img/socialhall/rank1.png" alt=""></div>
                          <img class="head" src="../assets/img/socialhall/1.png" alt="">
                          <div class="num1Name">椰子</div>
                          <ul>
                              <li><i class="fa fa-star"></i></li>
                              <li><i class="fa fa-star"></i></li>
                              <li><i class="fa fa-star"></i></li>
                              <li><i class="fa fa-star"></i></li>
                              <li><i class="fa fa-star"></i></li>
                              <li><span>4.9分</span></li>
                          </ul>

                          <div class="num1text">
                              遠的詩又是一支畫風突變的MV😆😆
                              第一次聽的時候覺得是一首很奇特的歌~也聽不懂一開始的rap是什麼
                          </div>
                          <div>
                              <span>1000人追蹤中</span>
                          </div>
                          <button class="jo_btn jo_btn_s jo_btnWater">查看</button>
                      </div>
                      <div class="numberelse col-6">
                          <select @change="SearchMasterHost" v-model="HostSelected" name="MasterHost" id="">
                              <option selected value="全部">全部</option>
                              <option value="益智類">益智類</option>
                              <option value="戶外活動">戶外活動</option>
                              <option value="宅宅">宅宅</option>
                              <option value="學術研究">學術研究</option>
                          </select>
                          <div class="numbercard">
                              <div class="num"><img src="../assets/img/socialhall/rank2.png" alt=""></div>
                              <div><img src="../assets/img/socialhall/4.jpg" alt=""></div>
                              <div>
                                  <div>
                                      <h4>馬克</h4>
                                      <ul>
                                          <li><i class="fa fa-star"></i></li>
                                          <li><i class="fa fa-star"></i></li>
                                          <li><i class="fa fa-star"></i></li>
                                          <li><i class="fa fa-star"></i></li>
                                          <li><i class="fa fa-star"></i></li>
                                      </ul>
                                  </div>
                                  <div class="numSum">
                                      聽說在實驗室或在工作的你...
                                      天天都到實驗室報到...都沒有在放暑假的😢
                                  </div>
                              </div>
                          </div>
                          <div class="numbercard">
                              <div class="num"><img src="../assets/img/socialhall/rank3.png" alt=""></div>
                              <div><img src="../assets/img/socialhall/4.jpg" alt=""></div>
                              <div>
                                  <div>
                                      <h4>馬克</h4>
                                      <ul>
                                          <li><i class="fa fa-star"></i></li>
                                          <li><i class="fa fa-star"></i></li>
                                                  <li><i class="fa fa-star"></i></li>
                                                  <li><i class="fa fa-star"></i></li>
                                                  <li><i class="fa fa-star"></i></li>
                                              </ul>
                                          </div>
                                          <div class="numSum">
                                              聽說在實驗室或在工作的你...
                                              天天都到實驗室報到...都沒有在放暑假的😢
                                          </div>
                                      </div>
                                  </div>
                                  <div class="numbercard">
                                      <div class="num"><img src="../assets/img/socialhall/rank4.png" alt=""></div>
                                      <div><img src="../assets/img/socialhall/4.jpg" alt=""></div>
                                      <div>
                                          <div>
                                              <h4>馬克</h4>
                                              <ul>
                                                  <li><i class="fa fa-star"></i></li>
                                                  <li><i class="fa fa-star"></i></li>
                                                  <li><i class="fa fa-star"></i></li>
                                                  <li><i class="fa fa-star"></i></li>
                                                  <li><i class="fa fa-star"></i></li>
                                              </ul>
                                          </div>
                                          <div class="numSum">
                                              聽說在實驗室或在工作的你...
                                              天天都到實驗室報到...都沒有在放暑假的😢
                                          </div>
                                      </div>
                                  </div>
                                  <div class="numbercard">
                                      <div class="num"><img src="../assets/img/socialhall/rank5.png" alt=""></div>
                                      <div><img src="../assets/img/socialhall/4.jpg" alt=""></div>
                                      <div>
                                          <div>
                                              <h4>馬克</h4>
                                              <ul>
                                                  <li><i class="fa fa-star"></i></li>
                                                  <li><i class="fa fa-star"></i></li>
                                                  <li><i class="fa fa-star"></i></li>
                                                  <li><i class="fa fa-star"></i></li>
                                                  <li><i class="fa fa-star"></i></li>
                                              </ul>
                                          </div>
                                          <div class="numSum">
                                              聽說在實驗室或在工作的你...
                                              天天都到實驗室報到...都沒有在放暑假的😢
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
                                  <div class="num1"><img src="../assets/img/socialhall/rank1.png" alt=""></div>
                                  <img class="head" src="../assets/img/socialhall/1.png" alt="">
                                  <div class="num1Name">椰子</div>
                                  <div class="expPoint">
                                      <span>綜合</span>經驗值<span>50000</span>pt
                                  </div>

                                  <div class="num1text">
                                      遠的詩又是一支畫風突變的MV😆😆
                                      第一次聽的時候覺得是一首很奇特的歌~也聽不懂一開始的rap是什麼
                                  </div>
                                  <div>
                                      <span>1000人追蹤中</span>

                                  </div>
                                  <button class="jo_btn jo_btn_s jo_btnWater">查看</button>
                              </div>
                              <div class="numberelse col-6">
                                  <select @change="searchMasterPlayer" name="" id="">
                                      <option value="全部">全部</option>
                                      <option value="益智類">益智類</option>
                                      <option value="戶外活動">戶外活動</option>
                                      <option value="宅宅">宅宅</option>
                                      <option value="學術研究">學術研究</option>
                                  </select>
                                  <div class="numbercard">
                                      <div class="num"><img src="../assets/img/socialhall/rank2.png" alt=""></div>
                                      <div><img src="../assets/img/socialhall/3.jpg" alt=""></div>
                                      <div>
                                          <div>
                                              <h4>米腦鼠</h4>
                                              <span  class="numbercardExp">9527pt</span>
                                          </div>
                                          <div class="numSum">
                                              如果想念依依不捨 無時無刻等待皆可，從一到五的摯愛細數每個好與壞，一 一丟掉 再 一 一重來😢
                                          </div>
                                      </div>
                                  </div>
                                  <div class="numbercard">
                                      <div class="num"><img src="../assets/img/socialhall/rank3.png" alt=""></div>
                                      <div><img src="../assets/img/socialhall/3.jpg" alt=""></div>
                                      <div>
                                          <div>
                                              <h4>米腦鼠</h4>
                                              <span  class="numbercardExp">9527pt</span>
                                          </div>
                                          <div class="numSum">
                                              如果想念依依不捨 無時無刻等待皆可，從一到五的摯愛細數每個好與壞，一 一丟掉 再 一 一重來😢
                                          </div>
                                      </div>
                                  </div>
                                  <div class="numbercard">
                                      <div class="num"><img src="../assets/img/socialhall/rank4.png" alt=""></div>
                                      <div><img src="../assets/img/socialhall/3.jpg" alt=""></div>
                                      <div>
                                          <div>
                                              <h4>米腦鼠</h4>
                                              <span  class="numbercardExp">9527pt</span>
                                          </div>
                                          <div class="numSum">
                                              如果想念依依不捨 無時無刻等待皆可，從一到五的摯愛細數每個好與壞，一 一丟掉 再 一 一重來😢
                                          </div>
                                      </div>
                                  </div>
                                  <div class="numbercard">
                                      <div class="num"><img src="../assets/img/socialhall/rank5.png" alt=""></div>
                                      <div><img src="../assets/img/socialhall/3.jpg" alt=""></div>
                                      <div>
                                          <div>
                                              <h4>米腦鼠</h4>
                                              <span  class="numbercardExp">9527pt</span>
                                          </div>
                                          <div class="numSum">
                                              如果想念依依不捨 無時無刻等待皆可，從一到五的摯愛細數每個好與壞，一 一丟掉 再 一 一重來😢
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
                HostSelected:"",
                category:[],
                msgArray:[],
                connectPeople:[],
                serchText:"",
                serchPeoples:[],
                masterHost:[],
                masterPlayer:[]
          }
        },
        sockets:{
          connect:function(){
            // console.log(this);
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
                    console.log(this.$socket.id);
                    // socket.emit("greet");
                    this.$socket.emit("group",room);
                  }
                },
                SearchMasterHost(){
                  var vm = this;
                  console.log("445");
                  console.log(vm.HostSelected);

                },
                searchMasterPlayer(){

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
            watch: {
              //  sockets(){
              //   console.log("sockets",this.sockets)
              // }
            },
            updated() {
                // 維持對話視窗置底
                $(".chatList").scrollTop($(".chatList")[0].scrollHeight);

            },
            computed: {
            },
            created() {
              // let.vm = this;
              axios.get('modules/category').then(e=>{
                  console.log(e);
                    this.category = e.data ;
                    // vm.getChatList();

              })
              console.log( this.$socket);
              this.inToMsgBoard();

            }
      }

    </script>
<style>
@import '../assets/css/socialhall.css';



</style>
