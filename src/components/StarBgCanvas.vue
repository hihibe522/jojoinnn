<template>
  <div id="bgCanvasStar">
    <div style="display: none;">
      <img id="rocketIcon1" src="../assets/img/imgCanvas/rocket1.svg" alt />
      <img id="rocketIcon2" src="../assets/img/imgCanvas/rocket2.svg" alt />
      <img id="rocketIcon3" src="../assets/img/imgCanvas/rocket3.svg" alt />
      <img id="rocketIcon4" src="../assets/img/imgCanvas/rocket4.svg" alt />
      <img id="rocketIcon5" src="../assets/img/imgCanvas/rocket5.svg" alt />
      <img id="astronaut" src="../assets/img/imgCanvas/astronaut.svg" alt />
    </div>
    <canvas id="canvas"></canvas>
  </div>
</template>

<script>
export default {
  name: "bgCanvasStar",
  data() {
    return {
      canvas: {},
      context: {},
      windowHight: "",
      windowWidth: "",
      starItemList: [],
      tempStar: {}

      // starItemListBak:[],
      // starItemListClear:[]
    };
  },
  methods: {
    canvasStar() {
      var vm = this;
      vm.canvas = document.getElementById("canvas");
      // console.log(vm.canvas);
      vm.context = vm.canvas.getContext("2d");
      // console.log(context);

      // vm.windowWidth = window.innerWidth;
      // vm.windowHight = (window.innerHeight > document.body.scrollHeight) ? window.innerHeight : document.body.scrollHeight;
      vm.canvas.width = window.innerWidth;
      vm.canvas.height = window.innerHeight;
      // console.log(vm.canvas.width, vm.canvas.height);
      // star defination
      var starItem = { x: 10, y: 10, r: 10, opa: 0.8 };
      // var starItemList = [];
      // var tempStar = {};

      //Gain star(high probility to get small star)
      // function gainStar(count = 1500 * vm.canvas.height / 722) {
      //     starItemList = [];

      //     for (var i = 0; i < count; i++) {
      //         var randomNum = Math.floor(Math.random() * 30) + 0;
      //         tempStar = {}
      //         tempStar.x = Math.random() * vm.canvas.width;
      //         tempStar.y = Math.random() * vm.canvas.height*3;
      //         tempStar.r = !randomNum ? (Math.random() * 6) : (Math.random() * 1);
      //         tempStar.opa = 0.8;
      //         starItemList.push(tempStar)
      //     }
      //     // starItemListBak = starItemList;
      //     // starItemListClear = starItemList;
      // }

      //gain star
      vm.gainStar();

      //Star with different opacity at random when r is larger than 3 in period
      setInterval(() => {
        vm.starItemList.forEach(e => {
          e.opa = e.r <= 3 ? e.opa : Math.random() + 0.2;
        });
      }, 1800);

      // draw star
      // function drawStar(item) {
      //     vm.context.beginPath();
      //     vm.context.arc(item.x, item.y, item.r, 0, Math.PI * 2, true);
      //     vm.context.fillStyle = 'rgba(255, 255, 255,' + item.opa + ')'
      //     vm.context.fill();

      // }

      //  rocket part
      var rocket = {
        x: 122,
        y: 122,
        dx: 3,
        dy: -3,
        content: document.getElementById("rocketIcon1")
      };
      var rocketList = [];
      rocketList.push(rocket);

      var arr = [
        document.getElementById("rocketIcon1"),
        document.getElementById("rocketIcon2"),
        document.getElementById("rocketIcon3"),
        document.getElementById("rocketIcon4"),
        document.getElementById("rocketIcon5")
      ];
      var newRocket;
      setInterval(() => {
        if (Math.floor(Math.random() * 5) == 0 && rocketList.length < 5) {
          newRocket = {};
          newRocket.x = Math.random() * vm.canvas.width;
          newRocket.y = Math.random() * vm.canvas.height;
          newRocket.dx = 3;
          newRocket.dy = -3;
          newRocket.content = arr[Math.floor(Math.random() * 5)];
          rocketList.push(newRocket);
        }
        // console.log(rocketList)
        if (rocketList.length > 1) {
          for (var i = 0; i < rocketList.length; i++) {
            if (rocketList[i].x < 0 || rocketList[i].y < 0) {
              rocketList.splice(i, 1);
            }
          }
        }
        // console.log(rocketList)
      }, 1000);

      function drawRocket(rocket) {
        vm.context.drawImage(rocket.content, rocket.x, rocket.y, 50, 50);
        vm.context.fill();
      }

      // astronaut part
      // astronaut defination
      var astronaut = {
        x: 1000,
        y: 600,
        dx: 2,
        dy: 2,
        theta: 3,
        content: document.getElementById("astronaut")
      };
      var astronautList = [];
      astronautList.push(astronaut);
      var tempAstront;

      var arrAastro = [
        document.getElementById("astronaut"),
        document.getElementById("spaceRobot")
      ];

      // gain astronaut

      setInterval(() => {
        if (Math.floor(Math.random() * 4) == 0 && astronautList.length < 8) {
          tempAstront = {};
          tempAstront.x = Math.random() * vm.canvas.width;
          tempAstront.y = Math.random() * vm.canvas.height + 200;
          tempAstront.dx = Math.random();
          tempAstront.dy = Math.random();
          tempAstront.theta = Math.random() * 3.14;
          tempAstront.content = arrAastro[Math.floor(Math.random() * 1)];
          astronautList.push(tempAstront);
        }
      }, 1000);

      // delete astronaut
      setInterval(() => {
        if (astronautList.length > 1) {
          astronautList.shift();
        }
      }, 3500);

      function drawAstronaut(astronaut) {
        vm.context.drawImage(
          astronaut.content,
          astronaut.x,
          astronaut.y,
          25,
          25
        );
        vm.context.fill();
      }

      // cavasStartUp
      function cavasStartUp() {
        vm.windowWidth = window.innerWidth;
        vm.windowHight =
          window.innerHeight > document.body.scrollHeight
            ? window.innerHeight
            : document.body.scrollHeight;

        vm.context.clearRect(0, 0, vm.canvas.width, vm.canvas.height);

        vm.starItemList.forEach(item => {
          vm.drawStar(item);
        });

        rocketList.forEach(rocket => {
          rocket.x += rocket.dx;
          rocket.y += rocket.dy;
          drawRocket(rocket);
        });

        astronautList.forEach(astronaut => {
          astronaut.theta += 0.2;
          astronaut.x += astronaut.dx * Math.sin(astronaut.theta);
          astronaut.y += astronaut.dy * Math.sin(astronaut.theta + 0.1);
          drawAstronaut(astronaut);
        });
      }

      // Run Star Cavas
      setInterval(() => {
        cavasStartUp();
      }, 100);
    },
    gainStar(count = (1500 * this.canvas.height) / 722) {
      // var tempStar;
      var vm = this;
      vm.starItemList = [];
      for (var i = 0; i < count; i++) {
        var randomNum = Math.floor(Math.random() * 30) + 0;
        var tempStar = {};
        tempStar.x = Math.random() * vm.canvas.width;
        tempStar.y = Math.random() * vm.canvas.height;
        tempStar.r = !randomNum ? Math.random() * 6 : Math.random() * 1;
        tempStar.opa = 0.8;
        vm.starItemList.push(tempStar);
      }
      vm.starItemList.forEach(item => {
        vm.drawStar(item);
      });
    },
    drawStar(item) {
      var vm = this;
      vm.context.beginPath();
      vm.context.arc(item.x, item.y, item.r, 0, Math.PI * 2, true);
      vm.context.fillStyle = "rgba(255, 255, 255," + item.opa + ")";
      vm.context.fill();
    }
  },

  created() {
    // this.bgCanvasStar();
  },
  mounted() {
    this.canvasStar();
  }
};
</script>

<style>
#canvas {
  background-color: #29383d;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -999;
}
</style>
