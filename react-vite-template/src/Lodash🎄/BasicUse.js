// https://www.lodashjs.com/docs/lodash.chunk    Lodash 是一个一致性、模块化、高性能的 JavaScript 实用工具库。

// import _ from "lodash";
// console.log(_.chunk(["a", "b", "c", "d"], 2));

// 下面写法等同于上方,注后面的导入方式不同
import chunk from "lodash/chunk";
console.log(chunk(["a", "b", "c", "d"], 2));

import join from "lodash/join";
console.log(join(["a", "b", "c", "d"], "~"));

// 对象方法
import forInRight from 'lodash/forInRight'
function Foo(){
    this.a = 1;
    this.b = 2;
}

Foo.prototype.c = 3;

console.log(forInRight(new Foo(),function(value,key){
    console.log(value,key)
}));
