<template>
  <div class="budai aa">
    <h1>我将要来了</h1>
  </div>
</template>

<script>
export default {
  mounted() {
    $("h1").addClass("action");
    // 获取偏移
    // const offset = $("h1").offset({top:100,left:100});
    // $("h1").html("left" + offset.left);
    const h1= $("h1")
    console.log(h1.innerHeight());
    console.log(h1.height());
  },
};
</script>

<style>
.aa {
  background: yellow;
}
.action {
  border: 4px salmon solid;
  padding: 10px;
  color: green;
  font-size: 24px;
}
</style>