<template>
  <div>
    <!-- 標題區塊 -->
    <div class="title">
      <h2>Jo轉幸運盤</h2>
    </div>
    <!-- 標題區塊結束 -->
    <div id="luckySection" class="memberEvent">
      <div class="luckyCard">
        <div class="luckyTitle">
          <h5>經驗值</h5>
        </div>
        <h4 id="totalExp">
          目前總經驗值：
          <span>{{totalExp}}</span> Exp
        </h4>
        <div id="barSection">
          <h4 id="needExp">
            距離下次抽獎還需
            <span>{{expPercent}}Exp</span>
          </h4>
          <div class="progress" id="expBar">
            <div
              id="expBarInner"
              class="progress-bar progress-bar-striped progress-bar-animated"
              :style="barWidth"
            ></div>
          </div>
          <div style="width:100%">
            <div id="bobbleDiv" :style="barWidth">
              <div id="triangle"></div>
              <div id="expBobble">{{expPercent}}/100</div>
            </div>
          </div>
        </div>

        <div class="luckyTitle">
          <h5>獎品兌換</h5>
        </div>
        <div id="ChangeGift">
          <h4 id="lotteryCount">
            還可以進行
            <span>30</span> 次抽獎
          </h4>
          <input
            type="button"
            value="點我兌換"
            class="jo_btn jo_btn_m jo_btnWater"
            id="changeClickBtn"
            data-toggle="modal"
            data-target="#wheelModal"
          />
        </div>

        <div class="luckyTitle">
          <h5>兌換紀錄</h5>
        </div>

        <!-- 禮物卡片 -->
        <div class="joiningCard">
          <div class="joiningPic giftPic">
            <img class="jo_hover pic_hover" src="../assets/img/gift/giftA.jpg" alt />
          </div>
          <div class="joiningInfo giftInfo">
            <ul>
              <li>
                <h4>千年積木</h4>
              </li>
              <li>
                <h6>兌換期限：2020/07/30</h6>
              </li>
            </ul>
          </div>
          <div class="joiningBtn">
            <div></div>
            <div>
              <input
                type="button"
                class="jo_btn jo_btnRed jo_btn_s"
                value="兌換"
                data-toggle="modal"
                data-target="#changeGift_modal"
              />
            </div>
          </div>
        </div>
        <!-- 禮物卡片結束 -->

        <!-- 禮物卡片 -->
        <div class="joiningCard">
          <div class="joiningPic giftPic">
            <img class="jo_hover pic_hover" src="../assets/img/gift/giftB.jpg" alt />
          </div>
          <div class="joiningInfo giftInfo">
            <ul>
              <li>
                <h4>千年智慧輪</h4>
              </li>
              <li>
                <h6>兌換期限：2020/07/1</h6>
              </li>
            </ul>
          </div>
          <div class="joiningBtn">
            <div></div>
            <div>
              <input type="button" class="jo_btnGrey jo_btn_s" value="已兌換" />
            </div>
          </div>
        </div>
        <!-- 禮物卡片結束 -->
      </div>
    </div>
    <input
      type="button"
      value="點我兌換"
      class="jo_btn jo_btn_m jo_btnWater"
      id=""
      data-toggle="modal"
      data-target="#cancelHoding_modal2"
    />

  </div>
</template>


<script>
import $ from "jquery";
import axios from "axios";


export default {
  name: "memberLucky",

  data() {
    return {
      memberData: [{}],
      totalExp: 0,
      expPercent: 0,
      barWidth: "",
    };
  },

  methods: {
    checkSession() {
      var meLog = JSON.parse(localStorage.getItem("myinfo"));
      if (meLog) {
        this.memberData = meLog;
        this.getMemberExp();
      }
    },

    getMemberExp() {
      var vm = this;
      var id = vm.memberData.m_ID;
      axios.get(`member/memberInfo/${id}`).then((e) => {
        vm.totalExp = e.data.memberExp[0].expSum;
        // console.log(vm.totalExp);
        vm.expPercent = vm.totalExp % 100;
        vm.barWidth = `width: ${vm.expPercent}%`;
        // console.log(vm.expPercent);
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