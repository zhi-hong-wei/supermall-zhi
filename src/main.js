import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from '@/store/store'
import toast from 'components/common/toast'
import FastClick from 'fastclick'
import LazyLoad from 'vue-lazyload'  /*1.安装 2.引入 3.use创建 4.改src*/

Vue.config.productionTip = false
Vue.prototype.$bus=new Vue()
/*安装toast插件*/
Vue.use(toast)
// 解决移动客户端300ms的延迟
FastClick.attach(document.body)
//解决懒加载问题
Vue.use(LazyLoad)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
