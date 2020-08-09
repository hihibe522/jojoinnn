<template>
    <!-- 主畫面大區塊開始 -->
        <div class="main-content" :class="{'main-content_large':showSlideBox}">
            <div class="filterAreaPop">
                <h3>熱門活動</h3>
            </div>
            <!-- 旋轉木馬開始 -->
            <div id="indexCarousel">
                <div class="carousel">

                    <div class="carousel__nav">
                        <span @click="moveLeft" id="moveLeft" class="carousel__arrow jo_hover">
                            <svg class="carousel__icon jo_hover" width="20" height="20" viewBox="0 0 24 24">
                                <path class="jo_hover"
                                    d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"></path>
                            </svg>
                        </span>
                        <span @click="moveRight" id="moveRight" class="carousel__arrow jo_hover">
                            <svg class="carousel__icon jo_hover" width="20" height="20" viewBox="0 0 24 24">
                                <path class="jo_hover"
                                    d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z">
                                </path>
                            </svg>
                        </span>
                    </div>
                    <div v-for="(item,index) in carouselItem" :key="index" class="carousel-item">
                        <div class="carousel-item__image" 
                         :style="{'backgroundImage':'url(../../static/img/activityPic/'+item.a_pic+')'}">
                        </div>
                        <div class="carousel-item__info">
                            <div class="carousel-item__container">
                                <h2 class="carousel-item__subtitle">{{item.a_start}}-{{item.a_end}}</h2>
                                <h1 class="carousel-item__title">{{item.a_name}}</h1>
                                <p class="carousel-item__description">{{item.c_category}}</p>
                                <div class="caButton">
                                <router-link :to="{ name:'activity',query:{a_ID:item.a_ID }}" >
                                    <input type=" button" class="jo_btn jo_btnOrange jo_btn_s"
                                        value="活動詳情">
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
                                        <option value="">時間:由新到舊</option>
                                        <option value="">時間:由舊到新</option>
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

                            <!-- <div class="areaItem4">
                                <div class="searchBox">
                                    <input type="search" name="" id="" placeholder="搜尋" style="width:200px; height:35px;">
                                    <i type="button" class="fa fa-search jo_hover" style="
                                    filter: invert(0%);" ></i>
                                </div>
                            </div>  -->
                        </div>
                    </div>

                    <div class="recommendArea">
                        <ul class="grid gridAct cs-style-3 ">

                            <li class="">
                                <figure>
                                    <img class="innerPic" src="../assets/img/images_act_grid/1.jpg" alt="img04">
                                    <figcaption>
                                        <div class="d-flex innerPicSlide">
                                            <div>
                                                <h3>過度呼吸首映</h3>
                                                <span>2020/07/30</span>
                                            </div>
                                            <div>
                                                <img class="joPic_hover" id="innerFlag"
                                                    src="../assets/img/jo_icon/jo_i_flag.svg" alt="">
                                            </div>
                                        </div>
                                        <hr id="actArea">
                                        <p></p>
                                        <div class="ActButton">
                                            <input type=" button" name="" id="" class="jo_btn jo_btnWater jo_btn_s"
                                                value="活動詳情">
                                        </div>
                                    </figcaption>
                                </figure>

                                <!-- 幾人收藏 + 愛心開始 -->
                                <div class="row mx-0 collectAndLike">
                                    <div>
                                        <h6>20人收藏</h6>
                                    </div>

                                    <div class="jo_heartDiv" style="zoom: .3">
                                        <img class="jo_heart " src="../assets/img/jo_images/jo_heart.svg" alt="">
                                        <img class="jo_heart jo_hover" src="../assets/img/jo_images/jo_heart.svg" alt="">
                                    </div>
                                </div>
                                <!-- 幾人收藏+愛心結束 -->
                            </li>
                            <li>
                                <figure>


                                    <img class="innerPic" src="../assets/img/images_act_grid/2.jpg" alt="img01">

                                    <figcaption>
                                        <div class="d-flex innerPicSlide">
                                            <div>
                                                <h3>貓咪餐廳</h3>
                                                <span>2020/07/30</span>
                                            </div>
                                            <div>
                                                <img class="joPic_hover" id="innerFlag"
                                                    src="../assets/img/jo_icon/jo_i_flag.svg" alt="">
                                            </div>
                                        </div>
                                        <hr id="actArea">
                                        <p></p>
                                        <div class="ActButton">
                                            <input type=" button" name="" id="" class="jo_btn jo_btnWater jo_btn_s"
                                                value="活動詳情">
                                        </div>
                                    </figcaption>
                                </figure>

                                <!-- 幾人收藏 + 愛心開始 -->
                                <div class="row mx-0 collectAndLike">
                                    <div class="">
                                        <h6>20人收藏</h6>
                                    </div>

                                    <div class="jo_heartDiv" style="zoom: .3">
                                        <img class="jo_heart " src="../assets/img/jo_images/jo_heart.svg" alt="">
                                        <img class="jo_heart jo_hover" src="../assets/img/jo_images/jo_heart.svg" alt="">
                                    </div>
                                </div>
                                <!-- 幾人收藏+愛心結束 -->
                            </li>
                            <li>
                                <figure>
                                    <img class="innerPic" src="../assets/img/images_act_grid/3.jpg" alt="img02">
                                    <figcaption>
                                        <div class="d-flex innerPicSlide">
                                            <div>
                                                <h3>首爾賞楓自由行</h3>
                                                <span>2020/07/30</span>
                                            </div>
                                            <div>
                                                <img class="joPic_hover" id="innerFlag"
                                                    src="../assets/img/jo_icon/jo_i_flag.svg" alt="">
                                            </div>
                                        </div>
                                        <hr id="actArea">
                                        <p></p>
                                        <div class="ActButton">
                                            <input type=" button" name="" id="" class="jo_btn jo_btnWater jo_btn_s"
                                                value="活動詳情">
                                        </div>
                                    </figcaption>
                                </figure>

                                <!-- 幾人收藏 + 愛心開始 -->
                                <div class="row mx-0 collectAndLike">
                                    <div class="">
                                        <h6>20人收藏</h6>
                                    </div>

                                    <div class="jo_heartDiv" style="zoom: .3">
                                        <img class="jo_heart " src="../assets/img/jo_images/jo_heart.svg" alt="">
                                        <img class="jo_heart jo_hover" src="../assets/img/jo_images/jo_heart.svg" alt="">
                                    </div>
                                </div>
                                <!-- 幾人收藏+愛心結束 -->
                            </li>
                            <li>
                                <figure>
                                    <img class="innerPic" src="../assets/img/images_act_grid/4.jpg" alt="img05">
                                    <figcaption>
                                        <div class="d-flex innerPicSlide">
                                            <div>
                                                <h3>美國8天7夜</h3>
                                                <span>2020/07/30</span>
                                            </div>
                                            <div>
                                                <img class="joPic_hover" id="innerFlag"
                                                    src="../assets/img/jo_icon/jo_i_flag.svg" alt="">
                                            </div>
                                        </div>
                                        <hr id="actArea">
                                        <p></p>
                                        <div class="ActButton">
                                            <input type=" button" name="" id="" class="jo_btn jo_btnWater jo_btn_s"
                                                value="活動詳情">
                                        </div>
                                    </figcaption>
                                </figure>

                                <!-- 幾人收藏 + 愛心開始 -->
                                <div class="row mx-0 collectAndLike">
                                    <div class="">
                                        <h6>20人收藏</h6>
                                    </div>

                                    <div class="jo_heartDiv" style="zoom: .3">
                                        <img class="jo_heart " src="../assets/img/jo_images/jo_heart.svg" alt="">
                                        <img class="jo_heart jo_hover" src="../assets/img/jo_images/jo_heart.svg" alt="">
                                    </div>
                                </div>
                                <!-- 幾人收藏+愛心結束 -->
                            </li>
                            <li>
                                <figure>
                                    <img class="innerPic" src="../assets/img/images_act_grid/5.jpg" alt="img03">
                                    <figcaption>
                                        <div class="d-flex innerPicSlide">
                                            <div>
                                                <h3>狗狗游泳池</h3>
                                                <span>2020/07/30</span>
                                            </div>
                                            <div>
                                                <img class="joPic_hover" id="innerFlag"
                                                    src="../assets/img/jo_icon/jo_i_flag.svg" alt="">
                                            </div>
                                        </div>
                                        <hr id="actArea">
                                        <p></p>
                                        <div class="ActButton">
                                            <input type=" button" name="" id="" class="jo_btn jo_btnWater jo_btn_s"
                                                value="活動詳情">
                                        </div>
                                    </figcaption>
                                </figure>

                                <!-- 幾人收藏 + 愛心開始 -->
                                <div class="row mx-0 collectAndLike">
                                    <div class="">
                                        <h6>20人收藏</h6>
                                    </div>

                                    <div class="jo_heartDiv" style="zoom: .3">
                                        <img class="jo_heart " src="../assets/img/jo_images/jo_heart.svg" alt="">
                                        <img class="jo_heart jo_hover" src="../assets/img/jo_images/jo_heart.svg" alt="">
                                    </div>
                                </div>
                                <!-- 幾人收藏+愛心結束 -->
                            </li>
                            <li>
                                <figure>
                                    <img class="innerPic" src="../assets/img/images_act_grid/6.jpg" alt="img06">
                                    <figcaption>
                                        <div class="d-flex innerPicSlide">
                                            <div>
                                                <h3>一起爬象山</h3>
                                                <span>2020/07/30</span>
                                            </div>
                                            <div>
                                                <img class="joPic_hover" id="innerFlag"
                                                    src="../assets/img/jo_icon/jo_i_flag.svg" alt="">
                                            </div>
                                        </div>
                                        <hr id="actArea">
                                        <p></p>
                                        <div class="ActButton">
                                            <input type=" button" name="" id="" class="jo_btn jo_btnWater jo_btn_s"
                                                value="活動詳情">
                                        </div>
                                    </figcaption>
                                </figure>

                                <!-- 幾人收藏 + 愛心開始 -->
                                <div class="row mx-0 collectAndLike">
                                    <div class="">
                                        <h6>20人收藏</h6>
                                    </div>

                                    <div class="jo_heartDiv" style="zoom: .3">
                                        <img class="jo_heart " src="../assets/img/jo_images/jo_heart.svg" alt="">
                                        <img class="jo_heart jo_hover" src="../assets/img/jo_images/jo_heart.svg" alt="">
                                    </div>
                                </div>
                                <!-- 幾人收藏+愛心結束 -->
                            </li>
                            <li>
                                <figure>
                                    <img class="innerPic" src="../assets/img/images_act_grid/7.png" alt="img06">
                                    <figcaption>
                                        <div class="d-flex innerPicSlide">
                                            <div>
                                                <h3>一起抓寶</h3>
                                                <span>2020/07/30</span>
                                            </div>
                                            <div>
                                                <img class="joPic_hover" id="innerFlag"
                                                    src="../assets/img/jo_icon/jo_i_flag.svg" alt="">
                                            </div>
                                        </div>
                                        <hr id="actArea">
                                        <p></p>
                                        <div class="ActButton">
                                            <input type=" button" name="" id="" class="jo_btn jo_btnWater jo_btn_s"
                                                value="活動詳情">
                                        </div>
                                    </figcaption>
                                </figure>

                                <!-- 幾人收藏 + 愛心開始 -->
                                <div class="row mx-0 collectAndLike">
                                    <div class="">
                                        <h6>20人收藏</h6>
                                    </div>

                                    <div class="jo_heartDiv" style="zoom: .3">
                                        <img class="jo_heart " src="../assets/img/jo_images/jo_heart.svg" alt="">
                                        <img class="jo_heart jo_hover" src="../assets/img/jo_images/jo_heart.svg" alt="">
                                    </div>
                                </div>
                                <!-- 幾人收藏+愛心結束 -->
                            </li>
                            <li>
                                <figure>
                                    <img class="innerPic" src="../assets/img/images_act_grid/8.jpg" alt="img06">
                                    <figcaption>
                                        <div class="d-flex innerPicSlide">
                                            <div>
                                                <h3>小小兵展覽</h3>
                                                <span>2020/07/30</span>
                                            </div>
                                            <div>
                                                <img class="joPic_hover" id="innerFlag"
                                                    src="../assets/img/jo_icon/jo_i_flag.svg" alt="">
                                            </div>
                                        </div>
                                        <hr id="actArea">
                                        <p></p>
                                        <div class="ActButton">
                                            <input type=" button" name="" id="" class="jo_btn jo_btnWater jo_btn_s"
                                                value="活動詳情">
                                        </div>
                                    </figcaption>
                                </figure>

                                <!-- 幾人收藏 + 愛心開始 -->
                                <div class="row mx-0 collectAndLike">
                                    <div class="">
                                        <h6>20人收藏</h6>
                                    </div>

                                    <div class="jo_heartDiv" style="zoom: .3">
                                        <img class="jo_heart " src="../assets/img/jo_images/jo_heart.svg" alt="">
                                        <img class="jo_heart jo_hover" src="../assets/img/jo_images/jo_heart.svg" alt="">
                                    </div>
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
                                <h6><img class="joPic_hover reFlag" src="../assets/img/jo_icon/jo_i_flag.svg"
                                        alt="">&nbsp;表示已成團</h6>
                            </div>
                        </div>
                    </div>

                    <div class="yourArea">
                        <ul class="grid gridAct cs-style-3 ">

                            <li>
                                <figure>
                                    <img class="innerPic" src="../assets/img/images_act_grid/1.jpg" alt="img04">

                                    <figcaption>
                                        <div class="d-flex innerPicSlide">
                                            <div>
                                                <h3>過度呼吸首映</h3>
                                                <span>2020/07/30</span>
                                            </div>
                                            <div>
                                                <img class="joPic_hover" id="innerFlag"
                                                    src="../assets/img/jo_icon/jo_i_flag.svg" alt="">
                                            </div>
                                        </div>
                                        <hr id="actArea">
                                        <p></p>
                                        <div class="ActButton">
                                            <input type=" button" name="" id="" class="jo_btn jo_btnWater jo_btn_s"
                                                value="活動詳情">
                                        </div>
                                    </figcaption>
                                </figure>

                                <!-- 幾人收藏 + 愛心開始 -->
                                <div class="row mx-0 collectAndLike">
                                    <div class="">
                                        <h6>20人收藏</h6>
                                    </div>

                                    <div class="jo_heartDiv" style="zoom: .3">
                                        <img class="jo_heart " src="../assets/img/jo_images/jo_heart.svg" alt="">
                                        <img class="jo_heart jo_hover" src="../assets/img/jo_images/jo_heart.svg" alt="">
                                    </div>
                                </div>
                                <!-- 幾人收藏+愛心結束 -->

                            </li>
                            <li>
                                <figure>


                                    <img class="innerPic" src="../assets/img/images_act_grid/2.jpg" alt="img01">

                                    <figcaption>
                                        <div class="d-flex innerPicSlide">
                                            <div>
                                                <h3>貓咪餐廳</h3>
                                                <span>2020/07/30</span>
                                            </div>
                                            <div>
                                                <img class="joPic_hover" id="innerFlag"
                                                    src="../assets/img/jo_icon/jo_i_flag.svg" alt="">
                                            </div>
                                        </div>
                                        <hr id="actArea">
                                        <p></p>
                                        <div class="ActButton">
                                            <input type=" button" name="" id="" class="jo_btn jo_btnWater jo_btn_s"
                                                value="活動詳情">
                                        </div>
                                    </figcaption>
                                </figure>

                                <!-- 幾人收藏 + 愛心開始 -->
                                <div class="row mx-0 collectAndLike">
                                    <div class="">
                                        <h6>20人收藏</h6>
                                    </div>

                                    <div class="jo_heartDiv" style="zoom: .3">
                                        <img class="jo_heart " src="../assets/img/jo_images/jo_heart.svg" alt="">
                                        <img class="jo_heart jo_hover" src="../assets/img/jo_images/jo_heart.svg" alt="">
                                    </div>
                                </div>
                                <!-- 幾人收藏+愛心結束 -->
                            </li>
                            <li>
                                <figure>
                                    <img class="innerPic" src="../assets/img/images_act_grid/3.jpg" alt="img02">
                                    <figcaption>
                                        <div class="d-flex innerPicSlide">
                                            <div>
                                                <h3>首爾賞楓自由行</h3>
                                                <span>2020/07/30</span>
                                            </div>
                                            <div>
                                                <img class="joPic_hover" id="innerFlag"
                                                    src="../assets/img/jo_icon/jo_i_flag.svg" alt="">
                                            </div>
                                        </div>
                                        <hr id="actArea">
                                        <p></p>
                                        <div class="ActButton">
                                            <input type=" button" name="" id="" class="jo_btn jo_btnWater jo_btn_s"
                                                value="活動詳情">
                                        </div>
                                    </figcaption>
                                </figure>

                                <!-- 幾人收藏 + 愛心開始 -->
                                <div class="row mx-0 collectAndLike">
                                    <div class="">
                                        <h6>20人收藏</h6>
                                    </div>

                                    <div class="jo_heartDiv" style="zoom: .3">
                                        <img class="jo_heart " src="../assets/img/jo_images/jo_heart.svg" alt="">
                                        <img class="jo_heart jo_hover" src="../assets/img/jo_images/jo_heart.svg" alt="">
                                    </div>
                                </div>
                                <!-- 幾人收藏+愛心結束 -->
                            </li>
                            <li>
                                <figure>
                                    <img class="innerPic" src="../assets/img/images_act_grid/4.jpg" alt="img05">
                                    <figcaption>
                                        <div class="d-flex innerPicSlide">
                                            <div>
                                                <h3>美國八天七夜</h3>
                                                <span>2020/07/30</span>
                                            </div>
                                            <div>
                                                <img class="joPic_hover" id="innerFlag"
                                                    src="../assets/img/jo_icon/jo_i_flag.svg" alt="">
                                            </div>
                                        </div>
                                        <hr id="actArea">
                                        <p></p>
                                        <div class="ActButton">
                                            <input type=" button" name="" id="" class="jo_btn jo_btnWater jo_btn_s"
                                                value="活動詳情">
                                        </div>
                                    </figcaption>
                                </figure>

                                <!-- 幾人收藏 + 愛心開始 -->
                                <div class="row mx-0 collectAndLike">
                                    <div class="">
                                        <h6>20人收藏</h6>
                                    </div>

                                    <div class="jo_heartDiv" style="zoom: .3">
                                        <img class="jo_heart " src="../assets/img/jo_images/jo_heart.svg" alt="">
                                        <img class="jo_heart jo_hover" src="../assets/img/jo_images/jo_heart.svg" alt="">
                                    </div>
                                </div>
                                <!-- 幾人收藏+愛心結束 -->
                            </li>
                            <li>
                                <figure>
                                    <img class="innerPic" src="../assets/img/images_act_grid/5.jpg" alt="img03">
                                    <figcaption>
                                        <div class="d-flex innerPicSlide">
                                            <div>
                                                <h3>狗狗游泳池</h3>
                                                <span>2020/07/30</span>
                                            </div>
                                            <div>
                                                <img class="joPic_hover" id="innerFlag"
                                                    src="../assets/img/jo_icon/jo_i_flag.svg" alt="">
                                            </div>
                                        </div>
                                        <hr id="actArea">
                                        <p></p>
                                        <div class="ActButton">
                                            <input type=" button" name="" id="" class="jo_btn jo_btnWater jo_btn_s"
                                                value="活動詳情">
                                        </div>
                                    </figcaption>
                                </figure>

                                <!-- 幾人收藏 + 愛心開始 -->
                                <div class="row mx-0 collectAndLike">
                                    <div class="">
                                        <h6 style="color: white;  margin-bottom: 0">20人收藏</h6>
                                    </div>

                                    <div class="jo_heartDiv" style="zoom: .3">
                                        <img class="jo_heart " src="../assets/img/jo_images/jo_heart.svg" alt="">
                                        <img class="jo_heart jo_hover" src="../assets/img/jo_images/jo_heart.svg" alt="">
                                    </div>
                                </div>
                                <!-- 幾人收藏+愛心結束 -->

                            </li>
                            <li>
                                <figure>
                                    <img class="innerPic" src="../assets/img/images_act_grid/6.jpg" alt="img06">
                                    <figcaption>
                                        <div class="d-flex innerPicSlide">
                                            <div>
                                                <h3>一起爬象山</h3>
                                                <span>2020/07/30</span>
                                            </div>
                                            <div>
                                                <img class="joPic_hover" id="innerFlag"
                                                    src="../assets/img/jo_icon/jo_i_flag.svg" alt="">
                                            </div>
                                        </div>
                                        <hr id="actArea">
                                        <p></p>
                                        <div class="ActButton">
                                            <input type=" button" name="" id="" class="jo_btn jo_btnWater jo_btn_s"
                                                value="活動詳情">
                                        </div>
                                    </figcaption>
                                </figure>

                                <!-- 幾人收藏 + 愛心開始 -->
                                <div class="row mx-0 collectAndLike">
                                    <div class="">
                                        <h6>20人收藏</h6>
                                    </div>

                                    <div class="jo_heartDiv" style="zoom: .3">
                                        <img class="jo_heart " src="../assets/img/jo_images/jo_heart.svg" alt="">
                                        <img class="jo_heart jo_hover" src="../assets/img/jo_images/jo_heart.svg" alt="">
                                    </div>
                                </div>
                                <!-- 幾人收藏+愛心結束 -->
                            </li>
                            <li>
                                <figure>
                                    <img class="innerPic" src="../assets/img/images_act_grid/7.png" alt="img06">
                                    <figcaption>
                                        <div class="d-flex innerPicSlide">
                                            <div>
                                                <h3>一起抓寶</h3>
                                                <span>2020/07/30</span>
                                            </div>
                                            <div>
                                                <img class="joPic_hover" id="innerFlag"
                                                    src="../assets/img/jo_icon/jo_i_flag.svg" alt="">
                                            </div>
                                        </div>
                                        <hr id="actArea">
                                        <p></p>
                                        <div class="ActButton">
                                            <input type=" button" name="" id="" class="jo_btn jo_btnWater jo_btn_s"
                                                value="活動詳情">
                                        </div>
                                    </figcaption>
                                </figure>

                                <!-- 幾人收藏 + 愛心開始 -->
                                <div class="row mx-0 collectAndLike">
                                    <div class="">
                                        <h6>20人收藏</h6>
                                    </div>

                                    <div class="jo_heartDiv" style="zoom: .3">
                                        <img class="jo_heart " src="../assets/img/jo_images/jo_heart.svg" alt="">
                                        <img class="jo_heart jo_hover" src="../assets/img/jo_images/jo_heart.svg" alt="">
                                    </div>
                                </div>
                                <!-- 幾人收藏+愛心結束 -->
                            </li>
                            <li>
                                <figure>
                                    <img class="innerPic" src="../assets/img/images_act_grid/8.jpg" alt="img06">
                                    <figcaption>
                                        <div class="d-flex innerPicSlide">
                                            <div>
                                                <h3>小小兵展覽</h3>
                                                <span>2020/07/30</span>
                                            </div>
                                            <div>
                                                <img class="joPic_hover" id="innerFlag"
                                                    src="../assets/img/jo_icon/jo_i_flag.svg" alt="">
                                            </div>
                                        </div>
                                        <hr id="actArea">
                                        <p></p>
                                        <div class="ActButton">
                                            <input type=" button" name="" id="" class="jo_btn jo_btnWater jo_btn_s"
                                                value="活動詳情">
                                        </div>
                                    </figcaption>
                                </figure>

                                <!-- 幾人收藏 + 愛心開始 -->
                                <div class="row mx-0 collectAndLike">
                                    <div class="">
                                        <h6>20人收藏</h6>
                                    </div>

                                    <div class="jo_heartDiv" style="zoom: .3">
                                        <img class="jo_heart " src="../assets/img/jo_images/jo_heart.svg" alt="">
                                        <img class="jo_heart jo_hover" src="../assets/img/jo_images/jo_heart.svg" alt="">
                                    </div>
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
                            <div class="bannerPic hvr-pop"><img src="../assets/img/jo_images/jo_birdA.svg" alt=""></div>
                            <div class="bannerWord">
                                <h3 class="hvr-hang">輕鬆Jo團</h3>
                            </div>
                        </div>

                        <div class="bannerFirst">
                            <div class="bannerPic hvr-pop"><img src="../assets/img/jo_images/jo_birdB.svg" alt=""></div>
                            <div class="bannerWord">
                                <h3 class="hvr-hang">Fun心去玩</h3>
                            </div>
                        </div>

                        <div class="bannerFirst">
                            <div class="bannerPic hvr-pop"><img src="../assets/img/jo_images/jo_birdC.svg" alt=""></div>
                            <div class="bannerWord">
                                <h3 class="hvr-hang">邊緣人不再孤單</h3>
                            </div>
                        </div>

                </div>
                <!-- Banner結束 -->

                    <!-- 回到最上層開始 -->
                    <!-- <div class="back-to-top-wrapper">
                        <a href="#top" class="back-to-top-link ld ld-bounce" aria-label="Scroll to Top"
                            style="position:absolute; right: 20px; width:30px; height:30px">
                            <img class="jo_hover" src="../assets/img/jo_images/jo_birdA.svg" alt="">
                        </a>
                    </div> -->
                    <!-- 回到最上層結束 -->

                
            </div>
        </div> 
