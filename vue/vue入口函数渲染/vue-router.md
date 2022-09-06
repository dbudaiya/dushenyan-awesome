## 写在前面

先来看一个最基本的路由例子，后续分析时会渐进地分析该例子并假如更多地功能：

```js
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const Foo = { template: `<h1>Foo</h1>` };
const Bar = { template: `<h1>Bar</h1>` };
const A = { template: `<h1>A</h1>` };
const B = { template: `<h1>B</h1>` };

const routes = [{
  path: '/foo',
  name: 'Foo',
  component: Foo,
}, {
  path: '/bar',
  name: 'Bar',
  component: Bar,
}, {
  path: '/a',
  name: 'A',
  component: A,
  children: [
    {
      path: '/b',
      name: 'B',
      component: B,
    }   
  ]
}];

const router = new VueRouter({
  routes,
});

new Vue({
  data: {},
  router,
}).$mount('#app');
```

------



## 路由注册

路由注册的第一步是为 Vue 构造函数安装一个 `VueRouter` 插件：

```js
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
```

### Vue.use

首先在 Vue 下定义了一个 `_installedPlugins` 数组，用于存储所有安装的插件，如果插件以及存在该数组中，则直接返回。然后从第 1 位开始将 `arguments` 转为一个真实数组，并向数组头部插入当前 Vue，此时再读取插件的 `install` 方法或插件本身，调用插件将 `args` 传入，这样就保证了插件的 `install` 方法的第一个参数永远是 Vue 构造函数，这样就不用额外的去 `import Vue` 了，最后将插件存储：

```js
export function initUse (Vue: GlobalAPI) {
  Vue.use = function (plugin: Function | Object) {
    const installedPlugins = (this._installedPlugins || (this._installedPlugins = []))
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    // 从下标第 1 位开始生成一个数组
    const args = toArray(arguments, 1)
    args.unshift(this)
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args)
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args)
    }
    installedPlugins.push(plugin)
    return this
  }
}
```

### 路由安装

 Vue Router 的源码 `src` 目录下，从 `index.js` 下可以看到 `VueRouter` 是一个类，里面定义了一个 `install` 方法：

```js
VueRouter.install = install

export function install (Vue) {
    debugger
    if (install.installed && _Vue === Vue) return
    install.installed = true

    _Vue = Vue

    const isDef = v => v !== undefined

    const registerInstance = (vm, callVal) => {
        let i = vm.$options._parentVnode
        if (isDef(i) && isDef(i = i.data) && isDef(i = i.registerRouteInstance)) {
            i(vm, callVal)
        }
    }

    Vue.mixin({
        beforeCreate () {
            debugger
            if (isDef(this.$options.router)) {
                // this.$options.router = new Vue 传入的 VueRouter 实例
                this._routerRoot = this
                // _router 存储
                this._router = this.$options.router
                this._router.init(this)
                // 将 _route 变成响应式，表示当前所在的路由对象
                Vue.util.defineReactive(this, '_route', this._router.history.current)
            } else {
                this._routerRoot = (this.$parent && this.$parent._routerRoot) || this
            }
            registerInstance(this, this)
        },
        destroyed () {
            registerInstance(this)
        }
    })

    // 向 Vue 的原型上添加 $router 和 $route
    // 也就是平时写代码时访问的 this.$router/$route，它其实是通过原型链查找的
    Object.defineProperty(Vue.prototype, '$router', {
        get () { return this._routerRoot._router }
    })

    Object.defineProperty(Vue.prototype, '$route', {
        get () { return this._routerRoot._route }
    })

    // 注册 <router-view>、<router-link> 两个路由组件
    Vue.component('RouterView', View)
    Vue.component('RouterLink', Link)

    // 定义路由钩子函数的合并策略，使用普通钩子函数相同的策略
    const strats = Vue.config.optionMergeStrategies
    // use the same hook merging strategy for route hooks
    strats.beforeRouteEnter = strats.beforeRouteLeave = strats.beforeRouteUpdate = strats.created
}
```

`install` 方法首先提供了 `installed` 和 `_Vue` 属性作为标志位，防止执行多次 `install` 。`_Vue` 时存储 Vue 的根构造函数，因为作为 Vue 的插件它有很多地方是依赖到 Vue 的，这样做可以避免单独去 `import Vue` 导致增加包体积。中间的有主要三个步骤：

1、`Vue.mixin` 混入 `beforeCreate ` 和 `destroyed` 生命周期函数。`Vue.mixin` 在 Vue 的 `initGlobalAPI` 中定义，内部调用了 `mergeOptions` 合并配置，混入的生命周期会存在于 Vue 的默认 `options` 中，当组件定义实例的时候，会继承 Vue 的默认 `options`，所以每个组件都会混入这两个生命周期：

```js
export function initMixin (Vue: GlobalAPI) {
  Vue.mixin = function (mixin: Object) {
    this.options = mergeOptions(this.options, mixin)
    return this
  }
}
```

