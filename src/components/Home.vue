<template>
    <div class="grid-container">
        <div :class="{'sidebar_small':showSlideBox,'sidebar_scroll':showSlideBox}" class="sidebar jo_scrollbar sidebar_scroll">

            <div @click="showSlideBox =! showSlideBox" class="slideBox jo_hover" id="mySlideBox" type="button">
                <img id="slideIcon" :class="{'down':showSlideBox}" class="rotate jo_hover" type="button" src="../assets/img/jo_icon/jo_i_slide.svg"
                    alt="">
            </div>
            <ul>
                <div id="sideBarFilter">
                    <li>
                        <div class="sidebarImgTitle">
                            <div class="sidebarImg"><img class="sidebarImg iconMargin hvr-pop joPic_hover"
                                    src="../assets/img/jo_icon/jo_i_area.svg" alt="">
                            </div>
                            <div :class="{'sidebarWord':showSlideBox}" :style="{ display: display}">
                                <h5>地區</h5>
                            </div>
                        </div>

                        <div :class="{'sidebarTitle':showSlideBox}" :style="{ display: display}">
                            <select name="" id="">
                                <option selected="selected" value="臺北市">臺北市</option>
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
                    </li>

                    <div :class="{'sidebarTitle':showSlideBox}" :style="{ display: display}">
                        <hr>
                    </div>

                    <li>
                        <div class="sidebarImgTitle">
                            <div :class="{'sidebarImg':showSlideBox}"><img class="sidebarImg joPic_hover" src="../assets/img/jo_icon/jo_i_price.svg"
                                    alt="">
                            </div>
                            <div :class="{'sidebarWord':showSlideBox}" :style="{ display: display}">
                                <h5>價位</h5>
                            </div>
                        </div>
                        <div :class="{'sidebarTitle':showSlideBox}" :style="{ display: display}">
                            <select name="" id="">
                                <option value="">免收費</option>
                                <option value="">$1-$100</option>
                                <option value="">$100-$500</option>
                                <option value="">$500-$1000</option>
                                <option value="">$1000-$1500</option>
                                <option value="">$1500-$2000</option>
                                <option value="">$2000-$2500</option>
                                <option value="">$2500-$3000</option>
                                <option value="">$3000-$3500</option>
                                <option value="">$3500-$4000</option>
                                <option value="">$4000-$4500</option>
                                <option value="">$4500-$5000</option>
                                <option value="">$5000-$5500</option>
                                <option value="">$5500-$6000</option>
                            </select>
                        </div>
                    </li>

                    <div :class="{'sidebarTitle':showSlideBox}" :style="{ display: display}">
                        <hr>
                    </div>

                    <li>
                        <div class="sidebarImgTitle">
                            <div class="sidebarImg"><img class="sidebarImg joPic_hover" src="../assets/img/jo_icon/jo_i_type.svg"
                                    alt="">
                            </div>
                            <div :class="{'sidebarWord':showSlideBox}" :style="{ display: display}">
                                <h5>類型</h5>
                            </div>
                        </div>
                        <div :class="{'sidebarTitle':showSlideBox}" :style="{ display: display}">
                            <select name="" id="">
                                <option value="">戶外休閒類</option>
                                <option value="">運動類</option>
                                <option value="">音樂類</option>
                                <option value="">藝文類</option>
                                <option value="">益智類</option>
                                <option value="">視聽類</option>
                                <option value="">飲食類</option>
                                <option value="">社交聯誼類</option>
                                <option value="">學術類</option>
                                <option value="">旅遊類</option>
                                <option value="">社會服務類</option>
                                <option value="">宅文化類</option>
                                <option value="">科技類</option>
                                <option value="">手做類</option>
                            </select>
                        </div>
                    </li>

                    <div :class="{'sidebarTitle':showSlideBox}" :style="{ display: display}">
                        <hr>
                    </div>

                    <li>
                        <div class="sidebarImgTitle">
                            <div class="sidebarImg"><img class="sidebarImg joPic_hover" src="../assets/img/jo_icon/jo_i_indoor.svg"
                                    alt="">
                            </div>
                            <div :class="{'sidebarWord':showSlideBox}" :style="{ display: display}">
                                <h5>室內/室外</h5>
                            </div>
                        </div>

                        <div :class="{'sidebarTitle':showSlideBox}" :style="{ display: display}">
                            <div id="sideRadio">
                                <div>
                                    <input id="indoor" type="radio" name="door" value="">
                                    <label for="indoor">室內</label>
                                </div>

                                <div>
                                    <input id="outdoor" type="radio" name="door" value="">
                                    <label for="outdoor">室外</label>
                                </div>
                            </div>
                        </div>
                    </li>

                    <div :class="{'sidebarTitle':showSlideBox}" :style="{ display: display}">
                        <hr>
                    </div>

                    <li>
                        <div class="sidebarImgTitle" :style="{ display: display}">
                            <div class="sidebarImg">
                                <img class="sidebarImg joPic_hover" src="../assets/img/jo_icon/jo_i_goodtogo.svg" alt="">
                            </div>
                            <div :class="{'sidebarWord':showSlideBox}" :style="{ display: display}">
                                <h5>是否成團</h5>
                            </div>
                        </div>


                        <div :class="{'sidebarTitle':showSlideBox}" :style="{ display: display}">
                            <div id="sideRadio">
                                <div>
                                    <input class="" type="radio" name="goodToGo" value="">
                                    <label for="indoor">成團</label>
                                </div>
                                <div>
                                    <input type="radio" name="goodToGo" value="">
                                    <label for="indoor">尚未</label>
                                </div>
                            </div>
                        </div>
                    </li>

                    <div :class="{'sidebarTitle':showSlideBox}" :style="{ display: display}">
                        <hr>
                    </div>

                    <li>
                        <div class="sidebarImgTitle">
                            <div class="sidebarImg"><img class="sidebarImg joPic_hover"
                                    src="../assets/img/jo_icon/jo_i_calendar.svg" alt=""></div>
                            <div class="sidebarWord" :style="{ display: display}">
                                <h5>活動日期</h5>
                            </div>
                        </div>
                        <div :class="{'sidebarWord':showSlideBox}" class="actDateSelect" :style="{ display: display}">
                            <input type="date">
                        </div>
                    </li>

                    <div :class="{'sidebarTitle':showSlideBox}" :style="{ display: display}">
                        <hr>
                    </div>

                    <li>
                        <div class="sidebarImgTitle">
                            <div class="sidebarImg"><img class="sidebarImg joPic_hover" 
                                    src="../assets/img/jo_icon/jo_i_explore.svg" alt=""></div>
                            <div :class="{'sidebarWord':showSlideBox}" :style="{ display: display}">
                                <router-link to="/search"><h5>出發探索</h5></router-link>
                                
                            </div>
                        </div>
                    </li>
                </div>

            </ul>
        </div>
        <!-- 側邊欄(left)結束 -->
        <router-view></router-view>

        
    
    </div> 
  
