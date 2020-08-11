<template>
  <!-- ******************** content ******************** -->
  <div style="height: 100vh;" class="d-flex text-center">
    <div id="content" class="m-auto" style="z-index: 1000">
      <img style="width: 75px;" src="../assets/img/jo_images/jo_birdC.svg" alt />
      <h2>恭喜你！已成功開團</h2>
      <h3>可到JoJo小屋查看你目前開的團</h3>
      <h4>倒數{{secCount}}秒後回個人頁</h4>
    </div>


  </div>

  <!-- ********************/content ******************** -->
</template>

<script>
import $ from "jquery";
import axios from "axios";
var c_ID;
var aHostID;
var m_ID;
export default {
  name: "newActFinish",
  data() {
    return {
      secCount: 3,
    };
  },
  methods: {
    reciprocal: function () {
      var Timer = setInterval(() => {
        this.secCount = this.secCount - 1;
      }, 1000);

      setTimeout(() => {
        clearInterval(Timer);
        this.$router.push('/member/')
      }, 3000);
    },
  },
  mounted() {
    this.reciprocal();
  },
};
</script>


<style scroped>
#content h2,#content h3,#content h4 {
   font-weight: bold;
    color:#81C7D4;
    margin-top: 10px;
}


</style>