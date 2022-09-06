const Mock = require("mockjs");
const path = require("path");
const fs = require("fs");

// 1.基本使用
// const data =  Mock.mock("@id")
const data = Mock.mock({
  id: "@id",
  name: "@cname",
  date: "@date",
  email: "@email()",
  img: "@image()",
//   description: "@paragraph()",
});

console.log(data);
// JSON格式使用
