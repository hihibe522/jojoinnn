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
      <div class="joiningCard">
        <div class="joiningPic hostingPic">
          <img class="jo_hover pic_hover" src="@/assets/img/activityPic/A.jpg" alt />
        </div>
        <div class="joiningInfo hostingInfo">
          <ul>
            <li>
              <h4 class="jo_hover title_hover">全世界妙蛙種子聚集大會</h4>
            </li>
            <li>
              <h6>主Jo：妙蛙種子</h6>
            </li>
            <li>
              <h6>活動日期：2020/10/20</h6>
            </li>
            <li>
              <h6>活動地點：妙蛙種子不可思議森林</h6>
            </li>
          </ul>
        </div>
        <div class="joiningBtn">
          <div>
            <input
              type="button"
              class="jo_btn jo_btnOrange jo_btn_s cancelHoding_btn"
              value="查看"
            />
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
};
</script>

<style>
@import "../../assets/css/member.css";
</style>