</template>


<script>
import $ from "jquery";
import axios from "axios";
// import '../assets/js/grid_modernizr.custom';
// import { Modernizr } from '@/assets/js/grid_modernizr.custom.js'

export default {
name:"home",
data() {
    return {
        showSlideBox:false,
        // currentPic:0,
        // carouselItem:[],
        // totalCarouselItem:4
    }
},
methods: {
    // getCarouselItem(){
    //     var vm = this;
    //     axios.get('home/carouse')
    //     .then(e=>{
    //         console.log(e.data);
    //         vm.carouselItem = e.data;
    //         vm.totalCarouselItem =  vm.carouselItem.length;
    //     })

    // },
    // moveRight(){
    //     var next = this.currentPic;
    //     this.currentPic = this.currentPic + 1;
    //     this.setSlide(next, this.currentPic);
    // },
    // moveLeft(){
    //     var prev = this.currentPic;
    //     this.currentPic = this.currentPic - 1;
    //     this.setSlide(prev,this.currentPic);
    // },
    // setSlide(prev, next){
    //     var slide = this.currentPic;
    //     if (next > this.totalCarouselItem - 1) {
    //         slide = 0;
    //          this.currentPic = 0;
    //     }
    //     if (next < 0) {
    //         slide = this.totalCarouselItem - 1;
    //          this.currentPic = this.totalCarouselItem - 1;
    //     }

    //     $('.carousel-item').eq(prev).removeClass('active');
    //     $('.carousel-item').eq(slide).addClass('active');
      
    // }

        
    },
    computed: {
        display:function(){
            if(!this.showSlideBox){
                return "none";
            }
        }
    },
    mounted() {
        // var vm = this;
        // setTimeout(function () {
        //     vm.setSlide()
        //     }, 1000);
    },
    created() {
        // this.getCarouselItem();

        // this.setSlide();
    },
}
</script>

<style scoped>
/* indexCss引用  */
@import '../assets/css/da_index.css';
/* Carousel引用  */
@import '../assets/css/da_indexCarousel.css';
/* hover css引用  */
@import '../assets/css/hover.css';
@import '../assets/css/da_indexFooter.css';
/* 活動區塊引用  */
@import '../assets/css/da_grid_default.css';
@import '../assets/css/da_grid_component.css';




</style>