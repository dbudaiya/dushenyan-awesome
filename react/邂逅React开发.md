## 邂逅React开发

快捷方式:

react官网:https://react.docschina.org/
babel官网:https://www.babeljs.cn/
微信公众号好文(coderwhy老师):https://mp.weixin.qq.com/mp/appmsgalbum?action=getalbum&__biz=Mzg5MDAzNzkwNA==&scene=23&album_id=1566025152667107329&count=3#wechat_redirect

学习课程具备的基础:

- HTMl,CSS,JS(ES6以上)

### React是什么

> 接触过React的人都对他有一些印象

==用于构建用户界面的JavaScript库==

对于WEB前端来说,重要任务是构建用户界面,构建用户界面离不开三个技术:

- HTML:构建页面的结构
- CSS:构建页面的样式
- Javascript:页面动态内容和交互

### 创建脚手架方式

> npm install -g create-react-app

创建React项目

> create-react-app learns

启动项目

> npm start

### yarn命令和npm命令的使用

![13](img/md_image/13.png)

主要依赖:

1. react:包含react必要的核心代码
2. react-dom:react渲染在不同平台所需要的核心代码
3. babel:将jsx转换为react代码的工具.babel是个啥,具体在本节中有PPT介绍.....

```html
  <!-- 添加React依赖 -->
  <script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>
  <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
```

![11](img/md_image/11.png)

### 常见的JavaScript库

> 一直以来前端开发人员都在需求可以让自己开发更方便的JavaScript库

- 在以前很久时间内,JQuery是被使用最多的JavaScript库
- 一份调查中,全球前10000个访问最高的网站,有65%使用JQuery,当时最受欢迎的JavaScript库
- 慢慢越来越多的公司不再使用JQuery,包括程序员使用最多的Github



### 目前前端领域最为流行的三大框架:

- React
- Vue
- Angular



### React的起源

![](./img/md_image/0%60KEG%5B0Y~_RWK2%609HYI%7D7%7DT.png)



### React的声明式编程

声明式编程:

- 声明式编程是目前整个大前端开发的模式:Vue,React,Flutter,SwiftUI
- 允许我们只需要维护自己的状态,当状态改变时,React根据最新的状态去渲染我们的UI界面

![](./img/md_image/TGF%7D5G_70NJRBMY_ZRCVK~K.png)





### React特点

> 详细了解参考PPT

- 组件化
- 多平台适配
- 掌握先进的思想和技术
- 在国内被广泛应用



## React

JS原生开发

```html
<body>
  <h2 class="title"></h2>
  <button class="btn">改变文本</button>
  <script>
    //命令式编程:每做一个操作,都是给计算机(浏览器)一道道命令
    //声明式编程:
    //1.定义变量
    let message = "Hello World!!!"

    //2.将数据赋值给h2
    const titleEl = document.getElementsByClassName("title")[0];
    titleEl.innerHTML = message;

    //3.点击按钮,界面的数据发生改变
    const btnEl = document.getElementsByClassName("btn")[0]
    btnEl.addEventListener("click", e => {
      message = "Hello React!!!"
      titleEl.innerHTML = message
    })

  </script>
</body>
```

Hello React案例

```react
<body>
  <div id="app"></div>
  <!-- 开始开发 -->
  <!-- 注意事宜:使用JSX,并且希望script中的jsx代码被解析,必须在script1中添加属性 -->
  <!-- JSX特点:多个标签最外层(根)只能有一个标签 -->
  <script type="text/babel">
    let message = "Hello World!!!"
    function btnclick() {
      message = "hello React!!!"
      render();
    }

    function render() {
      ReactDOM.render(
        <div>
          <h2>{message}</h2>
          <button onClick={btnclick}>改变文本</button>
        </div>,
        document.getElementById("app")
      )
    }
    render()
  </script>
      <!-- 添加React依赖 -->
  <script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>
  <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
</body>
```



