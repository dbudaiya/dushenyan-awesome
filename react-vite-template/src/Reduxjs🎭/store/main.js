const redux  = require("redux")

const reducer  = require("./reducer.js")

const store = redux.createStore(reducer);

module.exports = store
