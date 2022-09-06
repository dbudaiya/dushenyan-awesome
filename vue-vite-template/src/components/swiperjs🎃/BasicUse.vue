<template>
  <div class="swiper-container">
    <!-- Additional required wrapper -->
    <div class="swiper-wrapper">
      <!-- Slides -->
      <div class="swiper-slide">Slide 1</div>
      <div class="swiper-slide">Slide 2</div>
      <div class="swiper-slide">Slide 3</div>
      ...
    </div>
    <!-- If we need pagination -->
    <div class="swiper-pagination"></div>

    <!-- If we need navigation buttons -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>

    <!-- If we need scrollbar -->
    <div class="swiper-scrollbar"></div>
  </div>
</template>

<script>
// 导入 Swiper JS
import Swiper from "swiper";
s;
// 导入 Swiper 样式
import "swiper/swiper-bundle.css";

// //核心版本 + 导航、分页模块：
// import SwiperCore, { Navigation, Pagination } from "swiper/core";

// //配置 Swiper 使用模块
// SwiperCore.use([Navigation, Pagination]);
export default {
  mounted() {
    new Swiper(".swiper-container", {
      // Optional parameters
      direction: "vertical",
      loop: true,

      // 如果我们需要分页
      pagination: {
        el: ".swiper-pagination",
      },

      // 导航箭头
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },

      // 如果我们需要滚动条
      scrollbar: {
        el: ".swiper-scrollbar",
      },
    });
  },
};
</script>

<style>
.swiper-container {
  width: 600px;
  height: 300px;
}
</style>