回到 `install` 方法，当 Vue 执行到 `beforeCreate` 生命周期时，会将当前实例存储到 `this._routerRoot` 下，由于组件是一个树的结构，所以每个组件的 `_routerRoot` 都是组件自身实例。然后对 `_router` 进行存储，调用 `_router.init` 方法，最后将 `_route` 变成响应式对象：

```js
Vue.mixin({
    beforeCreate () {
        debugger
        if (isDef(this.$options.router)) {
            // this.$options.router = new Vue 传入的 VueRouter 实例
            this._routerRoot = this
            // _router 存储
            this._router = this.$options.router
            this._router.init(this)
            // 将 _route 变成响应式，表示当前所在的路由对象
            Vue.util.defineReactive(this, '_route', this._router.history.current)
        } else {
            this._routerRoot = (this.$parent && this.$parent._routerRoot) || this
        }
        registerInstance(this, this)
    },
    destroyed () {
        registerInstance(this)
    }
})
```

2、 `$router` 与 `$route` 的访问进行代理。向 Vue 的原型上添加 $router 和 $route，也就是平时写代码时访问的 this.$router/$route，它其实是通过原型链查找的：

```js
Object.defineProperty(Vue.prototype, '$router', {
    get () { return this._routerRoot._router }
})

Object.defineProperty(Vue.prototype, '$route', {
    get () { return this._routerRoot._route }
})
```

3、注册路由组件：

```js
  // 注册 <router-view>、<router-link> 两个路由组件
  Vue.component('RouterView', View)
  Vue.component('RouterLink', Link)
```

最后，它将 Vue 生命周期函数的合并策略应用到 `beforeRouteEnter`、`beforeRouteLeave`、`beforeRouteUpdate` 钩子函数，提供 Vue 初始化合并配置时使用：

```js
// 定义路由钩子函数的合并策略，使用普通钩子函数相同的策略
const strats = Vue.config.optionMergeStrategies
// use the same hook merging strategy for route hooks
strats.beforeRouteEnter = strats.beforeRouteLeave = strats.beforeRouteUpdate = strats.created
```

------



## VueRouter

`VueRouter` 是一个类，通常在 Vue 项目整合路由时调用一次。对应到例子中，就是：

```js
const router = new VueRouter({
  routes,
});
```

在 `new` 调用时，会执行 `VueRouter` 的构造函数。首先它初始化了类中的一些变量，路由的 `mode` 默认采用 `hash` 路由，然后根据 `mode` 生成一个 `history` 对象， `history` 对象分为三类，都继承与 `History` 基类，最后将其存到 `this.history` 中：

```js
constructor (options: RouterOptions = {}) {
    this.app = null  // Vue 根实例
    this.apps = []  // $options 中带有 router 实例的 Vue 实例（通常只有根实例）
    this.options = options  // 用户传入的 options
    // 一些钩子函数
    this.beforeHooks = []
    this.resolveHooks = []
    this.afterHooks = []
    // 路由匹配器
    this.matcher = createMatcher(options.routes || [], this)

    // 默认为 hash 路由
    let mode = options.mode || 'hash'
    this.fallback =
      mode === 'history' && !supportsPushState && options.fallback !== false
    if (this.fallback) {
      mode = 'hash'
    }
    if (!inBrowser) {
      mode = 'abstract'
    }
    this.mode = mode

    switch (mode) {
      case 'history':
        this.history = new HTML5History(this, options.base)
        break
      case 'hash':
        this.history = new HashHistory(this, options.base, this.fallback)
        break
      case 'abstract':
        this.history = new AbstractHistory(this, options.base)
        break
      default:
        if (process.env.NODE_ENV !== 'production') {
          assert(false, `invalid mode: ${mode}`)
        }
    }
  }
```

回到 `install` 方法中，它向每个 Vue 实例混入了两个生命周期函数。其中 `beforeCreate` 生命周期会在实例 `$options` 带有 `router` 的 Vue 实例（通常只有根实例）时执行 `router` 的 `init` 方法进行初始化：

```js
Vue.mixin({
    beforeCreate () {
        // debugger
        if (isDef(this.$options.router)) {
            // this.$options.router = new Vue 传入的 VueRouter 实例
            this._routerRoot = this
            // _router 存储
            this._router = this.$options.router
            this._router.init(this)
            // 将 _route 变成响应式，表示当前所在的路由对象
            Vue.util.defineReactive(this, '_route', this._router.history.current)
        } else {
            this._routerRoot = (this.$parent && this.$parent._routerRoot) || this
        }
        registerInstance(this, this)
    },
    destroyed () {
        registerInstance(this)
    }
})
```

`init` 方法首先向 `this.apps` 添加当前的 Vue 实例，然后将根实例保存在 `this.app` 中，因为非根实例会直接将方法 `return` ，然后拿到 `history` 对象来执行一些逻辑：

