import Vue from 'vue'
import Router from 'vue-router'
import Add from '@/components/Add'
import List from '@/components/List'
import Detail from '@/components/Detail'
//import Hello from '@/components/Hello'

Vue.use(Router);

export default new Router({
  routes: [//配置路由
    {
     path:'/add',//如果是大写，会自动转成小写
      component:Add,
    },
    {
      path:'/list',
      component:List,
    },
    {
      path:'/detail/:id',//detail/1  this.$route.params.id
      component:Detail,
      name:'detail'
    }
  ]
})
