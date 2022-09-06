1. ## Redux新篇章

   > 学习更多Redux的知识还是查看官方文档不较好,看的多,在上手去试试
   >
   > 前提是你得把Coderwhy课程的知识结构理清楚,

   直接上代码

   ```js
   //base_redux.js
   // 基础使用
   // 1.导入Redux(不要通过ES6导入)
   const redux = require("redux");
   
   const initialState = {
     counter: 0,
   };
   
   // reducer是一个纯函数
   function reducer(state = initialState, action) {
     switch (action.type) {
       case "INCRENT":
         return { ...state, counter: state.counter + 1 };
       case "ADDCRENT":
         return { ...state, counter: state.counter - 1 };
       case "ADD_NUMBER":
         return { ...state, counter: state.counter + action.num };
       case "SUB_NUMBER":
         return { ...state, counter: state.counter - action.num };
       default:
         return state;
     }
   }
   const store = redux.createStore(reducer);
   
   // 订阅修改
   store.subscribe(() => {
     // console.log("yidingyue");
     console.log("counter", store.getState().counter);
   });
   
   // active
   const active1 = { type: "INCRENT" };
   const active2 = { type: "DECRENT" };
   const active3 = { type: "ADD_NUMBER", num: 5 };
   const active4 = { type: "SUB_NUMBER", num: 6 };
   
   // store
   
   // 派发axtive
   store.dispatch(active1);
   store.dispatch(active2);
   store.dispatch(active3);
   store.dispatch(active4);
   ```

   

   文件抽离使用

   1. constants.js

   ```js
   export const ADD_NUMBER = "ADD_NUMBER";
   export const SUM_NUMBER = "SUM_NUMBER";
   ```

   2. actionCreate.js

   ```js
   import { ADD_NUMBER, SUM_NUMBER } from "./constants.js";
   // 之前还是这么写的,纯对象
   // const addAction = {
   //   type:"ADD_NUMBER",
   // }
   
   // function addNumber(num){
   //     return {
   //         type:'Add_Number',
   //         num
   //     }
   // }  
   // 箭头函数
   // export const addNumber = (num) => {
   //   return {
   //     type: "Add_Number",
   //     num,
   //   };
   // };
   // 等同于上方
   export const addAction = (num) => ({
     type: ADD_NUMBER,
     num,
   });
   export const sumAction = (num) => ({
     type: SUM_NUMBER,
     num,
   });
   ```

   

   3.reducer.js

   ```js
   import { ADD_NUMBER, SUM_NUMBER } from "./constants.js";
   const defaultState = {
     counter: 0,
   };
   
   function reducer(state = defaultState, active) {
     switch (active.type) {
       case ADD_NUMBER:
         return { ...state, counter: state.counter + 1 };
       case SUM_NUMBER:
         return { ...state, counter: state.counter + active.num };
   
       default:
         return state;
     }
   }
   export default reducer;
   ```

   4.index.js

   ```js
   import redux from "redux";
   import reducer from "./reducer.js";
   const store = redux.createStore(reducer);
   
   export default store;
   ```

   5.index.js

   ```js
   import store from "./store/index.js";
   // 业务代码
   import { sumAction, addAction } from "./store/actionCreated.js";
   
   store.subscribe(() => {
     console.log("num", store.getState());
   });
   
   store.dispatch(sumAction(10));
   store.dispatch(sumAction(20));
   store.dispatch(addAction(10));
   ```

   

