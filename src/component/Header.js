import React from 'react'
import { Link } from 'react-router-dom'

export default () => {
  return (<div>

    <Link to='/'>首页</Link>|
    <Link to='/user'>用户信息</Link>|
    <Link to='/about'>关于我们</Link>|
    <Link to='/no'>不存在的页面</Link>|
    <Link to='/member'>用户中心</Link>

          </div>)
}
