import Router from 'vue-router'

//导入路由组件
import home from './components/tabbar/home.vue'
import member from './components/tabbar/member.vue'
import shopcar from './components/tabbar/shopcar.vue'
import search from './components/tabbar/search.vue'
import Newlist from './components/news/newlist.vue'
import newsinfo from './components/news/newinfo.vue'
import photolist from './components/photo/photolist.vue'
import goodslist from './components/goods/goodslist.vue'
import goodsinfo from './components/goods/goodsinfor.vue'

var router = new Router({
  routes:[//匹配路由规则
    {path:'/',redirect:'/home'},
    {path:'/home',component:home},
    {path:'/member',component:member},
    {path:'/shopcar',component:shopcar},
    {path:'/search',component:search},
    {path:'/home/newlist',component:Newlist},
    {path:'/home/newsinfo/:id',component:newsinfo},
    {path:'/home/photolist',component:photolist},
    {path:'/home/goodslist',component:goodslist},
    {path:'/home/goodsinfo/:id',component:goodsinfo, name:'getInfo'}
  ],
  linkActiveClass:'mui-active'//覆盖默认路由高亮的类
})

//把router对象暴露出来
export default router