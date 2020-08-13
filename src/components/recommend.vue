<template>
  <!-- 主畫面大區塊開始 -->
  <!-- <div class="main-content" :class="{'main-content_large':showSlideBox}"> -->
  <div class="main-content">
    <div class="filterAreaPop">
      <h3>熱門活動</h3>
    </div>
    <!-- 旋轉木馬開始 -->
    <div id="indexCarousel">
      <div class="carousel">
        <div class="carousel__nav">
          <span @click="moveLeft" id="moveLeft" class="carousel__arrow jo_hover">
            <svg class="carousel__icon jo_hover" width="20" height="20" viewBox="0 0 24 24">
              <path
                class="jo_hover"
                d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"
              />
            </svg>
          </span>
          <span @click="moveRight" id="moveRight" class="carousel__arrow jo_hover">
            <svg class="carousel__icon jo_hover" width="20" height="20" viewBox="0 0 24 24">
              <path
                class="jo_hover"
                d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"
              />
            </svg>
          </span>
        </div>
        <div v-for="(item,index) in carouselItem" :key="index" class="carousel-item">
          <div
            class="carousel-item__image"
            :style="{'backgroundImage':'url(../../static/img/activityPic/'+item.a_pic+')'}"
          ></div>
          <div class="carousel-item__info">
            <div class="carousel-item__container">
              <h2 class="carousel-item__subtitle">{{item.a_start}}-{{item.a_end}}</h2>
              <h1 class="carousel-item__title">{{item.a_name}}</h1>
              <p class="carousel-item__description">{{item.c_category}}</p>
              <div class="caButton">
                <router-link :to="{ name:'activity',query:{a_ID:item.a_ID }}">
                  <input type=" button" class="jo_btn jo_btnOrange jo_btn_s deButton" value="活動詳情" />
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 旋轉木馬結束 -->
    <div>
      <!-- 8宮格活動系列(為您推薦)開始 -->
      <div class="wholeAct">
        <div class="filterAreaRe">
          <div class="areaRecommend">
            <div>
              <div>
                <h3>為您推薦</h3>
              </div>
            </div>
            <div>
              <h6>
                <img class="joPic_hover reFlag" src="../assets/img/jo_icon/jo_i_flag.svg" alt />
                &nbsp;表示已成團
              </h6>
            </div>
          </div>

          <div class="areaTime">
            <div class="areaItem1">
              <div class="detal timeSelect">
                <select class="jo_hover" v-model="byTime" @change="sortByTime">
                  <option value disabled selected>依時間前後排序</option>
                  <option value="recent">時間:由新到舊</option>
                  <option value="old">時間:由舊到新</option>
                </select>
              </div>
            </div>

            <div class="areaItem2">
              <div class="detal timeSelect">
                <select class="jo_hover" v-model="byCost" @change="sortByCost">
                  <option value disabled selected>依價位高低排序</option>
                  <option value="high">價位:由高到低</option>
                  <option value="low">價位:由低到高</option>
                </select>
              </div>
            </div>

            <div class="areaItem3">
              <div class="detal timeSelect">
                <select class="jo_hover" v-model="byCollect" @change="sortByCollect">
                  <option selected disabled>依收藏人數排序</option>
                  <option value="more">收藏:由多到少</option>
                  <option value="less">收藏:由少到多</option>
                </select>
              </div>
            </div>

            <div class="areaItem4">
              <div class="searchBox">
                <input type="search" name id placeholder="搜尋" />
                <button class="jo_btn jo_btn_s jo_btnWater jo_hover">
                  <i class="fa fa-search jo_hover"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="recommendArea">
          <ul class="grid gridAct cs-style-3">
            <li v-for="(item, index) in reActList" :key="index">
              <figure>
                <img
                  class="innerPic"
                  :src="require(`../../static/img/activityPic/${item.a_pic}`)"
                  alt="img04"
                />
                <figcaption>
                  <div class="d-flex innerPicSlide">
                    <div class="actDes">
                      <h3 class="ellipsis">{{item.a_name}}</h3>
                      <span>{{item.a_start}}</span>
                    </div>
                    <div>
                      <img
                        class="joPic_hover"
                        id="innerFlag"
                        src="../assets/img/jo_icon/jo_i_flag.svg"
                        alt
                      />
                    </div>
                  </div>
                  <hr id="actArea" />
                  <p class="ad">{{item.a_address}}</p>
                  <p class="ac">{{item.c_category}}</p>
                  <div class="ActButton">
                    <router-link :to="{ name:'activity',query:{a_ID:item.a_ID }}">
                      <input type="button" name id class="jo_btn jo_btnRed jo_btn_s" value="活動詳情" />
                    </router-link>
                    <!-- <input type=" button" name="" id="" class="jo_btn jo_btnWater jo_btn_s"
                    value="活動詳情">-->
                  </div>
                </figcaption>
              </figure>

              <!-- 幾人收藏 + 愛心開始 -->
              <div class="row mx-0 collectAndLike">
                <div>
                  <h6>{{item.collect}}人收藏</h6>
                </div>
                <favicon
                  class="jo_heartDiv"
                  @refreachLike="collectActivity"
                  :liked="item.like"
                  :aid="item.a_ID"
                ></favicon>
              </div>
              <!-- 幾人收藏+愛心結束 -->
            </li>
          </ul>
        </div>
      </div>
      <!-- 8宮格活動系列(為您推薦)結束 -->

      <!-- 8宮格活動區塊系列(您附近的活動)開始 -->
      <div class="wholeAct">
        <div class="filterArea">
          <div class="areaNearby">
            <div>
              <h3>您附近的活動</h3>
            </div>
            <div>
              <h6>
                <img class="joPic_hover reFlag" src="../assets/img/jo_icon/jo_i_flag.svg" alt />&nbsp;表示已成團
              </h6>
            </div>
          </div>
        </div>

        <div class="yourArea">
          <ul class="grid gridAct cs-style-3">
            <li v-for="(item, index) in nearbyActList" :key="index">
              <figure>
                <img
                  class="innerPic"
                  :src="require(`../../static/img/activityPic/${item.a_pic}`)"
                  alt="img04"
                />

                <figcaption>
                  <div class="d-flex innerPicSlide">
                    <div class="actDes">
                      <h3 class="ellipsis">{{item.a_name}}</h3>
                      <span>{{item.a_start}}</span>
                    </div>
                    <div>
                      <img
                        class="joPic_hover"
                        id="innerFlag"
                        src="../assets/img/jo_icon/jo_i_flag.svg"
                        alt
                      />
                    </div>
                  </div>
                  <hr id="actArea" />
                  <p class="ad">{{item.a_address}}</p>
                  <p class="ac">{{item.c_category}}</p>
                  <div class="ActButton">
                    <router-link :to="{ name:'activity',query:{a_ID:item.a_ID }}">
                      <input type="button" name id class="jo_btn jo_btnRed jo_btn_s" value="活動詳情" />
                    </router-link>
                    <!-- <input type=" button" name id class="jo_btn jo_btnWater jo_btn_s" value="活動詳情" /> -->
                  </div>
                </figcaption>
              </figure>

              <!-- 幾人收藏 + 愛心開始 -->
              <div class="row mx-0 collectAndLike">
                <div class>
                  <h6>{{item.collect}}人收藏</h6>
                </div>

                <favicon
                  class="jo_heartDiv"
                  @refreachLike="collectActivityNear"
                  :liked="item.like"
                  :aid="item.a_ID"
                ></favicon>
              </div>
              <!-- 幾人收藏+愛心結束 -->
            </li>
          </ul>
        </div>
      </div>
      <!-- 8宮格活動區塊系列(您附近的活動)結束 -->

      <!-- Banner開始 -->
      <div class="myBanner">
        <div class="bannerFirst">
          <div class="bannerPic hvr-pop ld ld-swim">
            <img src="../assets/img/jo_images/jo_birdA.svg" alt />
          </div>
          <div class="bannerWord">
            <h3 class="hvr-hang">輕鬆Jo團</h3>
          </div>
        </div>

        <div class="bannerFirst">
          <div class="bannerPic hvr-pop ld ld-swim">
            <img src="../assets/img/jo_images/jo_birdB.svg" alt />
          </div>
          <div class="bannerWord">
            <h3 class="hvr-hang">Fun心去玩</h3>
          </div>
        </div>

        <div class="bannerFirst">
          <div class="bannerPic hvr-pop ld ld-swim">
            <img src="../assets/img/jo_images/jo_birdC.svg" alt />
          </div>
          <div class="bannerWord">
            <h3 class="hvr-hang">邊緣人不再孤單</h3>
          </div>
        </div>
      </div>
      <!-- Banner結束 -->
    </div>
  </div>
