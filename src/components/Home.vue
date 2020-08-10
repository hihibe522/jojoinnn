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
                            <div class="sidebarImg"><img class="sidebarImg joPic_hover" 
                                    src="../assets/img/jo_icon/jo_i_explore.svg" alt=""></div>
                            <div :class="{'sidebarWord':showSlideBox}" :style="{ display: display}">
                                <!-- <router-link to="/search"><h5>出發探索</h5></router-link> -->
                            <h5>設定條件探索</h5>
                            </div>
                        </div>
                    </li>
                    <div :class="{'sidebarTitle':showSlideBox}" :style="{ display: display}">
                        <hr>
                    </div>
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
                            <select class="jo_hover" @change="searchActivity" v-model="area">
                                <option selected value="all">全部</option>
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
                                <h5>收費</h5>
                            </div>
                        </div>
                        <div :class="{'sidebarTitle':showSlideBox}" :style="{ display: display}">
                            <div id="sideRadio">
                                <div>
                                    <input @change="searchActivity" v-model="cost" id="free" type="radio" name="cost" value="0">
                                    <label class="jo_hover" for="free">免費</label>
                                </div>

                                <div>
                                    <input @change="searchActivity" v-model="cost" id="paid" type="radio" name="cost" value="1">
                                    <label class="jo_hover" for="paid">付費</label>
                                </div>
                            </div>
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
                            <select class="jo_hover" @change="searchActivity" v-model="category">
                                <option selected value="all">全部</option>
                                <option v-for="item in categoryList" :key="item.c_ID" :value="item.c_ID">{{item.c_category}}</option>
                                
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
                                    <input  @change="searchActivity" v-model="doorType" id="indoor" type="radio" name="door" value="indoor">
                                    <label class="jo_hover" for="indoor">室內</label>
                                </div>

                                <div>
                                    <input  @change="searchActivity" v-model="doorType" id="outdoor" type="radio" name="door" value="outdoor">
                                    <label class="jo_hover" for="outdoor">室外</label>
                                </div>
                            </div>
                        </div>
                    </li>

                    <div :class="{'sidebarTitle':showSlideBox}" :style="{ display: display}">
                        <hr>
                    </div>

                    <!-- <li>
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
                                    <input v-model="doorType" id="goodToGo" type="radio" name="goodToGo">
                                    <label for="goodToGo">成團</label>
                                </div>
                                <div>
                                    <input id="notToGo" type="radio" name="goodToGo" value="">
                                    <label for="notToGo">尚未</label>
                                </div>
                            </div>
                        </div>
                    </li> -->

                    <!-- <div :class="{'sidebarTitle':showSlideBox}" :style="{ display: display}">
                        <hr>
                    </div> -->

                    <li>
                        <div class="sidebarImgTitle">
                            <div class="sidebarImg"><img class="sidebarImg joPic_hover"
                                    src="../assets/img/jo_icon/jo_i_calendar.svg" alt=""></div>
                            <div class="sidebarWord" :style="{ display: display}">
                                <h5>活動日期</h5>
                            </div>
                        </div>
                        <div :class="{'sidebarWord':showSlideBox}" class="actDateSelect" :style="{ display: display}">
                            <input class="jo_hover" @change="searchActivity" v-model="activityTime" type="date">
                        </div>
                    </li>

                    <div :class="{'sidebarTitle':showSlideBox}" :style="{ display: display}">
                        <hr>
                    </div>

                    
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

export default {
name:"home",
data() {
    return {
        showSlideBox:false,
        categoryList:[],
        area:"all",
        cost:"0",
        category:"all", 
        doorType:"indoor",
        activityTime:""
    }
},
methods: {
    searchActivity(){

      this.$router.push({path: '/search',
                        query: {area:this.area,
                                cost:this.cost,
                                category:this.category,
                                doorType:this.doorType,
                                activityTime:this.activityTime
                                }})
    },
    getNowday(){
        var now = new Date();
        //格式化日，如果小於9，前面補0
        var day = ("0" + now.getDate()).slice(-2);
        //格式化月，如果小於9，前面補0
        var month = ("0" + (now.getMonth() + 1)).slice(-2);
        //拼裝完整日期格式
        var today = now.getFullYear()+"-"+(month)+"-"+(day) ;
        //完成賦值
        this.activityTime = today;
    }
        
    },
    computed: {
        display:function(){
            if(!this.showSlideBox){
                return "none";
            }
        }
    },
    mounted() {

    },
    created() {
        var vm = this;
        axios.get('modules/category').then(e=>{
                    //console.log(e);
            vm.categoryList = e.data ;

        })
        this.getNowday();
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