// 存储入口

import { createStore, applyMiddleware, combineReducers } from 'redux'

import thunk from 'redux-thunk'

import indexReducer from './index'
import userReducer from './user'

const reducer = combineReducers({
  index: indexReducer,
  user: userReducer
})

// 创建 store

// const store = createStore(reducer, applyMiddleware(thunk))

// export default store

export const getServerStore = () => {
  // 服务端
  return createStore(reducer, applyMiddleware(thunk))
}

export const getClientStore = () => {
  // 客户端

  const defaultStore = window.__context ? window.__context : {}

  return createStore(reducer, defaultStore, applyMiddleware(thunk))
}
