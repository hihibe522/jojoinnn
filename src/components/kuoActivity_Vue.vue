<template>
  <!-- ******************** content ******************** -->
  <div id="currentActivity">
    <!-- title & hashtag -->
    <div id="activityTitle" class="row">
      <div class="col-6 m-auto">
        <h1 id="a_name" style="color: var(--jo_dGrey3);">{{a_name}}</h1>
      </div>
      <div class="col-6 text-right my-auto">
        <input
          type="button"
          name
          v-model="a_availible"
          class="jo_btnGrey jo_btn_s"
          style="background-color: #FFCB05;color: var(--jo_text);
         box-shadow: 0 3px 0px var(--jo_orange), 0px 2px 0px 0px rgba(255, 255, 255, 0.5) inset;"
        />
        <input
          type="button"
          name
          v-model="c_category"
          class="jo_btnGrey jo_btn_s"
          style="color: var(--jo_text);"
        />
        <input
          type="button"
          name
          v-model="c_in_out"
          class="jo_btnGrey jo_btn_s"
          style="color: var(--jo_text);"
        />
      </div>
    </div>
    <!-- /title & hashtag -->

    <div id="mainContent">
      <div style=" padding: 5rem 1.5rem;">
        <div class="row">
          <div class="col-6 position-relative px-3" id="activityImgSection">
            <img id="activityImg" class="ld ld-beat" :src="a_pic" alt />
            <div id="collectBtnArea" class="d-flex">
              <div class="jo_heartDiv" id="collectHeart">
                <img class="jo_heart" src="../assets/img/jo_images/jo_heart.svg" alt />
                <img class="jo_heart jo_hover" src="../assets/img/jo_images/jo_heart.svg" alt />
              </div>
              <span id="colectText" style="z-index: 10;font-size: 50px;">{{collectID}}</span>
            </div>
          </div>

          <div class="col-6">
            <div class="d-flex">
              <img :src="a_hostImg" alt />
              <h3 class="my-auto ml-4">主辦人: {{a_host}}</h3>
            </div>
            <div id="activityDes">
              <h5>活動時間：{{a_start}} ~ {{a_end}}</h5>
              <h5>地點：{{a_address}}</h5>
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
              <div class="position-relative">
                <img
                  v-for="(item,index) in a_attendPer.slice(0, 4)"
                  :src="require(`../../static/img/活動說明頁/${item.m_profile}`)"
               
                  alt
                  :key="index"
                  style="left: 20px;"
                />
                <img
                  src="../assets/img/活動說明頁/大頭加加.png"
                  alt
                  :style="[(a_attendPer.length<5)? {'visibility':'hidden'}:{'visibility':'visible'}]"
                />
              </div>
            </div>
            <div class="d-flex col-12 mt-4">
              <input
                type="button"
                name
                id
                :value="btnStatus"
                @click="attendActivity"
                class="jo_btn jo_btnOrange jo_btn_m m-auto"
              />
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
              <img :src="m_profile" alt />
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
              <input
                type="button"
                name
                id
                value="送出"
                class="ml-auto jo_btn jo_btnOrange jo_btn_m m-auto"
              />
            </form>
          </div>

          <!-- Previous Msg -->
          <div v-for="(msg,index) in msg_ContentList" :key="index" class="col-12 d-flex msgContent">
            <div class="m-auto">
              <img :src="require(`../../static/img/活動說明頁/${msg.profile}`)" alt />
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
  </div>
  <!-- ******************** /content ******************** -->
</template>
  

    <script>
import $ from "jquery";
import axios from "axios";

