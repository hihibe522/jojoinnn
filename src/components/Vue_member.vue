<template>
  <div class="jo_col_pc" id="memberCol">
    <!--會員介紹左 -->
    <div class="memberMain" id="memberMain_L">
      <!-- 基本資料 -->
      <div class="memberInfo">
        <img :src="memberData.m_profile" alt />
        <div>
          <h4 class="memberName">{{memberData.m_name}}</h4>
        </div>
        <div class="memberIcon">
          <img class="medalsImg_m" src="@/assets/img/jo_images/jo_medalsCopper.svg" alt />
          <img class="medalsImg_m" src="@/assets/img/jo_images/jo_medalsSilver.svg" alt />
          <img class="medalsImg_m" src="@/assets/img/jo_images/jo_medalsGold.svg" alt />
        </div>

        <div>
          <input type="button" class="jo_btn jo_btnWater jo_btn_m" value="編輯個人檔案" />
        </div>
      </div>

      <div class="hrDIv"></div>

      <!-- 評分 -->
      <div class="memberInfo">
        <div class="memberRating" style="margin:0px">
          <starrate :m_rate="memberRate[0].rate"></starrate>

          <br />
          <h5>({{memberRate[0].count}}人評分)</h5>
        </div>
      </div>

      <div class="hrDIv"></div>

      <!-- 自我介紹 -->
      <div class="memberInfo">
        <div class="memberIntro">
          <h5>{{memberData.introduce}}</h5>
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
            to="/member/memberCollect"
          >
            <li>
              <h5>我的收藏</h5>
            </li>
          </router-link>

          <router-link
            active-class="bookMarkClick"
            class="jo_hover bookMarkOriginal"
            to="/member/memberJoing"
          >
            <li>
              <h5>正在參Jo</h5>
            </li>
          </router-link>

          <router-link
            active-class="bookMarkClick"
            class="jo_hover bookMarkOriginal"
            to="/member/memberHosting"
          >
            <li>
              <h5>正在主Jo</h5>
            </li>
          </router-link>

          <router-link
            active-class="bookMarkClick"
            class="jo_hover bookMarkOriginal"
            to="/member/memberHistory"
          >
            <li>
              <h5>歷史紀錄</h5>
            </li>
          </router-link>

          <router-link
            active-class="bookMarkClick"
            class="jo_hover bookMarkOriginal"
            to="/member/memberFollow"
          >
            <li>
              <h5>關注列表</h5>
            </li>
          </router-link>

          <router-link
            active-class="bookMarkClick"
            class="jo_hover bookMarkOriginal"
            to="/member/memberLucky"
          >
            <li>
              <h5>Jo轉幸運盤</h5>
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

          <!-- 啾轉幸運盤 -->
        </div>
      </div>
    </div>

<modallucky></modallucky>
  </div>
</template>

<script>
import $ from "jquery";
import axios from "axios";
import memberjoing from "./Vue_memberJoing";
import starrate from "./StarRate";
import modallucky from "./Vue_modalLucky";

export default {
  name: "member",
  components: {
    memberjoing,
    starrate,
    modallucky,
  },
  data() {
    return {
      memberData: {},
      memberRate: [{}],
      a: 0,
    };
  },
  methods: {
    checkSession() {
      var meLog = JSON.parse(localStorage.getItem("myinfo"));
      if (meLog) {
        this.memberData = meLog;
        this.$bus.$emit("memberInformation", {
          m_data: this.memberData,
        });
        this.getMemberData();
      } else {
        this.$router.push("/login");
        this.$toasted.show("請先登入🙇‍♀️");
      }
    },
    getMemberData() {
      var vm = this;
      var id = vm.memberData.m_ID;
      axios.get(`member/memberInfo/${id}`).then((e) => {
        vm.memberExp = e.data.memberExp;
        vm.memberRate = e.data.memberRate;
        vm.a = vm.memberRate.rate;

        // 圖片叫用
        var memberPic = vm.memberData.m_profile;
        vm.memberData.m_profile = `/static/img/head/${memberPic}`;
        vm.memberMedals();
      });
    },
    // 獎牌顯示
    memberMedals: function () {
      $(".medalsImg_m").hide();
      let exp = this.memberExp[0].expSum;
      // console.log(exp);
      switch (true) {
        case exp >= 5 && exp < 200:
          $(".medalsImg_m").eq(0).show();
          break;

        case exp >= 200 && exp < 600:
          $(".medalsImg_m").eq(0).show();
          $(".medalsImg_m").eq(1).show();
          break;

        case exp >= 600:
          $(".medalsImg_m").show();
          break;
      }
    },
  },
  created() {
    this.checkSession();
  },
};
</script>




<style>
@import "../assets/css/member.css";
</style>