#### React电影列表展示

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script
      src="https://unpkg.com/react@16/umd/react.development.js"
      crossorigin
    ></script>
    <script
      src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"
      crossorigin
    ></script>
    <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
  </head>
  <body>
    <div id="app"></div>

    <script type="text/babel">
      class App extends React.Component {
        constructor() {
          super();
          this.state = {
            movies: ["ลลิษา มโนบาล", "Lalisa Manoban", "라리사 마노반"],
          };
        }

        render() {
          // 常见遍历方法
          let newArray = [];
          for (let movie of this.state.movies) {
            newArray.push(<li>{movie}</li>);
          }

          return (
            <header>
              <h2>lisa女团</h2>
              <ul>
                <li>{this.state.movies[0]}</li>

                {newArray}
              </ul>
            </header>
          );
        }
      }

      ReactDOM.render(<App />, document.getElementById("app"));
    </script>
  </body>
</html>

```



## JSX语法展示

1. ### 基本语法

   ````html
   <!DOCTYPE html>
   <html lang="en">
     <head>
       <meta charset="UTF-8" />
       <meta http-equiv="X-UA-Compatible" content="IE=edge" />
       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       <title>Document</title>
       <script
         src="https://unpkg.com/react@16/umd/react.development.js"
         crossorigin
       ></script>
       <script
         src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"
         crossorigin
       ></script>
       <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
     </head>
     <body>
       <div id="app"></div>
   
       <script type="text/babel">
         class App extends React.Component {
           constructor() {
             super();
             this.state = {
               // 1.在{}中能够正常显示
               num: 18,
               arr: ["ลลิษา มโนบาล", "Lalisa Manoban", "라리사 마노반"],
               str: "不带书",
   
               // 2.不能在{}中正常显示
               nl: null,
               udf: undefined,
               bool: true,
   
               // 3.对象不能作为JSX的子类
               obj :{
                 name:'李智恩',
                 age:28
               }
             };
           }
   
           render() {
             // 解析赋值
             let { num, str, arr, nl, udf, bool,obj } = this.state;
   
             return (
               <div>
                 <h4>能正常显示的数据类型:</h4>
                 <p>number类型数据:{num}</p>
                 <p>字符串类型数据:{str}</p>
                 <p>数组类型数据:{arr}</p>
                 <hr />
   
                 <h4>不能正常显示的数据类型:</h4>
                 <p>null类型:{nl}</p>
                 <p>undefined类型:{udf}</p>m
   
                 {/*更多用作判断显示*/}
                 <p>bool类型:{bool}</p>
                 <p>{bool ? "true值将显示小布袋" : null}</p>
   
                 {/*<p>{obj}</p>  会报错 */}  
               </div>
             );
           }
         }
   
         ReactDOM.render(<App />, document.getElementById("app"));
       </script>
     </body>
   </html>
   
   ````

   ![12](img/md_image/12.png)

2. ### 表达式嵌入

   ```html
   <!DOCTYPE html>
   <html lang="en">
     <head>
       <meta charset="UTF-8" />
       <meta http-equiv="X-UA-Compatible" content="IE=edge" />
       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       <title>Document</title>
       <script
         src="https://unpkg.com/react@16/umd/react.development.js"
         crossorigin
       ></script>
       <script
         src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"
         crossorigin
       ></script>
       <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
     </head>
     <body>
       <div id="app"></div>
   
       <script type="text/babel">
         class App extends React.Component {
           constructor() {
             super();
             this.state = {
               firstName: "Kebo",
               lastName: " Chen",
               flag:true
             };
           }
   
           render() {
             const { lastName, firstName ,flag} = this.state;
             return (
               <div>
                 <h2> 1.运算符表达式</h2>
                 <p>{firstName + lastName}</p>
                 <p>{20 * 5}</p>
   
                 <h2> 2.三元表达式</h2>
                 <p>{flag ? "显示内容" : null}</p>
   
                 <h2> 3.函数调用</h2>
                 <p>{this.getName()}</p>
               </div>
             );
           }
   
           getName() {
             return this.state.firstName + this.state.lastName;
           }
         }
   
         ReactDOM.render(<App />, document.getElementById("app"));
       </script>
     </body>
   </html>
   ```

   

React组件化开发 

> 关于this指向问题,是在前端中常见的问题,更多细节解读可以访问this指南
>
> http://mp.weixin.qq.com/s?__biz=Mzg5MDAzNzkwNA==&mid=2247483847&idx=1&sn=fe8089ded81098b35461d3c14bb85cde&chksm=cfe3f238f8947b2e734221c5131e3a6bc42f2dae66b9640cc0f038e9dffef45dd4a52d8dd930&mpshare=1&scene=23&srcid=0311Sfk2ddibt1BrLIh1LJvs&sharer_sharetime=1615468388516&sharer_shareid=eca703546e08fab5e514fa5d6b457384#rd

```react
<body>
    <div id="app"></div>

    <script type="text/babel">
      // 1.封装App组件
      class App extends React.Component {
        // 1.1construct 英语解释:
        constructor() {
          super();
          // 1.2 定义变量
          //this.message = "Hello World!!!"
          this.state = {
            message: "Hello World!!!",
          };
        }

        // 1.3这里的this是渲染后的this执行取值,使用this.btnclick会出现错误
        render() {
          return (
            <div>
              <h2>{this.state.message}</h2>
              <button onClick={this.btnclick.bind(this)}>改变文本</button>
            </div>
          );
        }

        btnclick() {
          this.setState({
            message: "Hello React!!!",
          });
        }
      }

      // 2.渲染组件
      ReactDOM.render(<App />, document.getElementById("app"));
    </script>
  </body>
