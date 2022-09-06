<template>
  <div class="el"></div>
</template>

<script>
import animejs from "animejs";
export default {
  mounted() {
    animejs({
      targets: ".el",
      backgroundColor: "#282C34",
      left: "240px",
      borderRadius: ["0%", "50%"],
      easing: "easeInOutQuad",
    });
  },
};
</script>

<style scoped>
.el {
  width: 100px;
  height: 100px;
  background-color: burlywood;
}
</style>