<template>
  <div class="jo_col_pc" id="depositBody">
    <div>
      <input type="button" value="Jo幣存摺" id="depositHisBtn" class="jo_btn jo_btnWater jo_btn_m" />
    </div>
    <form action>
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
            <h5>請選擇您要儲值的金額：</h5>
            <select name id @change="depositCount">
              <option value disabled="true" selected>請選擇金額</option>
              <option value="100">100元 - 100 Jo幣</option>
              <option value="500">500元 - 500 Jo幣</option>
              <option value="1000">1000元 - 1000 Jo幣</option>
              <option value="1500">1500元 - 1500 Jo幣</option>
              <option value="2000">2000元 - 2000 Jo幣</option>
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
                  <span>${{totalPrice}}</span>
                </h5>
              </li>
              <li>
                <div id="writeCredit">
                  <div class="creditForm">
                    <h5>持卡人姓名：</h5>
                    <input type="text" name id placeholder="請輸入姓名" />
                  </div>
                  <div id="depositCredit" class="creditForm">
                    <h5>信用卡卡號：</h5>
                    <br />
                    <div>
                      <input type="text" name id placeholder=" " />
                      <h5>&nbsp;-&nbsp;</h5>
                      <input type="text" name id placeholder=" " />
                      <h5>&nbsp;-&nbsp;</h5>
                      <input type="text" name id placeholder=" " />
                      <h5>&nbsp;-&nbsp;</h5>
                      <input type="text" name id placeholder=" " />
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
          <input type="button" class="jo_btn jo_btnRed" id="creditBtn" value="確定儲值" />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  name: "deposit",

  data() {
    return {
      memberData: [{ m_ID: 1, m_name: "妙蛙種子", joCoin: 50000 }],
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
      totalPrice: 0,
    };
  },
  methods: {
    depositCount: function (e) {
      this.totalPrice = `${e.target.value}`;
    },
    getYears: function () {
      var i;
      var year = new Date().getFullYear();
      console.log(year);
      for (i = year; i <= year + 5; i++) {
        this.creditYear.push(i);
      }
    },
  },
  mounted() {
    this.getYears();
  },
};
</script>

<style>
@import "../assets/css/desposit.css";
</style>
