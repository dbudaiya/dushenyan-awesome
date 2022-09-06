<template>
  <main class="mixed-array-demo">
    <div class="el-01"></div>
    <div class="el-02"></div>
    <div class="el-03"></div>
  </main>
</template>

<script>
import animejs from "animejs";
export default {
  mounted() {
    const el = document.querySelector(".el-01");
    animejs({
      targets: [el, ".mixed-array-demo .el-02", ".mixed-array-demo .el-03"],
      translateX: 250,
    });
  },
};
</script>

<style scoped>
div {
  width: 100px;
  height: 100px;
  background-color: brown;
  margin: 2%;
}
</style>