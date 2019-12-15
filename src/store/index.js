// 首页的

// actionType
import axiosIns from '../../utils/axiosInstance'

const GET_LIST = 'INDEX/GET_LIST'
// import axios from 'axios';
// actionCreator
const changeList = list => ({
  type: GET_LIST,
  list
})

// get
export const getIndexList = server => {
  return (dispatch, getState, axiosInstance) => {
    return axiosIns.get('http://localhost:9090/api/course/list')
      .then(res => {
        const { list } = res.data
        console.log(123, list)

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
