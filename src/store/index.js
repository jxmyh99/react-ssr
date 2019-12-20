// 首页的

// actionType
// import axiosIns from '../../utils/axiosInstance'
// import axios from 'axios'

const GET_LIST = 'INDEX/GET_LIST'
// actionCreator
const changeList = list => ({
  type: GET_LIST,
  list
})

// get
export const getIndexList = server => {
  return (dispatch, getState, $axios) => {
    return $axios.get('/api/course/list')
      .then(res => {
        const { list } = res.data
        console.log(123, list)

        dispatch(changeList(list))
      })
      .catch(err => {
        console.info(err)
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