```js
init (app: any /* Vue component instance */) {
    process.env.NODE_ENV !== 'production' &&
        assert(
        install.installed,
        `not installed. Make sure to call \`Vue.use(VueRouter)\` ` +
        `before creating root instance.`
    )

    // 维护每一个创建的 Vue 实例
    this.apps.push(app)

    // set up app destroyed handler
    // https://github.com/vuejs/vue-router/issues/2639
    app.$once('hook:destroyed', () => {
        // clean out app from this.apps array once destroyed
        const index = this.apps.indexOf(app)
        if (index > -1) this.apps.splice(index, 1)
        // ensure we still have a main app or null if no apps
        // we do not release the router so it can be reused
        if (this.app === app) this.app = this.apps[0] || null

        if (!this.app) this.history.teardown()
    })

    // main app previously initialized
    // return as we don't need to set up new history listener
    if (this.app) {
        return
    }

    this.app = app

    const history = this.history

    if (history instanceof HTML5History || history instanceof HashHistory) {
        const handleInitialScroll = routeOrError => {
            const from = history.current
            const expectScroll = this.options.scrollBehavior
            const supportsScroll = supportsPushState && expectScroll

            if (supportsScroll && 'fullPath' in routeOrError) {
                handleScroll(this, routeOrError, from, false)
            }
        }
        const setupListeners = routeOrError => {
            history.setupListeners()
            handleInitialScroll(routeOrError)
        }
        history.transitionTo(
            history.getCurrentLocation(),
            setupListeners,
            setupListeners
        )
    }

    history.listen(route => {
        this.apps.forEach(app => {
            app._route = route
        })
    })
}
```

这里来看一下负责路由过渡的 `history.transitionTo` 方法，它定义在 `History` 基类中，由于 `history` 对象继承了它，所以可以通过 `history` 调用。`transitionTo` 一开始就执行了当前 `VueRouter` 的 `match` 方法进行匹配：

```js
let route
// catch redirect option https://github.com/vuejs/vue-router/issues/3201
try {
    route = this.router.match(location, this.current)
} catch (e) {
    this.errorCbs.forEach(cb => {
        cb(e)
    })
    // Exception should still be thrown
    throw e
}
```

`VueRouter.match` 实际调用了 `this.matcher.match` 方法做匹配：

```js
match (raw: RawLocation, current?: Route, redirectedFrom?: Location): Route {
    return this.matcher.match(raw, current, redirectedFrom)
}
```

总结下来，`VueRouter` 被注册到 Vue 实例中后会对路由进行一次 `match` 匹配，接下来看看 `matcher` 对象的作用。

------



## macher	

在 `VueRouter` 的实例化时，会调用 `createMatcher` 创建一个 `matcher` 对象：

```js
this.matcher = createMatcher(options.routes || [], this)
```

### createMatcher

`createMatcher` 会先调用 `createRouteMap` 返回路由的列表，映射对象等属性，最后返回四个方法：

```js
export function createMatcher (
  routes: Array<RouteConfig>,
  router: VueRouter
): Matcher {
  // debugger
  const { pathList, pathMap, nameMap } = createRouteMap(routes)

  function addRoutes (routes) {
    // ...
  }

  function addRoute (parentOrRoute, route) {
    // ...
  }

  function getRoutes () {
    // ...
  }

  function match (
    raw: RawLocation,
    currentRoute?: Route,
    redirectedFrom?: Location
  ): Route {
    // ...
  }

  function redirect (
    record: RouteRecord,
    location: Location
  ): Route {
    // ...
  }

  function alias (
    record: RouteRecord,
    location: Location,
    matchAs: string
  ): Route {
    // ...
  }

  function _createRoute (
    record: ?RouteRecord,
    location: Location,
    redirectedFrom?: Location
  ): Route {
    // ...
  }

  return {
    match,
    addRoute,
    getRoutes,
    addRoutes
  }
}
```

`createRouteMap` 函数的主要逻辑是将用户传入的路由配置转换为一张路由映射表。它定义了需要返回的一些映射表属性，随后将传入的用户手写的 `routes` 路由配置（参考最前面的例子）遍历调用 `addRouteRecord` 函数为每一个路由生成一个映射，随后做了一些关于通配符与校验合法性的操作：

```js
export function createRouteMap (
  routes: Array<RouteConfig>,
  oldPathList?: Array<string>,
  oldPathMap?: Dictionary<RouteRecord>,
  oldNameMap?: Dictionary<RouteRecord>,
  parentRoute?: RouteRecord
): {
  pathList: Array<string>,
  pathMap: Dictionary<RouteRecord>,
  nameMap: Dictionary<RouteRecord>
} {
  // the path list is used to control path matching priority
  const pathList: Array<string> = oldPathList || []
  // $flow-disable-line
  const pathMap: Dictionary<RouteRecord> = oldPathMap || Object.create(null)
  // $flow-disable-line
  const nameMap: Dictionary<RouteRecord> = oldNameMap || Object.create(null)

  routes.forEach(route => {
    addRouteRecord(pathList, pathMap, nameMap, route, parentRoute)
  })

  // ensure wildcard routes are always at the end
  for (let i = 0, l = pathList.length; i < l; i++) {
    if (pathList[i] === '*') {
      // 配置中存在通配符的情况，则将其方在最后一项
      pathList.push(pathList.splice(i, 1)[0])
      l--
      i--
    }
  }

  if (process.env.NODE_ENV === 'development') {
    // warn if routes do not include leading slashes
    const found = pathList
    // check for missing leading slash
      .filter(path => path && path.charAt(0) !== '*' && path.charAt(0) !== '/')

    if (found.length > 0) {
      const pathNames = found.map(path => `- ${path}`).join('\n')
      warn(false, `Non-nested routes must include a leading slash character. Fix the following routes: \n${pathNames}`)
    }
  }

  return {
    pathList,
    pathMap,
    nameMap
  }
}
```

`addRouteRecord` 首先将路由的 `path` 进行规范化，然后创建一个描述路由的 `record` 对象。后面分为几个分支逻辑：

```js
function addRouteRecord (
pathList: Array<string>,
 pathMap: Dictionary<RouteRecord>,
 nameMap: Dictionary<RouteRecord>,
 route: RouteConfig,
 parent?: RouteRecord,
 matchAs?: string
) {
    const { path, name } = route
    if (process.env.NODE_ENV !== 'production') {
        assert(path != null, `"path" is required in a route configuration.`)
        assert(
            typeof route.component !== 'string',
            `route config "component" for path: ${String(
                path || name
            )} cannot be a ` + `string id. Use an actual component instead.`
        )

        warn(
            // eslint-disable-next-line no-control-regex
            !/[^\u0000-\u007F]+/.test(path),
            `Route with path "${path}" contains unencoded characters, make sure ` +
            `your path is correctly encoded before passing it to the router. Use ` +
            `encodeURI to encode static segments of your path.`
        )
    }

    const pathToRegexpOptions: PathToRegexpOptions =
        route.pathToRegexpOptions || {}
    const normalizedPath = normalizePath(path, parent, pathToRegexpOptions.strict)

    if (typeof route.caseSensitive === 'boolean') {
        pathToRegexpOptions.sensitive = route.caseSensitive
    }

    const record: RouteRecord = {
        path: normalizedPath,
        regex: compileRouteRegex(normalizedPath, pathToRegexpOptions),
        components: route.components || { default: route.component },
        alias: route.alias
        ? typeof route.alias === 'string'
        ? [route.alias]
        : route.alias
        : [],
        instances: {},
        enteredCbs: {},
        name,
        parent,
        matchAs,
        redirect: route.redirect,
        beforeEnter: route.beforeEnter,
        meta: route.meta || {},
        props:
        route.props == null
        ? {}
        : route.components
        ? route.props
        : { default: route.props }
    }
    
    // ...后面为分支逻辑
}
```

- 当前路由存在 `children`，遍历 `children` 并递归调用 `addRouteRecord`，将当前 `child` 作为 `route` 参数，将之前创建的 `record` 对象作为 `parent` 参数传入

  ```js
  if (route.children) {
      // Warn if route is named, does not redirect and has a default child route.
      // If users navigate to this route by name, the default child will
      // not be rendered (GH Issue #629)
      if (process.env.NODE_ENV !== 'production') {
          if (
              route.name &&
              !route.redirect &&
              route.children.some(child => /^\/?$/.test(child.path))
          ) {
              warn(
                  false,
                  `Named Route '${route.name}' has a default child route. ` +
                  `When navigating to this named route (:to="{name: '${
                  route.name
                  }'"), ` +
                  `the default child route will not be rendered. Remove the name from ` +
                  `this route and use the name of the default child route for named ` +
                  `links instead.`
              )
          }
      }
      route.children.forEach(child => {
          const childMatchAs = matchAs
          ? cleanPath(`${matchAs}/${child.path}`)
          : undefined
          // addRouteRecord([], {}, {}, route, undefined)
          addRouteRecord(pathList, pathMap, nameMap, child, record, childMatchAs)
      }) 
  }
  ```

- `pathMap` 内不存在当前 `record` 时，向当前 `pathList` 和 `pathMap` 中添加一条记录，`pathList` 存储路径名，`pathMap` 用路径名作为键名存储 `record`

  ```js
  if (!pathMap[record.path]) {
      pathList.push(record.path)
      pathMap[record.path] = record
  }
  ```

- `alias` 逻辑暂时跳过

- 如果用户写了 `name` 属性并在 `nameMap` 中不存在，`nameMap` 则用 `name` 作为键名存储 `record`

  ```js
  if (name) {
      if (!nameMap[name]) {
          nameMap[name] = record
      } else if (process.env.NODE_ENV !== 'production' && !matchAs) {
          warn(
              false,
              `Duplicate named routes definition: ` +
              `{ name: "${name}", path: "${record.path}" }`
          )
      }
  }
  ```

回到 `createRouteMap` 方法，`pathList`、`pathMap`、`nameMap` 都是引用类型，它们传给 `addRouteRecord` 去递归地向里面插入对应的记录，最后将它们返回。最后再回到 `createMatcher` 函数看看它的一些内置方法，它向外暴露了 `match`、`addRoute`、`getRoutes`、`addRoutes` 四个方法：

```js
return {
    match,
    addRoute,
    getRoutes,
    addRoutes
}
```

### addRoutes

`addRoutes` 动态添加路由配置，它在内部也调用了 `createRouteMap`，将用户动态传入的配置添加到映射表中：

```js
function addRoutes (routes) {
    createRouteMap(routes, pathList, pathMap, nameMap)
}
```

### match

前面知道在 `VueRouter` 的  `init` 方法执行时会调用到 `match` ，在第一次初始化时，它接收当前的路径 `/` 和 `currentRoute`，`currentRoute` 在 `History` 基类中定义，初始化时它调用了 `util/route.js` 下 的 `createRoute` ，后续介绍：

```js
function match (
    raw: RawLocation,
    currentRoute?: Route,
    redirectedFrom?: Location
  ): Route {
    debugger
    const location = normalizeLocation(raw, currentRoute, false, router)
    const { name } = location

    if (name) {
      const record = nameMap[name]
      if (process.env.NODE_ENV !== 'production') {
        warn(record, `Route with name '${name}' does not exist`)
      }
      if (!record) return _createRoute(null, location)
      const paramNames = record.regex.keys
        .filter(key => !key.optional)
        .map(key => key.name)

      if (typeof location.params !== 'object') {
        location.params = {}
      }

      if (currentRoute && typeof currentRoute.params === 'object') {
        for (const key in currentRoute.params) {
          if (!(key in location.params) && paramNames.indexOf(key) > -1) {
            location.params[key] = currentRoute.params[key]
          }
        }
      }

      location.path = fillParams(record.path, location.params, `named route "${name}"`)
      return _createRoute(record, location, redirectedFrom)
    } else if (location.path) {
      location.params = {}
      for (let i = 0; i < pathList.length; i++) {
        const path = pathList[i]
        const record = pathMap[path]
        if (matchRoute(record.regex, location.path, location.params)) {
          return _createRoute(record, location, redirectedFrom)
        }
      }
    }
    // no match
    return _createRoute(null, location)
  }

