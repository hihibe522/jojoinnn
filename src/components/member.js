// 雷達圖
$(document).ready(function () {
    var ctx = $("#chartCanvas");
    var data = {
        labels: ['戶外休閒', '運動', '音樂', '藝文', '益智', '宅文化', '飲食', '社交聯誼', '旅遊', '社會服務', '學術', '視聽', '科技', '手作'],
        datasets: [{
            data: [20, 10, 14, 20, 20, 10, 30, 15, 20, 30, 20, 10, 30, 12],
            backgroundColor: 'rgba(255, 203, 5, .4)',
            borderWidth: 2,
            borderColor: 'rgba(255, 203, 5)',
            pointRadius: 0,
            borderJoinStyle: "round",
            label: "",
        }],

    }

    var options = {
        scale: {
            angleLines: {
                display: true,
                color: "#DFDFDF"
            },
            ticks: {
                suggestedMin: 0,
                suggestedMax: 30,
                display: false,
            },

            gridLines: {
                lineWidth: [1, 1, 1, 1, 1, 3],
                color: ["#DFDFDF", "#DFDFDF", "#DFDFDF", "#DFDFDF", "#DFDFDF", "#919497"],
                circular: true,
                offsetGridLines: true
            },

            // 頂點文字
            pointLabels: {
                fontColor: "#919497",
                fontSize: 16,
                fontFamily: 'cwTeXYen'
            },
        },
    };
    var myRadarChart = new Chart(ctx, {
        type: 'radar',
        data: data,
        options: options
    });

    myRadarChart.options.legend.display = false;
    myRadarChart.options.chartArea.backgroundColor = "red";
})



// 預設

function bookMarkDefault() {
    $(".bookMarkOriginal").eq(1).addClass("bookMarkClick");

    $(".memberEvent").hide();
    $(".memberEvent").eq(1).show();
    $(".hisSelectDiv").hide();
    $(".followSelectDiv").hide();

    $(".bookMarkOriginal").addClass("jo_hover");
    $("#bookMark_ul li h5").addClass("jo_hover");

    $(".bookMarkOriginal").hover(
        function () { $(this).toggleClass('bookMarkHover') }
    )

    $(".bookMarkOriginal").click(function () {
        $(".bookMarkOriginal").removeClass("bookMarkClick");
        $(this).addClass("bookMarkClick");
    })
}

bookMarkDefault();

console.log($(".bookMarkOriginal"))

// 書籤
window.addEventListener("load", () => {
    $(".bookMarkOriginal").click(bookMark.bookMarkEvent);
    $(".bookMarkOriginal").eq(0).click(bookMark.collectE);
    $(".bookMarkOriginal").eq(1).click(bookMark.joiningE);
    $(".bookMarkOriginal").eq(2).click(bookMark.hostingE);
    $(".bookMarkOriginal").eq(3).click(bookMark.historyE);
    $(".bookMarkOriginal").eq(4).click(bookMark.followE);
    $(".bookMarkOriginal").eq(5).click(bookMark.luckyE);
    $(".hisSelect").eq(0).click(bookMark.hisHostE);
    $(".hisSelect").eq(1).click(bookMark.hisJoinE);
    $(".followSelect").eq(0).click(bookMark.myfollowE);
    $(".followSelect").eq(1).click(bookMark.blacklistE);
})


