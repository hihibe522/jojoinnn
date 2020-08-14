<template>
  <div>
    <!-- 註冊表格開始 -->
    <div class="jo_col_pc" id="myRegisterForm">
      <div class="position-relative" id="myApplicationForm">
        <form>
          <!-- 標題文字開始 -->
          <div id="myFormHeader" class="col-12 d-flex my-5">
            <div class="m-auto">
              <h1>註冊成為Jo星人</h1>
              <h5>
                已經有帳號嗎?

                 <router-link to="login" >
                  <span class="jo_hover">來這登入</span>
                </router-link>
              </h5>
            </div>
          </div>
          <!-- 標題文字結尾 -->

          <!-- 表格內容開始 -->
          <div class="row m-auto">
            <div class="m-auto w-100">
              <!-- 設定帳號開始 -->
              <div class="form-group row qTitle">
                <!-- 一鍵生成開始 -->
                <div class="m-auto w-100 h-100">
                  <button
                    class="jo_hover btn btn-outline-warning"
                    type="button"
                    id="autoMsg"
                    @click="autoMsg"
                    style="position: absolute; z-index:1; opacity:0"
                  >點擊生成</button>
                </div>
                <!-- 一鍵生成結束 -->
                <span class="jo_formSmallTitle">
                  <h5>建立帳號</h5>
                </span>
                <label for="accountName" class="align-items-center col-4 col-form-label">設定帳號</label>
                <div class="col-4">
                  <input
                    @change="checkAccount"
                    ref="accountName"
                    v-model="accountName"
                    placeholder="請輸入6-12位小寫英文+數字"
                    id="accountName"
                    name="accountName"
                    type="text"
                    class="form-control myForm-control"
                    required
                  /><span class="text-danger" v-if="checkNG">此帳號已有人使用，請重新輸入</span>
                </div>
              </div>
              <!-- 設定帳號結束 -->

              <!-- 設定密碼開始 -->
              <div class="form-group row">
                <label
                  for="passwordName"
                  class="align-items-center col-4 col-form-label my-auto"
                >設定密碼</label>
                <div class="col-4">
                  <input
                    v-model="passwordName"
                    placeholder="請輸入6-12位小寫英文+數字"
                    id="passwordName"
                    name="passwordName"
                    type="password"
                    class="form-control myForm-control"
                    required
                  />
                </div>
              </div>
              <!-- 設定密碼結束 -->

              <!-- 設定再次輸入密碼開始 -->
              <div class="form-group row">
                <label
                  for="rePasswordName"
                  class="align-items-center col-4 col-form-label my-auto"
                >再次輸入密碼</label>
                <div class="col-4">
                  <input
                    v-model="rePasswordName"
                    placeholder="請再次輸入設定的密碼"
                    id="rePasswordName"
                    name="rePasswordName"
                    type="password"
                    class="form-control myForm-control"
                    required
                  />
                </div>
              </div>
              <!-- 設定再次輸入密碼結束 -->

              <!-- 填寫個人資料開始 -->
              <div class="form-group row myFormMargin qTitle">
                <span class="jo_formSmallTitle">
                  <h5>填寫個人資料</h5>
                </span>

                <!-- 上傳頭像開始 -->
                <label
                  for="uploadBtnR"
                  class="align-items-center col-4 col-form-label my-auto"
                >上傳圖像</label>
                <div class="col-4" style="position: relative">
                  <label class="jo_btn jo_btnOrange jo_hover">
                    <input
                      @change="changeImage($event)"
                      ref="upLoadimg"
                      type="file"
                      style="display:none;"
                      id="uploadBtnR"
                      accept="image/gif,image/jpeg,image/jpg,image/png">
                      <div v-if="headName" class="loadImg">{{headName}}</div> 
                      <div class="loadImg">請上傳個人圖像</div>
                  </label>
                  <img :src="nowHead" class="headImg">
                </div>
                <!-- 上傳頭像結束 -->
              </div>
              <!-- 填寫個人資料結束 -->

              <!-- 設定姓名開始 -->
              <div class="form-group row">
                <label for="memberName" class="align-items-center col-4 col-form-label my-auto">姓名</label>
                <div class="col-4">
                  <input
                    v-model="memberName"
                    placeholder="請輸入您的姓名"
                    id="memberName"
                    name="memberName"
                    type="text"
                    class="form-control myForm-control"
                    required
                  />
                </div>
              </div>
              <!-- 設定姓名結束 -->

              <!-- 設定性別開始 -->
              <div class="form-group row">
                <label class="align-items-center col-4">性別</label>
                <div class="col-8">
                  <div class="custom-control custom-radio custom-control-inline">
                    <input
                      @change="onChange($event)"
                      v-model="sex"
                      name="sex"
                      id="male"
                      type="radio"
                      value="male"
                      class="custom-control-input"
                    />
                    <label for="male" class="custom-control-label">男</label>
                  </div>
                  <div class="custom-control custom-radio custom-control-inline">
                    <input
                      @change="onChange($event)"
                      v-model="sex"
                      name="sex"
                      id="female"
                      type="radio"
                      class="custom-control-input"
                      value="female"
                    />
                    <label for="female" class="custom-control-label">女</label>
                  </div>
                </div>
              </div>
              <!-- 設定性別開始 -->

              <!-- 設定信箱開始 -->
              <div class="form-group row">
                <label for="memberMail" class="align-items-center col-4 col-form-label my-auto">信箱</label>
                <div class="col-4">
                  <input
                    v-model="memberMail"
                    placeholder="請輸入常用信箱"
                    id="memberMail"
                    name="memberMail"
                    type="text"
                    class="form-control myForm-control"
                    required
                  />
                </div>
              </div>
              <!-- 設定信箱結束 -->

              <!-- 設定電話開始 -->
              <div class="form-group row">
                <label for="memberPhone" class="align-items-center col-4 col-form-label my-auto">電話</label>
                <div class="col-4">
                  <input
                    v-model="memberPhone"
                    placeholder="請輸入連絡電話"
                    id="memberPhone"
                    name="memberPhone"
                    type="text"
                    class="form-control myForm-control"
                    required
                  />
                </div>
              </div>
              <!-- 設定電話結束 -->

              <!-- 設定生日開始 -->
              <div class="form-group row">
                <label for="memberBirth" class="align-items-center col-4 col-form-label">生日</label>
                <div
                  class="pnlEventCalendar fix-top"
                  style="width:40%; position: absolute;left: 50%;z-index: 100;"
                ></div>
                <div class="col-4">
                  <input
                    v-model="memberBirthday"
                    placeholder="請輸入您的生日"
                    id="memberBirthday"
                    name="memberBirthday"
                    type="date"
                    class="form-control myForm-control myDate"
                    value="2020-08-21"
                    required
                  />
                </div>
              </div>

              <!-- 設定生日結束 -->

              <!-- 設定居住地開始 -->
              <div class="form-group row">
                <label for="m_city" class="align-items-center col-4 col-form-label">居住地區</label>
                <div class="col-4">
                  <select v-model="m_city" id="m_city" name="m_city" class="custom-select myLiving">
                    <option value disabled selected>請選擇居住地區</option>
                    <option :key="index" v-for="(option,index) in options" v-bind:value="option.value">{{ option.text }}</option>
                  </select>
                </div>
              </div>
              <!-- 設定居住地結束 -->

              <!-- 喜歡的類別開始 -->

              <div class="form-group row">
                <label class="align-items-center col-4">喜歡的類別 (可複選)</label>
                <div class="col-8">
                  <div class="custom-control custom-checkbox custom-control-inline">
                    <input
                      v-model="checkName"
                      value="all"
                      @click="selectAllCheck"
                      id="favCat_0"
                      type="checkbox"
                      class="custom-control-input"
                    />
                    <label for="favCat_0" class="custom-control-label">全部都想選</label>
                  </div>
                  <div class="custom-control custom-checkbox custom-control-inline">
                    <input
                      v-model="checkName"
                      value="sport"
                      name="favCat"
                      id="favCat_1"
                      type="checkbox"
                      class="custom-control-input testSelected"
                    />
                    <label for="favCat_1" class="custom-control-label">運動類</label>
                  </div>
                  <div class="custom-control custom-checkbox custom-control-inline">
                    <input
                      v-model="checkName"
                      value="music"
                      name="favCat"
                      id="favCat_2"
                      type="checkbox"
                      class="custom-control-input testSelected"
                    />
                    <label for="favCat_2" class="custom-control-label">音樂類</label>
                  </div>
                </div>

                <label class="align-items-center col-4"></label>
                <div class="col-8">
                  <div class="custom-control custom-checkbox custom-control-inline">
                    <input
                      v-model="checkName"
                      value="social"
                      name="favCat"
                      id="favCat_3"
                      type="checkbox"
                      class="custom-control-input testSelected"
                    />
                    <label for="favCat_3" class="custom-control-label">社交聯誼類</label>
                  </div>
                  <div class="custom-control custom-checkbox custom-control-inline">
                    <input
                      v-model="checkName"
                      value="art"
                      name="favCat"
                      id="favCat_4"
                      type="checkbox"
                      class="custom-control-input testSelected"
                    />
                    <label for="favCat_4" class="custom-control-label">藝文類</label>
                  </div>
                  <div class="custom-control custom-checkbox custom-control-inline">
                    <input
                      v-model="checkName"
                      value="brainstorming"
                      name="favCat"
                      id="favCat_5"
                      type="checkbox"
                      class="custom-control-input testSelected"
                    />
                    <label for="favCat_5" class="custom-control-label">益智類</label>
                  </div>
                </div>

                <label class="align-items-center col-4"></label>
                <div class="col-8">
                  <div class="custom-control custom-checkbox custom-control-inline">
                    <input
                      v-model="checkName"
                      value="charity"
                      name="favCat"
                      id="favCat_6"
                      type="checkbox"
                      class="custom-control-input testSelected"
                    />
                    <label for="favCat_6" class="custom-control-label">社會服務類</label>
                  </div>
                  <div class="custom-control custom-checkbox custom-control-inline">
                    <input
                      v-model="checkName"
                      value="audio"
                      name="favCat"
                      id="favCat_7"
                      type="checkbox"
                      class="custom-control-input testSelected"
                    />
                    <label for="favCat_7" class="custom-control-label">視聽類</label>
                  </div>
                  <div class="custom-control custom-checkbox custom-control-inline">
                    <input
                      v-model="checkName"
                      value="food"
                      name="favCat"
                      id="favCat_8"
                      type="checkbox"
                      class="custom-control-input testSelected"
                    />
                    <label for="favCat_8" class="custom-control-label">飲食類</label>
                  </div>
                </div>

                <label class="align-items-center col-4"></label>
                <div class="col-8">
                  <div class="custom-control custom-checkbox custom-control-inline">
                    <input
                      v-model="checkName"
                      value="academic"
                      name="favCat"
                      id="favCat_9"
                      type="checkbox"
                      class="custom-control-input testSelected"
                    />
                    <label for="favCat_9" class="custom-control-label">學術研究類</label>
                  </div>
                  <div class="custom-control custom-checkbox custom-control-inline">
                    <input
                      v-model="checkName"
                      value="tourism"
                      name="favCat"
                      id="favCat_10"
                      type="checkbox"
                      class="custom-control-input testSelected"
                    />
                    <label for="favCat_10" class="custom-control-label">旅遊類</label>
                  </div>
                  <div class="custom-control custom-checkbox custom-control-inline">
                    <input
                      v-model="checkName"
                      value="otaku"
                      name="favCat"
                      id="favCat_11"
                      type="checkbox"
                      class="custom-control-input testSelected"
                    />
                    <label for="favCat_11" class="custom-control-label">宅文化</label>
                  </div>
                </div>

                <label class="align-items-center col-4"></label>
                <div class="col-8">
                  <div class="custom-control custom-checkbox custom-control-inline">
                    <input
                      v-model="checkName"
                      value="outdoor"
                      name="favCat"
                      id="favCat_12"
                      type="checkbox"
                      class="custom-control-input testSelected"
                    />
                    <label for="favCat_12" class="custom-control-label">戶外休閒類</label>
                  </div>
                  <div class="custom-control custom-checkbox custom-control-inline">
                    <input
                      v-model="checkName"
                      value="tech"
                      name="favCat"
                      id="favCat_13"
                      type="checkbox"
                      class="custom-control-input testSelected"
                    />
                    <label for="favCat_13" class="custom-control-label">科技類</label>
                  </div>
                  <div class="custom-control custom-checkbox custom-control-inline">
                    <input
                      v-model="checkName"
                      value="handmake"
                      name="favCat"
                      id="favCat_14"
                      type="checkbox"
                      class="custom-control-input testSelected"
                    />
                    <label for="favCat_14" class="custom-control-label">手做類</label>
                  </div>
                </div>
              </div>
              <!-- 喜歡的類別結束 -->

              <!-- 簡短自介開始 -->
              <div class="form-group row">
                <label for="m_intro" class="align-items-center col-4 col-form-label">簡短自介</label>
                <div class="col-6 m_intro">
                  <textarea
                    v-model="m_intro"
                    placeholder="請輸入100字內的簡單自我介紹"
                    id="m_intro"
                    name="m_intro"
                    cols="40"
                    rows="5"
                    class="form-control jo_scrollbar myIntro"
                  ></textarea>
                </div>
              </div>
              <!-- 簡短自介結束 -->

              <!-- 服務條款開始 -->
              <div class="form-group row">
                <label class="align-items-center col-4"></label>
                <div class="col-8">
                  <div class="custom-control custom-checkbox custom-control-inline">
                    <input
                      name="myRules"
                      id="myRules_0"
                      type="checkbox"
                      class="custom-control-input"
                      value
                    />
                    <label for="myRules_0" class="custom-control-label myRules">
                      我已詳細閱讀
                      <a
                        href="#"
                        class="jo_hover"
                        data-toggle="modal"
                        data-target="#myClauseForm"
                      >服務條款</a>,
                      並同意其內容。
                    </label>
                  </div>
                </div>
              </div>
              <!-- 服務條款結束 -->

              <div id="confirmBtn" class="m-5 text-center">
                <div class="m-auto">
                  <input
                    type="button"
                    value="下一步"
                    class="jo_btn jo_btnRed"
                    @click="valadityCheck()"
                    data-target="#myClauseForm"
                    :data-toggle="(allCorrect)?'modal':''"
                  />
                
                </div>
              </div>
            </div>
          </div>

          <a>
            <img
              id="registerBird"
              class="jo_hover"
              src="@/assets/img/jo_images/jo_bird_astronant.svg"
              alt
            />
          </a>
        </form>
      </div>
    </div>
    <!-- 註冊表格結束 -->
    <!-- modal條款開始 -->
    <div
      class="jo_col_pc mb-1 modal fade"
      id="myClauseForm"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog myClause-dialog modal-dialog-centered" role="document">
        <div class="myClause_width jo_modal">
          <form
            class="col-lg-12 col-md-12 col-sm-12 row position-relative m-auto"
            id="myClauseForm"
          >
            <!-- 關掉按鈕開始 -->
            <div class="clauseXX">
              <button
                role="button"
                data-dismiss="modal"
                class="madalClose modal_close jo_hover position-absolute"
                title="Close"
              >
                <span></span>
              </button>
            </div>
            <!-- 關掉按鈕結束 -->

            <!-- 標題文字開始 -->
            <div id="myClauseHeader" class="col-7 d-flex m-auto">
              <div class="m-auto clauseTitle d-flex">
                <img src="@/assets/img/jo_images/jo_logo.svg" alt />
                <h1>使用者服務條款</h1>
              </div>
            </div>
            <!-- 標題文字結尾 -->

            <div class="col-12 clauseModal_content myClause">
              <textarea rows="25" class="jo_scrollbar">

     這是以《政府網站版型與內容管理規範》中為基礎的隱私權條款範本稍微調整過移除不適用
     一般企業的項目，任何網站皆可將此範本加上自己的網站名稱，並做修改後使用於網站上。
     請注意，若您要針對此以私權條款模板做修改，需要至少包含以下項目:
                                
    一、隱私權保護政策的適用範圍請說明該網站隱私權保護政策的適用範圍。
                                
    二、個人資料的蒐集、處理及利用方式請說明該網站針對個人資料的蒐集、處理及利用方式。
                                
    三、資料之保護請說明該網站針對取得資料的安全維護措施，如防止個人資料被竊取、竄改、
    毀損、滅失或洩漏，採取技術上及組織上之必要措施。
                                
    四、網站對外的相關連結請說明對外連結網站不適用本網站的隱私權保護政策，必須參考該連
    結網站中的隱私權保護政策。
                                
    五、與第三人共用個人資料之政策

    六、Cookie之使用請說明該網站使用Cookie技術來儲存或追蹤使用者的資料的情況。
                                
    七、隱私權保護政策之修正請說明該網站針對隱私權保護政策之修正措施。隱私權條款範本文
    件請將「JoJo網站」修改為您的網站名稱
                                
    非常歡迎您光臨「JoJo網站」（以下簡稱本網站），為了讓您能夠安心的使用本網站的各項服
    務與資訊，特此向您說明本網站的隱私權保護政策，以保障您的權益，請您詳閱下列內容：
                            
    一、隱私權保護政策的適用範圍
    隱私權保護政策內容，包括本網站如何處理在您使用網站服務時收集到的個人識別資料。隱私
    權保護政策不適用於本網站以外的相關連結網站，也不適用於非本網站所委託或參與管理的人員。
                                
    二、個人資料的蒐集、處理及利用方式
    當您造訪本網站或使用本網站所提供之功能服務時，我們將視該服務功能性質，請您提供必要的
    個人資料，並在該特定目的範圍內處理及利用您的個人資料；非經您書面同意，本網站不會將個
    人資料用於其他用途。
                                
    本網站在您使用服務信箱、問卷調查等互動性功能時，會保留您所提供的姓名、電子郵件地址、
    聯絡方式及使用時間等。於一般瀏覽時，伺服器會自行記錄相關行徑，包括您使用連線設備的IP
    位址、使用時間、使用的瀏覽器、瀏覽及點選資料記錄等，做為我們增進網站服務的參考依據，
    此記錄為內部應用，決不對外公佈。為提供精確的服，我們會將收集的問卷調查內容進行統計與
    分析，分析結果之統計數據或說明文字呈現，除供內部研究外，我們會視需要公佈統計數據及說
    明文字，但不涉及特定個人之資料。

    四、隱私權保護政策之修正
    本網站隱私權保護政策將因應需求隨時進行修正，修正後的條款將刊登於網站上。
                            </textarea>
            </div>
            <div class="m-auto">
              <input  @click="register" type="text" value="同意並確定註冊" class="jo_btn jo_btnRed registerBtn" />
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- modal條款結束 -->
  </div>
