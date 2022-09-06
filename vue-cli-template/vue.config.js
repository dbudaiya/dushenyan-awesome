const webpack = require("webpack");
module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        //全局挂载JQuery
        $: "jquery",
        jQuery: "jquery",
      }),
    ],
    externals: {
      'AMap': 'AMap'
    }
  },
  pages: {
    index: {
      // page 的入口
      entry: "./src/main.js",
    },
  },
  devServer: {
    before: require("./src/components/Mockjs🎇/03-结合vue使用/mian"),
    //上诉地址将会返回一个方法
  },
};