</template>


<script>
import $ from "jquery";
import axios from "axios";
import favicon from "./Favicon";

export default {
  name: "recommend",
  components: {
    favicon,
  },

  data() {
    return {
      currentPic: 0,
      carouselItem: [],
      totalCarouselItem: 4,
      reActList: [],
      nearbyActList: [],
      memberData: {},
      myFavList: [],
      byTime: "recent",
      byCost: "low",
      byCollect: "more",
    };
  },
  methods: {
    //收藏排序(推薦活動)
    sortByCollect() {
      console.log(this.byCollect);
      let type = this.byCollect;
      switch (type) {
        case "more": //大至小
          this.reActList.sort(function (a, b) {
            return a.collect < b.collect ? 1 : -1;
          });
          break;

        case "less": //小至大
          this.reActList.sort(function (a, b) {
            return a.collect > b.collect ? 1 : -1;
          });
          break;
      }
      switch (type) {
        case "more": //大至小
          this.nearbyActList.sort(function (a, b) {
            return a.collect < b.collect ? 1 : -1;
          });
          break;

        case "less": //小至大
          this.nearbyActList.sort(function (a, b) {
            return a.collect > b.collect ? 1 : -1;
          });
          break;
      }
    },
    // 金額排序(推薦活動)
    sortByCost() {
      console.log(this.byCost);
      let type = this.byCost;
      switch (type) {
        case "high": //高至低
          this.reActList.sort(function (a, b) {
            return a.a_price < b.a_price ? 1 : -1;
          });
          break;

        case "low": //低至高
          this.reActList.sort(function (a, b) {
            return a.a_price > b.a_price ? 1 : -1;
          });
          break;
      }

      switch (type) {
        case "high": //高至低
          this.nearbyActList.sort(function (a, b) {
            return a.a_price < b.a_price ? 1 : -1;
          });
          break;

        case "low": //低至高
          this.nearbyActList.sort(function (a, b) {
            return a.a_price > b.a_price ? 1 : -1;
          });
          break;
      }
    },
    // 時間排序(推薦活動)
    sortByTime() {
      // console.log(this.byTime);
      let type = this.byTime;
      switch (type) {
        case "recent":
          this.reActList.sort(function (a, b) {
            return a.a_start < b.a_start ? 1 : -1;
          });
          break;

        case "old":
          this.reActList.sort(function (a, b) {
            return a.a_start > b.a_start ? 1 : -1;
          });
          break;
      }

      switch (type) {
        case "recent":
          this.nearbyActList.sort(function (a, b) {
            return a.a_start < b.a_start ? 1 : -1;
          });
          break;

        case "old":
          this.nearbyActList.sort(function (a, b) {
            return a.a_start > b.a_start ? 1 : -1;
          });
          break;
      }
    },

    getNearbyItem() {
      var vm = this;
      axios.get("home/recommend").then((e) => {
        // console.log(e.data);
        vm.nearbyActList = e.data;
      });
    },

    getRecommendItem() {
      var vm = this;
      axios.get("home/recommend").then((e) => {
        // console.log(e.data);
        vm.reActList = e.data;
      });
    },

    memberGetNearbyItem() {
      var vm = this;
      axios.get(`home/memberNearby/${vm.memberData.m_ID}`).then((e) => {
        // console.log(e.data);
        vm.nearbyActList = e.data;
        vm.bindFavList(vm.nearbyActList);
      });
    },

    memberGetRecommendItem() {
      var vm = this;
      axios.get(`home/memberRecommend/${vm.memberData.m_ID}`).then((e) => {
        vm.reActList = e.data;
        vm.bindFavList(vm.reActList);
      });
    },

    getCarouselItem() {
      var vm = this;
      axios.get("home/carouse").then((e) => {
        vm.carouselItem = e.data;
        vm.timeSubstr(vm.carouselItem);
        vm.totalCarouselItem = vm.carouselItem.length;
      });
    },
    moveRight() {
      var next = this.currentPic;
      this.currentPic = this.currentPic + 1;
      this.setSlide(next, this.currentPic);
    },
    moveLeft() {
      var prev = this.currentPic;
      this.currentPic = this.currentPic - 1;
      this.setSlide(prev, this.currentPic);
    },
    setSlide(prev, next) {
      var slide = this.currentPic;
      if (next > this.totalCarouselItem - 1) {
        slide = 0;
        this.currentPic = 0;
      }
      if (next < 0) {
        slide = this.totalCarouselItem - 1;
        this.currentPic = this.totalCarouselItem - 1;
      }

      $(".carousel-item").eq(prev).removeClass("active");
      $(".carousel-item").eq(slide).addClass("active");
    },

    // 推薦活動的愛心加一減一(純畫面show出，尚未記入資料庫)
    collectActivity(aid, like) {
      this.reActList.forEach((item, index) => {
        if (item.a_ID == aid && like) {
          this.reActList[index].collect++;
          this.reActList[index].like = 1;
        }
        if (item.a_ID == aid && like == false) {
          this.reActList[index].collect--;
          this.reActList[index].like = 0;
        }
      });
    },

    // 附近活動的愛心加一減一(純畫面show出，尚未記入資料庫)
    collectActivityNear(aid, like) {
      this.nearbyActList.forEach((item, index) => {
        if (item.a_ID == aid && like) {
          this.nearbyActList[index].collect++;
          this.nearbyActList[index].like = 1;
        }
        if (item.a_ID == aid && like == false) {
          this.nearbyActList[index].collect--;
          this.nearbyActList[index].like = 0;
        }
      });
    },

    //檢查
    bindFavList(search) {
      search.forEach((item, index) => {
        // console.log( this.myFavList);
        if (this.myFavList.indexOf(item.a_ID) > -1) {
          search[index].like = 1;
        } else {
          search[index].like = 0;
        }
      });
    },

    //取得該會員的喜愛類別清單
    getMyFavList() {
      axios.get(`/home/myfavList/${this.memberData.m_ID}`).then((e) => {
        console.log(e.data);
        const List = e.data.map((item) => Object.values(item)[0]);
        this.myFavList = List;
      });
    },
    // 取出的data時間格式整理	
    timeSubstr(data){	
        data.forEach((item,index) => {	
              data[index].a_start = item.a_start.substr(0,16);	
              data[index].a_end = item.a_end.substr(0,16);	
        });	
    },
  },
  mounted() {
    var vm = this;
    setTimeout(function () {
      vm.setSlide();
    }, 1000);
  },

  created() {
    var vm = this;
    vm.getCarouselItem();

    let islog = localStorage.getItem("myinfo");
    // console.log(islog);
    if (islog) {
      // console.log(islog);
      vm.memberData = JSON.parse(localStorage.getItem("myinfo"));
      vm.getMyFavList();
      // console.log(vm.memberData.m_ID);
      vm.memberGetNearbyItem();
      vm.memberGetRecommendItem();
    } else {
      vm.getRecommendItem();
      vm.getNearbyItem();
    }
  },
};
</script>