</template>


<script>
import $ from "jquery";
import axios from "axios";

export default {
    name:'recommend',
    data() {
        return {
            currentPic:0,
            carouselItem:[],
            totalCarouselItem:4
        }
    },
    methods: {
        getCarouselItem(){
            var vm = this;
            axios.get('home/carouse')
            .then(e=>{
                console.log(e.data);
                vm.carouselItem = e.data;
                vm.totalCarouselItem =  vm.carouselItem.length;
            })

        },
        moveRight(){
            var next = this.currentPic;
            this.currentPic = this.currentPic + 1;
            this.setSlide(next, this.currentPic);
        },
        moveLeft(){
            var prev = this.currentPic;
            this.currentPic = this.currentPic - 1;
            this.setSlide(prev,this.currentPic);
        },
        setSlide(prev, next){
            var slide = this.currentPic;
            if (next > this.totalCarouselItem - 1) {
                slide = 0;
                this.currentPic = 0;
            }
            if (next < 0) {
                slide = this.totalCarouselItem - 1;
                this.currentPic = this.totalCarouselItem - 1;
            }

            $('.carousel-item').eq(prev).removeClass('active');
            $('.carousel-item').eq(slide).addClass('active');
      
        }
    },
    mounted() {
         var vm = this;
        setTimeout(function () {
            vm.setSlide()
            }, 1000);
    },
    created() {
        this.getCarouselItem();
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