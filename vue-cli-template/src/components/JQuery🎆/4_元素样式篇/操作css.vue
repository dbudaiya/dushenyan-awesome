<template>
  <div :style="{ color: 'yellow' }" class="colors">教师签名</div>
</template>

<script>
export default {
  mounted() {
    console.log($(".colors").color("color"));
  },
};
</script>

<style>
</style>