```



### React组件化开发

说下什么是组件话开发,在学过Vue中的组件化,模块化开发,自然也就能很好的理解这块知识,详细可见PPT和组件化开发(一)![111](img/md_image/111.png)

类组件

> 写下作用

```react
import React, { Component } from 'react';

export default class App extends Component {
  render() {
    return (
      <div>
        <span>我是App组件</span>
        {/* alt + shift + f: 对代码进行格式化 */}
        <h2>{this.state.message}</h2>
      </div>
    )
  }
}
```



函数式组件：

>  * 函数式组件的特点:
>      *  1.没有this对象
>      * 2.没有内部的状态

```react
import React, { Component } from 'react';

export default function App() {
  return (
    <div>
      <span>我是function的组件: App组件</span>
      <h2>counter</h2>
      <button>+1</button>
      <h2>你好啊,王小波</h2>
    </div>
  )
}
```



### Render返回值

#### 创建React组件模板

> rcc = react class component

![](./img/md_image/a.png)

```react
import React, { Component } from 'react'

export default class App extends Component {
  render() {
    return (
      [
        <div>Hello World</div>,
        <div>Hello React</div>
      ]
    )
  }
}
```

```react
import React, { Component } from 'react'

export default class App extends Component {
  render() {
    return "aaaa"
  }
}

```



#### React的生命周期

![](./img/md_image/%E6%8D%95%E8%8E%B7.PNG)

![14](img/md_image/14.png)

### 生命周期第一阶段

```react
import React, { Component } from 'react'

export default class App extends Component {
  constructor() {
    super()

    this.state = {
      message: "我是文本"
    }
    console.log("执行了constructor方法");
  }
  render() {

    console.log("执行了render方法");
    return (
      <div>
        <h2>
          学习组件的生命周期函数
        </h2>
      </div>
    )
  }

  componentDidMount() {
    console.log("我执行了componentDIdMount方法");
  }
}
```

![](./img/md_image/1.PNG)



### componentDidupdate函数

```react
import React, { Component } from 'react'

export default class App extends Component {
  constructor() {
    super()

    this.state = {
      message: "我是文本"
    }
    console.log("执行了constructor方法");
  }
  render() {

    console.log("执行了render方法");
    return (
      <div>
        <h2>
          学习组件的生命周期函数
        </h2>

        <p>{this.state.message}</p>
        <button onClick={e => this.changeText()}>切换文本</button>
      </div>
    )
  }

  changeText() {
    this.setState({
      message: '我是改变后的文本'
    })
  }

  componentDidMount() {
    console.log("我执行了componentDIdMount方法");
  }
  componentDidUpdate() {
    console.log("我只想了conponentDidupdate方法");
  }
}
```

![](./img/md_image/2.PNG)



### 末阶段

### componentWillUnmount(销毁)

```react
import React, { Component } from 'react'

//组件案例
class Cpn extends Component {
  render() {
    return <h2>我是Cpn组件</h2>
  }

