<template>
  <!-- ******************** content ******************** -->
  <div id="currentActivity">
    <!-- title & hashtag -->
    <div id="activityTitle" class="row">
      <div class="col-6 m-auto">
        <h1 id="a_name" style="color: var(--jo_water); font-size:3rem;">{{a_name}}</h1>
      </div>
      <div class="col-6 text-right my-auto">
        <input
          type="button"
          class="jo_btnGrey jo_btn_s"
          v-model="a_availible"
          :style="(a_avaStaID==2 ||a_avaStaID==3  ||a_avaStaID==5)?{'color':'var(--jo_text)'}:{'color': 'var(--jo_text)','background-color': '#FFCB05','box-shadow':' 0 3px 0px var(--jo_orange), 0px 2px 0px 0px rgba(255, 255, 255, 0.5) inset'}"
        />
        <input
          type="button"
          class="jo_btnGrey jo_btn_s"
          style="color: var(--jo_text);"
          v-model="c_category"
        />
        <input
          type="button"
          class="jo_btnGrey jo_btn_s"
          style="color: var(--jo_text);"
          v-model="c_in_out"
        />
      </div>
    </div>

    <!-- /title & hashtag -->

    <div id="mainContent">
      <div style=" padding: 5rem 1.5rem;">
        <div class="row">
          <div class="col-6 position-relative px-3" id="activityImgSection">
            <img id="activityImg" class="ld ld-beat" :src="a_pic" alt />

            <!-- ********** -->
            <div class="d-flex" id="collectBtnArea">
              <favicon :liked="like.likeit" :aid="activity_ID"></favicon>
              <!-- <span id="colectText" style="z-index: 10;font-size: 50px;" class="m-auto">{{collectID}}</span> -->
            </div>
          </div>

          <div class="col-6">
            <div class="d-flex">
              <router-link :to="`/userhouse/userhosting?m_ID=${a_hostID}`">
                <img class="headIcon" :src="a_hostImg" alt />
              </router-link>
              <h3 class="my-auto ml-4">主辦人: {{a_host}}</h3>
            </div>
            <div id="activityDes">
              <h5>活動時間：{{a_start}} ~ {{a_end}}</h5>
              <h5>活動地點：{{a_address}}</h5>
              <h5>報名截止：{{a_deadline}}</h5>
            </div>

            <hr class="my-4" />
            <div class="d-flex col-10 offset-1 justify-content-between">
              <div class="text-center">
                <img src="../assets/img/活動說明頁/人數限制.png" alt class="activityExIcon" />
                <h6>人數限制</h6>
                <h5 style="color: #81C7D4;">{{a_confirm}}~{{a_limit}}人</h5>
              </div>
              <div class="text-center">
                <img src="../assets/img/活動說明頁/報名金額.png" alt class="activityExIcon" />
                <h6>報名金額</h6>
                <h5 style="color: #81C7D4;">{{a_price}}</h5>
              </div>
              <div class="text-center">
                <img src="../assets/img/活動說明頁/目前人數.png" alt class="activityExIcon" />
                <h6>目前參加</h6>
                <h5 style="color: #81C7D4;">{{attendPeople}}</h5>
              </div>
            </div>

            <hr class="my-4" />
            <div class="d-flex col-12">
              <h5 class="mr-4 my-auto">參加人員:</h5>
              <div class="position-relative d-flex">
                <router-link
                  v-for="(item,index) in a_attendPer.slice(0, 4)"
                  :key="index"
                  :to="`/userhouse/userhosting?m_ID=${item.m_ID}`"
                >
                  <img
                    alt
                    class="headIcon position-absolute"
                    :src="require(`../../static/img/head/${item.m_profile}`)"
                  />
                  <div style="color:rgba(255,255,255,0)">{{index}}{{index}}{{index}}{{index}}</div>
                </router-link>

                <div
                  id="morePerson"
                  class="headIcon d-flex"
                  :style="[(a_attendPer.length<5)? {'visibility':'hidden'}:{'visibility':'visible'}]"
                >
                  <h3 class="text-white m-auto">+{{a_attendPer.length-4}}</h3>
                </div>
              </div>
            </div>
            <div class="d-flex col-12 mt-4">
              <div class="d-flex m-auto">
                <!-- guestBtn -->
                <router-link class="mx-3" to="/login">
                  <input
                    data-toggle="modal"
                    data-target="#my_jomodal"
                    type="button"
                    :class="(a_avaStaID<2)?'jo_btn jo_btnRed jo_btn_m':'d-none'"
                    value="我要參Jo"
                    :style="(memberData)?{'display':'none'}:{'display':'block'}"
                  />
                </router-link>

                <!-- hostBtn -->

                <input
                  data-toggle="modal"
                  data-target="#my_jomodal"
                  type="button"
                  :class="(a_avaStaID<2)?'jo_btn jo_btnBlue jo_btn_m mx-3':'d-none'"
                  value="取消Jo團"
                  :style="(this.a_hostID != this.memberData.m_ID)?{'display':'none'}:{'display':'block'}"
                />

                <!-- attendBtn -->

                <input
                  :data-toggle="(attendOrNot==1 || memberData)? '':'modal'"
                  data-target="#my_jomodal"
                  type="button"
                  :class="(a_avaStaID<2)?'jo_btn jo_btnRed jo_btn_m mx-3':'d-none'"
                  value="我要參Jo"
                  :style="(this.a_hostID == this.memberData.m_ID)?{'display':'none'}:(signUp==0)?{'display':'block'}:{'display':'none'}"
                  @click="attendActivity"
                />

                <input
                  :data-toggle="(attendOrNot==1)? '':'modal'"
                  data-target="#my_jomodal"
                  type="button"
                  :class="(a_avaStaID<2)?'jo_btnGrey jo_btn_m m-auto':'d-none'"
                  value="已付款"
                  :style="(this.a_hostID == this.memberData.m_ID)?{'display':'none'}:(signUp==1&&attendOrNot==1)?{'display':'block'}:{'display':'none'}"
                />

                <router-link class="mx-3" :to="`/payPage?a_ID=${activity_ID}`">
                  <input
                    type="button"
                    :class="(a_avaStaID<2)?'jo_btn jo_btnRed jo_btn_m':'d-none'"
                    value="付款去"
                    :style="(attendOrNot==0 && signUp==1)?{'display':'block'}:{'display':'none'}"
                  />
                </router-link>

                <input
                  type="button"
                  :class="(a_avaStaID<2)?'jo_btn jo_btnBlue jo_btn_m mx-3':'d-none'"
                  value="取消參Jo"
                  :style="(attendOrNot==0 && signUp==1)?{'display':'block'}:{'display':'none'}"
                  @click="cancelAttendActivity"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-12" id="activityExplain">
        <div id="activityExplainContent">
          <h1 class="text-center mb-4 pt-3">{{a_name}}</h1>
          <h5 class="pb-5 m-auto text-justify" style="width:84%">{{a_explain}}</h5>
        </div>
      </div>

      <!-- Leave Msg -->
      <div id="textContent">
        <div class="row">
          <div class="col-12 msgContent">
            <form action class="d-flex">
              <img class="headIcon" :src=" `../../static/img/head/${memberData.m_profile}`" alt />
              <div class="col-10">
                <textarea
                  id="textarea"
                  name="textarea"
                  cols="40"
                  rows="5"
                  class="form-control jo_scrollbar"
                  placeholder="留下你的訊息"
                  v-model="msg_Content"
                ></textarea>
              </div>
              <input type="button" value="送出" class="ml-auto jo_btn jo_btnOrange jo_btn_m m-auto" @click="sendMsg"/>
            </form>
          </div>

          <!-- Previous Msg -->
          <div v-for="(msg,index) in msg_ContentList" :key="index" class="col-12 d-flex msgContent">
            <div class="m-auto">
              <img class="headIcon" :src="require(`../../static/img/head/${msg.profile}`)" alt />
            </div>
            <div class="w-100 p-3">
              <h3>{{msg.name}}</h3>
              <div class="d-flex" style="margin-left:0;">
                <h5>{{msg.content}}</h5>
                <span class="ml-auto">{{msg.updateTime}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL -->
    <div
      class="modal fade"
      id="my_jomodal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="jo_modal">
          <div class="jomodal_title">
            <button
              role="button"
              type="button"
              data-dismiss="modal"
              class="modal_close jo_hover madalClose"
              title="Close"
            >
              <span></span>
            </button>
          </div>
          <div class="jomodal_content">
            <h2
              class="m-3 pb-3"
            >{{(a_hostID==memberData.m_ID)? "請填寫原因":(a_price>0)?"請進行付款完成參加":"完成報名"}}</h2>
            <textarea
              :style="[(a_hostID==memberData.m_ID)? {'display':'block'}:{'display':'none'}]"
              cols="40"
              rows="5"
              class="form-control jo_scrollbar mx-auto mb-2"
              placeholder="取消原因將發送給團員"
              v-model="cancelReason"
            ></textarea>
          </div>

          <div class="jomodal_footer d-flex">
            <div class="d-flex">
              <input
                type="button"
                data-dismiss="modal"
                :class="(a_hostID==memberData.m_ID)?'jo_btn jo_btnRed jo_btn_m mx-3':'d-none'"
                value="確定取消"
                @click="function(){postReason();hideModal()}"
              />

              <router-link class="mx-3" to="/">
                <input
                  type="button"
                  data-dismiss="modal"
                  :class="(a_hostID==memberData.m_ID)?'jo_btn jo_btnBlue jo_btn_m m-auto ':'d-none'"
                  value="再考慮一下"
                  @click="hideModal"
                />
              </router-link>

              <router-link class="mx-3" :to="`/payPage?a_ID=${activity_ID}`">
                <input
                  type="button"
                  data-dismiss="modal"
                  :class="(a_hostID!=memberData.m_ID)?'jo_btn jo_btnRed jo_btn_m m-auto':'d-none'"
                  :style="[(a_price>0)? {'display':'block'}:{'display':'none'}]"
                  value="付款去"
                  @click="hideModal"
                />
              </router-link>

              <router-link to="/">
                <input
                  type="button"
                  data-dismiss="modal"
                  :class="(a_hostID!=memberData.m_ID)?'jo_btn jo_btnBlue jo_btn_m mx-3':'d-none'"
                  :style="[(a_price>0)? {'display':'block'}:{'display':'none'}]"
                  value="搜尋其他活動"
                  @click="hideModal"
                />
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- *********** -->
  </div>
  <!-- ******************** /content ******************** -->
</template>
  

    <script>
import $ from "jquery";
import axios from "axios";
import favicon from "./Favicon";

// var activity_ID = 1;

export default {
  name: "activity",
  components: {
    favicon,
  },

  created() {
    this.checkSession();
    // console.log(this.memberData)

    
  },
  mounted() {
    this.refreshPage();
    this.statusSetting();
  },

  data() {
    return {
      // *********other
      attendOrNot: "",
      activity_ID: "",
      c_ID: "",
      memberData: {},
      a_hostID: "",
      signUp: "",

      // *********other End
      a_name: " ",
      a_availible: "#",
      a_avaStaID: "",
      cancelReason: "",
      c_category: "#",
      c_in_out: "#",
      collectID: "",
      a_pic: "",
      a_hostImg: "",
      a_host: "",
      a_start: "",
      a_end: "",
      a_address: "",
      a_deadline: "",
      a_confirm: "",
      a_limit: "",
      a_price: "",
      attendPeople: "",
      a_attendPer: [],
      a_explain: "",
      msg_Content: "",
      msg_ContentList: [],

      like: {
        likeit: 0,
        aid: "",
      },
    };
  },

  methods: {

    // collectActivity(aid,like){
    //     if(like){
    //       this.like.aid=this.activity_ID
    //       this.like.likeit = 1 
    //         // console.log("like")
    //     }
    //     if(like == false){
    //       this.like.aid=this.activity_ID
    //       this.like.likeit = 0 ;
    //        // console.log("dislike")
    //     }              
    // },

    checkSession() {
      var meLog = JSON.parse(localStorage.getItem("myinfo"));
      if (meLog) {
        this.memberData = meLog;
      }
    },

    refreshPage() {
      this.activity_ID = this.$route.query.a_ID;
      var actID = this.$route.query.a_ID;

      axios.get(`activity/${actID}`).then((e) => {
        console.log(e.data.signUp);

        var a_data = e.data.a_data[0]; //activity info
        var a_attendNo = e.data.a_attendNo[0]; //attend count
        var msg_ContentList = e.data.msg_ContentList; //Msg
        var a_attendPer = e.data.a_attendPer; //attend count person info
        var a_data = e.data.a_data[0];

        // ************************name & hastTag************************

        this.a_name = a_data.a_name;

        if (a_data.a_avalible == 0) {
          this.a_availible = "#熱烈招收";
          this.a_avaStaID = 0;
        } else if (a_data.a_avalible == 1) {
          this.a_availible = "#活動額滿";
          this.a_avaStaID = 1;
        } else if (a_data.a_avalible == 2) {
          this.a_availible = "#活動流團";
          this.a_avaStaID = 2;
        } else if (a_data.a_avalible == 3) {
          this.a_availible = "#活動取消";
          this.a_avaStaID = 3;
        } else if (a_data.a_avalible == 4) {
          this.a_availible = "#報名截止";
          this.a_avaStaID = 4;
        } else if (a_data.a_avalible > 5) {
          this.a_availible = "#活動結束";
          this.a_avaStaID = 5;
        }

        this.c_category = "#" + a_data.c_category;
        this.c_in_out = a_data.c_in_out == "indoor" ? "#室內" : "#室外";

        // ************************name & hastTag hastTag END************************

        // ************************activity main content***********************

        //***********activity info
        this.a_pic = "../../static/img/activityPic/" + a_data.a_pic;
        this.a_hostImg = "../../static/img/head/" + a_data.m_profile;
        this.a_host = a_data.m_name;
        this.a_hostID = a_data.m_ID;
        this.a_start =
          a_data.a_start.substr(0, 10) + " " + a_data.a_start.substr(11, 5);
        this.a_end =
          a_data.a_end.substr(0, 10) + " " + a_data.a_end.substr(11, 5);
        this.a_address = a_data.a_city + a_data.a_address;
        this.a_deadline =
          a_data.a_deadline.substr(0, 10) +
          " " +
          a_data.a_deadline.substr(11, 5);
        this.a_confirm = a_data.a_confirm;
        this.a_limit = a_data.a_limit;
        this.a_price = a_data.a_price;

        //***********attend person info
        this.attendPeople = a_attendNo["count(*)"];
        this.a_attendPer = a_attendPer;
        // console.log("a_attendPer",this.a_attendPer)

        //***********explain & message
        this.a_explain = a_data.a_explain;
        this.msg_Content = "";
        this.msg_ContentList = msg_ContentList;

        // ************************/activity main content***********************

        // ************************other raker***********************
        this.c_ID = a_data.c_ID;
        this.a_hostID = a_data.a_host;

        //*****judge if attend
        var testArray = this.a_attendPer.filter(
          (item) => item.m_ID == this.memberData.m_ID
        );
        testArray != "" ? (this.attendOrNot = 1) : (this.attendOrNot = 0);
        console.log(this.attendOrNot);

        var testArray2 = e.data.signUp.filter(
          (item2) => item2.m_ID == this.memberData.m_ID
        );

        testArray2 != "" ? (this.signUp = 1) : (this.signUp = 0);
      });
    },

    // 參加jo團
    attendActivity: function () {
      if (this.memberData.m_ID == null || this.attendOrNot == 1) {
        console.log("atten2");
        this.$toasted.show(`💁‍♂️ 請先登入唷 💁`);
        return;
      } else {
        var attData = {
          c_ID: this.c_ID,
          a_host: this.a_hostID,
          a_price: this.a_price,
          m_free: this.a_price ? 0 : 1,
          m_ID: this.memberData.m_ID,
          m_name: this.memberData.m_name,
          c_category: this.c_category.substr(1),
          a_ID: this.activity_ID,
        };
        axios.post("activity", { data: attData }).then((e) => {
          console.log(e);
        });
      }
       this.$bus.$emit("joinAttend", {
        a_ID: this.memberData.m_ID,
        a_name: this.activity_ID,
      });
     if(this.a_price==0) {
       this.refreshPage();
      $("#my_jomodal").modal("hide");
     }else{
        $("#my_jomodal").modal("show");
           this.refreshPage();
     }
   
    },

    // 取消參Jo
    cancelAttendActivity: function () {

      var cancelAct = {
        m_ID: this.memberData.m_ID,
        a_ID: this.activity_ID,
        joCoin: this.memberData.joCoin,
        a_price: this.a_price,
      };
      axios.post("activity/cancel", { cancelAct: cancelAct }).then((e) => {
        console.log(e);
        
        $("#my_jomodal").modal("hide");
      });

      this.$bus.$emit("cancelAttend", {
        a_ID: this.memberData.m_ID,
        a_name: this.activity_ID,
      });
      this.refreshPage();
    },

    // 取消jo團
    postReason: function () {
      var reasonContent = {
        a_ID: this.activity_ID,
        cancellReason: this.cancelReason,
        memberData:this.memberData
      };
      if (this.a_hostID == this.memberData.m_ID) {
        axios.post("activity/reason", { reason: reasonContent }).then((e) => {
          // console.log(e);
        });
        axios.put("activity", { activity_ID: this.activity_ID }).then((e) => {});
      
        $("#my_jomodal").modal("hide");
      }
     this.refreshPage();
    },
sendMsg:function(){
 axios.post("activity/msg", { msg: this.msg_Content,m_ID:this.memberData.m_ID }).then((e) => {
          // console.log(e);
        });
         this.refreshPage();
},
    statusSetting: function () {
      $("#collectHeart").click(function () {
        if ($("#colectText").text() === "收藏") {
          $("#collectBtnArea").addClass("textRed");
          $("#colectText").text("已收藏");
        } else {
          $("#collectBtnArea").removeClass("textRed");
          $("#colectText").text("收藏");
        }
      });

      $("#activityImg").css("animation-duration", "1.6s");

      setTimeout(function () {
        $("#activityImg").css("animation-play-state", "paused");
        $("#activityImg").removeClass("ld");
      }, 1580);
    },
    hideModal: function () {
      // console.log("OK");
      $("#my_jomodal").modal("hide");
    },
  },
};
</script>




<style>
@import "../assets/css/activity.css";
</style>






