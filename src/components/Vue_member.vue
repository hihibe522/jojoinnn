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
          <img
            v-if="memberExp>5"
            class="medalsImg_m"
            src="@/assets/img/jo_images/jo_medalsCopper.svg"
            alt
          />
          <img
            v-if="memberExp>200"
            class="medalsImg_m"
            src="@/assets/img/jo_images/jo_medalsSilver.svg"
            alt
          />
          <img
            v-if="memberExp>600"
            class="medalsImg_m"
            src="@/assets/img/jo_images/jo_medalsGold.svg"
            alt
          />
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
        <chart :width="300" :height="300" :chart-data="chartdataloaded" />
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

    <modallucky :m_ID="memberData.m_ID"></modallucky>
    <modalcommand></modalcommand>
    <modalgiverate></modalgiverate>
  </div>
</template>

<script>
import $ from "jquery";
import axios from "axios";
import memberjoing from "./Vue_memberJoing";
import starrate from "./StarRate";
import modallucky from "./Vue_modalLucky";
import modalcommand from "./Vue_modalCommand";
import modalgiverate from "./Vue_modalGiveRate";
import chart from "./Radar";

export default {
  name: "member",
  components: {
    memberjoing,
    starrate,
    modallucky,
    chart,
    modalcommand,
    modalgiverate,
  },
  data() {
    return {
      memberData: {},
      memberRate: [{}],
      a: 0,
      memberExp: 0,
      labels: [],
      radarData: [],
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
        this.getRadar();
      } else {
        this.$router.push("/login");
        this.$toasted.show("請先登入🙇‍♀️");
      }
    },
    getMemberData() {
      var vm = this;
      var id = vm.memberData.m_ID;
      axios.get(`member/memberInfo/${id}`).then((e) => {
        // 經驗值
        vm.memberExp = e.data.memberExp[0].expSum;
        vm.memberRate = e.data.memberRate;
        vm.a = vm.memberRate.rate;

        // 圖片叫用
        var memberPic = vm.memberData.m_profile;
        vm.memberData.m_profile = `/static/img/head/${memberPic}`;
        // console.log(e.data);
        // vm.memberMedals();
      });
    },

    getRadar() {
      var vm = this;
      axios.get(`user/exp/${vm.memberData.m_ID}`).then((e) => {
        // console.log(e.data);
        vm.labels = e.data[0].map((item) => {
          return Object.values(item)[1];
        });
        vm.radarData = e.data[0].map((item) => {
          return Object.values(item)[2];
        });

        // console.log(vm.radarData);
      });
    },
  },

  computed: {
    chartdataloaded: function () {
      return {
        labels: this.labels,
        datasets: [
          {
            data: this.radarData,
            backgroundColor: "rgba(255, 203, 5, .4)",
            borderWidth: 2,
            borderColor: "rgba(255, 203, 5)",
            pointRadius: 0,
            borderJoinStyle: "round",
            label: "",
          },
        ],
      };
    },
  },
  created() {
    this.checkSession();
    $("html, body").scrollTop(0);
  },
};
</script>




<style>
@import "../assets/css/member.css";

.member_notFind img{
  width: 200px;
  margin: auto;
}

.member_notFind{
  margin: auto;
  margin-top: 2rem;
  display: inline-flex;
  flex-direction: column;
}

.member_notFind h4{
  color: var(--jo_water);
  font-weight: bold;
}
</style>
