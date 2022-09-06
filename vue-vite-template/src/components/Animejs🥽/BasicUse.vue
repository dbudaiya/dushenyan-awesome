<template>
  <!-- animejs 3.0.1版本 -->
  <!-- https://www.animejs.cn/documentation/#cssSelector -->
  <div id="default">
    <div class="el"></div>
  </div>
</template>

<script>
import anime from "animejs/lib/anime.es.js";
export default {
  name: "animedefalut",
  mounted() {
    anime({
      targets: ".el",
      translateX: 250,
      translateY: 250,
      backgroundColor: "#587b4e",
      borderRadius: ["30%", "50%", "0%"],
      delay: 1000,
      easing: "easeInOutExpo",
      loop: true,
      autoplay: true,

      //下面的属性要为input标签才有用
      //   value: [0, 1000],
      //   round: 1,
    });
  },
};
</script>

<style scoped>
.el {
  width: 250px;
  height: 250px;
  background-color: red;
  border-radius: 40%;
}
</style>