</template>


<script>
import $ from "jquery";
import axios from "axios";

export default {
  name: "register",
  data() {
    return {
      nowHead:require('@/assets/img/jo_images/jo_footerBirdDark.svg'),
      headName:"",
      headfile:{},
      checkNG:false,
      allCorrect:"",
      //城市迴圈開始
      options: [
        { text: "臺北市", value: "臺北市" },
        { text: "新北市", value: "新北市" },
        { text: "桃園市", value: "桃園市" },
        { text: "臺中市", value: "臺中市" },
        { text: "臺南市", value: "臺南市" },
        { text: "高雄市", value: "高雄市" },
        { text: "基隆市", value: "基隆市" },
        { text: "新竹縣", value: "新竹縣" },
        { text: "新竹市", value: "新竹市" },
        { text: "嘉義縣", value: "嘉義縣" },
        { text: "嘉義市", value: "嘉義市" },
        { text: "苗栗縣", value: "苗栗縣" },
        { text: "彰化縣", value: "彰化縣" },
        { text: "南投縣", value: "南投縣" },
        { text: "雲林縣", value: "雲林縣" },
        { text: "屏東縣", value: "屏東縣" },
        { text: "宜蘭縣", value: "宜蘭縣" },
        { text: "花蓮縣", value: "花蓮縣" },
        { text: "臺東縣", value: "臺東縣" },
        { text: "澎湖縣", value: "澎湖縣" },
      ],

      m_city: "選擇您的居住城市",
      //城市迴圈結束

      //全選鈕開始
      checkName: [""],
      ifAll: 0,
      selectAll: [
        "all",
        "outdoor",
        "sport",
        "music",
        "art",
        "brainstorming",
        "audio",
        "food",
        "social",
        "academic",
        "tourism",
        "charity",
        "otaku",
        "tech",
        "handmake",
      ],
      //全選鈕結束

      accountName: "",
      passwordName: "",
      rePasswordName: "",
      memberName: "",
      memberMail: "",
      memberPhone: "",
      memberBirthday: "",
      m_city: "",
      favCat: "",
      m_intro: "",
      sex: "",
    };
  },

  methods: {
    checkAccount(){
      axios.get(`register/check/${this.accountName}`)
      .then(e=>{
        console.log(e.data);
        if(e.data =="ng"){
          this.$refs.accountName.focus();
          this.checkNG = true;
        }
        if(e.data =="ok"){
          this.checkNG = false;
        }
      })
    },
    changeImage(e) {
      // console.log(e.target.files[0]);
        this.headfile = e.target.files[0];
        this.headName = e.target.files[0].name;
        var reader = new FileReader();
        var vm = this ;
        reader.readAsDataURL(vm.headfile);
        reader.onload = function(e) {
          vm.nowHead = this.result;
        }
      },
       //check format
    valadityCheck: function () {
      var vm = this;
      var inputs = document.querySelectorAll("form input");
      console.log(inputs);
      var test = true;
      inputs.forEach((input) => {
        if (!input.checkValidity()) {
          test = false;
        }
      });
      if (!test) {
        vm.$toasted.show("請填入完整註冊資訊");
      } else {
        vm.allCorrect = true;
      }
    },

    //全選鈕可以全選，也可以全取消，開始
    selectAllCheck: function () {
      if (!this.ifAll) {
        this.checkName = this.selectAll;
        this.ifAll = 1;
      } else {
        this.checkName = [];
        this.ifAll = 0;
      }
    },
    //全選鈕可以全選，也可以全取消，結束

    onChange(event) {
      var data = event.target.value;
      console.log(data);
    },

    autoMsg: function () {
      this.accountName = "aaaa";
      this.passwordName = "1111";
      this.rePasswordName = "1111";
      this.memberName = "口香糖公主";
      this.memberMail = "bubble@gmail.com";
      this.memberPhone = "0953435999";
      this.m_intro = "口香糖公主第一名";
      this.sex = "female";
      this.m_city = "臺中市";
      this.memberBirthday = "2020-08-21";
    },


    register: function () {
      var vm = this;
      let memberData = {
          m_name: vm.memberName,
          m_account: vm.accountName,
          m_password: vm.passwordName,
          m_email: vm.memberMail,
          m_phone: vm.memberPhone,
          m_birthday: vm.memberBirthday,
          m_address: vm.m_city,
          m_introduce: vm.m_intro,
          m_sex: vm.sex,
          m_checkName: vm.checkName
        };
        // sendData.memberData = memberData;
        // memberData.headfile =  vm.headfile;
      let sendData = new FormData();
      // sendData.append('m_name',vm.memberName);
      sendData.append('m_name',vm.memberName);
      sendData.append('m_account',vm.accountName);
      sendData.append('m_password',vm.passwordName);
      sendData.append('m_email',vm.memberMail);
      sendData.append('m_phone',vm.memberPhone);
      sendData.append('m_birthday',vm.memberBirthday);
      sendData.append('m_address',vm.m_city);
      sendData.append('m_introduce',vm.m_intro);
      sendData.append('m_sex', vm.sex);
      sendData.append('m_checkName', vm.checkName);
      sendData.append('file', vm.headfile);
      let config = {
        header : {
            'Content-Type' : 'multipart/form-data'
        }
      };
      axios.post("register",sendData,config).then((response) => {
        console.log(response.data);
        $('#myClauseForm').modal("hide");
        this.$router.push('/registerWelcome');
        //todo 檢查 reponse 是否異常
        //todo alert 註冊成功請重新登入
        //todo 頁面導到登入畫面

      });
      // axios.post("register",sendData,config).then((response) => {
      //   console.log(response.data);    
      // });
    },
  },
};
</script>


<style>
@import "../../assets/css/register.css";
@import "../../assets/css/clause.css";

#myRegisterForm{
  margin-top: 6rem;
}
.registerBtn{
  margin-top: 1rem;
}
.headImg{
    width: 100px;
    height: 100px;
    position: absolute;
    right: 0;
    top: -45px;
    border-radius: 100px;
}
.loadImg{
  text-align: center;
  margin-top: 10px;
}
</style>
 