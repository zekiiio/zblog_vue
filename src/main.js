import Vue from 'vue';
import App from './App';
import router from './router';

//导入并使用element-ui插件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from "element-ui/lib/locale/lang/en";
Vue.use(ElementUI, {locale});
//导入自定义的style
import '@/assets/css/reset.css'
//导入自动以插件
import MyHttpServer from "@/plugins/http.js";
Vue.use(MyHttpServer);

Vue.config.productionTip = false;

//导入时间插件
import moment from "moment";
//fmtdate全局过滤器 - 处理日期
Vue.filter('fmtdate',(v)=>{
  return moment(v).format('YYYY-MM-DD')
})

//导入markdwon插件
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
});
