<template>
  <div class="jo_col_pc" id="consumptionBody">
    <router-link active-class="nav_active" class="jo_hover" to="/deposit">
      <input type="button" name id value="返回儲值" class="jo_btn jo_btnBlue jo_btn_m" />
    </router-link>

    <div id="consumptionTitle">
      <h1>Jo幣存摺</h1>
    </div>
    <table style="width:100%">
      <tr>
        <!-- 標題 -->
        <th>
          <h4>交易時間</h4>
        </th>
        <th>
          <h4>摘要</h4>
        </th>
        <th>
          <h4>金額</h4>
        </th>
        <th>
          <h4>Jo幣餘額</h4>
        </th>
      </tr>

      <tr :key="Index" v-for="(consumptionItem,Index) in consumptionList">
        <td>
          <h5>{{consumptionItem.con_time}}</h5>
        </td>
        <td>
          <h5>{{consumptionItem.con_event}}</h5>
        </td>
        <td>
          <h5>{{consumptionItem.con_deposit}}&nbsp;Jo幣</h5>
        </td>
        <td>
          <h5>{{consumptionItem.con_price}}&nbsp;Jo幣</h5>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import $ from "jquery";
import axios from "axios";
export default {
  name: "consumption",
  data() {
    return {
      consumptionList: [{}],
      memberData: [{}],
    };
  },

  methods: {
    checkSession() {
      var meLog = JSON.parse(localStorage.getItem("myinfo"));
      if (meLog) {
        this.memberData = meLog;
        this.getConsumptionList();
      } else {
        this.$router.push("/login");
        this.$toasted.show("請先登入🙇‍♀️");
      }
    },

    getConsumptionList() {
      var rm = this;
      var id = rm.memberData.m_ID;
      console.log(id);
      axios.get(`consumption/${id}`).then((e) => {
        rm.consumptionList = e.data;
        rm.consumptionList.forEach(function (e) {
          // 日期裁剪
          e.con_time = e.con_time.substring(0, 10);
        });
      });
    },
  },

  created() {
    this.checkSession();
  },
};
</script>
<style>
@import "../assets/css/consumptionHis.css";
</style>
