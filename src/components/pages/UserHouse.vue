<template>
  <div class="jo_col_pc" id="memberCol">
    <!--會員介紹左 -->
    <div class="memberMain" id="memberMain_L">
      <!-- 基本資料 -->
      <div  class="memberInfo">
        
        <img v-if="userInfo.m_name" :src="require(`../../../static/img/head/${userInfo.m_profile}`)" alt />
        <div>
          <h4 class="memberName">{{userInfo.m_name}}</h4>
        </div>
        <div class="memberIcon">
          <img class="medalsImg_m" src="@/assets/img/jo_images/jo_medalsCopper.svg" alt />
          <img class="medalsImg_m" src="@/assets/img/jo_images/jo_medalsSilver.svg" alt />
          <img class="medalsImg_m" src="@/assets/img/jo_images/jo_medalsGold.svg" alt />
        </div>

        <div class="btngroup">
          <input type="button" class="jo_btn jo_btnWater jo_btn_m" value="關注" />
          <input @click="goChat(userInfo)" :id="userInfo.m_ID" type="button" class="jo_btn jo_btnOrange jo_btn_m" value="JO聊" />
        </div>
      </div>

      <div class="hrDIv"></div>

      <!-- 評分 -->
      <div class="memberInfo">
        <div class="memberRating" style="margin:0px">
          <starrate :m_rate="userInfo.rate"></starrate>

          <br />
          <h5>({{userInfo.counts}}人評分)</h5>
        </div>
      </div>

      <div class="hrDIv"></div>

      <!-- 自我介紹 -->
      <div class="memberInfo">
        <div class="memberIntro">
          <h5>{{userInfo.introduce}}</h5>
        </div>
      </div>

      <div class="hrDIv"></div>

      <div id="memberChart">
        <canvas id="chartCanvas" width="1px" height="1px"></canvas>
      </div>
    </div>

    <!--會員介紹右 -->
    <div class="memberMain" id="mamemberMain_R">
      <div id="mamberBookmark">
        <ul id="bookMark_ul">
          <router-link
            active-class="bookMarkClick"
            class="jo_hover bookMarkOriginal"
            to="/userhouse/userhosting">
            <li>
              <h5>正在主Jo</h5>
            </li>
          </router-link>

          <router-link
            active-class="bookMarkClick"
            class="jo_hover bookMarkOriginal"
            to="/userhouse/userhistory">
            <li>
              <h5>歷史紀錄</h5>
            </li>
          </router-link>


        </ul>
      </div>

      <!-- ------------------------------------------ -->
      <!-- 右方內容 -->
      <div id="mamemberContent">
        <div class="content">
          <router-view></router-view>
      <!-- ------------------------------------------ -->

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import axios from "axios";
import starrate from "../StarRate";

export default {
  name: "userhouse",
  components: {
    starrate,
  },
  data() {
    return {
      userInfo:{},
      exp:""

    };
  },
  methods: {
    goChat(user){
      console.log(localStorage)
      let islog = localStorage.getItem('myinfo')
      // console.log(localStorage)
      if(islog){
        this.$bus.$emit('gogochat',user)
      }
      else{
         this.$toasted.show('請先進行登入😉');
      }
    }
  },
  created() {
    var vm = this;
    let userID = vm.$route.query.m_ID;
    console.log(vm.$route.query);
    axios.get(`user/${userID}`)
    .then(e=>{
      vm.userInfo = e.data[0][0];
      vm.exp =  e.data[1][0];
      console.log(e);
    })
  }
  
//   methods: {
//     checkSession() {
//       var vm = this;
//       axios.get("checkSession").then((e) => {
//         vm.memberData = e.data;
//         vm.getMemberData();
//       });
//     },
//     getMemberData() {
//       var vm = this;
//       var id = vm.memberData[0].m_ID;
//       axios.get(`member/memberInfo/${id}`).then((e) => {
//         vm.memberExp = e.data.memberExp;
//         vm.memberRate = e.data.memberRate;
//         vm.a = vm.memberRate[0].rate;

//         console.log(vm.a);
//         // 圖片叫用
//         var memberPic = vm.memberData[0].m_profile;
//         vm.memberData[0].m_profile = `/static/img/memberPic/${memberPic}`;
//         vm.memberMedals();
//       });
//     },
//     // 獎牌顯示
//     memberMedals: function () {
//       $(".medalsImg_m").hide();
//       let exp = this.memberExp[0].expSum;
//       // console.log(exp);
//       switch (true) {
//         case exp >= 5 && exp < 200:
//           $(".medalsImg_m").eq(0).show();
//           break;

//         case exp >= 200 && exp < 600:
//           $(".medalsImg_m").eq(0).show();
//           $(".medalsImg_m").eq(1).show();
//           break;

//         case exp >= 600:
//           $(".medalsImg_m").show();
//           break;
//       }
//     },
//   },
//   created() {
//     this.checkSession();
//   },
};
</script>




<style>
@import "../../assets/css/member.css";

.btngroup input{
  width: 80px;
    margin: 0 5px;

}


</style>
