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
                      <div style="margin-top: 3.5rem;" v-if="(me.m_name == '')">
                          <img :src ="require(`../assets/img/jo_images/jo_spaceShip.svg`)" alt="">
                          <p class="loginTips">快登入加入聊天😉</p>
                      </div>
                      <div :style="item.color" v-for="(item,index) in msgArray" :key="index" class="chatMsg">
                          <p><span class="chatName">{{item.name}}</span>{{item.msg}}</p>
                      </div>
                  </div>
                  <div class="footerBoard">
                      <input @keyup.13="msgBoardTextIn" v-model="sendMsg" id="msgText" class="jo_hover" type="text" placeholder="輸入聊天訊息">
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
                <div style="margin-top: 5rem;" v-if="serchPeoples ==''">
                    <p style="font-size: 1.5rem;">尚未有符合的資料唷🧐</p>
                    <img src="@/assets/img/jo_images/jo_notFind.svg" alt="">
                </div>
                <!-- <div v-if="serchPeoples"> -->
                    <div  v-for="item in serchPeoples" :key="item.m_ID" class="joManCard">
                        <div class="imgBox">  
                            <img v-if="item.m_name" :src ="require(`../../static/img/head/${item.m_profile}`)" alt="">
                        </div>
                        <div class="contentBox">
                            <div class="joManTitle">
                                <span v-if="item.m_name" class="joManName">{{item.m_name}}</span>
                                <!-- 星星評價元件 -->
                                <div>
                                    <StarRate :m_rate="item.rate"></StarRate>
                                    <span>({{item.counts}}人評價)</span>
                                </div>
                            </div>
                            <div class="contentText">
                                {{item.introduce}}
                            </div>
                            <div  v-if="me.m_ID != item.m_ID" class="btnBox">
                               <router-link :to="{ name:'userhosting',query:{m_ID:item.m_ID }}" >
                                <button class="jo_btn jo_btn_s jo_btnWater">
                                    查看
                                </button>
                                </router-link>                  
                            </div>
                            <div v-else class="btnBox">
                               <router-link to="/member/memberJoing">
                                <button class="jo_btn jo_btn_s jo_btnWater">
                                    查看
                                </button>
                                </router-link>                  
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
                      <div class="number1 col-6" v-if="masterHost[0].m_profile">
                          <div class="num1"><img src="../../static/img/socialhall/rank1.png" alt=""></div>
                          <img class="head" :src="require(`../../static/img/head/${masterHost[0].m_profile}`)" alt="">
                          <div v-if="masterHost[0].m_name" class="num1Name">{{masterHost[0].m_name}}</div>
                           <StarRate :m_rate="masterHost[0].rate"></StarRate>
                          <div class="num1text">
                              {{masterHost[0].introduce}}
                          </div>
                          <div>
                            <router-link :to="{ name:'userhosting',query:{m_ID:masterHost[0].m_ID}}">
                                <button v-if="me.m_ID != masterHost[0].m_ID" class="jo_btn jo_btn_s jo_btnWater">查看</button>
                            </router-link>
                          </div>
                      </div>
                      <div class="numberelse col-6">
                          <select @change="SearchMasterHost(selHostCategory)" v-model="selHostCategory" id="">
                              <option selected value="all">全部</option>
                              <option v-for="item in category" :key="item.c_ID" :value="item.c_ID">{{item.c_category}}</option>
                           
                          </select>
                          <div class="numbercard" v-for="(item,index) in masterHostTo4" :key="index">
                              <div class="num"><img :src="require(`../../static/img/socialhall/rank${index+2}.png`)" ></div>
                              <div><img class="numberelseHead" :src="require(`../../static/img/head/${item.m_profile}`)" alt=""></div>
                              <div class="num_content">
                                  <div>
                                      <h4 v-if="item.m_name">{{item.m_name}}</h4>
                                        <StarRate :m_rate="item.rate"></StarRate>
                                  </div>
                                  <div class="numSum">
                                      <div>{{item.introduce}}</div>
                                      <div>
                                          <router-link :to="{ name:'userhosting',query:{m_ID:item.m_ID}}">
                                              <button v-if="me.m_ID != item.m_ID" class="jo_btn jo_btn_s jo_btnWater">查看</button>
                                          </router-link>
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
                                  <img class="head" v-if="masterPlayer[0].m_profile" :src="require(`../../static/img/head/${masterPlayer[0].m_profile}`)" alt="">
                                  <div class="num1Name" v-if="masterPlayer[0].m_name">{{masterPlayer[0].m_name}}</div>
                                  <div class="expPoint">
                                      <span>{{categoryTrans}}</span>經驗值<span>{{masterPlayer[0].points}}</span>exp
                                  </div>

                                  <div class="num1text">
                                      {{masterPlayer[0].introduce}}
                                  </div>
                                    <router-link :to="{ name:'userhosting',query:{m_ID:masterPlayer[0].m_ID}}">
                                            <button v-if="me.m_ID != masterPlayer[0].m_ID" class="jo_btn jo_btn_s jo_btnWater">查看</button>
                                    </router-link>
                              </div>
                              <div class="numberelse col-6">
                                  <select @change="searchMasterPlayer(selPlayerCategory)" v-model="selPlayerCategory" id="">
                                    <option selected value="all">全部</option>
                                    <option v-for="item in category" :key="item.c_ID" :value="item.c_ID">{{item.c_category}}</option>
                                  </select>
                                  <div v-for="(item,index) in playerTo4" :key="index" class="numbercard">
                                      <div class="num"><img :src="require(`../../static/img/socialhall/rank${index+2}.png`)" alt=""></div>
                                      <div v-if="item.m_profile"><img class="numberelseHead" :src="require(`../../static/img/head/${item.m_profile}`)" alt=""></div>
                                      <div class="num_content">
                                          <div>
                                              <h4 v-if="item.m_ID">{{item.m_name}}</h4>
                                              <span  class="numbercardExp">{{item.points}}exp</span>
                                          </div>
                                          <div class="numSum">
                                              <div>{{item.introduce}}</div>
                                              <div><router-link :to="{name:'userhosting',query:{m_ID:item.m_ID}}">
                                                    <button v-if="me.m_ID != item.m_ID" class="jo_btn jo_btn_s jo_btnWater">
                                                      查看
                                                    </button>
                                                    </router-link>
                                              </div>
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
                me:{
                    m_name:""
                },
                sendMsg:"",
                selHostCategory:"all",
                selPlayerCategory:"all",
                category:[{c_category:""}],
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
                  let room = "socialhall";
                  let name = this.me.m_name;
                //   let sid = localStorage.getItem('sid');

                //   console.log(sid)
                  if(name){
                    this.$socket.emit("group",room,name);
                  }
                },
                SearchMasterHost(selCategory){
                  var vm = this;
                  axios.get(`/socialhall/searchHost/${selCategory}`)
                  .then(e=>{
                    //   console.log(e);
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
                    // console.log(this.msgArray);

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
                        console.log(msgData);
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
                // leaveGroup(){
                //     this.$socket.emit("leaveGroup");
                // }
            },
            mounted() {
                var vm = this;
                $(window).on("scroll", vm.revealOnScroll);
                //留言板彈幕動畫結束即刪除該元素
                $(document).on("webkitAnimationEnd",".chatMsg",function(){
                $(this).remove();
                })

            // console.log(vm.$route);
            // vm.router = vm.$route.name;

                // window.addEventListener("beforeunload",function(){
                //         vm.$socket.emit("leaveGroup");
                // }) 
                // window.addEventListener("beforeunload",e => this.leaveGroup(e))
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
                },
                categoryTrans:function(){
                    let selCate = ""
                    this.category.forEach((item,index)=>{
                        if(item.c_ID == this.selPlayerCategory){
                            selCate = item.c_category
                        }
                    })
                    return selCate ;
                }
            },         
            created() {
            // this.$toasted.show('hello billo😉');
            var vm = this;
            let islog = localStorage.getItem('myinfo')
                if(islog){
                    vm.me = JSON.parse(localStorage.getItem('myinfo'));
                    console.log(vm.me)
                    vm.inToMsgBoard();
                }
                // vm.$bus.$on('islogin', (data) => {
                //    console.log(data);
                //    vm.inToMsgBoard();
                // });
                axios.get('modules/category').then(e=>{
                    //console.log(e);
                    vm.category = e.data ;

              })
               vm.SearchMasterHost("all");
               vm.searchMasterPlayer("all");

            },
            beforeRouteLeave(to, from, next){
                 this.$socket.emit("leaveGroup");
                //   this.$socket.close();
                 next();
            },
            beforeDestroy() {
                this.$bus.$off('islogin');   
                // window.removeEventListener('beforeunload', e => this.leaveGroup(e))
            },
      }

    </script>
<style scoped>
@import '../assets/css/socialhall.css';

.loginTips{
    font-size: 1.5rem;
    text-align: center;
    font-weight: 600;
}


</style>
