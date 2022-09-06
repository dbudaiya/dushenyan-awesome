<template>
  <div class="horizontal-container">
    <div class="scroll-wrapper" ref="scroll">
      <div class="scroll-content">
        <div class="scroll-item" v-for="(item, index) in emojis" :key="index">
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "@better-scroll/core";

export default {
  name: "betterscrolldefalut",

  data() {
    return {
      emojis: [
        "👉🏼 😁 😂 🤣 👈🏼",
        "😄 😅 😆 😉 😊",
        "😫 😴 😌 😛 😜",
        "👆🏻 😒 😓 😔 👇🏻",
        "😑 😶 🙄 😏 😣",
        "😞 😟 😤 😢 😭",
        "🤑 😲 ☹️ 🙁 😖",
        "👍 👎 👊 ✊ 🤛",
        "☝️ ✋ 🤚 🖐 🖖",
        "👍🏼 👎🏼 👊🏼 ✊🏼 🤛🏼",
        "☝🏽 ✋🏽 🤚🏽 🖐🏽 🖖🏽",
        "🌖 🌗 🌘 🌑 🌒",
      ],
    };
  },
  mounted() {
    this.init();
  },
  beforeUnmount() {
    this.bs.destroy();
  },

  //  定义好方法函数,便于在生命周期函数中进行挂载,挂载生命周期有对象和方法的形式编写,一般我们使用的方法的形式
  methods: {
    init() {
      this.bs = new BScroll(this.$refs.scroll, {
        scrollX: true,
        probeType: 3, // listening scroll event
      });
      this.bs.on("scrollStart", () => {
        console.log("scrollStart-");
      });
      this.bs.on("scroll", ({ y }) => {
        console.log("scrolling-");
      });
      this.bs.on("scrollEnd", () => {
        console.log("scrollingEnd");
      });
    },
  },
};
// 给定样式的时候,因为用的是预处理器,在子样式里面必须包含有上层符元素属性,就是样式是一次一次设定的,少了一层都不能展示出效果来
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.horizontal-container {
  .scroll-wrapper {
    position: relative;
    width: 90%;
    margin: 80px auto;
    white-space: nowrap;
    border: 3px solid #42b983;
    border-radius: 5px;
    overflow: hidden;

    .scroll-content {
      display: inline-block;
    }

    .scroll-item {
      height: 50px;
      line-height: 50px;
      font-size: 24px;
      display: inline-block;
      text-align: center;
      padding: 0 10px;
    }
  }
}
</style>