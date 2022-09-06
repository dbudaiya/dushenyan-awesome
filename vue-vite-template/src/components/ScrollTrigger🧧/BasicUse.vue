<template>
  <div class="dom-Scrolltrigger-demo">
    <div class="item" v-for="(item, index) in items" :key="item">
      <h2>Image {{ index + 1 }}</h2>
      <img :data-src="item" alt="" />
    </div>
  </div>
</template>

<script>
import ScrollTrigger from "@terwanerik/scrolltrigger";
export default {
  data() {
    return {
      items: [
        "https://pic3.zhimg.com/80/v2-c4c106c3d648362369c20644a9c27216_720w.jpg",
        "https://pic4.zhimg.com/80/v2-d1685367b6bae10418cf768b0f3eb47b_720w.jpg",
        "https://pic3.zhimg.com/80/v2-db62016945c616d20190fcecec9f7af2_720w.jpg",
        "https://pic1.zhimg.com/80/v2-71d13854c2aced929958fd2d062d1318_720w.jpg",
        "https://pic2.zhimg.com/80/v2-7af447b5b04f00616da26a64bd3ea82e_720w.jpg?source=1940ef5c",
        "https://pic2.zhimg.com/80/v2-f7979f3e221fcda4776d7039cc618d71_720w.jpg?source=1940ef5c",
      ],
      trigger: null,
    };
  },
  mounted() {
    // 使用默认选项创建一个新的scrolltrigger实例
    this.trigger = new ScrollTrigger();
    console.log(this.trigger);
    this.trigger.add("[data-src]", {
      once: true,
      toggle: {
        callback: {
          in: this.loadImage.bind(this),
        },
      },
    });
  },
  beforeUnmount() {
    this.trigger.kill();
    this.trigger = null;
  },
  methods: {
    loadImage(trigger) {
      const el = trigger.element;

      if (!el.hasAttribute("data-src")) {
        return;
      }

      const source = el.getAttribute("data-src");

      el.setAttribute("src", source);

      el.addEventListener("load", () => {
        el.removeAttribute("data-src");
      });
    },
  },
};
</script>

<style >
html,
body {
  margin: 0;
  padding: 0;
  background: #232323;
  color: #ececec;
  font-family: sans-serif;
}

#app {
  width: 100%;
}

.item,
.loadmore {
  width: 90%;
  max-width: 650px;
  margin: 75px auto;
}

.item {
  min-height: 500px;
}

.item h2 {
  text-transform: uppercase;
}

.item img {
  position: relative;
  width: 100%;

  background: #ececec;
  opacity: 0;

  transition: opacity 1s ease;
}

.loadmore {
  text-align: center;
}
</style>