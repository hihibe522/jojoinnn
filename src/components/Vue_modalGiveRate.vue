<template>
  <!-- 評分 -->
  <div
    class="modal fade"
    id="giveStar_modal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog giveStar_modal-dialog modal-dialog-centered" role="document">
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
        <div class="jomodal_content giveStar_modal_content">
          <h1>留下評價</h1>
          <h5 class="cancelInfo">
            <img :src="hostMemberData.m_profile" alt class="giveStarAvatar" />
            {{hostMemberData.m_name}}
          </h5>
          <hr />
          <div class="jo_rating">
            <img src="../assets/img/jo_icon/jo_i_starFull.svg" alt />
            <img src="../assets/img/jo_icon/jo_i_starFull.svg" alt />
            <img src="../assets/img/jo_icon/jo_i_starFull.svg" alt />
            <img src="../assets/img/jo_icon/jo_i_starFull.svg" alt />
            <img src="../assets/img/jo_icon/jo_i_starFull.svg" alt />
          </div>
          <hr />
          <textarea
            rows="6"
            placeholder="留下評價，給Jo主一點鼓勵喔！"
            class="jo_scrollbar"
            v-model="commandText"
          ></textarea>
        </div>
        <div class="jomodal_footer">
          <input
            type="button"
            class="jo_btn jo_btn_m jo_btnOrange"
            value="送出評價"
            @click="giveStarBtn"
          />
          <input type="button" class="jo_btn jo_btn_m jo_btnBlue" data-dismiss="modal" value="取消" />
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
      hostMemberData: [{}],
      a_ID: -1,
      a_name: "",
      me_ID: -1,
      a_starCount: 0,
      commandText: "",
    };
  },
  methods: {
    getHostData() {
      let aid = this.a_ID;
      let vm = this;
      axios.get(`member/hostMemberData/${aid}`).then((e) => {
        vm.hostMemberData = e.data[0];
        // 圖片叫用
        vm.hostMemberData.m_profile = `/static/img/head/${vm.hostMemberData.m_profile}`;
        // console.log(vm.hostMemberData.m_profile);
      });
    },

    giveStar() {
      var vm = this;
      var i;
      $(".jo_rating img").addClass("jo_starGrey");
      var Rating = {
        removeGrey: (e) => {
          $(".jo_rating img").eq(i).removeClass("jo_starGrey");
        },
        addGrey: (e) => {
          $(".jo_rating img").eq(i).addClass("jo_starGrey");
        },
      };

      $(".jo_rating img").hover(
        function (e) {
          // 變彩色
          for (i = 0; i <= $(this).index(); i++) {
            Rating.removeGrey();
          }
        },
        function (e) {
          // 變黑白
          for (i = 0; i <= $(this).index(); i++) {
            console.log(i);
            Rating.addGrey();
          }
        }
      );

      // 給評價
      $(".jo_rating img").click(function (e) {
        $(".jo_rating img").off("mouseenter mouseleave");

        // 如果是彩色
        if ($(this).hasClass("jo_starGrey") == false) {
          for (i = $(this).index() + 1; i < $(".jo_rating img").length; i++) {
            Rating.addGrey();
          }
        } else {
          // 變彩色
          $(".jo_rating img").addClass("jo_starGrey");
          for (i = 0; i <= $(this).index(); i++) {
            Rating.removeGrey();
          }
        }

        vm.a_starCount = 5 - $(".jo_starGrey").length;
        console.log("分數1", vm.a_starCount);
      });
    },
    giveStarBtn() {
      let vm = this;
      if (vm.a_starCount < 1) {
        this.$toasted.show(`請給予評分！`);
        return;
      }
      console.log(this.a_ID, this.me_ID, this.commandText, this.a_starCount);
      axios
        .put("member/giveStar", {
          aid: vm.a_ID,
          id: vm.me_ID,
          star: vm.a_starCount,
          commandInfo: vm.commandText,
        })
        .then(() => {
          this.$toasted.show(
            `已成功給予Jo主「${this.hostMemberData.m_name}」評價`
          );
          $("#giveStar_modal").modal("hide");
        });
    },
  },

  created() {
    // this.getCommandList();
    this.$bus.$on("giveRate", (event) => {
      this.a_ID = event.a_ID;
      this.a_name = event.a_name;
      this.me_ID = event.m_ID;
      this.getHostData();
      this.giveStar();
    });
  },
  beforeDestroy: function () {
    this.$bus.$off("giveRate");
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