<template>
  <div id="actMap">
    <div class="position-absolute" style="width: 100%; ">
      <div class="google-map" id="map"></div>
    </div>

    <div
      class="position-absolute bg-white px-3"
      style="width: 26%; height: 100vh; padding-top: 6rem; overflow-y: auto"
    >
      <form class="form-inline m-2">
        <input
          class="form-control col-9 mr-0"
          style="border-top: 3px lightgreen solid; "
          type="search"
          placeholder="搜Jo活動"
        />
        <button class="btn btn-outline-success my-0 ml-auto mr-0" type="submit">搜尋</button>
      </form>

      <div v-for="(item,index) in addressList" :key="index" class="activityContent d-flex bg-white">
        <div class="p-2" style="width: 70%; line-height: 1.2;">
          <h5>
            <b>{{item.text}}</b>
            <br />
          </h5>活動開始:{{item.sTime}}
          <br />活動地點:{{item.addr}}
          <br />
          <!-- <span>收藏人數: 100+</span> -->
        </div>

        <div class="ml-auto my-auto p-2" style=" width: 100px; height: 100px; ">
          <img class="mapActivityPic" src="../../static/img/活動說明頁/活動封面.jpg" alt=" " />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import axios from "axios";

export default {
  name: "actLocations",
  data() {
    return {
      map: {},
      geocoder: null,
      center: { lat: 24.151, lng: 120.651 },
      addressList: [
        {
          lat: "24.151",
          lng: "120.651",
          addr: "南屯區公益路二段51號B1樓",
          text: "資策會成果發表",
          sTime: "08-21 10:00:00",
          eTIme: "08-21 14:30:00",
          // event: show,
        },
        {
          lat: "",
          lng: "",
          addr: "台中北區忠明南路561號",
          text: "party",
          sTime: "08-10 23:30:00",
          eTIme: "08-11 05:00:00",
          // event: show,
        },
        {
          lat: "",
          lng: "",
          addr: "台中南屯區大業路201號",
          text: "自然美欣賞藝術欣賞",
          sTime: "08-12 12:30:00",
          eTIme: "08-12 18:30:00",
          // event: show,
        },
        {
          lat: "",
          lng: "",
          addr: "台中南屯區大進街469號",
          text: "鍋鍋拍賣展",
          sTime: "08-15 10:30:00",
          eTIme: "08-15 16:30:00",
          // event: show,
        },

        {
          lat: "",
          lng: "",
          addr: "台中南屯區文心南路289號6樓",
          text: "音樂賞欣",
          sTime: "08-13 18:30:00",
          eTIme: "08-13 20:30:00",
          // event: show,
        },
      ],
    };
  },
  created() {
    // this.getData();
  },
  mounted() {
    // this.getCurrentPostion();
    this.initMap();
    this.addMarkerStatus();
    this.initGeocoder();
    this.geocode();
    this.setSelfMarker();
    this.setMarker();
    // console.log(this.addressList)
  },
  methods: {
    getData: function () {
      axios.get("actLocations").then((e) => {
        this.addressList = e.data;
        console.log("  this.addressList");
      });
    },

    initMap: function () {
      this.map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: this.center.lat, lng: this.center.lng },
        zoom: 17,
        maxZoom: 20,
        minZoom: 3,
        streetViewControl: false,
        mapTypeControl: false,
      });
    },

    // addressList地址加上座標
    geocode: function () {
      this.addressList.forEach((add) => {
        this.geocoder.geocode(
          {
            // 地址
            address: add.addr,

            componentRestrictions: {
              country: "TW",
            },
          },
          // 轉換完成後呼叫的 callback 函式
          (results, status) => {
            if (status === "OK") {
              var newLat = results[0].geometry.location.lat();
              var newLng = results[0].geometry.location.lng();

              add.lat = newLat;
              add.lng = newLng;
            } else {
            }
          }
        );
      });
    },
    setSelfMarker: function () {
      var vm = this;
      setTimeout(function () {
        var marker = new google.maps.Marker({
          position: { lat: vm.center.lat, lng: vm.center.lng },
          icon: {
            url: "../../static/img/gpsPage/外星船3.svg",
            scaledSize: { height: 70, width: 70 },
          },
          map: vm.map,
        });
      }, 300);
    },
    // 改marker 狀態 :icon,動畫
    addMarkerStatus: function () {
      var vm = this;
      console.log("addMarkerStatus");
      setTimeout(function () {
        vm.addressList.forEach((e) => {
          e.icon = {
            url: "../../static/img/gpsPage/外星船3.svg",
          };
          e.event = {
            mouseover: {
              func: function () {
                vm.setAnimation(google.maps.Animation.BOUNCE);
              },
            },
            mouseout: {
              func: function () {
                vm.setAnimation("");
              },
            },
          };
          e.animation = "google.maps.Animation.DROP";
        });
      }, 500);
    },
    // 標記marker
    setMarker: function () {
      var vm = this;
      console.log("marker上去");
      setTimeout(function () {
        vm.addressList.forEach((e) => {
          var markerLat = parseFloat(e.lat);
          var markerLng = parseFloat(e.lng);

          var marker = new google.maps.Marker({
            position: { lat: markerLat, lng: markerLng },
            icon: {
              url: "../../static/img/gpsPage/jo_birdA.svg",
              scaledSize: { height: 40, width: 40 },
            },
            map: vm.map,
            event: {
              mouseover: {
                func: function () {
                  vm.setAnimation(google.maps.Animation.BOUNCE);
                },
              },
              mouseout: {
                func: function () {
                  vm.setAnimation("");
                },
              },
            },
            animation: "google.maps.Animation.DROP",
          });

          // *********
          var infowindow = new google.maps.InfoWindow({
            content: e.text,
            maxWidth: 200,
          });

          // 綁定點擊事件監聽
          marker.addListener("click", () => {
            if (vm.infowindow) vm.infowindow.close();
            infowindow.open(vm.map, marker);
            vm.infowindow = infowindow;
          });
          // *********
        });
      }, 1000);
    },

    // 獲取所在座標
    getCurrentPostion: function () {
      navigator.geolocation.getCurrentPosition((position) => {
        this.center.lat = position.coords.latitude;
        this.center.lng = position.coords.longitude;
        this.resetCenter();
      });
    },

    // 重設地圖中心
    resetCenter: function () {
      // set center
      this.map.panTo({ lat: this.center.lat, lng: this.center.lng });
    },

    initGeocoder: function () {
      this.geocoder = new google.maps.Geocoder();
    },
  },
  watch: {
    addressList: function (newValue, oldValue) {
      console.log("watch");
      console.log(this.addressList);
      this.addMarkerStatus();
      this.initGeocoder();
      this.geocode();
      this.setSelfMarker();
      this.setMarker();
    },
  },
};
</script>

<style scoped>
#actMap {
  height: 100vh;


}
.google-map {
  /* width: 100%; */
  height: 100vh;
  
}

.map {
  width: 100%;
  height: 100vh;
}

.mapActivityPic {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  object-fit: cover;
}

.activityContent {
  border-top: 1px lightgrey solid;
}
</style>
