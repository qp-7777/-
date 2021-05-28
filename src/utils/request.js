import axios from 'axios'
import router from '../router'
import store from '../store'
import Cookies from 'js-cookie'
import { Message } from 'element-ui'

axios.defaults.withCredentials = true
axios.defaults.dataType = 'json'
axios.defaults.headers['cache-control'] = 'no-cache'
axios.defaults.headers['Content-Type'] = 'application/json'
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 60000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    // let each request carry token
    // ['X-Token'] is a custom headers key
    // please modify it according to the actual situation
    config.headers['Content-Type'] = 'application/json'
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    console.log(res)
    let msg = null
    // if the custom code is not 20000, it is judged as an error.
    if (res.status == 0 || res.status == -2) {
      // 执行错误  JSON 数据格式错误
      msg = Message({
        message: res.msg || res.error || 'Error',
        type: 'error',
        showClose: true,
        duration: 0
      })
      return Promise.reject(new Error(res.message || res.error || 'Error'))
    } else if (res.status === -1) {
      // 登录失效
      Cookies.remove('session_id')
      Cookies.remove('user_code')
      Cookies.remove('user_real_name')
      Cookies.remove('user_type')
      Cookies.remove('vue_admin_template_token')
      msg = Message({
        message: '登录会话失效，请重新登录',
        type: 'error',
        showClose: true,
        duration: 0
      })
      router.push(`/login`)
      return false
    } else {
      Message.closeAll()
      return res
    }
  },
  error => {
    // || (error+1).indexOf('500') > -1
    if ((error + 1).indexOf('401') > -1) {
      // console.log(router)
      // store.dispatch('user/postError')
      // router.push(`/login`)
    }
    Message({
      message: '网络错误，请稍后重试',
      type: 'error',
      duration: 2 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
