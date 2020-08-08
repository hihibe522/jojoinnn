<template>
  <div class="jo_col_pc" id="memberCol">
    <!--會員介紹左 -->
    <div class="memberMain" id="memberMain_L">
      <!-- 基本資料 -->
      <div  class="memberInfo">
        
        <img v-if="userInfo.m_name" :src="require(`../../../static/img/head/${userInfo.m_profile}`)" alt />
        <div>
          <h4 v-if="userInfo.m_name" class="memberName">{{userInfo.m_name}}</h4>
        </div>
        <div class="memberIcon">
          <img v-if="sumExp>5" class="medalsImg_m" src="@/assets/img/jo_images/jo_medalsCopper.svg" alt />
          <img v-if="sumExp>200" class="medalsImg_m" src="@/assets/img/jo_images/jo_medalsSilver.svg" alt />
          <img v-if="sumExp>600" class="medalsImg_m" src="@/assets/img/jo_images/jo_medalsGold.svg" alt />
        </div>

        <div class="btngroup">
          <input v-if="!isfollow" @click="follow" type="button" class="jo_btn jo_btnWater jo_btn_m" value="關注" />
          <input v-else @click="follow" type="button" class="jo_btn jo_btnBlue jo_btn_m" value="已關注" />
          <input @click="goChat(userInfo)" :id="userInfo.m_ID" type="button" class="jo_btn jo_btnOrange jo_btn_m" value="JO聊" />
        </div>
      </div>

      <div class="hrDIv"></div>

      <!-- 評分 -->
      <div class="memberInfo">
        <div class="memberRating" style="margin:0px">
          <starrate :m_rate="userInfo.rate"></starrate>

          <br />
          <h5>({{userInfo.counts}}人評分)</h5>
        </div>
      </div>

      <div class="hrDIv"></div>

      <!-- 自我介紹 -->
      <div class="memberInfo">
        <div class="memberIntro">
          <h5>{{userInfo.introduce}}</h5>
        </div>       
      </div>

      <div class="hrDIv"></div>
      <div class="sumExp">總經驗值 {{ sumExp }} &nbsp;exp</div>
      <div id="memberChart">   
        <chart :width=300 :height=300 :chart-data="chartdataloaded"/>
      </div>
    </div>

    <!--會員介紹右 -->
    <div class="memberMain" id="mamemberMain_R">
      <div id="mamberBookmark">
        <ul id="bookMark_ul">
          <router-link
            active-class="bookMarkClick"
            class="jo_hover bookMarkOriginal"
            :to="{ name:'userhosting',query:{m_ID:userInfo.m_ID }}">
            <li>
              <h5>正在主Jo</h5>
            </li>
          </router-link>

          <router-link
            active-class="bookMarkClick"
            class="jo_hover bookMarkOriginal"
            to="/userhouse/userhistory">
            <li>
              <h5>歷史紀錄</h5>
            </li>
          </router-link>


        </ul>
      </div>

      <!-- ------------------------------------------ -->
      <!-- 右方內容 -->
      <div id="mamemberContent">
        <div class="content">
          <router-view></router-view>
      <!-- ------------------------------------------ -->

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import axios from "axios";
import starrate from "../StarRate";
import chart from "../Radar";

export default {
  name: "userhouse",
  components: {
    starrate,
    chart
  },
  data() {
    return {
      isfollow:false,
      islog:{},
      userInfo:{},
      sumExp:0,
      labels:[],
      radarData:[]
    };
  },
  methods: {
    goChat(user){
      if(!this.islog){
        this.$toasted.show('請先進行登入😉');
        return;
      }
      this.$bus.$emit('gogochat',user);
    },
    follow(){
      var vm = this;
      if(!vm.islog){
        vm.$toasted.show('請先進行登入😉');
        return;
      }
      let send = {
            m_ID:vm.islog.m_ID,
            f_ID:vm.userInfo.m_ID
          }
      if(vm.isfollow){       
        axios.put('/modules/cancelFollow',{info:send})
        .then(e=>{
          console.log(e.data);
          vm.$toasted.show('已取消關注😉');
          vm.isfollow = false;
        })
      }
      else{
        axios.put('/modules/goFollow',{info:send})
        .then(e=>{
          vm.$toasted.show('加入關注😉');
          vm.isfollow = true;
        })
      }

    }
  },
  computed: {
    chartdataloaded:function(){     
      return {
        labels:this.labels ,
        datasets: [{
            data: this.radarData,
            backgroundColor: 'rgba(255, 203, 5, .4)',
            borderWidth: 2,
            borderColor: 'rgba(255, 203, 5)',
            pointRadius: 0,
            borderJoinStyle: "round",
            label: "",
        }],

      }
    }
  },
  created() {
    var vm = this;
    vm.islog =JSON.parse( localStorage.getItem('myinfo'));
    let userID = vm.$route.query.m_ID;
    axios.get(`user/${userID}`)
    .then(e=>{
      console.log(e.data);
      vm.userInfo = e.data[0];
    })
    .then(e=>{
      axios.get(`user/exp/${userID}`)
      .then(e=>{
        // console.log(e.data);
         vm.labels = e.data[0].map(item=>{
          return Object.values(item)[1]
         })
         vm.radarData = e.data[0].map(item=>{
          return Object.values(item)[2]
         })
         vm.sumExp = e.data[1][0].expSum;
      })
    })

    if(vm.islog){
      axios.get(`user/follower/${vm.islog.m_ID}/${userID}`)
      .then(e=>{
        console.log(e.data)
        if(e.data != ""){
          vm.isfollow = true;
        }
      })

    }
    

  }

};
</script>




<style>
@import "../../assets/css/member.css";

.btngroup input{
  width: 80px;
    margin: 0 5px;

}
.sumExp{
  text-align: center;
}

</style>
