<template>
  <div>
    <h1>主页面模板</h1>
  </div>
</template>

<script>
import axios from "axios";
export default {
  mounted: function () {
    axios({
      url: "/user/userinfo",
      method: "get",
    }).then((res) => {
      console.log(res);
    });
  },
};
</script>
