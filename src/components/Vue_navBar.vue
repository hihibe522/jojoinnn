<template>
  <div class="jo_navBar" id="navBar">
    <!-- logohover -->
    <img
      id="jo_logo"
      class="jo_hover"
      src="../assets/img/jo_images/jo_logo.svg"
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
        <span class="jo_hover">Jo誼廳</span>
        <hr />
      </div>

      <div class="jo_navTitleYellow">
        <span class="jo_hover">Jo幣儲值</span>
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
      <div id="jo_notLogged" style="display: none;">
        <div class="jo_navTitleYellow">
          <span class="jo_hover">註冊</span>
          <hr />
        </div>

        <div class="jo_navTitleYellow">
          <span class="jo_hover">登入</span>
          <hr />
        </div>
      </div>

      <!-- 登入 -->
      <div id="jo_login">
        <div class="jo_money">
          <img src="../assets/img/jo_icon/jo_i_coin.svg" alt />
          <div>
            <!-- 目前JO幣 -->
            <h5>${{memberData[0].joCoin}}</h5>
          </div>
        </div>

        <div class="jo_bell">
          <div id="jo_infoNum">
            <h6>{{infoCount}}</h6>
          </div>
          <img src="../assets/img/jo_icon/jo_i_bell.svg" alt class="jo_hover" @click="msgShow" />
        </div>

        <div class="jo_profile">
          <img class="joPic_hover jo_hover" :src="memberData[0].m_profile" @click="houseShow" />
        </div>
      </div>
    </div>
    <!-- 右邊資訊結束 -->

    <!-- 訊息欄位 -->
    <div class="jo_msgBar jo_notice jo_scrollbar jo_show" id="msgBar">
      <div class="jo_noticeTri"></div>
      <ul>
        <h5 id="isRead" class="joTitle_hover">-全部標示為已讀-</h5>

        <!-- 判斷訊息是否已讀 -->
        <li :key="index" v-for="(msgItem,index) in msgData" :class="[msgItem.readOrNot? noticeClass : '']">
          <h5 v-html=" msgItem.reminderContent">{{msgItem.reminderContent}}</h5>
        </li>
      </ul>
    </div>

    <div class="jo_msgBar jo_house jo_scrollbar jo_show" id="houseBar">
      <div class="jo_houseTri"></div>
      <div class="jo_house_top">
        <!-- 大頭照 -->
        <div class="jo_houseHeader">
          <img :src="memberData[0].m_profile" alt="" />
        </div>
        <!-- 個人資料 -->
        <div class="jo_houseInfo">
          <h4>memberData</h4>
          <div class="jo_houseIcon" id="jo_houseMedals">
            <img class="medalsImg" src="../assets/img/jo_images/jo_medalsCopper.svg" alt />
            <img class="medalsImg" src="../assets/img/jo_images/jo_medalsSilver.svg" alt />
            <img class="medalsImg" src="../assets/img/jo_images/jo_medalsGold.svg" alt />
          </div>
          <div class="jo_houseBtn">
            <input type="button" value="JoJo小屋" class="jo_btn jo_btnWater jo_btn_s" />
            <input type="button" value="登出" class="jo_btn jo_btnBlue jo_btn_s" />
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
                <img v-bind:src="hostingItem.a_pic" alt />
              </div>
              <div class="jo_house_joingTitle">
                <h5>{{hostingItem.a_name}}</h5>
                <h6>{{hostingItem.a_start}}</h6>
              </div>
              <div class="jo_house_joingBtn">
                <input type="button" value="取消Jo團" class="jo_btn jo_btnBlue jo_btn_s" />
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
                <img v-bind:src="joingItem.a_pic" alt />
              </div>
              <div class="jo_house_joingTitle">
                <h5>{{joingItem.a_name}}</h5>
                <h6>{{joingItem.a_start}}</h6>
                <h6>{{joingItem.m_name}}</h6>
              </div>
              <div class="jo_house_joingBtn">
                <div class="joingBtn_unPaid">
                  <input type="button" value="付款去" class="jo_btn jo_btnRed jo_btn_s" />
                  <input type="button" value="取消參Jo" class="jo_btn jo_btnBlue jo_btn_s" />
                </div>
                <div class="joingBtn_paid">
                  <input type="button" value="已付款" class="jo_btnGrey" />
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  name: "navBar",
  data() {
    return {
      // 登入後的會員資料
      memberData: [
        {
          m_ID: 1,
          m_name: "妙蛙種子",
          m_profile: require('../assets/img/memberPic/bulbasaur.jpg'),
          joCoin: 50000,
        },
      ],

      // 經驗值
      memberExp: [
        {
          m_ID: 1,
          expSum: 600,
        },
      ],

      // 通知
      msgData: [
        {
          m_ID: 1,
          reminderContent: "您所參加的活動 <span>FKParty</span> 已經成團。",
          readOrNot: 1,
        },
        {
          m_ID: 1,
          reminderContent:
            "您所參加的活動 <span>閃光小烏龜試膽大會</span> 已經成團。",
          readOrNot: 1,
        },
        {
          m_ID: 1,
          reminderContent:
            "您所參加的活動 <span>過度呼吸首映會</span> 已經成團。",
          readOrNot: 0,
        },
        {
          m_ID: 1,
          reminderContent: "您所參加的活動 <span>SHOW演唱會</span> 已被取消。",
          readOrNot: 1,
        },
        {
          m_ID: 1,
          reminderContent:
            "您所參加的活動 <span>妙蛙種子聚會</span> 已經成團。",
          readOrNot: 1,
        },
        {
          m_ID: 1,
          reminderContent:
            "您所跟隨的Jo主 <span>Show</span> 開了新團<span>ShowParty</span>",
          readOrNot: 0,
        },
        {
          m_ID: 1,
          reminderContent:
            "您所跟隨的Jo主 <span>FK</span> 開了新團<span>兔耳海咪咪",
          readOrNot: 0,
        },
        {
          m_ID: 1,
          reminderContent:
            "您所跟隨的Jo主 <span>小丹尼</span> 開了新團<span>小丹尼英語教室</span>",
          readOrNot: 0,
        },
        {
          m_ID: 1,
          reminderContent:
            "您所參加的活動 <span>你的名字繪畫大會</span> 已經成團。",
          readOrNot: 1,
        },
        {
          m_ID: 1,
          reminderContent:
            "您所跟隨的Jo主 <span>小小絞肉小象幫幫</span> 開了新團<span>紙尿布展示會</span>",
          readOrNot: 0,
        },
      ],

      // 正在主Jo的活動
      hostingData: [
        {
          a_ID: 5,
          a_name: "過度呼吸首映會",
          a_start: "2020/08/21",
          a_pic: "../assets/img/activityPic/BL.jpg",
        },
        {
          a_ID: 6,
          a_name: "數碼寶貝大冒險劇場版",
          a_start: "2020/08/30",
          a_pic: "../assets/img/activityPic/digital.jpg",
        },
      ],

      // 正在參Jo的活動
      joingData: [
        {
          m_ID: 1,
          m_pay: 1,
          m_free: 0,
          m_name: "姍姍",
          a_name: "鬼滅之刃劇場版",
          a_start: "2020/08/21",
          a_pic: "../assets/img/activityPic/kim.jpg",
        },
        {
          m_ID: 1,
          m_pay: 0,
          m_free: 0,
          m_name: "小浣熊",
          a_name: "一拳超人",
          a_start: "2020/08/21",
          a_pic: "../assets/img/activityPic/onePunchMan.jpg",
        },
        {
          m_ID: 1,
          m_pay: 0,
          m_free: 1,
          m_name: "安妮",
          a_name: "咆嘯深淵大亂鬥",
          a_start: "2020/08/21",
          a_pic: "../assets/img/activityPic/lol.jpg",
        },
      ],

      infoCount: 0,

      infoArrayLi: [],

      noticeClass: "jo_noticeRead",
    };
  },
  methods: {
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
      this.infoCount = this.infoArrayLi.length;
    },

    joingBtn: function () {
      $(".joingBtn_unPaid").hide();
      $(".joingBtn_paid").hide();

      this.joingData.forEach(function (item, index, array) {
        // 已付錢
        if (item.m_pay + item.m_free >= 1) {
          $(".joingBtn_paid").eq(index).show();
        } else {
          // 未付錢
          $(".joingBtn_unPaid").eq(index).show();
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

  mounted() {
    this.msgSetting();
    this.memberMedals();
    this.joingBtn();
  },
};
</script>

<style>
.nav_active{
  color: brown;
}
a {
  color: #FFFFFF;
}
a:hover{
  color:var(--jo_dGrey1) ;
}

</style>
