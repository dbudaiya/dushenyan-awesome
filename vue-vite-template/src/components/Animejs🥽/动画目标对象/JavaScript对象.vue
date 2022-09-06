<template>
  <div class="battery-log"></div>
</template>

<script>
import animejs from "animejs";
export default {
  mounted() {
    const logEl = document.querySelector(".battery-log");
    let battery = { charged: "0%", cycles: 20 };
    animejs({
      targets: battery,
      charged: "100%",
      cycles: 130,
      round: 1,
      easing: "linear",
      update() {
        logEl.innerHTML = JSON.stringify(battery);
      },
    });
  },
};
</script>

<style>
</style>