<style scoped>
/* indexCss引用  */
@import "../assets/css/da_index.css";
/* Carousel引用  */
@import "../assets/css/da_indexCarousel.css";
/* hover css引用  */
@import "../assets/css/hover.css";
@import "../assets/css/da_indexFooter.css";
/* 活動區塊引用  */
@import "../assets/css/da_grid_default.css";
@import "../assets/css/da_grid_component.css";

.filterArea {
  padding: 0px 1.8rem;
}

li .jo_heartDiv {
  width: 30px;
}

.collectAndLike {
  justify-content: space-between;
  margin-top: 0.3rem;
}

.collectAndLike div h6 {
  color: white;
  margin-bottom: 0;
  font-size: 1.2rem;
}

.ad {
  font-size: 1.2rem;
}

.ac {
  font-size: 1.2rem;
}

.carousel-item__description {
  font-size: 1.5rem;
}

.carousel-item__container {
  display: flex;
  flex-direction: column;
}

.caButton {
  padding: 0;
  justify-content: center;
  margin-top: 3rem;
}

/* banner */
.bannerFirst {
  border-radius: 0;
  box-shadow: 0 0 0 black;
}

.myBanner {
  background-image: url(../assets/img/jo_images/BannerFinal.png);
  background-position: bottom;
  background-attachment: fixed;
  background-size: cover;
  opacity: 1;
  box-shadow: 0px 30px 30px -30px rgba(0, 0, 0, 0.8) inset,
              0px -30px 30px -30px rgba(0, 0, 0, 0.8) inset;
  height: 300px;
  margin-top: 7rem;
}

.myBanner h3 {
  color: var(--jo_white);
  font-weight: normal;
}

</style>