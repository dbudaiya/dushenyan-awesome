import * as $ from "jquery";
import MOCK from "mockjs";

// 数据拦截url请求:mock方法的本质特点
MOCK.mock("user/userinfo", "get", {
  id: "@id",
  name: "@cname",
  date: "@date",
  email: "@email()",
  img: "@image()",
  description: "@paragraph()",
});

$.ajax({
  url: "/user/userinfo",
  dataType: "json",
  success: (data) => {
    console.log(data);
  },
});

// 在main.js中引入使用了,数据请求成功