<template>
  <div>
    <!-- 標題區塊 -->
    <div class="title">
      <h2>正在參Jo的活動</h2>

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
      <div class="joiningCard" v-for="(joingItem,index) in joingData" :key="index">
        <router-link active-class="nav_active" class="jo_hover" to="/deposit">
          <div class="joiningPic hostingPic">
            <img class="jo_hover pic_hover" :src="joingItem.a_pic" alt />
          </div>
        </router-link>

        <div class="joiningInfo hostingInfo">
          <ul>
            <router-link active-class="nav_active" class="jo_hover" to="/deposit">
              <li>
                <h4 class="jo_hover title_hover">{{joingItem.a_name}}</h4>
              </li>
            </router-link>

            <li>
              <h6>主辦人：{{joingItem.m_name}}</h6>
            </li>
            <li>
              <h6>活動日期：{{joingItem.a_start}}</h6>
            </li>
            <li>
              <h6>活動地點：{{joingItem.a_address}}</h6>
            </li>
          </ul>
        </div>
        <div class="joiningBtn">
          <div
            class="unpayBtn"
            :style="{'display':(joingItem.m_pay==0&&joingItem.m_free==0)? 'flex':'none'}"
          >
            <input type="button" class="jo_btn jo_btnRed jo_btn_s" value="付款去" />
            <div>
              <input
                type="button"
                class="jo_btn jo_btnBlue jo_btn_s cancelJoing_btn"
                value="取消參Jo"
                data-toggle="modal"
                data-target="#cancelJoing_modal"
              />
            </div>
          </div>
          <div
            class="paidBtn"
            :style="{'display':(joingItem.m_pay>0||joingItem.m_free>0)? 'flex':'none'}"
          >
            <input type="button" class="jo_btnGrey jo_btn_s" value="已付款" />
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
  name: "memberJoing",
  data() {
    return {
      memberData: [{}],
      joingData: [{}],
    };
  },

  methods: {
    checkSession() {
      var vm = this;
      axios.get("checkSession").then((e) => {
        vm.memberData = e.data;
        vm.getMemberJoing();
      });
    },
    getMemberJoing() {
      var vm = this;
      var id = vm.memberData[0].m_ID;
      axios.get(`member/memberJoing/${id}`).then((e) => {
        vm.joingData = e.data;
        // console.log(vm.joingData[0].m_pay);

        // 日期裁剪
        vm.joingData.forEach(function (e) {
          e.a_start = e.a_start.substring(0, 10);
        });

        // 圖片叫用
        vm.joingData.forEach(function (e) {
          e.a_pic = `/static/img/activityPic/${e.a_pic}`;
        });
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

.m_joingBtn_unPaid a {
  display: flex;
}
</style>