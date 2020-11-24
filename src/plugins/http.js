//插件模块
import axios from 'axios'

const MyHttpServer = {}

MyHttpServer.install = function (Vue) {

  //设置请求发送的url
  /*axios.defaults.baseURL='http://localhost:18081/'*/
  // 4. 添加实例方法
  Vue.prototype.$http = axios
}

export default MyHttpServer
