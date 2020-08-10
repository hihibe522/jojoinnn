<template>
  <!-- 查看評分 -->
  <div
    class="modal fade"
    id="seeRaking_modal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog giveStar_modal-dialog modal-dialog-centered" role="document">
      <div class="jo_modal">
        <div class="jomodal_title">
          <button role="button" data-dismiss="modal" class="madalClose modal_close jo_hover" title="Close">
            <span></span>
          </button>
        </div>
        <div class="jomodal_content giveStar_modal_content">
          <h1>查看評價</h1>
          <h5 class="cancelInfo seeRankInfo">
            在活動
            <span>「{{a_name}}」</span>中所獲得的評價
          </h5>
          <hr />
          <div class="seeRankMember" v-for="(commandItem,index) in commandData" :key="index">
            <div class="seeRank_memberCard">
              <h5 class="joTitle_hover jo_hover">{{commandItem.m_name}}</h5>
              <div class="jo_getRate">
                <starrate :m_rate="commandItem.rate"></starrate>
              </div>
              <div class="commentContent">
                <div>{{commandItem.a_text}}</div>
              </div>
              <hr />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import axios from "axios";
import starrate from "./StarRate";

export default {
  name: "modalcommand",
  components: {
    starrate,
  },
  data() {
    return {
      commandData: [{}],
      a_ID: -1,
      a_name: "",
    };
  },
  methods: {
    getCommandList() {
      let vm = this;
      let aid = this.a_ID;
      axios.get(`member/memberCommand/${aid}`).then((e) => {
        vm.commandData = e.data;
        console.log("歷史", vm.commandData);
      });
    },
  },

  created() {
    // this.getCommandList();
    this.$bus.$on("getCommand", (event) => {
      this.a_ID = event.a_ID;
      this.a_name = event.a_name;
      this.getCommandList();
    });
  },
  beforeDestroy: function () {
    this.$bus.$off("getCommand");
  },
};
</script>

<style >
.commentContent {
  padding: 1px;
}

#seeRaking_modal .jo_getRate {
  margin-bottom: 1rem;
}
@import "../assets/css/member.css";
@import "../assets/css/jo_modal.css";
</style>