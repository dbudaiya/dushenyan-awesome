<template>
  <!--  -->
  <div id="defalut">
    <!-- 简单案例 -->
    <h1 class="headline load-hidden">Widget Inc.</h1>

    <!-- 技术扩展 -->
    <ul class="widget-list">
      <li class="widget">1</li>
      <li class="widget">2</li>
      <li class="widget">3</li>
      <li class="widget">4</li>
      <li class="widget">5</li>
    </ul>
  </div>
</template>

<script>
import ScrollReveal from "scrollreveal";
export default {
  name: "scrollrevealdefault",
  mounted() {
    ScrollReveal().reveal(".headline", { duration: 2000 });
    ScrollReveal().reveal(".widget", { interval: 200 });
  },
};
</script>

<style scoped>
.widget-list {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  background: black;
  border-radius: 8px;
}

.widget {
  width: 15%;
  height: 50px;
  flex: auto;
  margin: 0.5rem;
  background: white;
  line-height: 50px;
  text-align: center;
  border-radius: 4px;
}

/* extension */
html.sr .load-hidden {
  visibility: hidden; /*浮现展示*/
  color: red;
}
html.sr .widget {
  visibility: hidden;
}
</style>