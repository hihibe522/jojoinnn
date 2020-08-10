<template>
  <div id="payPage" class="position-relative" style="height:100vh">
    <div id="paymentContent" class="position-absolute">
      <div id="ldAnimation" class="position-relative ld ld-swim2">
        <img class="m-auto position-absolute" src="../assets/img/付款頁面/工作區域 1.svg" alt />
        <div class="position-absolute text-center" style="top:9vh;left:8.5vw">
          <h4 style="color: var(--jo_water);">{{a_name}}</h4>
        </div>
        <img
          id="a_image"
          class="position-absolute"
          style="width: 11vw;height:22vh; top: 17vh; left: 7.5vw;"
          :src="a_pic"
          alt
        />

        <div class="position-absolute" style="right: 13vw; top:18vh ;">
          <div class="mt-3">
            <h5>持有Jo幣 {{joCoin}}</h5>
            <h5>Jo幣扣款 {{a_price}}</h5>
            <hr />
            <h5>剩餘Jo幣: {{(con_deposit>0)?con_deposit:"餘額不足"}}</h5>
          </div>
        </div>
      </div>

      <div class="position-absolute text-center" style="top:50vh;left: 12vw;">
        <input
          data-toggle="modal"
          data-target="#my_jomodal"
          type="button"
          @click="payAction"
          name
          id
          :value="[(con_deposit>0)? '確認付款':'儲值']"
          class="jo_btn jo_btnRed mx-2 my-4 btn-sm"
          style="width:120px; height: 40px;"
        />
        <input
          type="button"
          name
          id
          value="返回"
          class="jo_btn jo_btnBlue mx-2 my-4 btn-sm"
          style="width:120px; height:40px"
        />
      </div>
    </div>

    <!-- MODAL -->
    <!-- MODAL -->
    <div
      class="modal fade"
      id="my_jomodal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="jo_modal">
          <div class="jomodal_title">
            <button
              role="button"
              type="button"
              data-dismiss="modal"
              class="modal_close jo_hover madalClose"
              title="Close"
            >
              <span></span>
            </button>
          </div>
          <div class="jomodal_content">
            <h2 class="m-3 pb-3">訂單成立</h2>
            <h2 class="m-3 pb-3">{{secCount}}秒後跳轉回會員頁面</h2>
          </div>
        </div>
      </div>
    </div>

    <!-- *********** -->
    <!-- MODAL -->
  </div>
</template>

    <script>
import $ from "jquery";
import axios from "axios";

export default {
  name: "payPage",
  data() {
    return {
      memberData: {},
      a_name: "",
      joCoin: "",
      a_price: "",
      con_deposit: "",
      con_event: "",
      secCount: 3,
      a_pic: "",
    };
  },
  created() {
    this.checkSession();
  },
  mounted() {
    // this.refreshPage();
  },
  methods: {
    checkSession() {
      var meLog = JSON.parse(localStorage.getItem("myinfo"));
      console.log(meLog);
      if (meLog) {
        this.memberData = meLog;
      } else {
        this.$router.push("/login");
        this.$toasted.show("請先登入🙇‍♀️");
      }
    },
    refreshPage() {
      var actID = this.$route.query.a_ID;
      axios.get(`payPage/${actID}`).then((e) => {
        // console.log(e);
        console.log(e.data.payment[0]);

        var payment = e.data.payment[0];

        this.a_name = payment.a_name;
        this.joCoin = this.memberData.joCoin;
        this.a_price = payment.a_price;
        this.a_pic = "../../static/img/activityPic/" + payment.a_pic;
        this.con_deposit = this.joCoin - this.a_price;
      });
    },
    payAction() {
      var deposit = {
        m_ID: this.memberData.m_ID,
        con_deposit: this.con_deposit,
        joCoin: this.joCoin,
        a_price: this.a_price,
     
      };
      if (this.con_deposit > 0) {
        this.reciprocal();
        axios.put("payPage", { deposit: deposit }).then((e) => {
          console.log(e);
        });
      } else {
        this.$router.push("/deposit");
      }
    },
    reciprocal: function () {
      var Timer = setInterval(() => {
        this.secCount = this.secCount - 1;
      }, 1000);

      setTimeout(() => {
        clearInterval(Timer);
        $("#my_jomodal").modal("hide");
        this.$router.push("/member/memberJoing");
      }, 3000);
    },
  },
  mounted() {
    this.refreshPage();
  },
};
</script>



<style scoped>
@import "../assets/css/pay.css";
</style>



