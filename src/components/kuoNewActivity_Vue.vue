<template>
  <div>
    <div class="jo_col_pc mb-1" id="appForm">
      <div id="applicationForm">
        <form>
          <div id="formHeader" class="col-12 d-flex my-5 bg-info">
            <div class="m-auto text-center">
              <h3 class="jo_title_l" style="color: #616970;">開始Jo團</h3>
              <h3>幾個步驟輕鬆Jo團</h3>
            </div>
            <div id="birdPostion">
              <h5 id="birdTalk" class="text-center bg-white">好想出去玩喔~</h5>
              <div class="d-flex">
                <img class="birdPic" id="birdA" src="../assets/img/活動註冊/jo_birdA.svg" alt />
                <img class="birdPic" id="birdB" src="../assets/img/活動註冊/jo_birdB.svg" alt />
                <img class="birdPic" id="birdC" src="../assets/img/活動註冊/jo_birdC.svg" alt />
              </div>
            </div>
          </div>
          <div class="row m-auto">
            <div class="m-auto w-100">
              <button
                type="button"
                id="gainMsg"
                @click="gainMsg"
                style="position: absolute; width:200px;opacity:0; height:200px; top:10px"
              >一鍵生成</button>
            </div>
            <div class="form-group row col-12 d-none">
              <label for="activityName" class="col-3 my-auto"></label>
              <div class="col-8">
                <input id="activityName" name="activityName" type="text" class="form-control" />
              </div>
            </div>
            <div class="form-group row col-12">
              <label for="activityName" class="col-3 my-auto">活動名稱</label>
              <div class="col-8">
                <input
                  id="activityName"
                  name="activityName"
                  type="text"
                  class="form-control"
                  v-model="activityName"
                  required
                />
              </div>
            </div>
            <div class="form-group row col-12">
              <label for="activityName" class="col-3 my-auto">活動圖片</label>
              <div class="col-3 position-relative">
                <input
                  type="button"
                  id="uploadBtn"
                  value="請上傳活動圖片"
                  class="jo_btn jo_btn_s jo_btnWater"
                />
                <input
                  type="file"
                  id="myfile"
                  name="myfile"
                  class="position-absolute"
                  style="top:2vh; opacity: 0;"
                  accept="image/*"
                />
              </div>
            </div>
            <div class="form-group row col-12">
              <label class="col-3">室內或室外</label>

              <div class="col-8">
                <div class="custom-control custom-radio custom-control-inline">
                  <input
                    name="inOrOut"
                    v-model="inOrOut"
                    id="inOrOut_0"
                    type="radio"
                    class="custom-control-input"
                    value="indoor"
                  />
                  <label for="inOrOut_0" class="custom-control-label">室內</label>
                </div>
                <div class="custom-control custom-radio custom-control-inline">
                  <input
                    name="inOrOut"
                    id="inOrOut_1"
                    v-model="inOrOut"
                    type="radio"
                    class="custom-control-input"
                    value="outdoor"
                  />
                  <label for="inOrOut_1" class="custom-control-label">室外</label>
                </div>
              </div>
            </div>
            <div class="form-group row col-12">
              <label for="c_category" class="col-3 col-form-label">活動類別</label>
              <div class="col-8">
                <select id="c_category" name="c_category" class="custom-select" required v-model="category">
                  <option value="outdoor">戶外休閒</option>
                  <option value="sport">運動類</option>
                  <option value="music">音樂類</option>
                  <option value="art">藝文類</option>
                  <option value="brainstorming">益智類</option>
                  <option value="audio">視聽類</option>
                  <option value="food">飲食類</option>
                  <option value="social">社交聯誼</option>
                  <option value="academic">學術類</option>
                  <option value="tourism">旅遊類</option>
                  <option value="charity">社會服務類</option>
                  <option value="otaku">宅文化</option>
                  <option value="tech">科技類</option>
                  <option value="handmake">手做</option>
                </select>
              </div>
            </div>
            <div class="form-group row col-12">
              <label for="a_start" class="col-3 col-form-label">活動開始時間</label>
              <div class="col-8">
                <input
                  id="a_startDate"
                  name="a_startDate"
                  type="datetime-local"
                  class="form-control myDate"
                  v-model="a_startTime"
                  required
                />
              </div>
            </div>
            <div class="form-group row col-12">
              <label for="a_end" class="col-3 col-form-label">活動結束時間</label>
              <div class="col-8">
                <input
                  id="a_endDate"
                  name="a_endDate"
                  type="datetime-local"
                  class="form-control myDate"
                  v-model="a_endTime"
                  required
                />
              </div>
            </div>
            <div class="form-group row col-12">
              <label for="a_city" class="col-3 col-form-label">活動地點</label>
              <div class="col-3">
                <select id="a_city" name="a_city" class="custom-select" v-model="a_city" required>
                  <option value="臺北市">臺北市</option>
                  <option value="新北市">新北市</option>
                  <option value="桃園市">桃園市</option>
                  <option value="臺中市">臺中市</option>
                  <option value="臺南市">臺南市</option>
                  <option value="高雄市">高雄市</option>
                  <option value="基隆市">基隆市</option>
                  <option value="新竹縣">新竹縣</option>
                  <option value="新竹市">新竹市</option>
                  <option value="嘉義縣">嘉義縣</option>
                  <option value="嘉義市">嘉義市</option>
                  <option value="苗栗縣">苗栗縣</option>
                  <option value="彰化縣">彰化縣</option>
                  <option value="南投縣">南投縣</option>
                  <option value="雲林縣">雲林縣</option>
                  <option value="屏東縣">屏東縣</option>
                  <option value="宜蘭縣">宜蘭縣</option>
                  <option value="花蓮縣">花蓮縣</option>
                  <option value="臺東縣">臺東縣</option>
                  <option value="澎湖縣">澎湖縣</option>
                </select>
              </div>
              <div class="col-5">
                <input
                  id="a_cityDetail"
                  name="a_end"
                  type="text"
                  class="form-control"
                  v-model="a_cityDetail"
                  placeholder="請填寫詳細地址"
                  required
                />
              </div>
            </div>
            <div class="form-group row col-12">
              <label for="text" class="col-3 col-form-label">人數限制</label>
              <div class="col-2">
                <input
                  id="pLSL"
                  name="text"
                  type="text"
                  class="form-control"
                  v-model="pLSL"
                  pattern="\d*"
                  required
                />
              </div>
              <span class="my-auto">&minus;</span>
              <div class="col-2">
                <input
                  id="pUSL"
                  name="text"
                  type="text"
                  class="form-control"
                  v-model="pUSL"
                  pattern="\d*"
                />
              </div>
            </div>
            <div class="form-group row col-12">
              <label for="a_price" class="col-3 col-form-label">價格</label>
              <div class="col-3">
                <input
                  id="a_price"
                  name="a_price"
                  type="text"
                  class="form-control"
                  v-model="a_price"
                  placeholder="免費可不填"
                  pattern="\d*"
                />
              </div>
              <div class="my-auto">元</div>
            </div>
            <div class="form-group row col-12">
              <label for="a_deadline" class="col-3 col-form-label">報名截止時間</label>
              <div class="col-8">
                <input
                  id="a_deadlineDate"
                  name="a_deadlineDate"
                  type="datetime-local"
                  class="form-control myDate"
                  v-model="a_deadlineTime"
                  required
                />
              </div>
            </div>
            <div class="form-group row col-12">
              <label for="a_explain" class="col-3 col-form-label">活動詳情</label>
              <div class="col-8">
                <textarea
                  id="a_explain"
                  name="a_explain"
                  cols="40"
                  rows="5"
                  class="form-control jo_scrollbar"
                  v-model="a_explain"
                ></textarea>
              </div>
            </div>
            <div id="confirmBtn" class="my-5 text-center col-12">
              <div class="m-auto">
                <input
                  class="jo_btn jo_btnRed"
                  type="button"
                  name
                  id
                  value="Jo團確認"
                  :data-toggle="(allCorrect)?'modal':''"
                  data-target="#my_jomodal"
                  @click="dataVerifyFinal"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>

    <!-- ******************** modal ******************** -->
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
            <h1>Jo團確認</h1>
            <h5>活動創建後不能更改資料，確定要Jo團嗎？</h5>
          </div>
          <div class="jomodal_footer">
            <!-- &&&&& -->
            <router-link to="/newActFinish">
              <input
                type="button"
                class="jo_btn jo_btn_m jo_btnRed"
                value="確認開團"
                @click="function() {hideModal();postData()}"
              />
            </router-link>

            <!-- &&&&& -->

            <input
              type="button"
              class="jo_btn jo_btn_m jo_btnBlue"
              data-dismiss="modal"
              value="再考慮一下"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- ******************** /modal ******************** -->
  </div>
