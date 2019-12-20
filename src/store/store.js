// 存储入口

import { createStore, applyMiddleware, combineReducers } from 'redux'

import thunk from 'redux-thunk'
import axios from 'axios'
import indexReducer from './index'
import userReducer from './user'

const reducer = combineReducers({
  index: indexReducer,
  user: userReducer
})

const serverAxios = axios.create({
  baseURL: 'http://localhost:9090/'
})
const clientAxios = axios.create({
  baseURL: '/'
})
// 创建 store

// const store = createStore(reducer, applyMiddleware(thunk))

// export default store

export const getServerStore = () => {
  // 服务端
  return createStore(reducer, applyMiddleware(thunk.withExtraArgument(serverAxios)))
}

export const getClientStore = () => {
  // 客户端

  const defaultStore = window.__context ? window.__context : {}

  return createStore(reducer, defaultStore, applyMiddleware(thunk.withExtraArgument(clientAxios)))
}
