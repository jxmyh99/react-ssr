import React, { useState } from 'react'

function Index (props) {
  const [count, setCount] = useState(1)
  return (
    <div>
      <h1>hello {props.title}</h1>
      <p>当前的数 {count}</p>
      <button onClick={() => setCount(count + 1)}>点击</button>
    </div>
  )
}

export default Index