const path = require("path");
const fs = require("fs");
const json5 = require("json5");

// 读取JSON5文件
function getInfoFile(filename) {
  return json5.parse(
    fs.readFileSync(path.resolve(__dirname, filename), "utf-8")
  );
}

console.log(getInfoFile("./userinfo.json5"));
