// 首页的

// actionType
import axios from 'axios'

const GET_LIST = 'INDEX/GET_LIST'

// actionCreator
const changeList = list => ({
  type: GET_LIST,
  list
})

// get
export const getIndexList = server => {
  return (dispatch, getState, axiosInstance) => {
    return axios.get('http://localhost:9090/api/course/list')
      .then(res => {
        console.log(res)
        const { list } = res.data

        dispatch(changeList(list))
      })
  }
}

// 默认数据
const defaultState = {
  list: []
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case GET_LIST:
      const newState = {
        ...state,
        list: action.list
      }
      return newState

    default:
      return state
  }
}
