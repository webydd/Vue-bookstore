// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false;
import 'bootstrap/dist/css/bootstrap.css';
//使用vueResource 模块，使用后每个this上都有一个$http 属性
import VueResource from 'vue-resource';
Vue.use(VueResource);

new Vue({
  el: '#app',
  router,
  ...App
});
