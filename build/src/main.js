//入口文件
import Vue from 'vue'

//1导入路由的包
import VueRouter from 'vue-router'
//安装路由
Vue.use(VueRouter)

//导入格式化时间的插件
import moments from 'moment'
//定义时间过滤器
Vue.filter('dateFormate',function(dataStr,pattern = "YY-MM-DD HH:mm:ss"){
    return moments(dataStr).format(pattern)
})

//1.1导入mui样式
import './mui/dist/css/mui.min.css'
//购物车样式
import './mui/dist/css/icons-extra.css'

//按需导入mint-ui中的组件
import { Header, Swipe, SwipeItem ,Button } from 'mint-ui';
import 'mint-ui/lib/style.css'
Vue.component(Header.name, Header); 
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);

//导入app根组件
import app from './App.vue'

//1.3导入自己的router js 模块
import router from './router.js'

//2.1导入vue-resource模块
import VueResource from 'vue-resource'
// import moment = require('moment');
// import { format } from 'util';
//2.2安装vue-resource
Vue.use(VueResource)
//设置请求的根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005'
//全局设置post的时候表单格式的组织形式 application/x-www-form-urlencoded
Vue.http.options.emulateJSON = true;

var vm=new Vue({
    el:"#app",
    render: c => c(app),
    router//1.4挂载路由对象到VM实例上
})