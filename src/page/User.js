import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getUserInfo } from '../store/user.js'

function User (props) {
  useEffect(() => {
    console.log(props)
    if (!props.userinfo.length) {
      // 客户端获取
      // 这里是扩展的地方
      props.getUserInfo()
    }
  }, [])
  return <div>
    <h1>
      您好，这里是{props.userinfo.name}天地,我是{props.userinfo.name}的{props.userinfo.level}
    </h1>
  </div>
}
User.loadData = (store) => {
  return store.dispatch(getUserInfo())
}
export default connect(
  state => ({ userinfo: state.user.userinfo }),
  { getUserInfo }
)(User)