// currentRoute 对应的结构，也就是在开发中看到的 route 对象
export interface Route {
  path: string
  name?: string | null
  hash: string
  query: Dictionary<string | (string | null)[]>
  params: Dictionary<string>
  fullPath: string
  matched: RouteRecord[]
  redirectedFrom?: string
  meta?: any
}
```

`match` 首先调用 `normalizeLocation` 对当前路径名进行规范化，它接收一个路径名或 `location` 对象（`raw`），它处理了 `raw` 的两种情况， 一种是有 `params` 且没有 `path`，一种是有 `path` 的，对于第一种情况，如果 `current` 有 `name`，则计算出的 `location` 也有 `name`。 最后它会解析 `path` 、`query`、`hash` 等返回一个规范化的 `location` 对象：

```js
export function normalizeLocation (
  raw: RawLocation,
  current: ?Route,
  append: ?boolean,
  router: ?VueRouter
): Location {
  let next: Location = typeof raw === 'string' ? { path: raw } : raw
  // named target
  if (next._normalized) {
    return next
  } else if (next.name) {
    next = extend({}, raw)
    const params = next.params
    if (params && typeof params === 'object') {
      next.params = extend({}, params)
    }
    return next
  }

  // relative params
  if (!next.path && next.params && current) {
    next = extend({}, next)
    next._normalized = true
    const params: any = extend(extend({}, current.params), next.params)
    if (current.name) {
      next.name = current.name
      next.params = params
    } else if (current.matched.length) {
      const rawPath = current.matched[current.matched.length - 1].path
      next.path = fillParams(rawPath, params, `path ${current.path}`)
    } else if (process.env.NODE_ENV !== 'production') {
      warn(false, `relative params navigation requires a current route.`)
    }
    return next
  }

  const parsedPath = parsePath(next.path || '')
  const basePath = (current && current.path) || '/'
  const path = parsedPath.path
    ? resolvePath(parsedPath.path, basePath, append || next.append)
    : basePath

  const query = resolveQuery(
    parsedPath.query,
    next.query,
    router && router.options.parseQuery
  )

  let hash = next.hash || parsedPath.hash
  if (hash && hash.charAt(0) !== '#') {
    hash = `#${hash}`
  }

  return {
    _normalized: true,
    path,
    query,
    hash
  }
}

