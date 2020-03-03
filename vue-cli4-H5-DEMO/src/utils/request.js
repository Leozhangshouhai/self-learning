import axios from 'axios'
import qs from 'qs'
import { Toast } from 'vant'

// axios.defaults.withCredentials = true // 若跨域请求需要带 cookie 身份识别
// create an axios instance
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
  withCredentials: true,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
  },
})

// request interceptor
service.interceptors.request.use(
  (config) => {
    if (config.data) {
      config.data = qs.stringify(config.data);
    } else {
      config.data = config.params;
    }
    return config
  },
  (error) => {
    console.error(error) // for debug
    return Promise.reject(error)
  },
)

// response interceptor
service.interceptors.response.use(
  (response) => {
    const res = response.data
    // 如果状态码不是0 则抛出一个错误
    if (res.code !== 0) {
      Toast.fail(res.message)
      return Promise.reject(res)
    }
    return res.data
  },
  (error) => {
    Toast.fail({
      duration: 0,
      message: error.message,
    })
    return Promise.reject(error)
  },
)

export default service