  //销毁
  componentWillUnmount() {
    console.log("调用了Cpn的componentWillUnmount方法");
  }
}

export default class App extends Component {
  constructor() {
    super()

    this.state = {
      message: "我是文本",
      isTrue: true
    }
    console.log("执行了constructor方法");
  }
  render() {

    console.log("执行了render方法");
    return (
      <div>
        <h2>
          学习组件的生命周期函数
        </h2>
				/*数据更新*/
        <p>{this.state.message}</p>
        <button onClick={e => this.changeText()}>切换文本</button>
        <hr />
        <button onClick={e => this.changeCpnShow()}>切换</button>
        {this.state.isTrue && <Cpn />}
      </div>
    )
  }

  changeText() {
    this.setState({
      message: '我是改变后的文本'
    })
  }

  changeCpnShow() {
    this.setState({
      isTrue: !this.state.isTrue
    })
  }

  componentDidMount() {
    console.log("我执行了componentDIdMount方法");
  }
  componentDidUpdate() {
    console.log("我只想了conponentDidupdate方法");
  }
}
```

>  PPT中介绍了在什么情况下使用什么生命周期方法



### React组件的嵌套

```react
import React, { Component } from 'react'

function Header() {
  return <h2>我是header</h2>
}

function Productlist() {
  return (
    <ul>
      <li>商品列表1</li>
      <li>商品列表2</li>
      <li>商品列表3</li>
      <li>商品列表4</li>
      <li>商品列表5</li>
    </ul>
  )
}

function Banner() {
  return (
    <div>
      <h2>woshibanerzujian</h2>
      <Productlist />
    </div>
  )
}

function Footer() {
  return <h2>woshiFooterzujian</h2>
}

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Banner />
        <Footer />
      </div>
    )
  }
}
```



### React中父子通信--类组件(props)

props解释:





![](./img/md_image/3.PNG)

```react
import React, { Component } from 'react'

class ChildCpn extends Component {
  // constructor(props) {
  //   super();
  //   this.state = {}
  //   this.props = props
  // }

  render() {
    const { name, age } = this.props
    return (
      <div>
        <h2>子组件展示数据:{name + "" + age}</h2>
      </div>
    )
  }
}

export default class App extends Component {

  render() {
    return (
      <div>
        <ChildCpn name="budai" age="18" />
      </div>
    )
  }
}
```



### 函数式组件(props)

```react
import React, { Component } from 'react'

function ChildCpn(props) {
  // 没有this的使用
  const { name, age } = props
  return (
    <h2>子组件展示数据:{name + "" + age}</h2>
  )
}

export default class App extends Component {
  render() {
    return (
      <div>
        <ChildCpn name="budai" age="18" />
      </div>
    )
  }
}
```



### React属性验证

```react
import React, { Component } from 'react';

import PropTypes from 'prop-types';

function ChildCpn(props) {
  const { name, age, height } = props;
  console.log(name, age, height);
  const { names } = props;

  return (
    <div>
      <h2>{name + age + height}</h2>
      <ul>
        {
          names.map((item, index) => {
            return <li>{item}</li>
          })
        }
      </ul>
    </div>
  )
}

class ChildCpn2 extends Component {
  // es6中的class fields写法
  static propTypes = {}

  static defaultProps = {}
}

ChildCpn.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number,
  height: PropTypes.number,
  names: PropTypes.array
}

ChildCpn.defaultProps = {
  name: "why",
  age: 30,
  height: 1.98,
  names: ["aaa", "bbb"]
}

export default class App extends Component {
  render() {
    return (
      <div>
        <ChildCpn name="why" age={18} height={1.88} names={["abc", "cba"]}/>
        <ChildCpn name="kobe" age={40} height={1.98} names={["nba", "mba"]}/>
        <ChildCpn/>
      </div>
    )
  }
}
```



### 子传父通信-函数调用

![](./img/md_image/5.PNG)

```react
import React, { Component } from 'react'

class Counterbutton extends Component {
  render() {
    const { dianji, name } = this.props;

    return (
      <div>
        <h2>{name}</h2>
        <button onClick={dianji}>dainjian</button>
      </div>
    )
  }
}

