<template>
  <div style="width:100% ;height:100vh ;display:flex">  
    <div class="text-center" id="loginForm" style="color:white;font-size:20px; margin:auto">
      帳號：
      <input type="text" v-model="myInfo.myId" id="btnID" value class="m-2 rounded border-0 p-2" />

      <br />密碼：
      <input type="text" v-model="myInfo.myPwd" id="btnPwd" class="m-2 rounded border-0 p-2" />

      <br />
      <button id="btnOK" class="btn btn-info m-3 px-5" @click="login">送出</button>
      <button class="btn btn-danger m-3 px-5" @click="logout">登出</button>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import axios from "axios";
export default {
  name: "abc",
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
        console.log(e.data[0]);
        localStorage.setItem('myinfo',JSON.stringify( e.data[0]));
        var me = JSON.parse( localStorage.getItem('myinfo'));
        console.log(me)
        // vm.checkSession();
      })
    },
    logout(){
       localStorage.clear();
        var me = JSON.parse( localStorage.getItem('myinfo'));
        console.log("222222",me);


    }
    // checkSession() {
    //   axios.get("checkSession").then((e) => {
    //     console.log(e);
    //     location.reload();
    //   });
    // },
  },
};
</script>