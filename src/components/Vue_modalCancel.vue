<template>
  <!-- 取消jo團modal -->
  <div
    class="modal fade"
    id="cancelHoding_modal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog cancelHoding_modal-dialog modal-dialog-centered" role="document">
      <div class="jo_modal">
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
          <h1>取消Jo團</h1>
          <h5 class="cancelInfo">
            請填寫取消原因，
            <br />我們會將取消的原因發布給參加者：
          </h5>
          <textarea
            rows="6"
            placeholder="請填寫原因"
            class="jo_scrollbar"
            v-model="cancelData[0].a_cancellReason"
          ></textarea>
        </div>
        <div class="jomodal_footer">
          <button type="button" class="jo_btn jo_btn_m jo_btnOrange" @click="cancelOK">確定</button>
          <input type="button" class="jo_btn jo_btn_m jo_btnBlue" data-dismiss="modal" value="再想一下" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import axios from "axios";

export default {
  name: "modalcancel",
  data() {
    return {
      cancelData: [
        {
          a_cancellReason: "",
        },
      ],
      a_ID: -1,
      a_name: "",
    };
  },
  methods: {
    cancelOK() {
      var vm = this;
      $("#cancelHoding_modal").modal("hide");

      axios
        .post("cancelHost", {
          aId: vm.a_ID,
          aName: vm.a_name,
          cancelReason: vm.cancelData[0].a_cancellReason,
        })
        .then((array) => {
          var meLog = JSON.parse(localStorage.getItem("myinfo"));
          vm.$bus.$emit("NewMsg");
          vm.$toasted.show(`活動「${vm.a_name}」已被取消`);
          vm.$bus.$emit("cancelOK");
          vm.$bus.$emit("cancelOK_member");
        });
    },
  },

  created() {
    this.$bus.$on("cancelHost", (event) => {
      this.a_ID = event.a_ID;
      this.a_name = event.a_name;
    });
  },
  beforeDestroy: function () {
    this.$bus.$off("cancelHost");
  },
};
</script>

<style >
@import "../assets/css/jo_modal.css";
</style>