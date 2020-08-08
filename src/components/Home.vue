<template>
    <div class="grid-container">
        <div class="sidebar jo_scrollbar sidebar_scroll">

            <div class="slideBox jo_hover" id="mySlideBox" type="button">
                <img id="slideIcon" class="rotate jo_hover" type="button" src="../assets/img/jo_icon/jo_i_slide.svg"
                    alt="">
            </div>

            <ul>
                <div id="sideBarFilter">
                    <li>
                        <div class="sidebarImgTitle">
                            <div class="sidebarImg"><img class="sidebarImg iconMargin hvr-pop joPic_hover"
                                    src="../assets/img/jo_icon/jo_i_area.svg" alt="">
                            </div>
                            <div class="sidebarWord">
                                <h5>地區</h5>
                            </div>
                        </div>

                        <div class="sidebarTitle">
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

                    <div class="sidebarTitle">
                        <hr>
                    </div>

                    <li>
                        <div class="sidebarImgTitle">
                            <div class="sidebarImg"><img class="sidebarImg joPic_hover" src="../assets/img/jo_icon/jo_i_price.svg"
                                    alt="">
                            </div>
                            <div class="sidebarWord">
                                <h5>價位</h5>
                            </div>
                        </div>
                        <div class="sidebarTitle">
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

                    <div class="sidebarTitle">
                        <hr>
                    </div>

                    <li>
                        <div class="sidebarImgTitle">
                            <div class="sidebarImg"><img class="sidebarImg joPic_hover" src="../assets/img/jo_icon/jo_i_type.svg"
                                    alt="">
                            </div>
                            <div class="sidebarWord">
                                <h5>類型</h5>
                            </div>
                        </div>
                        <div class="sidebarTitle">
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

                    <div class="sidebarTitle">
                        <hr>
                    </div>

                    <li>
                        <div class="sidebarImgTitle">
                            <div class="sidebarImg"><img class="sidebarImg joPic_hover" src="../assets/img/jo_icon/jo_i_indoor.svg"
                                    alt="">
                            </div>
                            <div class="sidebarWord">
                                <h5>室內/室外</h5>
                            </div>
                        </div>

                        <div class="sidebarTitle">
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

                    <div class="sidebarTitle">
                        <hr>
                    </div>

                    <li>
                        <div class="sidebarImgTitle">
                            <div class="sidebarImg">
                                <img class="sidebarImg joPic_hover" src="../assets/img/jo_icon/jo_i_goodtogo.svg" alt="">
                            </div>
                            <div class="sidebarWord">
                                <h5>是否成團</h5>
                            </div>
                        </div>


                        <div class="sidebarTitle">
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

                    <div class="sidebarTitle">
                        <hr>
                    </div>

                    <li>
                        <div class="sidebarImgTitle">
                            <div class="sidebarImg"><img class="sidebarImg joPic_hover"
                                    src="../assets/img/jo_icon/jo_i_calendar.svg" alt=""></div>
                            <div class="sidebarWord">
                                <h5>活動日期</h5>
                            </div>
                        </div>
                        <div class="sidebarWord actDateSelect">
                            <input type="date">
                        </div>
                    </li>

                    <div class="sidebarTitle">
                        <hr>
                    </div>

                    <li>
                        <div class="sidebarImgTitle">
                            <div class="sidebarImg"><img class="sidebarImg joPic_hover" 
                                    src="../assets/img/jo_icon/jo_i_explore.svg" alt=""></div>
                            <div class="sidebarWord">
                                <h5>探索</h5>
                            </div>
                        </div>
                    </li>
                </div>

            </ul>
        </div>
        <!-- 側邊欄(left)結束 -->

        <!-- 主畫面大區塊開始 -->
        <div class="main-content">
            <div class="filterAreaPop">
                <h3>熱門活動</h3>
            </div>
            <!-- 旋轉木馬開始 -->
            <div id="indexCarousel">
                <div class="carousel">

                    <div class="carousel__nav">
                        <span id="moveLeft" class="carousel__arrow jo_hover">
                            <svg class="carousel__icon jo_hover" width="20" height="20" viewBox="0 0 24 24">
                                <path class="jo_hover"
                                    d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"></path>
                            </svg>
                        </span>
                        <span id="moveRight" class="carousel__arrow jo_hover">
                            <svg class="carousel__icon jo_hover" width="20" height="20" viewBox="0 0 24 24">
                                <path class="jo_hover"
                                    d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z">
                                </path>
                            </svg>
                        </span>
                    </div>
                    <div class="carousel-item carousel-item--1">
                        <div class="carousel-item__image"></div>
                        <div class="carousel-item__info">
                            <div class="carousel-item__container">
                                <h2 class="carousel-item__subtitle">2020-09-05(六) 14:00 ~ 16:00 (GMT+8)</h2>
                                <h1 class="carousel-item__title">過度呼吸首映會</h1>
                                <p class="carousel-item__description">心跳加速，讓妳無法抵擋的首映會!!!!</p>
                                <div class="caButton">
                                    <input type=" button" name="" id="" class="jo_btn jo_btnOrange jo_btn_s"
                                        value="活動詳情">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="carousel-item carousel-item--2">
                        <div class="carousel-item__image"></div>
                        <div class="carousel-item__info">
                            <div class="carousel-item__container">
                                <h2 class="carousel-item__subtitle">2020-09-05(六) 14:00 ~ 16:00 (GMT+8)</h2>
                                <h1 class="carousel-item__title">貓咪餐廳摸貓貓</h1>
                                <p class="carousel-item__description">世界上最多貓貓的貓貓貓餐廳，快來一起喵喵喵! 世界上最多貓貓的貓貓貓餐廳，快來一起喵喵喵!</p>
                                <div class="caButton">
                                    <input type=" button" name="" id="" class="jo_btn jo_btnOrange jo_btn_s"
                                        value="活動詳情">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="carousel-item carousel-item--3">
                        <div class="carousel-item__image"></div>
                        <div class="carousel-item__info">
                            <div class="carousel-item__container">
                                <h2 class="carousel-item__subtitle">2020-09-05(六) 14:00 ~ 16:00 (GMT+8)</h2>
                                <h1 class="carousel-item__title">日本京都賞楓Jo</h1>
                                <p class="carousel-item__description">雖然不能出國，但可以用VR賞楓</p>
                                <div class="caButton">
                                    <input type=" button" name="" id="" class="jo_btn jo_btnOrange jo_btn_s"
                                        value="活動詳情">
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="carousel-item carousel-item--4">
                        <div class="carousel-item__image"></div>
                        <div class="carousel-item__info">
                            <div class="carousel-item__container">
                                <h2 class="carousel-item__subtitle">2020-09-05(六) 14:00 ~ 16:00 (GMT+8)</h2>
                                <h1 class="carousel-item__title">美國森林秘境大解密</h1>
                                <p class="carousel-item__description">一起去森林探險去吧!可魯</p>
                                <div class="caButton">
                                    <input type="button" name="" id="" class="jo_btn jo_btnOrange jo_btn_s"
                                        value="活動詳情">
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="carousel-item carousel-item--5">
                        <div class="carousel-item__image"></div>
                        <div class="carousel-item__info">
                            <div class="carousel-item__container">
                                <h2 class="carousel-item__subtitle">2020-09-05(六) 14:00 ~ 16:00 (GMT+8)</h2>
                                <h1 class="carousel-item__title">狗狗的泳池派對!!</h1>
                                <p class="carousel-item__description">保證一定可以洗乾淨狗狗</p>
                                <div class="caButton">
                                    <input type=" button" name="" id="" class="jo_btn jo_btnOrange jo_btn_s"
                                        value="活動詳情">
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
                    <div class="back-to-top-wrapper">
                        <a href="#top" class="back-to-top-link ld ld-bounce" aria-label="Scroll to Top"
                            style="position:absolute; right: 20px; width:30px; height:30px">
                            <img class="jo_hover" src="../assets/img/jo_images/jo_birdA.svg" alt="">
                        </a>
                    </div>
                    <!-- 回到最上層結束 -->

                </div>
                <!-- 8宮格活動區塊系列(您附近的活動)結束 -->
            </div>
        </div> 
    </div> 
  
</template>


<script>
export default {
    
}
</script>

<style scoped>
/* indexCss引用  */
@import '../assets/css/da_index.css';
/* Carousel引用  */
@import '../assets/css/da_indexCarousel.css';
/* 活動區塊引用  */
@import '../assets/css/da_grid_component.css';
@import '../assets/css/da_grid_default.css';
/* hover css引用  */
@import '../assets/css/hover.css';
@import '../assets/css/da_indexFooter.css';




</style>