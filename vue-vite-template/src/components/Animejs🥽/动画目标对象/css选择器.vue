<template>
  <div class="battery-css"></div>
</template>

<script>
import animejs from "animejs";
export default {
  mounted() {
    animejs({
      targets: ".battery-css",
      translateX: 320,
      backgroundColor: "#2C313C",
    });
  },
};
</script>

<style>
.battery-css {
  width: 100px;
  height: 100px;
  background-color: aquamarine;
}
</style>