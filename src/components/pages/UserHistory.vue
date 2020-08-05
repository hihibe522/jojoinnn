<template>
    <div>
    <!-- 歷史活動 -->
    <!-- 主Jo歷史 -->
                    <div class="memberEvent hisHostSection">
                        <div class="joiningCard">
                            <div class="joiningPic hisHostPic">
                                <img class="jo_hover pic_hover" src="@/assets/img/activityPic/BTS.png" alt="">
                            </div>
                            <div class="joiningInfo hisHostInfo">
                                <ul>
                                    <li>
                                        <h4 class="jo_hover title_hover">BTS演唱會</h4>
                                    </li>
                                    <li>
                                        <h6>主Jo：妙蛙種子</h6>
                                    </li>
                                    <li>
                                        <h6>活動日期：2018/12/9</h6>
                                    </li>
                                    <li>
                                        <h6>活動地點：桃園棒球場</h6>
                                    </li>
                                </ul>
                            </div>
                            <div class="joiningBtn">
                                <div><input type="button" class="jo_btn jo_btnWater jo_btn_s" value="查看評價"
                                        data-toggle="modal" data-target="#seeRaking_modal"></div>
                            </div>
                        </div>

                    </div>

                    <!-- 參加歷史 -->
                    <div class="memberEvent hisHostSection">

                        <!-- 卡片 -->
                        <div class="joiningCard">
                            <div class="joiningPic hisJoinPic">
                                <img class="jo_hover pic_hover" src="@/assets/img/activityPic/digital.jpg" alt="">
                            </div>
                            <div class="joiningInfo hisJoinInfo">
                                <ul>
                                    <li>
                                        <h4 class="jo_hover title_hover">數碼寶貝 LAST EVOLUTION 絆</h4>
                                    </li>
                                    <li>
                                        <h6>主Jo：姍姍來了</h6>
                                    </li>
                                    <li>
                                        <h6>活動日期：2020/05/20</h6>
                                    </li>
                                    <li>
                                        <h6>活動地點：台中市西屯區河南路三段120號 TigerCity</h6>
                                    </li>
                                </ul>
                            </div>
                            <div class="joiningBtn">

                                <div><input type="button" class="jo_btn jo_btnOrange jo_btn_s" value="留下評價"
                                        data-toggle="modal" data-target="#giveStar_modal"></div>
                            </div>
                        </div>

                        <!-- 卡片 -->
                        <div class="joiningCard">
                            <div class="joiningPic hisJoinPic">
                                <img class="jo_hover pic_hover" src="@/assets/img/activityPic/onePunchMan.jpg" alt="">
                            </div>
                            <div class="joiningInfo hisJoinInfo">
                                <ul>
                                    <li>
                                        <h4 class="jo_hover title_hover">一拳超人見面會</h4>
                                    </li>
                                    <li>
                                        <h6>主Jo：Be好神</h6>
                                    </li>
                                    <li>
                                        <h6>活動日期：2019/01/01</h6>
                                    </li>
                                    <li>
                                        <h6>活動地點：台中市北區三民路三段161號 中友百貨</h6>
                                    </li>
                                </ul>
                            </div>
                            <div class="joiningBtn">
                                <div></div>
                                <div><input type="button" class="jo_btnGrey jo_btn_s" value="已評價"></div>
                            </div>
                        </div>

                    </div>
    </div>
</template>

<script>
import $ from "jquery";
import axios from "axios";

export default {
    

}
</script>

<style>

</style>