export default {
  name: "activity",
  data() {
    return {
      btnStatus:"我要參Jo",
      a_name: "FK party",
      a_availible: true ? "#已成團" : "#未成團",
      c_category: "#運動",
      c_in_out: "#室內",
      collectID: "收藏",
      a_pic: "../../static/img/活動說明頁/活動封面.jpg",
      a_hostImg: "../../static/img/活動說明頁/show.png",
      a_host: "Show",
      a_start: "2020/06/24 23:00",
      a_end: "2020/06/25 05:00",
      a_address: "台中市郭郭區郭郭路郭郭巷郭郭路郭號郭樓之郭",
      a_deadline: "2020/06/25 05:00",
      a_confirm: "2",
      a_limit: "60",
      a_price: 1000,
      attendPeople: 20,
      a_attendPer: [
        {m_profile:"大頭4.png"},
        {m_profile:"大頭5.png"},
        {m_profile:"大頭6.png"},
        {m_profile:"大頭7.png"}

      ],
      a_explain:
        "開太往下情理品於陸指強排都的母後地中育子於海公女我藝到人點好……期要劇的本保兩的天馬要人媽，也合院於小樹同新備故會的。生元長深小品們共用未象什辦了，山面家：際體展已張負了沒作文走間球戲成……想這倒內開那我只爸路切明車進總個現參比神合！阿眾人。知會接市做如是發市當一企不學爸後的清準原是，多因出後陽元上專來、害好禮，校根竟著程間。可我道、法庭發際其價事知統現病起日般？詩公說。太平這們經面。請領畫無關自保。考省有沒很看有！的傳影怎以笑說表士日作華不強的家朋因之會機華初地時書力部英面命期起能：任理發可定房被的車向在大。華小到中未但題政在調校性天好朋是權：者園告老心在覺好起和驗條隨為人解許！服臺國高政樣家，以道軍面出。法想制沒適起戰，國是觀笑生間間，媽外間科子題、始時境馬快注因利現的開世農政氣至父，服金的得中太：馬那。問舉麼裝不經；是去地決了期自研也速能達景出示樂年平考路，過價大星，失走財只不沒體？期營題位一地構法的有常時。動史者，了料那語市文早士車輕車放是只黨臺家。",
      m_profile: "../../static/img/活動說明頁/大頭1.png",
      msg_Content: "開趴囉~~",
      msg_ContentList: [
        {
          profile: "大頭2.png",
          name: "FFFFF",
          content: "之前參加過，很嗨，主持人很猛。這次我也要搶先參加。",
          updateTime: "2020-07-22",
        },
        {
          profile: "大頭4.png",
          name: "KKKKK",
          content: "多人混戰。",
          updateTime: "2020-07-23",
        },
      ],
    };
  },
  methods: {
    refreshPage() {
      // console.log(this);
      axios.get("activity").then((e) => {
        console.log(e.data);
        console.log(e.data.a_data);
        console.log(e.data.a_data[0]);
        var a_data = e.data.a_data[0];
        var a_attendNo = e.data.a_attendNo[0];
        var msg_ContentList = e.data.msg_ContentList;
        var a_attendPer = e.data.a_attendPer;
        // this.btnStatus=
        this.a_name = a_data.a_name;
        this.c_category = "#"+a_data.c_category;
        this.a_availible = (a_attendNo["count(*)"]>a_data.a_confirm) ? "#已開團" : "#等等";
        this.c_in_out = (a_data.c_in_out=="indoor")? "#室內":"#室外";
        this.a_pic = "../../static/img/活動說明頁/" + a_data.a_pic;
        this.a_hostImg = "../../static/img/活動說明頁/" + a_data.m_profile;
        this.a_host = a_data.m_name;
        this.a_start =
          a_data.a_start.substr(0, 10) + " " + a_data.a_start.substr(11, 5);
        this.a_end =
          a_data.a_end.substr(0, 10) + " " + a_data.a_end.substr(11, 5);
        this.a_address = a_data.a_address;
        this.a_deadline =
          a_data.a_deadline.substr(0, 10) +
          " " +
          a_data.a_deadline.substr(11, 5);
        this.a_confirm = a_data.a_confirm;
        this.a_limit = a_data.a_limit;
        this.a_price = a_data.a_price;
        this.attendPeople = a_attendNo["count(*)"];
        this.a_attendPer = a_attendPer;
        this.a_explain = a_data.a_explain;
        this.m_profile = "../../static/img/活動說明頁/大頭7.png";
        this.msg_Content = "";
        this.msg_ContentList = msg_ContentList;
        
        c_ID=a_data.c_ID;
        aHostID=a_data.a_host
      });
    },

    attendActivity: function () {
      console.log("OK")
      var attData = {
        c_ID : c_ID,
        a_host:aHostID,
        a_price :this.a_price,
        m_free : (this.a_price)? 0:1,
       
      };

      axios.post("activity", { data: attData }).then((e) => {
        console.log(e);
      });
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
  },

  mounted() {
    this.statusSetting();
    this.refreshPage();
  },
};
</script>
    <!-- **********************Vue End***************************** -->



<style>
@import "../assets/css/activity.css";
</style>






