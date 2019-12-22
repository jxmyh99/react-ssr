import React from 'react'
import { renderToString } from 'react-dom/server'

import express from 'express'

import { StaticRouter, matchPath, Route, Switch } from 'react-router-dom'

import path from 'path'
import fs from 'fs'
import routes from '../src/App'
import { getServerStore } from '../src/store/store'
import { Provider } from 'react-redux'
import proxy from 'http-proxy-middleware'
// import axios from 'axios'
// http-proxy-middleware
import Header from '../src/component/Header'
const app = express()
app.use(express.static('public'))
const store = getServerStore()
// 第一点，注意这里的不是get是use
app.use(
  '/api',
  proxy({ target: 'http://localhost:9090', changeOrigin: true })
)
function csrRender (res) {
  // 读取Csr的模板文件
  const filename = path.resolve(process.cwd(), 'public/index.csr.html')
  const html = fs.readFileSync(filename, 'utf-8')
  return res.send(html)
}
app.get('*', (req, res) => {
  if (req.query._mode === 'csr') {
    console.log('url参数 开启csr降级处理')
    return csrRender(res)
  }
  // _mode=csr
  // 根据路由渲染出的组件 ， 并且 拿到loadData方法
  // const content = <App title='我是app' />
  // if(req.url.startsWith('api/')){

  // }
  // const content = renderToString(Page)
  // console.log(content)
  // console.log(req.url)
  const promises = []

  routes.some(route => {
    const match = matchPath(req.path, route)
    // console.log(route.component.loadData)
    if (match) {
      const { loadData } = route.component
      // console.log(loadData)
      if (loadData) {
        const promise = new Promise((resolve, reject) => {
          loadData(store).then(resolve).catch(resolve)
        })
        promises.push(promise)
      }
    }
  })
  // Promise.any新标准
  function properRace (promises) {
    const resolve = Promise.resolve.bind(Promise)
    const reject = Promise.reject.bind(Promise)
    return Promise.all(promises.map(x => x.then(reject, resolve)))
      .then(reject, resolve)
  }
  // console.log(promises[0].toString())
  // 等待所有promise请求完成后渲染
  // todo:作业 是在这里
  // properRace(promises).then(n => {
  Promise.all(promises).then(n => {
    // console.log(n)
    const context = {
      css: []
    }
    const content = renderToString(

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

    )
    
    // 通过statuscdoe返回状态码
    if (context.statusCode) {
      res.status(context.statusCode)
    }
    // 页面替换
    if (context.action === 'REPLACE') {
      res.redirect(301, context.url)
    }
    const css = context.css.join('\n')
    // console.log('css', css)
    res.send(`
      <html>
        <head>
          <title></title>
          <meta charset="utf-8">
          <style>
          ${css}
          </style>
        </head>
        <body>
          <div id="root">${content}</div>
          <script>
            window.__context=${JSON.stringify(store.getState())}
          </script>
          <script src="bundle.js"></script>
        </body>
      </html>

    `)
  })
    .catch((err) => {
      console.log('页面失败', err)
      res.send('页面加载失败')
    })
})

app.listen('9093', () => {
  console.log('渲染成功')
})