export default class App extends Component {
  constructor() {
    super()

    this.state = {
      counter: 0
    }
  }

  render() {
    return (
      <div>
        <h2>当前计数:{this.state.counter}</h2>
        <button onClick={e => this.innerment()}>jia1</button>

        <Counterbutton dianji={this.innerment.bind(this)} name="why" />
      </div>
    )
  }

  innerment() {
    this.setState({
      counter: this.state.counter + 1
    })
  }
}
```



三种改变this指向的方法

(一)

```react
import React, { Component } from 'react'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      message: "我是文本"
    }
  }
  render() {
    return (
      <div>
        <p>{this.state.message}</p>
        <button onClick={this.changeText()}>切换文本</button>
      </div>
    )
  }

  changeText= ()=> {
    this.setState({
      message: '我是改变后的文本'
    })
  }
}
```

(二)

```react
import React, { Component } from 'react'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      message: "我是文本"
    }
  }
  render() {
    return (
      <div>
        <p>{this.state.message}</p>
        <button onClick={e => this.changeText()}>切换文本</button>
      </div>
    )
  }

  changeText() {
    this.setState({
      message: '我是改变后的文本'
    })
  }
}
```

(三)

```react
import React, { Component } from 'react'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      message: "我是文本"
    }
  }
  render() {
    return (
      <div>
        <p>{this.state.message}</p>
        <button onClick={e => this.changeText()}>切换文本</button>
      </div>
    )
  }

  changeText() {
    this.setState({
      message: '我是改变后的文本'
    })
  }
}
```





### React实现Slot

> 一般情况下有两种方法

(一)

```react

```



(二)

```react

```





### 跨组件通信









### setState的使用

- 为什么使用setState?

  > 

```react
import React, { Component } from 'react'

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0
    }
  }
  render() {
    return (
      <div>
        <p>当前计数:{this.state.counter}</p>
        <button onClick={e => this.click()}>点击按钮</button>
      </div>
    )
  }

  click() {
    // 不能使用该种方法的原型
    this.state.counter += 1

    // this.setState({
    //   counter: this.state.counter + 1
    // })
  }
}
```



- setState是异步更新

  > 

```react
import React, { Component } from 'react'

// function Home(props) {
//   return <h1>{props.message}</h1>
// }

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: 'Hello World'
    }
  }
  render() {
    return (
      <div>
        <p>当前计数:{this.state.message}</p>
        <button onClick={e => this.click()}>点击按钮</button>
        {/* <Home message={this.state.message}></Home> */}
      </div>
    )
  }

  click() {
    this.setState({
      message: "Hello React!!!"
    })
    //打印输出Hello world
    console.log(this.state.message);
  }
}
```

获取setState异步更新数据的几种方法

(一)回调函数

```js
click() {
    // 方式一: 获取异步更新后的数据
    // setState(更新的state, 回调函数)
    this.setState({
      message: "Hello React!!!"
    }, () => {
      console.log(this.state.message);
    })
  }
```

(二)生命周期

```js
componentDidUpdate() {
    // 方式二: 获取异步更新的state
    console.log(this.state.message);
  }
```



### setState改为同步更新的几种方法

(一)将setState放入到定时器中

```react
import React, { Component } from 'react'


export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      message: 'HelloWorld!!!'
    }
  }
  render() {
    return (
      <div>
        <h2>文本:{this.state.message}</h2>
        <button onClick={this.onclick.bind(this)}>点击切换</button>
      </div>
    )
  }

  onclick() {
    setTimeout(() => {
      this.setState({
        message: 'HelloReact!!!'
      })
      console.log(this.state.message)
    }, 0)
  }
}
```

(二)componentDidMount函数

```react
import React, { Component } from 'react'

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      message: 'HelloWorld!!!'
    }
  }
  render() {
    return (
      <div>
        <h2>文本:{this.state.message}</h2>
        <button id="btn">生命周期(setState同步更新)</button>
      </div>
    )
  }

  componentDidMount() {
    document.getElementById("btn").addEventListener("click", e => {
      this.setState({
        message: 'HelloReact!!!'
      })
      console.log(this.state.message)
    })
  }
}

```