// 规范的 location 对象
export interface Location {
  name?: string
  path?: string
  hash?: string
  query?: Dictionary<string | (string | null)[] | null | undefined>
  params?: Dictionary<string>
  append?: boolean
  replace?: boolean
}
```

规范完成之后，`match` 处理了 `location` 对象的两种情况：

- 存在 `name` 的情况：从 `nameMap` 中取出一条 `record`，如果没有该记录则调用 `_createRoute` 返回一个空的默认 `route` 对象。 然后拿到 `record` 对应的 `paramNames`，再对比 `currentRoute` 中的 `params`，把交集部分的 `params` 添加到 `location` 中，然后在通过 `fillParams` 方法根据 `record.path` 和 `location.path` 计算出 `location.path`，最后调用 `_createRoute(record, location, redirectedFrom)` 去生成一条新路径 

  ```js
  if (name) {
      const record = nameMap[name]
      if (process.env.NODE_ENV !== 'production') {
          warn(record, `Route with name '${name}' does not exist`)
      }
      if (!record) return _createRoute(null, location)
      const paramNames = record.regex.keys
      .filter(key => !key.optional)
      .map(key => key.name)
  
      if (typeof location.params !== 'object') {
          location.params = {}
      }
  
      if (currentRoute && typeof currentRoute.params === 'object') {
          for (const key in currentRoute.params) {
              if (!(key in location.params) && paramNames.indexOf(key) > -1) {
                  location.params[key] = currentRoute.params[key]
              }
          }
      }
  
      location.path = fillParams(record.path, location.params, `named route "${name}"`)
      return _createRoute(record, location, redirectedFrom)
  }
  ```

- 存在 `path` 的情况： 通过 `name` 我们可以很快的找到 `record`，但是通过 `path` 并不能，因为我们计算后的 `location.path` 是一个真实路径，而 `record` 中的 `path` 可能会有 `param`，因此需要对所有的 `pathList` 做顺序遍历， 然后通过 `matchRoute` 方法根据 `record.regex`、`location.path`、`location.params` 匹配，如果匹配到则也通过 `_createRoute(record, location, redirectedFrom)` 去生成一条新路径。  因为是顺序遍历，所以我们书写路由配置要注意路径的顺序，因为写在前面的会优先尝试匹配

  ```js
  if (location.path) {
      location.params = {}
      for (let i = 0; i < pathList.length; i++) {
          const path = pathList[i]
          const record = pathMap[path]
          // 将当前 location 对象的 path 与 pathMap 中的 record 做匹配
          if (matchRoute(record.regex, location.path, location.params)) {
              return _createRoute(record, location, redirectedFrom)
          }
      }
  }
  ```

在初始化的过程中，`location` 是一个默认的路径对象，`path = '/'`，所以 `path` 无法匹配到任何 `record`，那么就会调用 `_createRoute(null, location)` 创建一个空的路径对象，`_createRoute` 会根据 `record` 的 `redirect`、`matchAs` 情况调用不同的方法。在初始化的流程中，没有匹配到 `record` ，会调用实际的 `createRoute` 来创建 `route` 对象：

```js
function _createRoute (
	 record: ?RouteRecord,
     location: Location,
     redirectedFrom?: Location
): Route {
    if (record && record.redirect) {
        return redirect(record, redirectedFrom || location)
    }
    if (record && record.matchAs) {
        return alias(record, location, record.matchAs)
    }
    return createRoute(record, location, redirectedFrom, router)
}
```

`createRoute` 返回一个 `route` 对象，在 VueRouter 中，所有的路径对象都由它创建，并且这个路径对象是不可修改的冻结对象。它的主要逻辑就是将 `record` 与 `location` 的属性整合起来返回一个完整的 `route` 路径对象：

```js
export function createRoute (
  record: ?RouteRecord,
  location: Location,
  redirectedFrom?: ?Location,
  router?: VueRouter
): Route {
  const stringifyQuery = router && router.options.stringifyQuery

  let query: any = location.query || {}
  try {
    query = clone(query)
  } catch (e) {}

  const route: Route = {
    name: location.name || (record && record.name),
    meta: (record && record.meta) || {},
    path: location.path || '/',
    hash: location.hash || '',
    query,
    params: location.params || {},
    fullPath: getFullPath(location, stringifyQuery),
    matched: record ? formatMatch(record) : []
  }
  if (redirectedFrom) {
    route.redirectedFrom = getFullPath(redirectedFrom, stringifyQuery)
  }
  return Object.freeze(route)
}
```

`route` 对象中有一个非常重要的属性 `matched`，它调用 `formatMatch` 将当前 `record` 插入到一个数组中，并一级一级找它的 `parent` 将其插入到一个数组中直到找到最外层的 `record`，它记录了一条路线上的所有 `record`，为后续渲染组件提供依据：

```js
function formatMatch (record: ?RouteRecord): Array<RouteRecord> {
  const res = []
  while (record) {
    res.unshift(record)
    record = record.parent
  }
  return res
}
```

### 总结

`matcher` 对象维护了 `pathList`、`pathMap`、`nameMap` 等一些映射表和一些扩展路由配置的方法。`match` 方法则是路由切换的关键方法，它主要通过当前 `location` 对象与匹配到的 `record` 整合起来返回一个完整的 `route` 对象，代表当前的路线。

------



### 路径切换及渲染组件

回到初始化时调用的 `transitionTo` 方法，在调用完 `match` 方法获取了当前 `route` 对象之后会调用 `confirmTransition` 方法来进行各阶段导航守卫的执行与异步组件的解析。这一过程较为复杂，先解析 VueRouter 路由最直观的变化：**url 变化** 与 **组件切换**

```js
this.confirmTransition(
    route,
    () => {
        this.updateRoute(route)
        onComplete && onComplete(route)
        this.ensureURL()
        this.router.afterHooks.forEach(hook => {
            hook && hook(route, prev)
        })

        // fire ready cbs once
        if (!this.ready) {
            this.ready = true
            this.readyCbs.forEach(cb => {
                cb(route)
            })
        }
    },
    err => {
        if (onAbort) {
            onAbort(err)
        }
        if (err && !this.ready) {
            // Initial redirection should not mark the history as ready yet
            // because it's triggered by the redirection instead
            // https://github.com/vuejs/vue-router/issues/3225
            // https://github.com/vuejs/vue-router/issues/3331
            if (!isNavigationFailure(err, NavigationFailureType.redirected) || prev !== START) {
                this.ready = true
                this.readyErrorCbs.forEach(cb => {
                    cb(err)
                })
            }
        }
    }
)
```

在 `confirmTransition` 内部，导航守卫会通过一个队列来执行，在队列正确执行完毕后，会执行 `confirmTransition`  的 `onComplete` 回调，也就是上面传入的第二个参数：

```js
runQueue(queue, iterator, () => {
    // wait until async components are resolved before
    // extracting in-component enter guards
    const enterGuards = extractEnterGuards(activated)
    const queue = enterGuards.concat(this.router.resolveHooks)
    runQueue(queue, iterator, () => {
        if (this.pending !== route) {
            return abort(createNavigationCancelledError(current, route))
        }
        this.pending = null
        // 开始执行回调
        onComplete(route)
        if (this.router.app) {
            this.router.app.$nextTick(() => {
                handleRouteEntered(route)
            })
        }
    })
})
```

在 `confirmTransition` 的 `onComplete` 中，会执行一些方法，也就是包括了 url 的变化和组件的切换：

```js
() => {
    this.updateRoute(route)
    onComplete && onComplete(route)
    this.ensureURL()
    this.router.afterHooks.forEach(hook => {
        hook && hook(route, prev)
    })

    // fire ready cbs once
    if (!this.ready) {
        this.ready = true
        this.readyCbs.forEach(cb => {
            cb(route)
        })
    }
},
```

### url 变化

在 `VueRouter` 的 `init` 初始化调用 `transitionTo` 的时候，为它的 `onComplete` 传入了 `setupListeners` 函数，`setupListeners` 内调用了当前 `history` 实例的 `setupListeners` ：

```js
const setupListeners = routeOrError => {
    // 调用 history 上的 setupListeners
    history.setupListeners()
    // 滚动相关
    handleInitialScroll(routeOrError)
}
// debugger
// 在初始化调用 init 时，transitionTo 的 onComplete 和 onAbort 都传入了 setupListeners
// 在 transitionTo 中调用了 confirmTransition
// confirmTransition 的 onComplete 参数传入了当前的 route 对象，onAbort 参数传入了 err
history.transitionTo(
    history.getCurrentLocation(),
    setupListeners,
    setupListeners
)
```

先忽略滚动相关逻辑，`history` 内 `setupListeners` 的主要逻辑就是在 `window` 上添加一个 `url` 变化的事件监听，监听的回调方法 `handleRoutingEvent` 内调用了 `transitionTo` 进行路由切换，当用户使用 `a` 标签跳转或手动更改 `url` 时，就会触发 `handleRoutingEvent` ：

```js
setupListeners () {
    // listeners 定义在 base history 中，由该类继承而来
    // length > 0 代表之前已经开启过监听了
    if (this.listeners.length > 0) {
        return
    }

    const router = this.router
    const expectScroll = router.options.scrollBehavior
    const supportsScroll = supportsPushState && expectScroll

    // 滚动相关
    if (supportsScroll) {
        this.listeners.push(setupScroll())
    }

    // 监听的回调
    const handleRoutingEvent = () => {
        // debugger
        const current = this.current
        // 不是正确的 path 
        if (!ensureSlash()) {
            return
        }
        // 当 url 路径改变时再次调用 transitionTo 进行路由切换
        // debugger
        this.transitionTo(getHash(), route => {
            if (supportsScroll) {
                handleScroll(this.router, route, current, true)
            }
            if (!supportsPushState) {
                replaceHash(route.fullPath)
            }
        } /* onComplete */)
    }
    // 判断当前环境是否支持 pushState
    const eventType = supportsPushState ? 'popstate' : 'hashchange'
    // 本质上就是监听 url 的路径变化，调用回调
    window.addEventListener(
        eventType,
        handleRoutingEvent
    )
    this.listeners.push(() => {
        window.removeEventListener(eventType, handleRoutingEvent)
    })
}
```

对于 `<router-link>` 组件的 `to` 属性或通常使用的 `router.push` 方法，`url` 的变化是和上面不同的。它们会调用 `history` 的 `push` 方法，`push` 方法内也调用了 `transitionTo`，在它的 `onComplete` 中执行了 `pushHash` 方法：

```js
push (location: RawLocation, onComplete?: Function, onAbort?: Function) {
    const { current: fromRoute } = this
    debugger
    this.transitionTo(
        location,
        route => {
            pushHash(route.fullPath)
            handleScroll(this.router, route, fromRoute, false)
            onComplete && onComplete(route)
        },
        onAbort
    )
}
```

`pushState` 判断当前浏览器是否支持 HTML5 原生的 `pushState`，支持则调用 `pushState` 使用原生的，否则就改变 `window.location.hash` 来改变 `url`：

```js
function pushHash (path) {
  if (supportsPushState) {
    pushState(getUrl(path))
  } else {
    window.location.hash = path
  }
}

