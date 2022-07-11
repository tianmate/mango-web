//核心组件APP.vue
import Vue from 'vue'
import App from './App.vue'
//vuex
import store from './store/index';
//重置样式
import './assets/css/reset.css'
import './assets/css/base.css'
import './assets/css/common.css'

import '@/assets/css/mango.scss' //
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
import RightToolbar from "./layout/RightToolbar"
import { parseTime, resetForm, addDateRange, selectDictLabel, selectDictLabels, handleTree } from "@/utils/mango";
// ElementUI
import ElementUI, {Message} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import directive from './directive' // directive
Vue.use(directive)

//cookie
import Cookies from 'js-cookie';
window.Cookies = Cookies;

//字典
// 字典标签组件
import DictTag from '@/components/DictTag'
// 字典数据组件
import DictData from '@/components/DictData'
Vue.component('DictTag', DictTag)
DictData.install()

//自定义封装接口
import apis from "./network/api";
window.capis = apis;

// 分页组件
import Pagination from "@/layout/Pagination";
Vue.component('RightToolbar', RightToolbar)
Vue.config.productionTip = false
// 全局组件挂载
Vue.component('Pagination', Pagination)
import { getDicts } from "@/api/system/dict/data";
// 全局方法挂载
Vue.prototype.getDicts = getDicts
// Vue.prototype.getConfigKey = getConfigKey
Vue.prototype.parseTime = parseTime
Vue.prototype.resetForm = resetForm
Vue.prototype.addDateRange = addDateRange
Vue.prototype.selectDictLabel = selectDictLabel
Vue.prototype.selectDictLabels = selectDictLabels
// Vue.prototype.download = download
Vue.prototype.handleTree = handleTree
Vue.prototype.resetForm = resetForm
Vue.prototype.$message = Message

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
