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
                            <select class="jo_hover" v-model="byTime"  @change="sortByTime">
                                <option disabled>依時間前後排序</option>
                                <option selected value="new">時間:由近到遠</option>
                                <option value="old">時間:由遠到近</option>
                            </select>
                        </div>
                    </div>

                    <div class="areaItem2">
                        <div class="detal timeSelect">
                            <select class="jo_hover" v-model="byCost"  @change="sortByCost">
                                <option disabled>依價位高低排序</option>
                                <option selected value="low">價位:由低到高</option>
                                <option value="high">價位:由高到低</option>
                            </select>
                        </div>
                    </div>

                    <div class="areaItem3">
                        <div class="detal timeSelect ">
                            <select class="jo_hover" v-model="byCollect"  @change="sortByCollect">
                                <option disabled>依收藏人數排序</option>
                                <option selected value="many">收藏人數:多到少</option>
                                <option value="less">收藏人數:少到多</option>
                            </select>
                        </div>
                    </div>

                    <div class="areaItem4">
                        <div class="searchBox">
                            <input class="jo_hover" @keyup.enter="searchByText" v-model="searchText" type="search" placeholder="輸入名稱搜尋">
                            <button @click="searchByText" class="jo_btn jo_btn_s jo_btnWater jo_hover"><i
                                    class="fa fa-search jo_hover"></i>
                            </button>
                        </div>
                    </div>
                </div>
        </div>
            <div class="yourArea">
                <div class="notFound" v-if="searchDataList == ''">
                     <p>尚未有符合的資料唷🧐</p>
                    <img src="@/assets/img/jo_images/jo_notFind.svg" alt="">
                </div>
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
                                    <input type=" button" name="" id="" class="jo_btn jo_btnRed jo_btn_s"
                                        value="活動詳情">
                                    </router-link>
                                </div>
                            </figcaption>
                        </figure>
                        <!-- 幾人收藏 + 愛心開始 -->
                        <div class="row mx-0 collectAndLike">
                            <div class="">
                                <h6>{{item.collect}}人收藏</h6>
                            </div>
                            <favicon @refreachLike="collectActivity" :liked="item.like" :aid="item.a_ID" ></favicon>
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
           byTime:"new",
           byCost:"low",
           byCollect:"many",
           searchText:""
        }
    },
    methods: {
        collectActivity(aid,like){

            this.searchDataList.forEach((item,index)=>{
                if(item.a_ID == aid && like){
                    this.searchDataList[index].collect ++ ; 
                }
                if(item.a_ID == aid && like == false){
                    this.searchDataList[index].collect -- ;
                }              
            })

        },
        // 取出的data時間格式整理
        timeSubstr(){
            this.searchDataList.forEach((item,index) => {
                this.searchDataList[index].a_start = item.a_start.substr(0,16);
                this.searchDataList[index].a_end = item.a_end.substr(0,16);
            });
        },
        searchByText(){
            var vm = this;
            console.log(vm.searchText);
            axios.get(`home/searchText/${vm.searchText}`)
            .then(e=>{
                console.log(e.data)
                vm.searchDataList = e.data;
                this.timeSubstr();
            })
        },
        // 收藏排序
        sortByCollect(){
            console.log(this.byCollect);
            let type = this.byCollect;
            switch (type){
                case "many": //大至小
                    this.searchDataList.sort(function (a, b) {
                        return a.collect < b.collect ? 1 : -1;
                    });    
                break; 
                
                case "less": //小至大
                    this.searchDataList.sort(function (a, b) {
                    return a.collect > b.collect ? 1 : -1;
                }); 
                break;
            }

            console.log(this.searchDataList);
        },
        // 金額排序
        sortByCost(){
            console.log(this.byCost);
            let type = this.byCost;
            switch (type){
                case "high": //大至小
                    this.searchDataList.sort(function (a, b) {
                        return a.a_price < b.a_price ? 1 : -1;
                    });    
                break; 
                
                case "low": //小至大
                    this.searchDataList.sort(function (a, b) {
                    return a.a_price > b.a_price ? 1 : -1;
                }); 
                break;
            }
            console.log(this.searchDataList);
        },
        // 時間排序
        sortByTime(){
            console.log(this.byTime);
            let type = this.byTime;
            switch (type){
                case "new":
                    this.searchDataList.sort(function (a, b) {
                        return a.a_ID < b.a_ID ? 1 : -1;
                    });    
                break; 
                
                case "old":
                    this.searchDataList.sort(function (a, b) {
                    return a.a_ID > b.a_ID ? 1 : -1;
                }); 
                break;
            }
            console.log(this.searchDataList);
        },
        getSearchData(){
            var vm = this;
            axios.get(`/home/search/${this.area}/${this.cost}/${this.category}/${this.doorType}/${this.activityTime}`)
            .then(e=>{
                vm.getMyFavList();
                vm.bindFavList(e.data);
            })
        },
        bindFavList(search){
             search.forEach((item,index)=>{
                    // console.log( vm.myFavList);
                    if( this.myFavList.indexOf(item.a_ID)> -1 ){
                        search[index].like = 1
                    }
                    else{
                       search[index].like = 0
                    } 
                })
            this.searchDataList = search;
            this.timeSubstr();

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
.notFound{
    margin: 6rem 0 10rem 22rem;
    font-size: 1.8rem;
    color: white;
}
figcaption p:first-of-type{
    font-size: 1.3rem;
}
figcaption p:nth-of-type(2){
    font-size: 1.2rem;
}






</style>