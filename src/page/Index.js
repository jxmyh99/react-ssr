import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { getIndexList } from '../store/index'
function Index (props) {
  const [count, setCount] = useState(1)
  useEffect(() => {
    console.log(props.list.length)
    if (!props.list.length) {
      // 客户端获取
      // 这里是扩展的地方
      props.getIndexList()
    }
  }, [])
  return (
    <div>
      <h1>hello {props.title}</h1>
      <p>当前的数 {count}</p>
      <button onClick={() => setCount(count + 1)}>点击</button>

      <hr />

      <ul>
        {props.list.map(item => {
          return <li key={item.id}> {item.name} </li>
        })}
      </ul>
    </div>
  )
}
Index.loadData = store => {
  // console.log(store)
  return store.dispatch(getIndexList())
}
export default connect(state => ({ list: state.index.list }), { getIndexList })(
  Index
)
