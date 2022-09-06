<template>
  <!-- https://github.com/mattboldt/typed.js -->
  <div class="name">
    <div id="typed-strings">
      <p>Typed.js is a <strong>JavaScript</strong> library.</p>
      <p>It <em>types</em> out sentences.</p>
    </div>
    <span id="typed"></span>
  </div>
</template>

<script>
import Typed from "typed.js";
export default {
  mounted() {
    new Typed("#typed", {
      /**
       * @property {array} strings 要输入的字符串
       * @property {string} stringsElement 包含字符串子元素的元素的 ID
       */
      strings: [
        "These are ^1000 the default values...",
        "You know what you should do?",
        "Use your own!",
        "Have a great day!",
      ],
      stringsElement: "#typed-strings",
      typeSpeed: 100,
      /**
       * @property {number} typeSpeed 以毫秒为单位输入速度
       */
      typeSpeed: 0,

      /**
       * @property {number} startDelay 打字前的时间以毫秒为单位开始
       */
      startDelay: 0,

      /**
       * @property {number} backSpeed 以毫秒为单位的退格速度
       */
      backSpeed: 0,

      /**
       * @property {boolean} smartBackspace 仅退格与前一个字符串不匹配的内容
       */
      smartBackspace: true,

      /**
       * @property {boolean} shuffle 洗牌
       */
      shuffle: false,

      /**
       * @property {number} backDelay 退格前的时间（以毫秒为单位）
       */
      backDelay: 700,

      /**
       * @property {boolean} fadeOut 淡出而不是退格
       * @property {string} fadeOutClass 用于淡入淡出动画的 css 类
       * @property {boolean} fadeOutDelay 以毫秒为单位的淡出延迟
       */
      fadeOut: false,
      fadeOutClass: "typed-fade-out",
      fadeOutDelay: 500,

      /**
       * @property {boolean} loop 循环字符串
       * @property {number} loopCount 循环数量
       */
      loop: false,
      loopCount: Infinity,

      /**
       * @property {boolean} showCursor 显示光标
       * @property {string} cursorChar 光标字符
       * @property {boolean} autoInsertCss 将光标和淡出的 CSS 插入 HTML <head>
       */
      showCursor: true,
      cursorChar: "|",
      autoInsertCss: true,

      /**
       * @property {string} attr 打字属性
       * 例如：输入占位符、值或仅 HTML 文本
       */
      attr: null,

      /**
       * @property {boolean} bindInputFocusEvents 如果 el 是文本输入，则绑定到焦点和模糊
       */
      bindInputFocusEvents: false,

      /**
       * @property {string} contentType 'html' 或 'null' 用于明文
       */
      contentType: "html",

      /**
       * 在开始打字之前
       * @param {Typed} self
       */
      onBegin: (self) => {},

      /**
       * 全部打字完成
       * @param {Typed} self
       */
      onComplete: (self) => {},

      /**
       *在输入每个字符串之前
       * @param {number} arrayPos
       * @param {Typed} self
       */
      preStringTyped: (arrayPos, self) => {},

      /**
       * 在输入每个字符串之后
       * @param {number} arrayPos
       * @param {Typed} self
       */
      onStringTyped: (arrayPos, self) => {},

      /**
       * 在循环期间，在输入最后一个字符串之后
       * @param {Typed} self
       */
      onLastStringBackspaced: (self) => {},

      /**
       * 打字已停止
       * @param {number} arrayPos
       * @param {Typed} self
       */
      onTypingPaused: (arrayPos, self) => {},

      /**
       * 停止打字后又开始打字
       * @param {number} arrayPos
       * @param {Typed} self
       */
      onTypingResumed: (arrayPos, self) => {},

      /**
       * 重置后
       * @param {Typed} self
       */
      onReset: (self) => {},

      /**
       * 停车后
       * @param {number} arrayPos
       * @param {Typed} self
       */
      onStop: (arrayPos, self) => {},

      /**
       * 启动后
       * @param {number} arrayPos
       * @param {Typed} self
       */
      onStart: (arrayPos, self) => {},

      /**
       * 销毁后
       * @param {Typed} self
       */
      onDestroy: (self) => {},
    });
  },
};
</script>

<style >
/* Cursor */
.typed-cursor {
  color: red;
}

/* If fade out option is set */
.typed-fade-out {
}
</style>