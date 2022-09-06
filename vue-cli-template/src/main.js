//B站视频地址: https://b23.tv/QetRel
import { createApp } from "vue";
/*
* 使用JQueryDOM操作函数库,在此挂载只需要去Jqery文件目录下的App文件进行修改就OK
* */
// import App from "./components/JQuery🎆/index.vue";
// createApp(App).mount("#app");

/*
*  使用Mockjs函数库区模拟生成JSON格式数据
* */
// import App from "./components/Mockjs🎇/index"
// createApp(App).mount("#app")

/**
 * 在vue3中使用地图组件:高德地图(1)
 */
import App from "./components/AMap/Index"
createApp(App).mount("#app")

/**
 * 在vue3中使用地图组件:谷歌地图(2)
 */
// import App from "./components/GoogleMap/Index"
// createApp(App).mount("#app")