var bookMark = {
    bookMarkEvent: () => {
        $(".memberFilter").show();
        $(".memberEvent").hide();
        $(".hisSelectDiv").hide();
        $(".followSelectDiv").hide();
        $(".title h2").show();
    },

    collectE: () => {
        $(".title h2").text("我收藏的活動")
        $(".memberFilter").hide();
        $("#collectSection").show();
    },
    joiningE: () => {
        $(".title h2").text("正在參Jo的活動");
        $(".memberFilter select").show();
        $("#joiningCardSection").show();
    },
    hostingE: () => {
        $(".title h2").text("正在主Jo的活動");
        $(".memberFilter select").hide();
        $("#hostingSection").show();
    },
    historyE: () => {
        $(".title h2").hide();
        $(".memberFilter select").hide();
        $("#historySection").show();
        $(".hisSelectDiv").eq(0).show();
        $(".hisHostSection").eq(0).show();
        // 預設
        $(".hisSelect").removeClass("hisSelected")
        $(".hisSelect").eq(0).addClass("hisSelected")
        // 點擊
        $(".hisSelect").click(function () {
            $(".hisSelect").removeClass("hisSelected")
            $(this).addClass("hisSelected")
        })
    },
    followE: () => {
        $(".title h2").hide();
        $(".title h2").text("我關注的會員");
        $(".memberFilter select").hide();
        $(".followSelectDiv").eq(0).show();
        $(".followSection").eq(0).show();
        // 預設
        $(".followSelect").removeClass("hisSelected")
        $(".followSelect").eq(0).addClass("hisSelected")

        // 點擊
        $(".followSelect").click(function () {
            $(".followSelect").removeClass("hisSelected")
            $(this).addClass("hisSelected")
        })
    },
    luckyE: () => {
        $(".title h2").text("Jo轉幸運盤");
        $(".memberFilter").hide();
        $("#luckySection").show();
    },

    // 主Jo歷史
    hisHostE: () => {
        $(".hisHostSection").hide();
        $(".hisHostSection").eq(0).show();
    },

    // 參Jo歷史
    hisJoinE: () => {
        $(".hisHostSection").hide();
        $(".hisHostSection").eq(1).show();
    },

    // 我的關注
    myfollowE: () => {
        $(".followSection").hide();
        $(".followSection").eq(0).show();
    },

    // 我的黑名單
    blacklistE: () => {
        $(".followSection").hide();
        $(".followSection").eq(1).show();
    },


}


// 愛心
$(".jo_heart:nth-child(2)").addClass("jo_heartPinkAni");
$(".jo_heart:first-child").addClass("jo_heartPink");

// $(".jo_heartDiv").click(()=> {
//     var collectIndex = $(".jo_heartDiv").index(this);
//     console.log($(".collectCard").eq(0))
//     $(".collectCard").eq(collectIndex).hide();
// })


// 設定進度條
function progressBar() {
    // 總EXP
    var Exp = 333;

    // 需要的EXP
    ExpWidth = Exp % 100  //50

    $("#totalExp span").text(Exp);
    //  設定進度條
    $(".progress-bar").css("width", `${ExpWidth}%`);
    $("#bobbleDiv").css({ "width": `${ExpWidth}%` });
    $("#expBobble").text(`${ExpWidth}/100`)

    $("#needExp span").text(`${100 - ExpWidth} Exp`)
}
progressBar();





// 轉盤


$(".giftShow").hide();


var giftList = [
    {
        name: "妙蛙種子",
        img: "../img/pokemon/001.png"
    },
    {
        name: "皮卡丘",
        img: "../img/pokemon/025.png"
    },
    {
        name: "夢幻",
        img: "../img/pokemon/151.png"
    },
    {
        name: "傑尼龜",
        img: "../img/pokemon/007.png"
    },
    {
        name: "超夢",
        img: "../img/pokemon/150.png"
    },
    {
        name: "小火龍",
        img: "../img/pokemon/004.png"
    },
    {
        name: "伊布",
        img: "../img/pokemon/133.png"
    },
    {
        name: "耿鬼",
        img: "../img/pokemon/094.png"
    },
]


// 球的總數
var ballNum = 15;
for (k = ballNum; k <= 360; k = k + ballNum) {
    $(".wheelOuter").after(`<div class="circle"><div class="ball"></div></div>`)
    $(".circle").eq(0).css("transform", `rotateZ(${k}deg)`);
    // console.log(weelCount);
}


