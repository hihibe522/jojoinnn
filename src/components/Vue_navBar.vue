<template>
  <div id="navBarBody">
    <div class="jo_navBar" id="navBar">
      <!-- logohover -->
      <img
        id="jo_logo"
        class="jo_hover"
        src="@/assets/img/jo_images/jo_logo.svg"
        @mouseover="joIconAdd"
        @mouseout="joIconRemove"
      />

      <!-- 左邊選單 -->
      <div id="jo_navBar_L">
        <div class="jo_navTitleYellow">
          <span class="jo_hover">首頁</span>
          <hr />
        </div>

        <div class="jo_navTitleYellow">
          <router-link active-class="nav_active" class="jo_hover" to="/socialhall">Jo誼廳</router-link>
          <hr />
        </div>

        <div class="jo_navTitleYellow">
          <router-link active-class="nav_active" class="jo_hover" to="/deposit">Jo幣儲值</router-link>
          <hr />
        </div>

        <div class="jo_navTitleYellow">
          <span class="jo_hover">我要Jo團</span>
          <hr />
        </div>

        <div class="jo_navTitleYellow">
          <!-- <span> -->
          <router-link active-class="nav_active" class="jo_hover" to="/FAQ">Jo問</router-link>
          <!-- </span> -->
          <hr />
        </div>
      </div>

      <!-- 右邊資訊 -->
      <div id="jo_navBar_R">
        <!-- 未登入 -->
        <div id="jo_notLogged" v-if="!ifLog">
          <div class="jo_navTitleYellow">
            <span class="jo_hover">註冊</span>
            <hr />
          </div>

          <div class="jo_navTitleYellow">
            <router-link active-class="nav_active" class="jo_hover" to="/login">登入</router-link>
            <hr />
          </div>
        </div>

        <!-- 登入 -->
        <div id="jo_login" v-if="ifLog">
          <div class="jo_money">
            <img src="@/assets/img/jo_icon/jo_i_coin.svg" alt />
            <div>
              <!-- 目前JO幣 -->
              <h5>${{memberData.joCoin}}</h5>
            </div>
          </div>

          <div class="jo_bell">
            <div id="jo_infoNum">
              <h6>{{infoCount}}</h6>
            </div>
            <img src="@/assets/img/jo_icon/jo_i_bell.svg" alt class="jo_hover" @click="msgShow" />
          </div>

          <div class="jo_profile">
            <img
              class="joPic_hover jo_hover"
              :src="ifLog? `/static/img/head/${memberData.m_profile}`:''"
              @click="houseShow"
            />
          </div>
        </div>
      </div>
      <!-- 右邊資訊結束 -->

      <!-- 訊息欄位 -->
      <div class="jo_msgBar jo_notice jo_scrollbar jo_show" id="msgBar">
        <div class="jo_noticeTri"></div>
        <ul>
          <h5 id="isRead" class="joTitle_hover" @click="msgAllRead">-全部標示為已讀-</h5>

          <!-- 判斷訊息是否已讀 -->
          <li
            :key="index"
            v-for="(msgItem,index) in msgData"
            :class="[msgItem.read_or_not? noticeClass : '']"
            @click="msgRead(index)"
          >
            <h5 v-html="msgItem.reminder_content">{{msgItem.reminderContent}}</h5>
          </li>
        </ul>
      </div>

      <div class="jo_msgBar jo_house jo_scrollbar jo_show" id="houseBar">
        <div class="jo_houseTri"></div>
        <div class="jo_house_top">
          <!-- 大頭照 -->
          <div class="jo_houseHeader">
            <img :src="ifLog? `/static/img/head/${memberData.m_profile}`:''" alt />
          </div>
          <!-- 個人資料 -->
          <div class="jo_houseInfo">
            <h4>{{memberData.m_name}}</h4>
            <div class="jo_houseIcon" id="jo_houseMedals">
              <img class="medalsImg" src="@/assets/img/jo_images/jo_medalsCopper.svg" alt />
              <img class="medalsImg" src="@/assets/img/jo_images/jo_medalsSilver.svg" alt />
              <img class="medalsImg" src="@/assets/img/jo_images/jo_medalsGold.svg" alt />
            </div>
            <div class="jo_houseBtn">
              <router-link active-class="nav_active" class="jo_hover" to="/member/memberHosting">
                <input type="button" value="JoJo小屋" class="jo_btn jo_btnWater jo_btn_s" />
              </router-link>

              <input type="button" value="登出" class="jo_btn jo_btnBlue jo_btn_s" @click="logout" />
            </div>
          </div>
        </div>
        <div class="jo_house_bottom jo_scrollbar">
          <div class="jo_houseHosting">
            <h4>正在主Jo的活動</h4>
            <span>共{{hostingData.length}}項</span>
            <ul class="jo_houseUl">
              <!-- 活動卡片 -->
              <li :key="index" v-for="(hostingItem,index) in hostingData">
                <div>
                  <img :src="ifLog?`/static/img/activityPic/${hostingItem.a_pic}`:''" alt />
                </div>
                <div class="jo_house_joingTitle">
                  <h5>{{hostingItem.a_name}}</h5>
                  <h6>{{hostingItem.a_start}}</h6>
                </div>
                <div class="jo_house_joingBtn">
                  <!-- 取消JO團Modal -->
                  <input
                    type="button"
                    value="取消Jo團"
                    class="jo_btn jo_btnBlue jo_btn_s"
                    data-toggle="modal"
                    data-target="#cancelHoding_modal"
                    @click="getCancelNumber(hostingItem.a_ID,hostingItem.a_name)"
                  />
                </div>
              </li>
            </ul>
          </div>

          <div class="jo_houseJoing">
            <h4>正在參Jo的活動</h4>
            <span>共{{joingData.length}}項</span>
            <ul class="jo_houseUl">
              <!-- 活動卡片 -->
              <li :key="index" v-for="(joingItem,index) in joingData">
                <div>
                  <img :src="ifLog?`/static/img/activityPic/${joingItem.a_pic}`:''" alt />
                </div>
                <div class="jo_house_joingTitle">
                  <h5>{{joingItem.a_name}}</h5>
                  <h6>{{joingItem.a_start}}</h6>
                  <h6>{{joingItem.m_name}}</h6>
                </div>
                <div class="jo_house_joingBtn">
                  <div
                    class="joingBtn_unPaid"
                    :style="[(joingItem.m_pay==0&&joingItem.m_free==0)? {'dispaly':'flex'} : {'display':'none'} ]"
                  >
                    <input type="button" value="付款去" class="jo_btn jo_btnRed jo_btn_s" />
                    <input type="button" value="取消參Jo" class="jo_btn jo_btnBlue jo_btn_s" />
                  </div>
                  <div
                    class="joingBtn_paid"
                    :style="[(joingItem.m_pay==1||joingItem.m_free==1) ?  {'dispaly':'flex'} : {'display':'none'} ]"
                  >
                    <input type="button" value="已付款" class="jo_btnGrey" />
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- 取消modal -->
    <modalcancel></modalcancel>
  </div>
