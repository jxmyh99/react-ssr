import axios from 'axios'

export default axios.create({
  baseURL: 'localhost:9090'
  // proxy: {
  //   host: '127.0.0.1',
  //   port: 9090
  // }
})
