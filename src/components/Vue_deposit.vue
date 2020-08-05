<template>
  <div>
    <div class="jo_col_pc" id="depositBody">
      <div>
        <router-link active-class="nav_active" class="jo_hover" to="/consumption">
          <input type="button" value="Jo幣存摺" id="depositHisBtn" class="jo_btn jo_btnWater jo_btn_m" />
        </router-link>
      </div>

      <div id="depositCard">
        <h1 id="depositTitle">歡迎來到Jo幣線上儲值系統</h1>
        <!-- 區塊一 > 選擇金額 -->
        <div class="jo_formSmallTitle">
          <h5>步驟一：請選擇儲值金額</h5>
        </div>
        <ul id="depositStep1">
          <li>
            <img src="../assets/img/jo_icon/jo_i_coin.svg" alt />

            <!-- 個人資料 -->
            <h4>
              {{memberData[0].m_name}}目前擁有JO幣數量
              <span>{{memberData[0].joCoin}}</span>元
            </h4>
          </li>

          <li>
            <!-- 選擇儲值金額 -->
            <h5>請選擇您要儲值的金額：</h5>
            <select v-model="selected">
              <option :value="0" disabled="true" selected>請選擇金額</option>
              <option
                v-for="(depositItem,index) in depositList"
                :value="depositItem.price"
                :key="index"
              >{{depositItem.priceInfo}}</option>
            </select>

            <h5 class="joCoinChange">✱JO幣與新台幣換算比率為1:1</h5>
          </li>
        </ul>

        <div class="jo_formSmallTitle">
          <h5>步驟二：請填寫卡號</h5>
        </div>

        <!-- 右邊區域 -->
        <div id="depositDown">
          <div id="creditUlDiv">
            <ul id="depositStep2">
              <li>
                <h5>
                  適用的信用卡及金融機構：
                  <img src="../assets/img/jo_icon/jo_visa.svg" alt />
                  <img src="../assets/img/jo_icon/jo_mastercard.svg" alt />
                  <img src="../assets/img/jo_icon/jo_jcb.svg" alt />
                </h5>
              </li>
              <li>
                <h5 id="thisDeposit">
                  本筆訂單需付款的金額
                  <span>${{selected}}</span>
                </h5>
              </li>
              <li>
                <div id="writeCredit">
                  <div class="creditForm">
                    <h5>持卡人姓名：</h5>
                    <input type="text" placeholder="請輸入姓名" />
                  </div>
                  <div id="depositCredit" class="creditForm">
                    <h5>信用卡卡號：</h5>
                    <br />
                    <div>
                      <input type="text" placeholder=" " />
                      <h5>&nbsp;-&nbsp;</h5>
                      <input type="text" placeholder=" " />
                      <h5>&nbsp;-&nbsp;</h5>
                      <input type="text" placeholder=" " />
                      <h5>&nbsp;-&nbsp;</h5>
                      <input type="text" placeholder=" " />
                    </div>
                  </div>

                  <div class="creditForm" id="depositExpired">
                    <h5>有效年月：</h5>

                    <select name id>
                      <!-- 月份 -->
                      <option
                        v-bind:value="monthItem"
                        :key="monthItem"
                        v-for="(monthItem) in creditMonth"
                      >{{monthItem}}</option>
                    </select>
                    <h5>月</h5>
                    <select name id>
                      <!-- 年分 -->
                      <option
                        v-bind:value="yearItem"
                        :key="yearItem"
                        v-for="(yearItem) in creditYear"
                      >{{yearItem}}</option>
                    </select>
                    <h5>年</h5>
                  </div>

                  <div class="creditForm" id="depositThree">
                    <h5>背面末三碼：</h5>
                    <input type="text" value />
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <!-- 圖 -->
          <div id="creditImgDiv">
            <div>
              <img
                id="creditImg"
                class="ld ld-bounceAlt"
                src="../assets/img/jo_images/jo_creditCard.svg"
                alt
              />
              <div id="creditShadow" class></div>
            </div>
          </div>
        </div>

        <div class="custom-control custom-checkbox creditForm" id="creditCheck">
          <input type="checkbox" class="custom-control-input" id="cCheck" />
          <label class="custom-control-label jo_hover" for="cCheck">
            <h5>
              我已詳細閱讀
              <span id="creditTerm" class="jo_hover">服務條款</span>
              ，並同意其內容
            </h5>
          </label>
        </div>

        <div id="creditBtnDiv">
          <input
            type="button"
            class="jo_btn jo_btnRed"
            id="creditBtn"
            value="確定儲值"
            @click="creditOK"
          />
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="payModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <!-- modal -->
      <div class="modal-dialog modal-dialog-centered pay-dialog" role="document">
        <div class="jo_modal pay-dialog" id="payModal_body">
          <div class="jomodal_content">
            <img src="@/assets/img/jo_images/jo_depositSuccess.svg" />
            <h1>儲值成功</h1>
            <h4>
              你目前持有的Jo幣
              <span>{{memberData[0].joCoin}}元</span>
            </h4>
            <h5>{{minute}}秒後回到首頁</h5>
          </div>
          <!-- <div class="jomodal_footer"></div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import axios from "axios";
export default {
  name: "deposit",
  data() {
    return {
      // 100,500,100,1500,2000
      selected: 0,
      depositList: [
        { price: 100, priceInfo: "100元 - 100 Jo幣" },
        { price: 500, priceInfo: "500元 - 500 Jo幣" },
        { price: 1000, priceInfo: "1000元 - 1000 Jo幣" },
        { price: 1500, priceInfo: "1500元 - 1500 Jo幣" },
        { price: 2000, priceInfo: "2000元 - 2000 Jo幣" },
      ],
      memberData: [{}],
      creditMonth: [
        "一月",
        "二月",
        "三月",
        "四月",
        "五月",
        "六月",
        "七月",
        "八月",
        "九月",
        "十月",
        "十一月",
        "十二月",
      ],
      creditYear: [],
      minute: 3,
    };
  },
  methods: {
    checkSession() {
      var vm = this;
      axios.get("checkSession").then((e) => {
        vm.memberData = e.data;
        // console.log(e.data);
      });
    },

    creditOK() {
      var rm = this;
      var id = rm.memberData[0].m_ID;
      var select = rm.selected;
      rm.memberData[0].joCoin = parseInt(rm.memberData[0].joCoin) + rm.selected;
      var money = rm.memberData[0].joCoin;
      axios
        .post("deposit", { id: id, money: money, select: select })
        .then((e) => {
          this.successModal();
        });
    },

    getYears() {
      var i;
      var year = new Date().getFullYear();
      // console.log(year);
      for (i = year; i <= year + 5; i++) {
        this.creditYear.push(i);
      }
    },

    successModal() {
      var tm = this;

      $("#payModal").modal("show");

      setInterval(() => {
        tm.minute = tm.minute - 1;
        // console.log(tm.minute);
      }, 1000);

      setTimeout(() => {
        window.location.replace("/");
      }, 3000);
    },
  },

  created() {
    this.checkSession();
  },

  mounted() {
    this.getYears();
  },
};
</script>

<style>
@import "../assets/css/desposit.css";
</style>
