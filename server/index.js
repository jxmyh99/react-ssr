import React from 'react'
import { renderToString } from 'react-dom/server'

import express from 'express'

import { StaticRouter, matchPath, Route } from 'react-router-dom'
import routes from '../src/App'
import { getServerStore } from '../src/store/store'
import { Provider } from 'react-redux'

import Header from '../src/component/Header'
const app = express()
app.use(express.static('public'))
const store = getServerStore()
app.get('*', (req, res) => {
  // 根据路由渲染出的组件 ， 并且 拿到loadData方法
  // const content = <App title='我是app' />

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
        promises.push(loadData(store))
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
  properRace(promises).then(n => {
    // console.log(n)
    const content = renderToString(
      <Provider store={store}>
        <StaticRouter location={req.url || '/'}>
          <Header />
          {routes.map(route => {
            console.log(route)
            return <Route {...route} />
          })}
        </StaticRouter>
      </Provider>

    )

    res.send(`
      <html>
        <head>
          <title></title>
          <meta charset="utf-8">
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
    .catch(() => {
      res.send('页面加载失败')
    })
})

app.listen('9093', () => {
  console.log('渲染成功')
})
