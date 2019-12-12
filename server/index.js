import React from 'react'
import { renderToString } from 'react-dom/server'

import express from 'express'

import { StaticRouter } from 'react-router-dom'
import App from '../src/App'
import store from '../src/store/store'
import { Provider } from 'react-redux'
const app = express()
app.use(express.static('public'))

app.get('*', (req, res) => {
  // const content = <App title='我是app' />

  // const content = renderToString(Page)
  // console.log(content)
  console.log(req.url)
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url || '/'}>
        {App}
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
        <script src="bundle.js"></script>
      </body>
    </html>
  
  `)
})

app.listen('9093', () => {
  console.log('渲染成功')
})
