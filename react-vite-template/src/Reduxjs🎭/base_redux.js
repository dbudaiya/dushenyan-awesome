// Redux基本使用
// // 1.导入Redux(不要通过ES6导入)
const {createStore } = require("redux")
const initialState = {
  counter: 0,
};

// reducer是一个纯函数,构建store和action之间的联系
function reducer(state = initialState, action) {
  switch (action.type) {
    case "INCRENT":
      return { ...state, counter: state.counter + 1 };
    case "ADD_NUMBER":
      return { ...state, counter: state.counter + action.num };
    default:
      return state;
  }
}

const store = createStore(reducer);

// 订阅修改
store.subscribe(() => {
  console.log("counter", store.getState().counter);
});

// 派发active对象
store.dispatch({ type: "INCRENT" });
store.dispatch({ type: "ADD_NUMBER", num: 5 });

// const initstate = {
//   message: "李知恩",
//   todos: [
//     {
//       text: "Eat food",
//       completed: true,
//     },
//     {
//       text: "Exercise",
//       completed: false,
//     },
//   ],
//   visibilityFilter: "SHOW_COMPLETED",
// };

// const ADD_Action = () => {
//   return { type: "ADD_TODO", text: "Go to swimming pool" };
// };
// const TOGGLE_Action = () => {
//   return { type: "TOGGLE_TODO", index: 1 };
// };

// const SET_Action = () => {
//   return {
//     type: "SET_VISIBILITY_FILTER",
//     filter: "SHOW_ALL",
//   };
// };

// function visibilityFilter(state = "SHOW_ALL", action) {
//   switch (action.type) {
//     case "SET_VISIBILITY_FILTER":
//       return action.filter;
//     default:
//       return state;
//   }
// }

// function todos(state = [], action) {
//   switch (action.type) {
//     case "ADD_TODO":
//       return [
//         ...state,
//         {
//           text: action.text,
//           completed: false,
//         },
//       ];
//     case "COMPLETE_TODO":
//       return state.map((todo, index) => {
//         if (index === action.index) {
//           return Object.assign({}, todo, {
//             completed: true,
//           });
//         }
//         return todo;
//       });
//     default:
//       return state;
//   }
// }

// import { combineReducers, createStore } from "redux";
// let reducer = combineReducers({ visibilityFilter, todos });
// let store = createStore(reducer);
