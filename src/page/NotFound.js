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
