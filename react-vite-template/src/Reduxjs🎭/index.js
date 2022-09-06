const store = require("./store/main");
// 业务代码
const { sumAction, addAction, change } = require("./store/actionCreated.js");

store.subscribe(() => {
  console.log("num", store.getState());
});

store.dispatch(sumAction(10));
store.dispatch(sumAction(20));
store.dispatch(addAction(10));
store.dispatch(change("李知恩"));
