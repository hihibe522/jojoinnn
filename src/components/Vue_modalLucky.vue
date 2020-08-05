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
          <input type="button" class="jo_btn jo_btnOrange" id="luckyClick" value="點我抽獎" />

          <img id="giftImage" class="giftShow" />
          <div class="giftGetInfo giftShow"></div>
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
      memberData: [{}],
      totalExp: 0,
      expPercent: 0,
      barWidth: "",
    };
  },
};
</script>

<style >
@import "../assets/css/jo_modal.css";
@import "../assets/css/member.css";
</style>