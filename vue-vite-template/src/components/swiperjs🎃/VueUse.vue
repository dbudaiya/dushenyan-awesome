
<template>
  <swiper class="mySwiper">
    <swiper-slide v-for="(item, index) in imgUrl" :key="index">
      <img :src="item" alt="" />
    </swiper-slide>
  </swiper>
</template>
<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

import "swiper/swiper.scss";

export default {
  name: "Swiperdefault",

  data() {
    return {
      message: "budaishu",
      imgUrl: [
        "https://pic2.zhimg.com/80/v2-624e5beb92056f2a957d6f0be636aaf0_qhd.jpg",
        "https://pic2.zhimg.com/v2-f564779b25c97075243de7ab54297b4b_720w.jpg",
        "https://pic3.zhimg.com/v2-3e395967a69319455bd819a011eab6e1_720w.jpg",
        "https://pic4.zhimg.com/v2-7d3660a496b79f6e45a23500cbd4afaf_720w.jpg",
      ],
    };
  },
  methods: {},
  components: {
    Swiper,
    SwiperSlide,
  },
};
</script>

<style >
body {
  background: #eee;
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #000;
  margin: 0;
  padding: 0;
}
.swiper-container {
  height: 100vh;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>