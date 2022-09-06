<template>
  <main>
    <div class="el"></div>
    <div class="dom-node-demo"></div>
  </main>
</template>

<script>
import animejs from "animejs";
export default {
  mounted() {
    //   nodeList
    const el = document.querySelectorAll("div");
    animejs({
      targets: [el],
      translateX: 250,
    });
  },
};
</script>

<style scoped>
div {
  width: 100px;
  height: 100px;
  background-color: yellow;
}
</style>