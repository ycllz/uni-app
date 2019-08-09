import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

//全局注入w-loading组件 
import wLoading from "@/common/w-loading.vue";
Vue.component('w-loading',wLoading)

import Row from './components/dl-grid/row.vue'
import Col from './components/dl-grid/col.vue'
Vue.component('u-row', Row); //<row>和<col>为H5原生标签, 不能直接用, 可起名<u-row>或者其他的
Vue.component('u-col', Col);


//flex 布局
import FlexLayout from './components/phj-flex/'
Vue.use(FlexLayout)
/* import sunUiBasic from './components/sunui-upimg/sunui-upimg-basic.vue'
Vue.component('sunui-upbasic',sunUiBasic) */


Vue.prototype.$serverUrl = 'https://unidemo.dcloud.net.cn';

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()