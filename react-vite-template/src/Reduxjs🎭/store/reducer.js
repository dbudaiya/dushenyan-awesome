const { ADD_NUMBER, SUM_NUMBER, CHANGE } = require("./constants.js");

const defaultState = {
  counter: 0,
  message: "杜审言",
};

function reducer(state = defaultState, active) {
  switch (active.type) {
    case ADD_NUMBER:
      return { ...state, counter: state.counter + 1 };
    case SUM_NUMBER:
      return { ...state, counter: state.counter + active.num };
    case CHANGE:
      return { ...state, message: active.value };
    default:
      return state;
  }
}

module.exports = reducer;
