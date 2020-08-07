<template>
  <div>
    <!-- 標題區塊 -->
    <div class="title">
      <h2>我收藏的活動</h2>
    </div>
    <!-- 標題區塊結束 -->

    <!-- 我的最愛區塊 -->
    <div id="collectSection" class="memberEvent row">
      <!-- 我的最愛卡片 -->
      <div class="collectCard col-4" :key="index" v-for="(collectItem,index) in collectData">
        <div class="collectPic">
          <router-link active-class="nav_active" class="jo_hover" to="/deposit">
            <img class="jo_hover pic_hover" :src="collectItem.a_pic" alt />
          </router-link>
        </div>
        <div class="collectTitle">
          <div>
            <router-link active-class="nav_active" class="jo_hover" to="/deposit">
              <h5 class="jo_hover title_hover">{{collectItem.a_name}}</h5>
            </router-link>

            <h6>{{collectItem.a_start}}</h6>
          </div>

          <div>
            <favicon :liked="1" :aid="collectItem.a_ID" v-on:addLike="getMemberCollect"></favicon>
          </div>
        </div>
      </div>
      <!-- 我的最愛卡片結束 -->
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import axios from "axios";
import favicon from "./Favicon";

export default {
  name: "memberCollect",
  data() {
    return {
      memberData: [{}],
      collectData: [{}],
    };
  },
  components: {
    favicon,
  },
  methods: {
    checkSession() {
      var meLog = JSON.parse(localStorage.getItem("myinfo"));
      if (meLog) {
        this.memberData = meLog;
        this.getMemberCollect();
      }
    },
    getMemberCollect() {
      var vm = this;
      var id = vm.memberData.m_ID;
      // console.log(id)
      axios.get(`member/memberCollect/${id}`).then((e) => {
        vm.collectData = e.data;

        // 日期裁剪
        vm.collectData.forEach(function (e) {
          e.a_start = e.a_start.substring(0, 10);
        });

        // 圖片叫用
        vm.collectData.forEach(function (e) {
          e.a_pic = `/static/img/activityPic/${e.a_pic}`;
        });

        console.log(vm.collectData);
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