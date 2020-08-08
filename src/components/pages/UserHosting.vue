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
            <router-link active-class="nav_active" class="jo_hover" to="/deposit">
              <div class="joiningPic hostingPic">
                <img class="jo_hover pic_hover" :src="require(`../../../static/img/activityPic/${hostItem.a_pic}`)" alt />
              </div>
            </router-link>

            <div class="joiningInfo hostingInfo">
              <ul>
                <router-link active-class="nav_active" class="jo_hover" to="/deposit">
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
                <router-link :to="{ name:'activity',query:{a_ID:hostItem.a_ID }}" >
                <input
                  type="button"
                  class="jo_btn jo_btnOrange jo_btn_s cancelHoding_btn"
                  value="查看"/>
                </router-link>
              </div>
            </div>
          </div>
    </div>
    
  </div>
  <!-- 標題區塊結束 -->
</template>

<script>
import $ from "jquery";
import axios from "axios";
export default {
  name: "userhosting",
  data() {
    return {
      hostData:{}
      
    }
  },
  methods: {
    getUserHosting(userID){
      var vm = this;
       axios.get(`member/memberHosting/${userID}`)
       .then(e=>{
          vm.hostData = e.data;

          // 日期裁剪
          vm.hostData.forEach(function (e) {
            e.a_start = e.a_start.substring(0, 10);
          });


       })
    }
  },
  created() {
    
   let userID = this.$route.query.m_ID;
    this.getUserHosting(userID);
  },
};
</script>

<style>
@import "../../assets/css/member.css";

.joiningBtn div{
  align-items: center;

}



</style>


