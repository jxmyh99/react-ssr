import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { getIndexList } from '../store/index'
import styles from './Index.css'
import withStyle from '../../withStyle'
function Index (props) {
  // const cssStr = ''
  // console.log('props', props.staticContext)
  // console.log('object', styles.toString())
  // if (props.staticContext) {
  //   if (!styles._getCss) {
  //     cssStr = styles.toString()
  //   } else {
  //     cssStr = styles._getCss()
  //   }

  //   props.staticContext.css.push(cssStr)
  // //   props.staticContext.css.push(typeof styles._getCss === 'function' || styles._getCss())
  // }
  const [count, setCount] = useState(1)
  useEffect(() => {
    // console.log(props)
    if (!props.list.length) {
      // 客户端获取
      // 这里是扩展的地方
      props.getIndexList()
    }
  }, [])
  return (
    <div>
      <h1 className={styles.locals ? styles.locals.h1 : styles.h1}>hello {props.title}</h1>
      <p className={styles.locals ? styles.locals.p : styles.p}>当前的数 {count}</p>
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
  withStyle(Index, styles)
)
