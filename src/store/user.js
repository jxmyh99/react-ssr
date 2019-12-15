// 首页的

// actionType
import axiosIns from '../../utils/axiosInstance'

const GET_LIST = 'INDEX/USER_INFO'

// actionCreator
const changeList = list => ({
  type: GET_LIST,
  list
})

// get
export const getUserInfo = server => {
  return (dispatch, getState, axiosInstance) => {
    return axiosIns.get('http://localhost:9090/api/user/info')
      .then(res => {
        const { data } = res.data
        console.log('用户信息', data)

        dispatch(changeList(data))
      })
  }
}

// 默认数据
const defaultState = {
  userinfo: []
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case GET_LIST:
      const newState = {
        ...state,
        userinfo: action.list
      }
      return newState

    default:
      return state
  }
}
