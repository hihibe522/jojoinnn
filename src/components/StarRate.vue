<template>
    <div class="ratings">
          <div class="empty_star"><img v-for="(item,index ) in 5" :src="starImg" :key="index"></div>
          <div :style="starRate" class="full_star"><img v-for="(item,index ) in 5" :src="starImg" :key="index" ></div>
    </div>

</template>
<script>
export default {
        name:'starRate',
        props:["m_rate"],
        data() {
          return {
            star:this.m_rate,
            starImg:require("../assets/img/jo_icon/jo_i_starFull.svg")
          }
        },
        computed: {
          starRate:function(){
             let rate = Math.floor((this.star/5)*100);
             return `width: ${rate}%`;
          }
        },

        watch: {
          m_rate:function(newValue, oldValue) {
              this.star = newValue;
          } 
        },

}
</script>

<style scoped>
        img{
            width: 20px;
            height: 20px;
        }
        .empty_star img{
            filter: grayscale(1);
        }
        .ratings {
          display: inline-block;
          position: relative;
          vertical-align: middle;
          display: inline-block;
          overflow: hidden;
        }
        .full_star {
            /* 調整寬度對應星等 */
            width: 100%;
            position: absolute;
            left: 0;
            top: 0;
            white-space: nowrap;
            overflow: hidden;
        }
</style>>

