<template>
  <div @click="likeit(inaid)" class="jo_heartDiv">
    <img
      class="jo_heart"
      :class="{jo_heartPink:islike}"
      src="@/assets/img/jo_images/jo_heart.svg"
      alt
    />
    <img
      class="jo_heart jo_hover"
      :class="{jo_heartPinkAni:islike}"
      src="@/assets/img/jo_images/jo_heart.svg"
      alt
    />
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "favicon",
  props: ["liked", "aid"],
  data() {
    return {
      like: this.liked,
      inaid: this.aid,
    };
  },
  methods: {
    likeit(aid) {
      console.log("----in----", aid);
      var myID = JSON.parse(localStorage.getItem("myinfo"));
      console.log(this.like);
      // 收藏活動 ajax
      const data = {};
      data.m_ID = myID.m_ID; //localStorage.getItem("m_ID");
      data.a_ID = aid;
      console.log(data);
      if (!this.like) {
        console.log("post");
        axios.post("modules/collect", { info: data }).then((e) => {
          console.log(e);
          this.like = !this.like;
        });
      } else {
        console.log("delete");
        axios.post("modules/delcollect", { info: data }).then((e) => {
          console.log(e);
          this.like = !this.like;
        });
      }

    //   vm.$emit("addLike", "");
      // 樣式改變
      // this.like = !this.like;
    },
  },
  computed: {
    islike: function () {
      if (this.like) {
        return true;
      }
    },
  },
  watch: {
    liked: function (newdata, old) {
      this.like = newdata;
    },
    aid: function (newdata, old) {
      this.inaid = newdata;
    },
  },
};
</script>

<style scoped>
.jo_heartDiv {
  width: 100px;
  height: 85px;
  position: relative;
}

.jo_heart {
  position: absolute;
  width: 100px;
}

.jo_heart:hover {
  filter: brightness(0.8);
}

.jo_heartPink {
  transition-delay: 0.3s;
  transition-timing-function: ease-out;
  position: absolute;
  filter: brightness(2.5) hue-rotate(135deg) saturate(5);
  animation-name: jo_heartPinkAni;
  animation-duration: 0.2s;
  animation-delay: 0.2s;
}

@keyframes jo_heartPinkAni {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

.jo_heartPinkAni {
  position: absolute;
  filter: brightness(2.5) hue-rotate(135deg) saturate(5);
  animation-name: jo_heartAni;
  animation-duration: 0.4s;
  animation-timing-function: ease-out;
  animation-fill-mode: forwards;
}

@keyframes jo_heartAni {
  0% {
    transform: scale(0.5);
    opacity: 0.5;
  }
  50% {
    transform: scale(1);
    opacity: 1;
  }
  99% {
    transform: scale(3);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}
</style>