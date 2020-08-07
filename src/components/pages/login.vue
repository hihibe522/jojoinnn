<template>
  <!-- 會員登入開始 -->
  <div class="jo_col_pc" id="myLoginForm">
    <div class="position-relative row" id="myLoginFormRow">
      <div class="col-5 leftSide p-0">
        <div class="ld ld-swim">
          <img class="rocket3 ld ld-tremble" src="@/assets/img/jo_images/jo_birdLogin.svg" alt />
        </div>
      </div>
      <div class="col-7 p-0">
        <div class="formbox">
          <!-- 標題文字開始 -->
          <div id="myLoginHeader" class="col-12 d-flex">
            <div class="m-auto">
              <h1>會員登入</h1>
            </div>
          </div>
          <!-- 標題文字結尾 -->

          <!-- 表格內容開始 -->
          <div class="row m-auto">
            <div class="m-auto w-100">
              <!-- 輸入帳號開始 -->
              <div class="form-group row qTitle m-auto">
                <label for="accountName" class="align-items-center col-3 col-form-label">帳號</label>
                <div class="align-items-center col-8">
                  <input
                    v-model="myInfo.myId"
                    placeholder="請輸入會員帳號"
                    id="accountName"                 
                    type="text"
                    class="form-control myForm-control"
                    required
                  />
                </div>
              </div>
              <!-- 輸入帳號結束 -->

              <!-- 輸入密碼開始 -->
              <div class="form-group row m-auto">
                <label for="passwordName" class="align-items-center col-3 col-form-label">密碼</label>
                <div class="col-8">
                  <input
                    v-model="myInfo.myPwd"
                    placeholder="請輸入會員密碼"
                    id="passwordName"              
                    type="text"
                    class="form-control myForm-control"
                    required
                  />
                </div>
              </div>
              <!-- 輸入密碼結束 -->

              <!-- 詢問加入會員開始 -->
              <div class="form-group row m-auto">
                <label class="align-items-center"></label>
                <div class="m-auto">
                  還不是Jo人嗎?
                  <router-link to="/register">                  
                    <span class="myRules jo_hover">
                      來這註冊
                    </span>
                  </router-link>
                  <!-- <label for="myRules_0">
                    還不是Jo人嗎?
                    <a href="" class="jo_hover">來這註冊</a>
                  </label> -->
                </div>
              </div>

              <!-- 詢問加入會員結束 -->
              <div class="m-auto">
                <div id="confirmBtn" class="m-5 text-center">
                  <div class="m-auto">
                    <a href="">
                      <input @click="login" id="btnOK" value="登入" class="jo_btn jo_btnWater" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 會員登入結束 -->
</template>



<script>
import $ from "jquery";
import axios from "axios";
export default {
  name: "login",
  data() {
    return {
      myInfo: { myId: "", myPwd: "" },
    };
  },
  methods: {
    login() {
      var vm = this;
      let account = vm.myInfo.myId;
      let pwd = vm.myInfo.myPwd;
      axios.post("login", { account: account, pwd: pwd }).then((e) => {
        console.log(e.data);
        if(e.data == "登入失敗"){
          vm.$toasted.show('登入失敗😉');
          return;
        }
        localStorage.setItem('myinfo',JSON.stringify( e.data[0]));
        var me = JSON.parse( localStorage.getItem('myinfo'));
        // console.log(me)

        //控制JO聊啟動
        vm.$bus.$emit('islogin',me);
        vm.$router.push('/');
      })
    },
    logout(){
       localStorage.clear();
        var me = JSON.parse( localStorage.getItem('myinfo'));
        
        //控制JO聊關閉
        this.$bus.$emit('logout');
        window.location.replace("/");

    }
  },
};
</script>

<style scoped>
@import "../../assets/css/login.css";

</style>