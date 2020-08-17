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
          class="form-control col-8 mr-0"
          style="border-top: 3px lightgreen solid; "
          type="search"
          placeholder="搜Jo活動/ 空白搜尋回原點"
          v-model="newAddress.addr"
        />
        <input
          @click="searchInputBtn"
          class="col-3 jo_btn jo_btn_s jo_btnWater jo_hover ml-auto"
          style="border-radius:25px"
          type="button"
          value="搜尋"
        />
      </form>

      <div v-for="(item,index) in addressList" :key="index" class="activityContent d-flex bg-white">
        <div class="p-2" style="width: 70%; line-height: 1.2;">
          <h5>
            <b>{{item.text}}</b>
            <br />
          </h5>
          活動開始: {{item.a_start}}
          <br />
          活動地點:{{item.addr}}
          <br />
          距離: <span style="color:var(--orange)">{{item.distance.text}}</span>
          開車車程: <span style="color:var(--orange)">{{item.duration}}</span>
          <!-- <span>收藏人數: 100+</span> -->
        </div>
        <router-link :to="`/activity?a_ID=${item.a_ID}`">
          <div class="ml-auto my-auto p-2" style=" width: 100px; height: 100px; ">
            <img class="mapActivityPic" :src="`../../static/img/activityPic/${item.a_pic}`" alt=" " />
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import axios from "axios";
import Vue_modalLuckyVue from "./Vue_modalLucky.vue";
import Vue_modalGiveRateVue from "./Vue_modalGiveRate.vue";

