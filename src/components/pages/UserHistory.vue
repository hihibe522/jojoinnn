<template>
<div>
    <!-- 標題區塊 -->
    <div class="title">
      <h2>主Jo的歷史</h2>
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
    <!-- 歷史活動 -->
    <!-- 主Jo歷史 -->
    <div class="memberEvent hisHostSection">

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
</div> 
</template>

<script>
import $ from "jquery";
import axios from "axios";

export default {
    name:"userhistory",
    data() {
        return {
            userID:"",
            hostHistory:{}
        }
    },
    methods: {
        getMemberHostHis(id) {
            var vm = this;
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
        // 查看評價
        getCommandNumber(e, f) {
        this.$bus.$emit("getCommand", {
            a_ID: e,
            a_name: f,
        });
        },
    },
    created() {
        this.userID  = this.$route.query.m_ID ;
        this.getMemberHostHis(this.userID);
        // console.log( this.userID);

    },


}
</script>

<style>

</style>