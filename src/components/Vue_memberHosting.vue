<template>
  <div>
    <!-- 標題區塊 -->
    <div class="title">
      <h2>正在主Jo的活動</h2>

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

    <!-- 正在主Jo區塊 -->
    <div id="hostingSection" class="memberEvent">
      <div class="joiningCard" v-for="(hostItem,index) in hostData" :key="index">
        <router-link
          active-class="nav_active"
          class="jo_hover"
          :to="`/activity/?a_ID=${hostItem.a_ID}`"
        >
          <div class="joiningPic hostingPic">
            <img class="jo_hover pic_hover" :src="hostItem.a_pic" alt />
          </div>
        </router-link>

        <div class="joiningInfo hostingInfo">
          <ul>
            <router-link
              active-class="nav_active"
              class="jo_hover"
              :to="`/activity/?a_ID=${hostItem.a_ID}`"
            >
              <li>
                <h4 class="jo_hover title_hover">{{hostItem.a_name}}</h4>
              </li>
            </router-link>

            <li>
              <h6>活動日期：{{hostItem.a_start}}</h6>
            </li>
            <li>
              <h6>活動地點：{{hostItem.a_address}}</h6>
            </li>
          </ul>
        </div>
        <div class="joiningBtn">
          <div>
            <input
              type="button"
              class="jo_btn jo_btnBlue jo_btn_s cancelHoding_btn"
              value="取消Jo團"
              data-toggle="modal"
              data-target="#cancelHoding_modal"
              @click="getCancelNumber(hostItem.a_ID,hostItem.a_name)"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- <modalcancel v-on:cancelModalClose="checkSession"></modalcancel> -->
    <!-- 取消modal -->
  </div>
  <!-- 標題區塊結束 -->
</template>

<script>
import $ from "jquery";
import axios from "axios";
// import modalcancel from "./Vue_modalCancel";
export default {
  name: "memberHosting",
  data() {
    return {
      memberData: [{}],
      hostData: [{}],
      cancelNumber: -1,
      cancelA_Name: "",
    };
  },

  methods: {
    checkSession() {
      var meLog = JSON.parse(localStorage.getItem("myinfo"));
      if (meLog) {
        this.memberData = meLog;
        this.getMemberHosting();
      }
    },

    getMemberHosting() {
      var vm = this;
      var id = vm.memberData.m_ID;
      axios.get(`member/memberHosting/${id}`).then((e) => {
        vm.hostData = e.data;
        console.log(vm.hostData);

        // 日期裁剪
        vm.hostData.forEach(function (e) {
          e.a_start = e.a_start.substring(0, 10);
        });

        // 圖片叫用
        vm.hostData.forEach(function (e) {
          e.a_pic = `/static/img/activityPic/${e.a_pic}`;
        });
      });
    },

    // 取消鳩團
    getCancelNumber(e, f) {
      this.$bus.$emit("cancelHost", {
        a_ID: e,
        a_name: f,
      });
    },
  },
  created() {
    this.checkSession();
    this.$bus.$on("cancelOK", (event) => {
      this.getMemberHosting();
    });
  },
  beforeDestroy: function () {
    this.$bus.$off("cancelOK");
  },
};
</script>

<style>
@import "../assets/css/member.css";
</style>


