const { ADD_NUMBER, SUM_NUMBER, CHANGE } = require("./constants.js");
// 纯对象写法
// const addAction = {
//   type:"ADD_NUMBER",
// }

// function addNumber(num){
//     return {
//         type:'Add_Number',
//         num
//     }
// }
//
// 箭头函数,等同于上方写法
const addAction = (num) => ({
  type: ADD_NUMBER,
  num,
});
const sumAction = (num) => ({
  type: SUM_NUMBER,
  num,
});
const change = (value) => ({
  type: CHANGE,
  value,
});

module.exports = {
  addAction,
  sumAction,
  change
};
