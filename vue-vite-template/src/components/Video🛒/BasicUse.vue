<template>
  <!-- videojs 版本7.11.4 -->
  <!-- https://videojs.com/ -->
  <div class="dom-video-demo">
    <video-player :options="videoOptions" />
  </div>
</template>

<script>
import VideoPlayer from "./v-cpn/Videoplayer.vue";
import videos from "../../assets/video/superman.mp4";
export default {
  name: "VideoExample",
  components: {
    VideoPlayer,
  },
  data() {
    // https://segmentfault.com/a/1190000018914486  对video进行经验总结
    return {
      videoOptions: {
        name: "Pipixia",
        controls: true, // 是否显示控制条
        poster:
          "https://pic1.zhimg.com/50/v2-f15a837f0aab368f9a68e18df9fa1fcc_qhd.jpg?source=ba7200d9", // 视频封面图地址
        preload: "auto",
        autoplay: false,
        height: "400px",
        fluid: false, // 自适应宽高
        language: "zh-CN", // 设置语言
        muted: false, // 是否静音
        inactivityTimeout: false,
        controlBar: {
          // 设置控制条组件
          /* 设置控制条里面组件的相关属性及显示与否
          'currentTimeDisplay':true,
          'timeDivider':true,
          'durationDisplay':true,
          'remainingTimeDisplay':false,
           volumePanel: {
           inline: false,
          }*/
          volumePanel: {
            inline: false,
          },
          /* 使用children的形式可以控制每一个控件的位置，以及显示与否 */
          children: [
            { name: "playToggle" }, // 播放按钮
            { name: "currentTimeDisplay" }, // 当前已播放时间
            { name: "progressControl" }, // 播放进度条
            { name: "durationDisplay" }, // 总时间
            {
              // 倍数播放
              name: "playbackRateMenuButton",
              playbackRates: [0.5, 1, 1.5, 2, 2.5],
            },
            {
              name: "volumePanel", // 音量控制
              inline: false, // 不使用水平方式
            },
            { name: "FullscreenToggle" }, // 全屏
          ],
        },
        sources: [
          // 视频源
          {
            src: videos,
            type: "video/mp4",
          },
        ],
      },
    };
  },
};
</script>


<style scoped>
/* .dom-video-demo {
  height: 400px;
} */
</style>