import React from "react";
import { renderToString } from "react-dom/server";

import express from 'express'


import App from "../src/App";



const app = express();
app.use(express.static('public'))

app.get('/',(req,res)=>{
  
  // const Page = <App title="我是app"></App>
  
  // const content = renderToString(Page)
  // console.log(content)
  const content = renderToString(App)

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


app.listen('9093',()=>{
  console.log('渲染成功')
})