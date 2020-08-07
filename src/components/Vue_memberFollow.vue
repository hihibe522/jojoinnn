<template>
  <div>
    <!-- 標題區塊 -->
    <div class="title">
      <div class="followSelectDiv">
        <div
          :class=" [memberMark?'jo_navTitleYellow followSelect hisSelected' :'jo_navTitleYellow followSelect']"
        >
          <span class="jo_hover" @click="followBookmark">我關注的會員</span>
          <hr />
        </div>

        <div
          :class=" [!memberMark?'jo_navTitleYellow followSelect hisSelected' :'jo_navTitleYellow followSelect']"
        >
          <span class="jo_hover" @click="banlistBookmark">我的黑名單</span>
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
    <!-- 關注 -->
    <!-- 關注列表 -->
    <div id class="memberEvent row followSection" v-if="memberMark">
      <!-- 我的關注卡片 -->
      <div class="followCard col-3" v-for="(followItem,index) in followData" :key="index">
        <div class="followPic">
          <img class="jo_hover pic_hover" :src="followItem.m_profile" alt />
        </div>
        <div class="followTitle">
          <div>
            <h4 class="jo_hover title_hover">{{followItem.m_name}}</h4>
          </div>

          <div>
            <input
              type="button"
              class="jo_btn jo_btnBlue jo_btn_s"
              value="取消關注"
              @click="cancelFollow(followItem.m_ID)"
            />
          </div>
        </div>
      </div>
      <!-- 我的關注卡片結束 -->
    </div>

    <!-- 黑名單列表 -->
    <div id class="memberEvent row followSection" v-if="!memberMark">
      <!-- 我的黑名單卡片 -->
      <div class="followCard col-3" v-for="(banItem,index) in banListData" :key="index">
        <div class="followPic">
          <img class="jo_hover pic_hover" :src="banItem.m_profile" alt />
        </div>
        <div class="followTitle">
          <div>
            <h4 class="jo_hover title_hover">{{banItem.m_name}}</h4>
          </div>

          <div>
            <input type="button" class="jo_btn jo_btnBlue jo_btn_s" value="從黑名單移除" />
          </div>
        </div>
      </div>
      <!-- 我的黑名單卡片結束 -->
    </div>
  </div>
  <!-- ------------------------------------------ -->
</template>

<script>
import $ from "jquery";
import axios from "axios";
export default {
  name: "memberFollow",
  data() {
    return {
      memberData: [{}],
      followData: [{}],
      banListData: [{}],
      memberMark: true,
    };
  },
  methods: {
    checkSession() {
      var meLog = JSON.parse(localStorage.getItem("myinfo"));
      if (meLog) {
        this.memberData = meLog;
        this.getMemberFollow();
        this.getMemberBanlist();
      }
    },

    getMemberFollow() {
      var vm = this;
      var id = vm.memberData.m_ID;
      axios.get(`member/memberFollow/${id}`).then((e) => {
        vm.followData = e.data;

        // console.log(vm.followData);
        // 圖片叫用
        vm.followData.forEach(function (e) {
          e.m_profile = `/static/img/head/${e.m_profile}`;
        });
      });
    },

    getMemberBanlist() {
      var vm = this;
      var id = vm.memberData.m_ID;
      axios.get(`member/memberbanList/${id}`).then((e) => {
        vm.banListData = e.data;
        // console.log(vm.blackListData);
        // 圖片叫用
        vm.banListData.forEach(function (e) {
          e.m_profile = `/static/img/head/${e.m_profile}`;
        });
      });
    },
    followBookmark() {
      this.memberMark = true;
      this.getMemberFollow();
    },

    banlistBookmark() {
      this.memberMark = false;
      this.getMemberBanlist();
    },

    cancelFollow(f_ID) {
      const f_data = {};
      f_data.f_ID = f_ID;
      f_data.m_ID = this.memberData.m_ID;
      console.log(f_data);
      axios.put("modules/cancelFollow", { info: f_data }).then((e) => {
        this.getMemberFollow();
      });
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