// 在HelloWorld中进行axios数据请求
const path = require("path");
const fs = require("fs");
const json5 = require("json5");
const Mock = require("mockjs");

// 读取JSON5文件
function getInfoFile(filename) {
  return json5.parse(
    fs.readFileSync(path.resolve(__dirname, filename), "utf-8")
  );
}

// 返回衣蛾函数  ？？？
module.exports = function(app) {
  // 监听http请求
  app.get("/user/userinfo", function(req, res) {
    // 每次响应请求时读取mock data的文件
    //getInfoFile方法定义如何读取json5文件并且解析程数据对象
    var json = getInfoFile("./userinfo.json5");
    //将json传入Mock.mock方法中,生成数据返回给浏览器
    res.json(Mock.mock(json));
  });
};

// 在组件helloWorld中返回数据
