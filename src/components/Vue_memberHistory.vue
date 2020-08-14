<template>
  <div>
    <!-- 標題區塊 -->
    <div class="title">
      <div class="hisSelectDiv">
        <div
          :class=" [!memberMark?'jo_navTitleYellow followSelect hisSelected' :'jo_navTitleYellow followSelect']"
        >
          <span class="jo_hover" @click="hostHis">主Jo歷史</span>
          <hr />
        </div>

        <div
          :class=" [memberMark?'jo_navTitleYellow followSelect hisSelected' :'jo_navTitleYellow followSelect']"
        >
          <span class="jo_hover" @click="joingHis">參Jo歷史</span>
          <hr />
        </div>
      </div>

      <!-- 篩選區塊 -->
      <div class="memberFilter">
        <div class="searchBox">
          <input type="search" name id placeholder="搜尋" class="jo_hover" />
          <button class="jo_btn jo_btn_s jo_btnWater jo_hover">
            <i class="fa fa-search"></i>
          </button>
        </div>
      </div>
    </div>
    <!-- 標題區塊結束 -->

    <!-- 主糾歷史 -->
    <div class="memberEvent hisHostSection" v-if="!memberMark">
      <div class="w-100 d-flex">
        <div v-if="hostHistory.length==0" class="member_notFind">
          <h4>您沒有舉辦過任何活動喔</h4>
          <img src="@/assets/img/jo_images/jo_notFind.svg" alt />
        </div>
      </div>
      <div class="joiningCard" v-for="(hostingHisItem,index) in hostHistory" :key="index">
        <div class="joiningPic hisHostPic">
          <img class="jo_hover pic_hover" :src="hostingHisItem.a_pic" alt />
        </div>
        <div class="joiningInfo hisHostInfo">
          <ul>
            <li>
              <h4 class="jo_hover title_hover">{{hostingHisItem.a_name}}</h4>
            </li>
            <li>
              <h6>活動日期：{{hostingHisItem.a_start}}</h6>
            </li>
            <li>
              <h6>活動地點：{{hostingHisItem.a_address}}</h6>
            </li>
          </ul>
        </div>
        <div class="joiningBtn">
          <div>
            <input
              type="button"
              class="jo_btn jo_btnWater jo_btn_s"
              value="查看評價"
              data-toggle="modal"
              data-target="#seeRaking_modal"
              @click="getCommandNumber(hostingHisItem.a_ID,hostingHisItem.a_name)"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- 參加歷史 -->
    <div class="memberEvent hisHostSection" v-if="memberMark">
      <div class="w-100 d-flex">
        <div v-if="joinHistory.length==0" class="member_notFind">
          <h4>您沒有參加過任何活動喔</h4>
          <img src="@/assets/img/jo_images/jo_notFind.svg" alt />
        </div>
      </div>
      <!-- 卡片 -->
      <div class="joiningCard" v-for="(joinHisItem,index) in joinHistory" :key="index">
        <div class="joiningPic hisJoinPic">
          <img class="jo_hover pic_hover" :src="joinHisItem.a_pic" alt />
        </div>
        <div class="joiningInfo hisJoinInfo">
          <ul>
            <li>
              <h4 class="jo_hover title_hover">{{joinHisItem.a_name}}</h4>
            </li>
            <li>
              <h6>主Jo：{{joinHisItem.m_name}}</h6>
            </li>
            <li>
              <h6>活動日期：{{joinHisItem.a_start}}</h6>
            </li>
            <li>
              <h6>活動地點：{{joinHisItem.a_address}}</h6>
            </li>
          </ul>
        </div>
        <div class="joiningBtn">
          <div>
            <input v-if="joinHisItem.rate" type="button" class="jo_btnGrey jo_btn_s" value="已評價" />
            <input
              v-if="!joinHisItem.rate"
              type="button"
              class="jo_btn jo_btnOrange jo_btn_s"
              value="留下評價"
              data-toggle="modal"
              data-target="#giveStar_modal"
              @click="doCommandNumber(joinHisItem.a_ID,joinHisItem.a_name)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import axios from "axios";
export default {
  name: "memberHistory",
  data() {
    return {
      memberMark: 0,
      hostHistory: [{}],
      joinHistory: [{}],
      memberData: [{}],
    };
  },

  methods: {
    checkSession() {
      var meLog = JSON.parse(localStorage.getItem("myinfo"));
      if (meLog) {
        this.memberData = meLog;
        this.getMemberHostHis();
        this.getMemberJoinHis();
      }
    },

    hostHis() {
      this.memberMark = 0;
    },
    joingHis() {
      this.memberMark = 1;
    },

    // 主鳩歷史
    getMemberHostHis() {
      var vm = this;
      var id = vm.memberData.m_ID;
      axios.get(`member/memberHostHis/${id}`).then((e) => {
        vm.hostHistory = e.data;
        // console.log(vm.hostHistory);

        // 日期裁剪
        vm.hostHistory.forEach(function (e) {
          e.a_start = e.a_start.substring(0, 10);
        });

        // 圖片叫用
        vm.hostHistory.forEach(function (e) {
          e.a_pic = `/static/img/activityPic/${e.a_pic}`;
        });
      });
    },

    // 參加歷史
    getMemberJoinHis() {
      var vm = this;
      var id = vm.memberData.m_ID;
      axios.get(`member/memberJoinHis/${id}`).then((e) => {
        vm.joinHistory = e.data;
        console.log(vm.joinHistory);

        // 日期裁剪
        vm.joinHistory.forEach(function (e) {
          e.a_start = e.a_start.substring(0, 10);
        });

        // 圖片叫用
        vm.joinHistory.forEach(function (e) {
          e.a_pic = `/static/img/activityPic/${e.a_pic}`;
        });
      });
    },

    // 查看評價
    getCommandNumber(e, f) {
      this.$bus.$emit("getCommand", {
        a_ID: e,
        a_name: f,
      });
    },

    // 給評價
    doCommandNumber(e, f) {
      this.$bus.$emit("giveRate", {
        m_ID: this.memberData.m_ID,
        a_ID: e,
        a_name: f,
      });
    },
  },
  created() {
    this.checkSession();
    this.$bus.$on("giveStarOK", (event) => {
      this.getMemberJoinHis();
    });
  },
  beforeDestroy: function () {
    this.$bus.$off("giveStarOK");
  },
};
</script>

<style>
@import "../assets/css/member.css";
</style>