</template>

<script>
import $ from "jquery";
import axios from "axios";
import modalcancel from "./Vue_modalCancel";

export default {
  name: "navbar",
  components: {
    modalcancel,
  },
  data() {
    return {
      loginOK: false,
      // 登入後的會員資料
      memberData: {},

      // 經驗值
      memberExp: [{}],

      // 通知
      msgData: [{}],

      // 正在主Jo的活動
      hostingData: [{}],

      // 正在參Jo的活動
      joingData: [{}],

      ifLog: false,
      infoCount: 0,
      infoArrayLi: [],
      infoNumber: -1,
      noticeClass: "jo_noticeRead",
    };
  },
  methods: {
    // 重新get資料
    navCheck() {
      var meLog = JSON.parse(localStorage.getItem("myinfo"));
      // 如果登入
      if (meLog) {
        this.ifLog = true;
        let id = meLog.m_ID;
        axios.get(`navCheck/${id}`).then((e) => {
          let vm = this;
          // 個人資料
          vm.memberData = e.data.memberData[0];
          localStorage.setItem("myinfo", JSON.stringify(e.data.memberData[0]));
          console.log(vm.memberData);
          // 主JO
          vm.hostingData = e.data.hostingData;

          // 參加
          vm.joingData = e.data.joingData;

          // 經驗值
          vm.memberExp = e.data.mamberExp;

          // 訊息
          vm.msgData = e.data.msgData;
          let today = new Date();
          vm.msgData.forEach(function (e) {
            console.log("現在時間", Date.parse(e.r_time));
            console.log("現在時間", Date.parse(today));
            if (
              Date.parse(e.r_time) + 10000 >= Date.parse(today) &&
              e.read_or_not == 0
            ) {
              vm.$toasted.show(`你有一則新訊息`);
            }
          });

          // 訊息提示
          var msgDataNum = vm.msgData.filter((e) => e.read_or_not == 0);
          vm.infoCount = msgDataNum.length;

          this.memberMedals();

          // 日期裁剪
          vm.hostingData.forEach(function (e) {
            e.a_start = e.a_start.substring(0, 10);
          });

          vm.joingData.forEach(function (e) {
            e.a_start = e.a_start.substring(0, 10);
          });
          // console.log(vm.joingData)
        });
      } else {
        console.log("請先登入");
      }
    },

    msgRead(e) {
      var rm = this;
      var infoID = e;
      console.log();

      axios
        .put("navCheck", { mid: this.msgData[infoID].r_ID, single: true })
        .then((e) => {
          rm.msgData[infoID] = e.data;

          // 重整
          this.navCheck();
        });
    },

    msgAllRead() {
      var rm = this;
      axios
        .put("navCheck", { memberid: this.memberData[0].m_ID, single: false })
        .then((e) => {
          rm.msgData = e.data;
          // 重整
          this.navCheck();
        });
    },

    logout() {
      localStorage.clear();
      window.location.replace("/");
    },

    // 取消鳩團
    getCancelNumber(e, f) {
      this.$bus.$emit("cancelHost", {
        a_ID: e,
        a_name: f,
      });
    },

    // jojo鳥mouseover
    joIconAdd: function (e) {
      $(e.target).addClass("ld ld-shake-v");
    },

    // jojo鳥mouseout
    joIconRemove: function (e) {
      $(e.target).removeClass("ld ld-shake-v");
    },

    // 訊息欄位
    msgSetting: function () {
      this.infoArrayLi = $(".jo_notice li");
      $(".jo_notice h5,.jo_notice span,.jo_notice li").addClass("jo_hover");
    },

    joingBtn: function () {
      var vm = this;
      // vm.display = "none";
      this.joingData.forEach(function (item, index, array) {
        // 已付錢
        if (parseInt(item.m_pay) + parseInt(item.m_free) >= 1) {
          vm.paidDisplay = "block";
          vm.unpayDisplay = "none";
          console.log("已付款");
          console.log(vm.paidDisplay);
        } else {
          vm.paidDisplay = "none";
          vm.unpayDisplay = "block";
          // 未付錢
          console.log("未付款");
          console.log(vm.paidDisplay);
        }
      });
    },

    // 獎牌顯示
    memberMedals: function () {
      $(".medalsImg").hide();
      let exp = this.memberExp[0].expSum;
      switch (true) {
        case exp >= 5 && exp < 200:
          $(".medalsImg").eq(0).show();
          break;

        case exp >= 200 && exp < 600:
          $(".medalsImg").eq(0).show();
          $(".medalsImg").eq(1).show();
          break;

        case exp >= 600:
          $(".medalsImg").show();
          break;
      }
    },

    msgShow: function () {
      $(".jo_house").addClass("jo_show");
      $(".jo_notice").toggleClass("jo_show");
    },

    houseShow: function () {
      $(".jo_notice").addClass("jo_show");
      $(".jo_house").toggleClass("jo_show");
    },
  },

  created() {
    this.navCheck();
    this.$bus.$on("islogin", (event) => {
      this.navCheck();
    });
    this.$bus.$on("cancelOK", (event) => {
      this.navCheck();
    });
  },

  beforeDestroy: function () {
    this.$bus.$off("islogin");
    this.$bus.$off("cancelOK");
    // this.$bus.$off("NewMsg");
  },
};
</script>

<style>
.nav_active {
  color: var(--jo_dark_water);
}

.nav_active + hr {
  transform: scaleX(1);
}

a {
  color: #ffffff;
}

a:hover {
  color: var(--jo_dGrey1);
}
</style>
