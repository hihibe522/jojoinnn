<template>    
    <!-- 加入會員歡迎開始 -->
    <div class="jo_col_pc" id="registerWelcomeAppForm">
        <form class="col-lg-8 col-md-12 col-sm-12 row m-auto">
            <!-- 太空鳥開始 -->
            <div class="m-auto row">
                <div id="myBirdSpace" class="col-8 d-flex "></div>
                <div id="checkedBox" class="col-4 d-flex align-self-start"></div>
            </div>
            <!-- 太空鳥結束 -->

            <div id="registerWelcomeAppForm" class="col-12 d-flex">
                <div class="m-auto">
                    <h1>
                        歡迎加入Jo星球 ! ! !
                    </h1>

                    <h4 class="registerWelcomeSmallWord">
                        請<router-link to="/login" class="jo_hover">登入</router-link>繼續使用
                    </h4>
                </div> 
            </div>
        </form>
    </div>
    <!-- 加入會員歡迎結束 -->
</template>
<script>
export default {
    
}
</script>
<script>
    import $ from "jquery";
    import axios from "axios";
    export default{
        name: "registerWelcome",
        data() {
            return {
                
            }
        },
    }

</script>

<style>
    @import "../../assets/css/registerWelcome.css";

</style>