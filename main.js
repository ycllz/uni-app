import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

//全局注入w-loading组件 
import wLoading from "@/common/w-loading.vue";
Vue.component('w-loading',wLoading)

import sunUiBasic from './components/sunui-upimg/sunui-upimg-basic.vue'
Vue.component('sunui-upbasic',sunUiBasic)

import yuToast from '@/components/yu-toast/yu-toast'
Vue.component('yu-toast',yuToast)


Vue.prototype.$serverUrl = 'https://unidemo.dcloud.net.cn';

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()