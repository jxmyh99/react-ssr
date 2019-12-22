import React from 'react'
// 一定要带.css后缀
import styles from './About.css'
function About (props) {
  // let cssStr = ''
  // // console.log('styles', styles)
  // if (props.staticContext) {
  //   if (!styles._getCss) {
  //     cssStr = styles.toString()
  //   } else {
  //     cssStr = styles._getCss()
  //   }

  //   props.staticContext.css.push(cssStr)
  // //   props.staticContext.css.push(typeof styles._getCss === 'function' || styles._getCss())
  // }
  return (
    <div>
      {/* <p>{styles}</p> */}
      <h1 className={styles.locals ? styles.locals.title : styles.title}>我是about</h1>
    </div>
  )
}

export default About
