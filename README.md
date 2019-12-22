# react ssr 同构项目实践


. 1.基础同构

#### 总结

认识了`react`的`ssr`的流程，从中学习解决问题的思路，分析问题的方法以及查看官方文档的方法。

后期，会研究进行部署项目。

. 第四次
1.如何解决`Promise all`运行过程中某个`Promise`出错

```js
const promise = new Promise((resolve, reject) => {
   pro.then(resolve).catch(resolve)
})
```

> 直接不管`reject`，但这里可以使用一些日志的形式向客户端进行报告。

2.如何优化`client`请求接口使用`ssr node`来请求

a.使用`redux-thunk`来设置不同端的接口请求地址

> `redux-thunk`提供了一个`withExtraArgument`的方法，具体请看https://www.npmjs.com/package/redux-thunk

```js
const serverAxios = axios.create({
  baseURL: 'http://localhost:9090/'
})
const clientAxios = axios.create({
  baseURL: '/'
})
export const getServerStore = () => {
  // 服务端
  return createStore(reducer, applyMiddleware(thunk.withExtraArgument(serverAxios)))
}

export const getClientStore = () => {
  // 客户端

  const defaultStore = window.__context ? window.__context : {}

  return createStore(reducer, defaultStore, applyMiddleware(thunk.withExtraArgument(clientAxios)))
}
```

b.数据转发

> 使用`http-proxy-middleware`这个中间件来完成

````js
app.use(
  '/api',
  proxy({ target: 'http://localhost:9090', changeOrigin: true })
)
````

3.`css`的同构

> 在项目中引用了`css`，就需要编译，一般都使用`style-loader`，但`style-loader`在`node`端是没有`document`，这样就会报错，这里我们就要引入一个同构的中间件了，这个中间件是`isomorphic-style-loader`

```json
//webpack.server.js
{
   test: /\.css$/,
   use: ['isomorphic-style-loader', 'css-loader']
}
```

4.`404`页面

> 增加一个`404`页面不难，但这里需要改变页面的状态码，就需要使用`context`了，详页的https://reacttraining.com/react-router/web/guides/server-rendering

```js
//Notfound.js
import React from 'react'
import { Route } from 'react-router-dom'

function Status ({ code, children }) {
  return (
    <Route
      render={({ staticContext }) => {
        if (staticContext) {
          staticContext.statusCode = code
        }
        return children
      }}
    />
  )
}

function NotFound (props) {
  // return (<div>
  //     <h1>没有找到这个页面</h1>
  //     <img id="img-404" src="/404.jpeg">
  //   </div>)
  console.log('nofound', props)
  return (
    <Status code={404}>
      <h1>没有找到这个页面</h1>
      <img id='img-404' src='/404.jpeg' />
    </Status>
  )
}

export default NotFound
```

```
//app.js
{
    component: NotFound
  }
```

```jsx
//server.js
//context={context}这里是新增加，是用来获取 context的
<StaticRouter location={req.url || '/'} context={context}>
          <Header />
          <Switch>
            {routes.map(route => {
              // console.log(route)
              return <Route {...route} />
            })}
          </Switch>

        </StaticRouter>



// 通过statuscdoe返回状态码
    if (context.statusCode) {
      res.status(context.statusCode)
    }
```

5.替换当前页面（用于用户中心页跳转登录页）

> 主要是当一个页面需要登录或者高级别身份访问时，这时，一个没有身份或者级别不够来访问需要跳转至另一个页面

```jsx
//server.js
// 页面替换
    if (context.action === 'REPLACE') {
      res.redirect(301, context.url)
    }
```

6.解决每个页面都渲染`Notfound`页面的问题

> 使用Switch这个组件来解决

```jsx
//client.js
const Page = (
  <Provider store={store}>
    <BrowserRouter>
      <Header />
      <Switch>
        {routes.map(route => <Route {...route} />)}
      </Switch>

    </BrowserRouter>
  </Provider>

)
```

```jsx
//sever.js
import { StaticRouter, matchPath, Route, Switch } from 'react-router-dom'
<Provider store={store}>
        <StaticRouter location={req.url || '/'} context={context}>
          <Header />
          <Switch>
            {routes.map(route => {
              // console.log(route)
              return <Route {...route} />
            })}
          </Switch>

        </StaticRouter>
      </Provider>
```



问题
1.如何`client`解决`js`文件缓存的问题
2.server 里的 模板改为index.crs.htl