export default {
  name: "actLocations",
  data() {
    return {
      map: {},
      geocoder: null,
      center: { lat: 24.1505, lng: 120.651, text: "目前位置" },
      addressList: [{ duration: "", distance: "" }],
      newAddress: { addr: "", lat: 23, lng: 120.7, text: "模擬位置" },
    };
  },
  created() {
    console.clear();
    this.getData();
  },
  mounted() {
    // this.getCurrentPostion();
    this.initMap();
    this.addMarkerStatus();
    this.initGeocoder();
    this.geocode();
    this.setSelfMarker();
    this.setMarker();
    this.calDistance();
    // console.log(this.addressList)
    // console.log("add", this.addressList);
    // console.log(" this.geocoder.geocode", this.geocoder.geocode)
  },
  methods: {
    searchInputBtn: function () {
      if (this.newAddress.addr == "") {
        this.panToOrigin();
        return;
      }

      // *****************輸入位置轉座標
      this.geocoder.geocode(
        {
          // 地址
          address: this.newAddress.addr,
          componentRestrictions: {
            country: "TW",
          },
        },
        // 轉換完成後呼叫的 callback 函式
        (results, status) => {
          if (status === "OK") {
            var newLat = results[0].geometry.location.lat();
            var newLng = results[0].geometry.location.lng();

            this.newAddress.lat = newLat;
            this.newAddress.lng = newLng;
            console.log(this.newAddress);
          } else {
          }
        }
      );

      // *****************輸入位置轉座標 END

      // console.log(this.newAddress);
      var vm = this;
      var markerLat = parseFloat(this.newAddress.lat);
      var markerLng = parseFloat(this.newAddress.lng);
      var marker = new google.maps.Marker({
        position: { lat: markerLat, lng: markerLng },
        icon: {
          url: "../../static/img/gpsPage/外星船3.svg",
          scaledSize: { height: 80, width: 80 },
        },
        map: vm.map,
        animation: google.maps.Animation.DROP,
        // animation: google.maps.Animation.BOUNCE,
      });
      var infowindow = new google.maps.InfoWindow({
        content: vm.newAddress.text,
        maxWidth: 200,
      });
      infowindow.open(vm.map, marker);
     console.log(markerLat,markerLng)
this.calDistance(markerLat,markerLng)
      // *****************重設中心點
      this.resetCenter();
    },

    getData: function () {
      var vm = this;
      axios.get("actLocations").then((e) => {
        console.log(e);
        this.addressList = e.data;
        this.addressList.forEach((data) => {
          data.a_start = data.a_start.substr(0, 16);
        });
        console.log("this.addressList", this.addressList);
        for (var i = 0; i < vm.addressList.length; i++) {
          vm.$set(vm.addressList[i], "duration", "");
          vm.$set(vm.addressList[i], "distance", "");
        }
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
      var marker = new google.maps.Marker({
        position: { lat: this.center.lat, lng: this.center.lng },
        icon: {
          url: "../../static/img/gpsPage/外星船3.svg",
          scaledSize: { height: 70, width: 70 },
        },
        map: this.map,
      });
    },
    // 改marker 狀態 :icon,動畫
    addMarkerStatus: function () {
      var vm = this;
      console.log("addMarkerStatus");

      vm.addressList.forEach((e) => {
        e.icon = {
          url: "../../static/img/gpsPage/外星船3.svg",
        };
        e.animation = "google.maps.Animation.DROP";
      });
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
              url: "../../static/img/gpsPage/jo_mapBird.svg",
              scaledSize: { height: 40, width: 40 },
            },
            map: vm.map,
            animation: google.maps.Animation.DROP,
            // animation: google.maps.Animation.BOUNCE,
            event: {
              mouseover: {
                func: function () {
                  marker.setAnimation(google.maps.Animation.BOUNCE);
                },
              },
              mouseout: {
                func: function () {
                  marker.setAnimation("");
                },
              },
            },
            animation: google.maps.Animation.DROP,
          });

          // console.log("setmark後", vm.addressList);
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
    resetCenter: function (
      newLat = this.newAddress.lat,
      newLng = this.newAddress.lng
    ) {
      // set center
      this.map.panTo({ lat: newLat, lng: newLng });
    },

    panToOrigin: function () {
      this.resetCenter(this.center.lat, this.center.lat);
      this.initMap();
      this.setSelfMarker();
      this.setMarker();
      this.calDistance();
    },

    initGeocoder: function () {
      this.geocoder = new google.maps.Geocoder();
    },

    // 計算距離
    calDistance: function (lat=this.center.lat,lng=this.center.lng) {
      var vm = this;
      setTimeout(function () {
        // console.log(vm.center.lat, vm.center.lng);
        let originPosition = new google.maps.LatLng(
          parseFloat(lat),
          parseFloat(lng)
        );

        // 把要計算的點存成陣列
        let destinations = [];
        for (var i = 0; i < vm.addressList.length; i++) {
          destinations[i] = vm.addressList[i].addr;
        }

        // console.log(destinations);

        // 所在位置跟各點的距離
        const service = new google.maps.DistanceMatrixService();
        console.log(service);

        service.getDistanceMatrix(
          {
            origins: [originPosition],
            destinations: destinations,
            travelMode: "DRIVING", // 交通方式：BICYCLING(自行車)、DRIVING(開車，預設)、TRANSIT(大眾運輸)、WALKING(走路)
            unitSystem: google.maps.UnitSystem.METRIC, // 單位 METRIC(公里，預設)、IMPERIAL(哩)
            avoidHighways: true, // 是否避開高速公路
            avoidTolls: true, // 是否避開收費路線
          },
          callback
        );
        function callback(response, status) {
          console.log(response.rows[0].elements.length);
          for (var i = 0; i < response.rows[0].elements.length; i++) {
            vm.addressList[i].distance =
              response.rows[0].elements[i].distance;
            vm.addressList[i].duration =
              response.rows[0].elements[i].duration.text;
            //  console.log(vm.addressList)
          }
          vm.addressList = vm.addressList.sort((a, b) => {
            // console.log( "a.distance", a.distance.value)
            // console.log( "b.distance", b.distance.value)
            // console.log( "b.distance", typeof(b.distance.value))
            return a.distance.value - b.distance.value 
          });

          console.log(vm.addressList)
        }
      }, 1000);
    },
  },

  watch: {
    addressList: function (newValue, oldValue) {
      // console.log("watch");
      // console.log(this.addressList);
      this.addMarkerStatus();
      this.initGeocoder();
      this.geocode();
      // this.setSelfMarker();
      // this.setMarker();
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
