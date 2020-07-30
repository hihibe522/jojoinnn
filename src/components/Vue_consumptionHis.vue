<template>
    <div class="jo_col_pc " id="consumptionBody">
        <input type="button" name="" id="" value="返回儲值" class="jo_btn jo_btnBlue jo_btn_m">
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

            <tr :key="consumptionItem.m_ID" v-for="(consumptionItem) in consumptionList">
                <td>
                    <h5>{{consumptionItem.con_time}}</h5>
                </td>
                <td>
                    <h5>{{consumptionItem.con_event}}</h5>
                </td>
                <td>
                    <h5>{{consumptionItem.con_price}}&nbsp;Jo幣</h5>
                </td>
                <td>
                    <h5>{{consumptionItem.con_deposit}}&nbsp;Jo幣</h5>
                </td>
            </tr>

        </table>
    </div>
</template>

<script>
import $ from "jquery";
export default{
  name:'consumption',
  data() {
          return {
            consumptionList: [
                { m_ID: 1, con_time: "2020 / 01 / 01", con_event: "儲值", con_price: "+5000", con_deposit: 5200 },
                { m_ID: 1, con_time: "2020 / 02 / 02", con_event: "儲值", con_price: "+1000", con_deposit: 6200 },
                { m_ID: 1, con_time: "2020 / 03 / 03", con_event: "儲值", con_price: "+1000", con_deposit: 7200 },
                { m_ID: 1, con_time: "2020 / 04 / 04", con_event: "儲值", con_price: "+1000", con_deposit: 8200 },
                { m_ID: 1, con_time: "2020 / 05 / 05", con_event: "寶可夢聚會", con_price: "-1200", con_deposit: 7000 },
                { m_ID: 1, con_time: "2020 / 06 / 06", con_event: "SHOW個人演唱會", con_price: "-5000", con_deposit: 2000 },]

          }
  },
}
    // var consumption = new Vue({
    //     el: "#consumptionBody",
    //     name:'consumption',
    //     data() {
    //       return {
    //         consumptionList: [
    //             { m_ID: 1, con_time: "2020 / 01 / 01", con_event: "儲值", con_price: "+5000", con_deposit: 5200 },
    //             { m_ID: 1, con_time: "2020 / 02 / 02", con_event: "儲值", con_price: "+1000", con_deposit: 6200 },
    //             { m_ID: 1, con_time: "2020 / 03 / 03", con_event: "儲值", con_price: "+1000", con_deposit: 7200 },
    //             { m_ID: 1, con_time: "2020 / 04 / 04", con_event: "儲值", con_price: "+1000", con_deposit: 8200 },
    //             { m_ID: 1, con_time: "2020 / 05 / 05", con_event: "寶可夢聚會", con_price: "-1200", con_deposit: 7000 },
    //             { m_ID: 1, con_time: "2020 / 06 / 06", con_event: "SHOW個人演唱會", con_price: "-5000", con_deposit: 2000 },]

    //       }
    //     },



    //     })
</script>
<style>
    /*公 */
    /* @import "./css/reset.css";
    @import "./css/bootstrap/bootstrap.css";
    @import "./css/jo_css.css"; */
    /* @import "./css/jo_animation.css"; */
    /* 公 */

    @import "../assets/css/consumptionHis.css";
</style>