// hash mode
function getUrl (path) {
  const href = window.location.href
  const i = href.indexOf('#')
  const base = i >= 0 ? href.slice(0, i) : href
  // 在 base 和 path 间拼接 # 号
  return `${base}#${path}`
}
```

### 组件切换 

`VueRouter` 的组件切换依靠 `<router-view>` 组件来完成，这里先提取 `<router-view>` 组件中的 `render` 函数部分关键代码方便理解。`render` 函数从 `parent` 中拿到 `route` 对象并找到从 `matched` 中存储的记录中找出对应的 `component`，如果存在组件则经过一系列操作将其渲染，否则渲染空元素：

```js
render (_, { props, children, parent, data }) {
    // debugger
    // used by devtools to display a router-view badge
    data.routerView = true

    // directly use parent context's createElement() function
    // so that components rendered by router-view can resolve named slots
    const h = parent.$createElement
    const name = props.name
    const route = parent.$route
    
    // ...
    let depth = 0
    
    const matched = route.matched[depth]
    const component = matched && matched.components[name]

    // render empty node if no matched route or no config component
    if (!matched || !component) {
      cache[name] = null
      return h()
    }
    
    // ...

    return h(component, data, children)
  }
}
```

在初始化渲染组件时，默认的 `route.path` 为 `/`，在例子中并未对应任何组件， `App` 的渲染 `Watcher` 会解析并执行到 `<router-view>` 的 `render` 函数，它没有匹配到任何组件，所以渲染为空；

接下来看看它是怎么变化路由时自动切换组件。在 `VueRouter` 初始化调用完 `transitionTo` 后，会执行 `history` 实例的 `listen` 方法，它传入一个 `cb` 将 `VueRouter` 收集的 Vue 实例 `apps` 遍历并将它们的 `_route` 进行更新：

```js
history.listen(route => {
    // debugger
    this.apps.forEach(app => {
        app._route = route
    })
})
```

`listen` 方法定义在 `History` 基类中，它将 `listen` 传入的 `cb` 赋值给当前 `history` 的 `cb`：

```js
listen (cb: Function) {
    this.cb = cb
}
```

在切换路径 `transitionTo` 时调用了 `confirmTransition` 方法，它的 `onComplete` 中调用了 `updateRoute` 方法：

```js
this.confirmTransition(
    route,
    () => {
        this.updateRoute(route)
        onComplete && onComplete(route)
        this.ensureURL()
        this.router.afterHooks.forEach(hook => {
            hook && hook(route, prev)
        })

        // fire ready cbs once
        if (!this.ready) {
            this.ready = true
            this.readyCbs.forEach(cb => {
                cb(route)
            })
        }
    },
)
```

`updateRoute` 方法内将当前 `route` 对象赋值给 `current`，给下一次切换作为依据，然后调用了上面传给 `listen` 的回调：

```js
updateRoute (route: Route) {
    this.current = route
    this.cb && this.cb(route)
}
```

`cb` 的调用修改了 `app._route` 属性，实际上这个属性会触发响应式属性的 `setter`，因为在 `install` 方法混入的生命周期中将其定义成了响应式的：

```js
Vue.mixin({
    beforeCreate () {
        // 将 _route 变成响应式，表示当前所在的路由对象
        Vue.util.defineReactive(this, '_route', this._router.history.current)
        // ...
    }
})
```

调用 `cb` 时，实际进入了 `setter` 的派发更新流程，后续的同步任务结束之后，会调用 `<router-view>` 订阅的渲染 `Watcher` 的 `get`，重新执行到 `<router-view>` 的 `render` 方法，如果匹配到了组件，则渲染当前组件。这就是路由切换组件更新的实质。

`updateRoute` 方法调用完成之后，会执行 `transitionTo` 的 `onComplete` 回调，在切换组件渲染的流程中，它的回调内执行了一些滚动相关的逻辑，有时间再去看。

随后还调用了 `ensureURL` 方法，这个方法定义在 `history` 的子类中，它的作用就是确保当前 `url` 与当前 `current` 路由对象对应，否则进行校正：

```js
ensureURL (push?: boolean) {
    const current = this.current.fullPath
    if (getHash() !== current) {
      push ? pushHash(current) : replaceHash(current)
    }
}

getCurrentLocation () {
    return getHash()
}

export function getHash (): string {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  let href = window.location.href
  const index = href.indexOf('#')
  // empty path
  if (index < 0) return ''

  // 拿到 # 号后的所有路径：/#/ --> /
  href = href.slice(index + 1)

  return href
}
```

### 总结

路径切换的大致流程就是切换当前路由对象、调用守卫、更改 `url` 和触发 `setter` 派发更新。`url` 和组件的更新渲染都放在 `transitionTo` 和 `confirmTransiton` 的回调中进行，以此兼容不同的 `history` 与跳转方法。以上分析都是基于 `hash` 模式路由，后面有时间接着分析 `hash` 与 `history` 两种路由模式的区别。