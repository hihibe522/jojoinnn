
<template>
  <div id="payPage" class="position-relative">
    <div id="paymentContent" class="position-absolute">
      <div id="ldAnimation" class="position-relative ld ld-swim2">
        <img class="m-auto position-absolute" src="../assets/img/付款頁面/工作區域 1.svg" alt />
        <img
          id="a_image"
          class="position-absolute"
          style="width: 13vw;height:25vh; top: 13vh; left: 6vw;"
          src="../assets/img/活動說明頁/活動封面.jpg"
          alt
        />

        <div class="position-absolute" style="right: 11vw; top:12vh ;">
          <h4 style="color: var(--jo_water)">{{a_name}}</h4>
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
  </div>
</template>

    <script>
import $ from "jquery";
import axios from "axios";

export default {
  name: "payPage",
  data() {
    return {
      a_name: "FK party",
      joCoin: "10000",
      a_price: "300",
      con_deposit: "9700",
      con_event: "活動消費",

    };
  },

  methods: {
    refreshPage() {
      axios.get("payPage").then((e) => {
        // console.log(e);
        // console.log(e.data.payment[0]);
     
        var payment = e.data.payment[0];
        var member = e.data.member[0];

        this.a_name = payment.a_name;
        this.joCoin = member.joCoin;
        this.a_price = payment.a_price;
        this.con_deposit = this.joCoin - this.a_price;
     
      });
    },
    payAction() {
  
      axios.put("payPage").then((e) => {
        console.log(e);

      });
    },
  },
  mounted() {
    this.refreshPage();
  },
};
</script>



<style>
@import "../assets/css/pay.css";
</style>



