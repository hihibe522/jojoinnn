<template>
  <!-- J轉幸運盤Modal -->
  <div
    class="modal fade"
    id="wheelModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog wheelModal-dialog modal-dialog-centered" role="document">
      <div class="jo_modal wheelModal_width">
        <div class="jomodal_title">
          <button
            role="button"
            data-dismiss="modal"
            class="madalClose modal_close jo_hover"
            title="Close"
          >
            <span></span>
          </button>
        </div>
        <div class="jomodal_content">
          <h1>幸運轉盤</h1>
          <div id="wheel">
            <div class="wheelPoleCircle wheelPoleCircleOut"></div>
            <div class="wheelPoleCircle"></div>
            <div class="wheelPole"></div>
            <div class="wheelFrame">
              <div class="wheelCenter wheelStar"></div>
              <div class="wheelCenter"></div>
              <div class="wheelCenterOuter wheelCenter"></div>

              <!-- 外框線 -->
              <div class="wheelOuter"></div>
            </div>
          </div>
          <input
            v-if="!hasClick"
            type="button"
            class="jo_btn jo_btnOrange"
            id="luckyClick"
            value="點我抽獎"
            @click="getGiftBtn"
          />
          <input v-if="hasClick" type="button" class="jo_btnGrey" id="luckyClick" value="已抽獎" />

          <img id="giftImage" class="giftShow" :src="getGiftPic" />
          <div class="giftGetInfo giftShow">
            <h4>恭喜你獲得{{getGiftName}}！</h4>
            <h5>兌換期限：{{getGiftDeadline}}</h5>
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
  name: "modallucky",
  props: ["m_ID"],
  data() {
    return {
      giftList: [{}],
      ballNum: 15,
      wheelNum: 0,
      total: 0,
      bumpNum: "",
      wheelCount: 0,
      ring: 0,
      intervalStop: function () {},
      getGiftPic: "",
      getGiftName: "",
      getGiftDeadline: "",
      hasClick: false,
    };
  },
  methods: {
    getGiftList() {
      var vm = this;
      axios.get(`member/gift`).then((e) => {
        vm.giftList = e.data;
        // console.log(e.data);
        this.drawWheel();
      });
    },

    drawBall() {
      // 球的總數
      for (var k = this.ballNum; k <= 360; k = k + this.ballNum) {
        $(".wheelOuter").after(
          `<div class="circle"><div class="ball"></div></div>`
        );
        $(".circle").eq(0).css("transform", `rotateZ(${k}deg)`);
        // console.log(weelCount);
      }
      // 燈泡
    },
    changeLight() {
      // console.log("燈泡")
      // 會抓到幾度的燈泡 //每15度一個燈泡
      this.wheelCount = (this.wheelCount + this.ballNum) % 360;

      // 燈泡索引值 = (目前角度/一個燈泡轉幾度)-1
      this.bumpNum = this.wheelCount / this.ballNum - 1;

      $(".circle")
        .eq(this.bumpNum - 360 / this.ballNum + 3)
        .removeClass("wheelLightAni");
      $(".circle").eq(this.bumpNum).addClass("wheelLightAni");

      setTimeout(() => {
        this.changeLight();
      }, 80);
    },

    drawWheel() {
      // 繪圖
      for (var i = 0; i <= 315; i = i + 45) {
        var A = `${i}deg`;
        var j = i / 45;
        var imgSrc = require("@/assets/img/jo_images/jo_wheel.svg");
        var C = $(".wheelFrame").append(
          ` <div class="wheelBody"><div><h4>${this.giftList[j].gift_name}</h4></div><img src=${imgSrc} alt=""></div>`
        );
        var wheelW = $(".wheelFrame").height() * 0.5;
        $(".wheelBody img").css("width", `${wheelW}px`);
        $(".wheelBody img").css("height", `${wheelW}px`);
        $(".wheelBody").css("left", `${wheelW * 0.5}px`);

        var circleW = $(".circle").width() * 0.5;
        $(".circle").css("left", `${wheelW - circleW}px`);
        if (j % 2 == 0) {
          $(".wheelBody").eq(j).addClass("wheelBody2");
        }
        $(".wheelBody").eq(j).css("transform", `rotateZ(${i}deg)`);
      }
    },

    getGiftBtn() {
      this.hasClick = true;
      this.wheelNum = 0;
      this.ring = 360 * 10 + 45;
      console.log(this.wheelNum);
      this.wheelNum = Math.floor(Math.random() * 8);
      console.log(this.wheelNum);
      this.total = this.ring - 45 * this.wheelNum;
      $(".wheelFrame").addClass("wheelAni");
      $(".wheelAni").css("transform", `rotateZ(${this.total}deg)`);
      $(".wheelPole").addClass("wheelPoleAni");
      $("#wheel").addClass("ld ld-tremble");
      var getGift = 0;

      // 被選中的孩子
      var intervalGift = setTimeout(() => {
        $(".wheelBody").eq(this.wheelNum).addClass("wheelFinish");
        $("#wheel").removeClass("ld-tremble");
        $("#wheel").addClass("ld-jingle");
      }, 3500);

      // 桿子停止
      var intervalPole = setInterval(() => {
        $(".wheelPole").removeClass("wheelPoleAni");
      }, 4000);

      // 圖片出現
      var intervalPic = setInterval(() => {
        this.getGiftPic = `/static/img/gift/${
          this.giftList[this.wheelNum].gift_pic
        }`;
        this.getGiftName = this.giftList[this.wheelNum].gift_name;
        this.getGiftDeadline = this.giftList[
          this.wheelNum
        ].gift_deadline.substring(0, 10);

        $("#wheel").hide();
        $("#luckyClick").hide();
        $(".giftShow").show();
      }, 6000);

      $("#luckyClick").prop("disabled", true);
      $(this).removeClass(" jo_btn");
      $(this).removeClass(" jo_btnOrange");
      $(this).addClass(" jo_btnGrey");
      $(this).val("已抽獎");

      this.intervalStop = function () {
        clearInterval(intervalPic);
        clearInterval(intervalPole);
        clearInterval(intervalGift);
        this.hasClick = false;
      };

      let vm = this;
      let gift_ID = this.giftList[this.wheelNum].gift_ID;

      // 抽中禮物;
      axios
        .post("member/memberGift", { id: this.m_ID, gift_ID: gift_ID })
        .then((e) => {
          setTimeout(function () {
            vm.$bus.$emit("getGift");
          }, 5000);
        });
    },
  },
  created() {
    this.getGiftList();
    this.$bus.$on("luckyinit", (event) => {
      this.intervalStop();
      console.log("BUS ON");
    });
  },

  beforeDestroy: function () {
    this.$bus.$off("luckyinit");
  },

  mounted() {
    this.drawBall();
    this.changeLight();
  },
};
</script>

<style>
#giftImage {
  height: 250px;
  width: 250px;
  object-fit: cover;
}
</style>