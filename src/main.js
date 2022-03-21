//核心组件APP.vue
import Vue from 'vue'
import App from './App.vue'
//vuex
import store from './store/index';
//重置样式
import './assets/css/reset.css'
import './assets/css/base.css'
import './assets/css/common.css'
//路由
import router from './router'

import './permission' // permission control

//定义插件
import plugins from './plugins'
Vue.use(plugins)
//axios
import axios from 'axios'
Vue.prototype.$http = axios;
// 自定义表格工具组件
import RightToolbar from "./components/RightToolbar"
import { parseTime, resetForm, addDateRange, selectDictLabel, selectDictLabels, handleTree } from "@/utils/ruoyi";
// ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//cookie
import Cookies from 'js-cookie';
window.Cookies = Cookies;


//自定义封装接口
import apis from "./network/api";
window.capis = apis;

// 分页组件
import Pagination from "@/components/Pagination";
Vue.component('RightToolbar', RightToolbar)
Vue.config.productionTip = false
// 全局组件挂载
Vue.component('Pagination', Pagination)


Vue.prototype.resetForm = resetForm
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
