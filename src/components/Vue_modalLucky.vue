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
          <button role="button" data-dismiss="modal" class="madalClose" title="Close">
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
            type="button"
            class="jo_btn jo_btnOrange"
            id="luckyClick"
            value="點我抽獎"
            @click="getGiftBtn"
          />

          <!-- <img id="giftImage" class="giftShow" />
          <div class="giftGetInfo giftShow"></div> -->
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
  data() {
    return {
      giftList: [{}],
      ballNum: 15,
      wheelNum: 0,
      total: 0,
      A: "",
      wheelCount: 0,
      ring: 0,
    };
  },
  methods: {
    getGiftList() {
      var vm = this;
      axios.get(`member/gift`).then((e) => {
        vm.giftList = e.data;
        console.log(e.data);
        this.drawWheel();
      });
    },

    ABC() {
      // 球的總數
      for (var k = this.ballNum; k <= 360; k = k + this.ballNum) {
        $(".wheelOuter").after(
          `<div class="circle"><div class="ball"></div></div>`
        );
        $(".circle").eq(0).css("transform", `rotateZ(${k}deg)`);
        // console.log(weelCount);
      }
      // 燈泡
      this.changeLight();
    },
    changeLight() {
      // 會抓到幾度的燈泡 //每15度一個燈泡
      this.wheelCount = (this.wheelCount + this.ballNum) % 360;

      // 燈泡索引值 = (目前角度/一個燈泡轉幾度)-1
      this.wheelNum = this.wheelCount / this.ballNum - 1;
      // console.log(weelCount)

      $(".circle")
        .eq(this.wheelNum - 360 / this.ballNum + 3)
        .removeClass("wheelLightAni");
      $(".circle").eq(this.wheelNum).addClass("wheelLightAni");
      setInterval(function () {}, 80);
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
        // console.log(wheelW);
      }
    },

    getGiftBtn() {
      this.ring = 360 * 10 + 45;
      console.log("A");
      this.wheelNum = Math.floor(Math.random() * 8);
      this.total = this.ring - 45 * this.wheelNum;
      $(".wheelFrame").addClass("wheelAni");
      $(".wheelAni").css("transform", `rotateZ(${this.total}deg)`);
      $(".wheelPole").addClass("wheelPoleAni");
      $("#wheel").addClass("ld ld-tremble");
    },
  },
  created() {
    this.getGiftList();
  },

  mounted() {
    this.ABC();
  },
};
</script>

<style >
@import "../assets/css/jo_modal.css";
</style>