</template>

<script>
import $ from "jquery";
import axios from "axios";

export default {
  name: "newActivity",
  data() {
    return {
      allCorrect:"",
      memberData: {},
      activityName: "",
      inOrOut: "",
      category: "",
      a_startTime: "",
      a_endTime: "",
      a_city: "",
      a_cityDetail: "",
      pLSL: "",
      pUSL: "",
      a_price: "",
      a_deadlineTime: "",
      a_explain: "",
    };
  },
  created() {
    this.checkSession();
  },
  mounted() {
    this.statusSetting();
    this.dataVerifyIntime();
  },
  methods: {
    checkSession() {
      var meLog = JSON.parse(localStorage.getItem("myinfo"));
      console.log(meLog);
      if (meLog) {
        this.memberData = meLog;
        console.log(this.memberData);
      } else {
        this.$router.push("/login");
        this.$toasted.show("請先登入🙇‍♀️");
      }
    },
    gainMsg: function () {
      this.activityName = "資策會成果發表";
      this.inOrOut = "indoor";
      this.category = "academic";
      this.a_startTime = "2020-08-21T09:00";
      this.a_endTime = "2020-08-21T14:00";
      this.a_city = "臺中市";
      this.a_cityDetail = "南屯區公益路二段51號B1樓";
      this.pLSL = 2;
      this.pUSL = 200;
      this.a_price = "";
      this.a_deadlineTime = "2020-08-20T00:00";
      this.a_explain =
        "我們邀請國內各大績優廠商，參加本中心養成班成果發表會，進行人才招募活動，您可藉此展示貴公司簡介或產品，讓結訓班同學能在展覽時間內，投遞履歷或相關問題的諮詢，藉以促進求職、求才的媒合機會。歡迎有人才需求的廠商蒞臨指導，並可直接媒合面試！";
    },
    statusSetting: function () {
      // // require mark star
      // $(document).ready(function() {
      //   $("input[required]").each(function(index) {
      //   var id = $(this).attr('id');
      //   $('label[for="'+id+'"]').append('*');
      //   });
      // });

      // modify CSS
      $("#applicationForm div").css("margin", "0");
      $("input,select,textArea").addClass("jo_hover");

      $("#birdB").hide();

      setInterval(() => {
        $("#birdB").hide();
        $("#birdTalk").text("好想出去玩喔~");
        setTimeout(() => {
          $("#birdTalk").text("可是都找不到人 ...");
        }, 1000);
        setTimeout(() => {
          $("#birdB").show();
          $("#birdTalk").text("可以到Joinnn阿~");
        }, 2000);
      }, 4000);
    },
    hideModal: function () {
      console.log("OK");
      $("#my_jomodal").modal("hide");
    },
    //check format in time
    dataVerifyIntime: function () {
      var vm = this;
      var inputs = document.querySelectorAll("form input");

      inputs.forEach((input) => {
        input.addEventListener("change", function () {
          if (input.checkValidity()) {
            input.setAttribute("style", 'border: ""');
          } else {
            input.setAttribute("style", "border: 2px solid red;");

            if (input.validity.valueMissing) {
              vm.$toasted.show(`這要填唷，不然不幫你Jo囉。By Jojo鳥`);
              return;
            }
            if (input.validity.patternMismatch) {
              vm.$toasted.show(`格式錯囉。啾啾~~`);
              return;
            }
          }
        });
      });
      $("#activityName").css("border", "2px solid red");
    },
    //check format final
    dataVerifyFinal: function () {
      var vm=this
      var inputs = document.querySelectorAll("form input");
      console.log(inputs)
      var test=true;
      inputs.forEach((input) => {
        if (!input.checkValidity()) {
          test = false;
        }
      });
        if(!test){
           vm.$toasted.show("請檢查格式是否錯誤");
        }else{
          vm.allCorrect=true
        }

    },
    postData: function () {
      var newAcData = {
        activityName: this.activityName,
        inOrOut: this.inOrOut,
        category: this.category,
        a_startTime: this.a_startTime,
        a_endTime: this.a_endTime,
        a_city: this.a_city,
        a_cityDetail: this.a_cityDetail,
        pLSL: this.pLSL,
        pUSL: this.pUSL,
        a_price: this.a_price,
        a_deadlineTime: this.a_deadlineTime,
        a_explain: this.a_explain,
        m_ID: this.memberData.m_ID,
      };
      // console.log(newAcData);

      axios.post("newActivity", { data: newAcData }).then((e) => {
        // console.log(e);
        this.$bus.$emit("newActivity");
        //console.log(e.data);
      });
    },
  },
};
</script>


<style scoped>
@import "../assets/css/newActivity.css";
</style>