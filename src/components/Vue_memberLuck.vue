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
            <span>{{needexpPercent}}Exp</span>
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
            <span>{{canGetGift}}</span> 次抽獎
          </h4>
          <input
            v-if="canGetGift"
            type="button"
            value="點我抽獎"
            class="jo_btn jo_btn_m jo_btnWater"
            id="changeClickBtn"
            data-toggle="modal"
            data-target="#wheelModal"
            @click="luckyInit"
          />

          <input
            v-if="!canGetGift"
            type="button"
            value="請再加油"
            class="jo_btn_m jo_btnGrey"
            id="changeClickBtn"
          />
        </div>

        <div class="luckyTitle">
          <h5>兌換紀錄</h5>
        </div>

        <!-- 禮物卡片 -->
        <div class="joiningCard" v-for="(GiftItem,index) in GiftData" :key="index">
          <div class="joiningPic giftPic">
            <img class="jo_hover pic_hover" :src="`/static/img/gift/${GiftItem.gift_pic}`" alt />
          </div>
          <div class="joiningInfo giftInfo">
            <ul>
              <li>
                <h4>{{GiftItem.gift_name}}</h4>
              </li>
              <li>
                <h6>兌換期限：{{GiftItem.gift_deadline}}</h6>
              </li>
            </ul>
          </div>
          <div class="joiningBtn">
            <div></div>
            <div>
              <input
                v-if="GiftItem.gift_avalible"
                type="button"
                class="jo_btn jo_btnRed jo_btn_s"
                value="兌換"
                data-toggle="modal"
                data-target="#changeGift_modal"
                @click="changeGift(GiftItem.get_ID,GiftItem.gift_name)"
              />

              <input
                v-if="!GiftItem.gift_avalible"
                type="button"
                class="jo_btnGrey jo_btn_s"
                value="已兌換"
                data-toggle="modal"
                data-target="#changeGift_modal"
              />
            </div>
          </div>
        </div>
        <!-- 禮物卡片結束 -->
      </div>
    </div>
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
      GiftData: [{}],
      totalExp: 0,
      expPercent: 0,
      needexpPercent: 0,
      barWidth: "",
      canGetGift: 0,
      totalGetGift: 0,
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
        if (e.data.memberExp[0].expSum == null) {
          vm.totalExp = 0;
        } else {
          vm.totalExp = e.data.memberExp[0].expSum;
        }

        vm.needexpPercent = 100 - (vm.totalExp % 100);
        vm.expPercent = vm.totalExp % 100;
        vm.barWidth = `width: ${vm.expPercent}%`;
        vm.getMemberGift();
      });
    },

    // 禮物
    getMemberGift() {
      var vm = this;
      var id = vm.memberData.m_ID;
      axios.get(`member/memberGift/${id}`).then((e) => {
        vm.GiftData = e.data.getmemberGiftData;
        vm.GiftData.forEach(function (e) {
          e.gift_deadline = e.gift_deadline.substring(0, 10);
        });

        // 可以抽幾次
        var count = e.data.getmemberGiftCount[0].count;
        vm.totalGetGift = Math.floor(vm.totalExp / 100);
        vm.canGetGift = vm.totalGetGift - count;
      });
    },

    // 換禮物
    changeGift(e, f) {
      console.log(e);
      axios.put("member/memberGift", { get_ID: e }).then((e) => {
        this.$toasted.show(`${f}*1 兌換完成！`);
        this.getMemberGift();
      });
    },

    luckyInit() {
      this.$bus.$emit("luckyinit");
      $("#luckyClick").removeAttr("disabled");
      $(".wheelBody").removeClass("wheelFinish");
      $(".wheelAni").css("transform", `rotateZ(0deg)`);
      $(".giftShow").hide();
      $("#luckyClick").show();
      $("#wheel").show();
      $("#luckyClick").addClass(" jo_btn jo_btnOrange");
      $("#luckyClick").removeClass("jo_btnGrey");
      $("#luckyClick").val("點我抽獎");
      $(".wheelPole").removeClass("wheelPoleAni");
      $("#wheel").removeClass("ld-tremble ld-jingle");
    },
  },

  created() {
    this.checkSession();
    this.$bus.$on("getGift", (event) => {
      this.getMemberExp();
      console.log("bus");
    });
  },
  beforeDestroy: function () {
    this.$bus.$off("getGift");
  },
};
</script>

<style>
@import "../assets/css/member.css";
</style>