// 燈泡
var wheelCount = 0;
function changeLight() {

    // 會抓到幾度的燈泡 //每15度一個燈泡
    wheelCount = (wheelCount + ballNum) % 360

    // 燈泡索引值 = (目前角度/一個燈泡轉幾度)-1
    wheelNum = wheelCount / ballNum - 1;
    // console.log(weelCount)

    $(".circle").eq(wheelNum - (360 / ballNum) + 3).removeClass("wheelLightAni");
    $(".circle").eq(wheelNum).addClass("wheelLightAni");
    setTimeout("changeLight( )", 80)
}

changeLight();


// 繪圖
for (i = 0; i <= 315; i = i + 45) {
    A = `${i}deg`;
    j = i / 45;
    var C = $(".wheelFrame").append(` <div class="wheelBody"><div><h4>${giftList[j].name}</h4></div><img src="../assets/img/jo_images/jo_wheel.svg" alt=""></div>`)
    var wheelW = $(".wheelFrame").height() * 0.5;
    $(".wheelBody img").css("width", `${wheelW}px`)
    $(".wheelBody img").css("height", `${wheelW}px`)
    $(".wheelBody").css("left", `${wheelW * 0.5}px`)

    var circleW = $(".circle").width() * 0.5;
    $(".circle").css("left", `${wheelW - circleW}px`)
    if (j % 2 == 0) {
        $(".wheelBody").eq(j).addClass("wheelBody2");
    }

    $(".wheelBody").eq(j).css("transform", `rotateZ(${i}deg)`);
    // console.log(wheelW);
}


// 轉幾圈
var ring = 360 * 10 + 45;

// 轉盤按鈕
$("#luckyClick").click(function () {

    var wheelNum = Math.floor(Math.random() * 8); //20
    var total = ring - (45 * wheelNum);
    $(".wheelFrame").addClass("wheelAni");
    $(".wheelAni").css("transform", `rotateZ(${total}deg)`);
    $(".wheelPole").addClass("wheelPoleAni");
    $("#wheel").addClass("ld ld-tremble")
    console.log(wheelNum)

    var getGift = 0;


    // 被選中的孩子
    var intervalGift = setInterval(() => {
        $(".wheelBody").eq(wheelNum).addClass("wheelFinish");

        $(".giftGetInfo").text(`今天午餐吃${giftList[wheelNum].name}!!!!`)
        $("#wheel").removeClass("ld-tremble")
        $("#wheel").addClass("ld-jingle")

    }, 3500)

    // 桿子停止
    var intervalPole = setInterval(() => {
        $(".wheelPole").removeClass("wheelPoleAni");
    }, 4000)

    // 圖片出現
    var intervalPic = setInterval(() => {

        $("#wheel").hide();
        $("#luckyClick").hide();
        $("#giftImage").attr("src", giftList[wheelNum].img)
        $(".giftShow").show()

    }, 6000)

    // 按鈕變成灰色
    $(this).removeClass(" jo_btn");
    $(this).removeClass(" jo_btnOrange");
    $(this).addClass(" jo_btnGrey");
    $(this).val("已抽獎");


    $("#luckyClick").prop('disabled', true);



    // 每次打開modal轉盤都會歸零
    $("#changeClickBtn").click(function () {
        $("#luckyClick").removeAttr("disabled");
        clearInterval(intervalPic);
        clearInterval(intervalPole);
        clearInterval(intervalGift);
        $(".wheelBody").removeClass("wheelFinish");
        $(".wheelAni").css("transform", `rotateZ(0deg)`);
        $(".giftShow").hide()
        $("#luckyClick").show();
        $("#wheel").show();
        $("#luckyClick").addClass(" jo_btn jo_btnOrange");
        $("#luckyClick").removeClass("jo_btnGrey");
        $("#luckyClick").val("點我抽獎");
        $(".wheelPole").removeClass("wheelPoleAni");
        $("#wheel").removeClass("ld-tremble ld-jingle")

    })

})





// 查看評價
var seeRank_last = $(".seeRank_memberCard").eq($(".seeRank_memberCard").length - 1);
seeRank_last.find($("hr")).hide()


// QRcode
$('#changeGift_QR').qrcode({ render: "div", size: 250, text: "https://mnya.tw/cc/word/1467.html" });