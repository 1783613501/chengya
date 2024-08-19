import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css'

import Element from 'element-ui'

// 数据字典
import dict from './components/Dict'

// 权限指令
import checkPer from '@/utils/permission'
import permission from './components/Permission'
import './assets/styles/element-variables.scss'

// global css
import './assets/styles/index.scss'

import App from './App'
import store from './store'
import router from './router/routers'
import axios from 'axios'
import './assets/icons' // icon
import './router/index' // permission control
/** *******************请求响应拦截器**************************/
const axiosInstance = axios.create({

  timeout: 6000, //请求超时时长
  headers:{
    'Content-Type':'application/x-www-form-urlencoded',

  },
  // BASE_URL: '/api',
  transformRequest:[function(data,headers){
    // return qs.stringify(data)
  }],
})

//请求拦截器:
axiosInstance.interceptors.request.use((config) => {
  // config.data=qs.stringify(config.data)
  return config
}, (error) => {
  //debugger
  Message.error('请求异常')
  return Promise.reject(error)
});
//
// //响应拦截器:
axiosInstance.interceptors.response.use((response) => {
  //debugger
  const data = response.data
  // 响应码拦截处理
  switch (data.code) {
		case 500:
				Message.error('服务器故障，请稍后再试!');
				break;
		case 301:
				Message.error('token过期,请重新登录!');
				router.push('/login');
				break;
  }
  return response
}, (error) => {
  return Promise.reject(error)
})


Vue.use(checkPer)
Vue.use(permission)
Vue.use(dict)
Vue.use(Element, {
  size: Cookies.get('size') || 'small' // set element-ui default size
})

Vue.config.productionTip = false
// bus总线
Vue.prototype.$bus = new Vue()
Vue.prototype.$axios = axios
//本地测试的时候跨域的baseURL
axios.defaults.baseURL = '/api'
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
