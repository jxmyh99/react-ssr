// 模拟接口

var express = require('express')
const app = express()

app.get('/api/course/list', (req, res) => {
  // 支持跨域调用
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,POST')
  res.header('Content-Type', 'application/json;charset=utf-8')
  res.json({
    code: 1,
    list: [
      { name: 'web全栈', id: 1 },
      { name: 'js高级', id: 2 },
      { name: 'web小白', id: 3 },
      { name: 'java工程师', id: 4 }
    ]
  })
})
app.get('/api/user/info1', (req, res) => {
  // 支持跨域调用
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,POST')
  res.header('Content-Type', 'application/json;charset=utf-8')
  res.json({
    code: 1,
    data: { name: 'web全栈', level: '小白' }
  })
})
app.listen(9090, () => {
  console.log('mock启动完毕')
})
