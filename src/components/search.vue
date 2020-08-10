<template>
<div>
    <div class="wholeAct">
        <div class="filterAreaRe">
                <div class="areaRecommend">
                    <div>
                        <div>
                            <h3>搜尋結果</h3>
                        </div>
                    </div>
                    <div>
                        <h6>
                            <img class="joPic_hover reFlag" src="../assets/img/jo_icon/jo_i_flag.svg" alt="">
                            &nbsp;表示已成團
                        </h6>
                    </div>
                </div>

                <div class="areaTime">
                    <div class="areaItem1">
                        <div class="detal timeSelect ">
                            <select name="" id="">
                                <option value="">依時間前後排序</option>
                                <option value="new">時間:由新到舊</option>
                                <option value="old">時間:由舊到新</option>
                            </select>
                        </div>
                    </div>

                    <div class="areaItem2">
                        <div class="detal timeSelect">
                            <select name="" id="">
                                <option value="">依價位高低排序</option>
                                <option value="">價位:由新到舊</option>
                                <option value="">價位:由舊到新</option>
                            </select>
                        </div>
                    </div>

                    <div class="areaItem3">
                        <div class="detal timeSelect ">
                            <select name="" id="">
                                <option value="">依收藏人數排序</option>
                                <option value="">收藏人數:多到少</option>
                                <option value="">收藏人數:少到多</option>
                            </select>
                        </div>
                    </div>

                    <div class="areaItem4">
                        <div class="searchBox">
                            <input type="search" name="" id="" placeholder="搜尋">
                            <button class="jo_btn jo_btn_s jo_btnWater jo_hover"><i
                                    class="fa fa-search jo_hover"></i>
                            </button>
                        </div>
                    </div>
                </div>
        </div>
            <div class="yourArea">
                <ul class="grid gridAct cs-style-3 ">
                    <li v-for="(item,index) in searchDataList" :key="index">
                        <figure>
                            <img class="innerPic" :src="require(`../../static/img/activityPic/${item.a_pic}`)" alt="">
                            <figcaption>
                                <div class="d-flex innerPicSlide">
                                    <div class="actDes">
                                        <h3 class="ellipsis">{{item.a_name}}</h3>
                                        <span>{{item.a_start}}</span>
                                    </div>
                                    <!-- <div>
                                        <img class="joPic_hover" id="innerFlag"
                                            src="../assets/img/jo_icon/jo_i_flag.svg" alt="">
                                    </div> -->
                                </div>
                                <hr id="actArea">
                                <p>{{item.a_address}}</p>
                                <p>{{item.c_category}}</p>
                                <div class="ActButton">
                                    <router-link :to="{ name:'activity',query:{a_ID:item.a_ID }}" >
                                    <input type=" button" name="" id="" class="jo_btn jo_btnWater jo_btn_s"
                                        value="活動詳情">
                                    </router-link>
                                    <!-- <input type=" button" name="" id="" class="jo_btn jo_btnWater jo_btn_s"
                                        value="活動詳情"> -->
                                </div>
                            </figcaption>
                        </figure>
                        <!-- 幾人收藏 + 愛心開始 -->
                        <div class="row mx-0 collectAndLike">
                            <div class="">
                                <h6>{{item.collect}}人收藏</h6>
                            </div>
                            <favicon @refreachLike="getSearchData" :liked="item.like" :aid="item.a_ID" ></favicon>
                            <!-- <favicon></favicon> -->
                            <!-- <div class="jo_heartDiv" style="zoom: .3">
                                <img class="jo_heart " src="../assets/img/jo_images/jo_heart.svg" alt="">
                                <img class="jo_heart jo_hover" src="../assets/img/jo_images/jo_heart.svg" alt="">
                            </div> -->
                        </div>
                        <!-- 幾人收藏+愛心結束 -->
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>



<script>
import $ from "jquery";
import axios from "axios";
import favicon from "./Favicon";
export default {
    name:'search',
    components:{
        favicon,
    },
    data() {
        return {
           me:{},
           myFavList:[],
           area:"",
           cost:"",
           category:"",
           doorType:"",
           activityTime:"",
           searchDataList:[],
        }
    },
    methods: {
        getSearchData(){
            var vm = this;
            axios.get(`/home/search/${this.area}/${this.cost}/${this.category}/${this.doorType}/${this.activityTime}`)
            .then(e=>{
                var search = e.data
                search.forEach((item,index)=>{
                    // console.log( vm.myFavList);
                    if( vm.myFavList.indexOf(item.a_ID)> -1 ){
                        search[index].like = 1
                    }
                    else{
                       search[index].like = 0
                    } 
                })
                vm.searchDataList = search;
                // console.log(search);
            })
        },
        getMyFavList(){
            var vm = this;
            axios.get(`/home/myfavList/${vm.me.m_ID}`)
            .then(e=>{
                    // console.log(e.data);
                const List = e.data.map(item => Object.values(item)[0])
                vm.myFavList = List;
            })
        }
        
    },
    watch: {
         '$route':function() {
            this.area = this.$route.query.area;
            this.cost = this.$route.query.cost;
            this.category = this.$route.query.category;
            this.doorType = this.$route.query.doorType;
            this.activityTime = this.$route.query.activityTime;
            this.getSearchData();
          } 
    },
    created() {
        let islog = localStorage.getItem('myinfo')
        if(islog){
            this.me = JSON.parse(localStorage.getItem('myinfo'));
             this.getMyFavList(); 
        }

        this.area = this.$route.query.area;
        this.cost = this.$route.query.cost;
        this.category = this.$route.query.category;
        this.doorType = this.$route.query.doorType;
        this.activityTime = this.$route.query.activityTime;
        this.getSearchData();





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

.grid{
    display: flex;
    margin-left: 145px;
    flex-wrap: wrap;
}
.grid li{
    margin: 15px;
}
.filterAreaRe{
  width: 1360px;
  padding: 0 0 1rem 1rem;
  border-bottom: 3px solid;
  margin-left: 7rem;

}
 li .jo_heartDiv {
    width: 40px;
}
.collectAndLike{
    align-items: flex-start;
}






</style>