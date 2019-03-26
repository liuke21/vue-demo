//入口文件
import Vue from 'vue'

//1导入路由的包
import VueRouter from 'vue-router'
//安装路由
Vue.use(VueRouter)
var car =JSON.parse(localStorage.getItem('car') || '[]')
//导入vuex的包
import Vuex from 'vuex'
//new一个vuex.store实例，得到一个数据仓储对象
Vue.use(Vuex)
var store = new Vuex.Store({
    state:{//this.$store.state.***存放组件的公共数据
        car:car//将购物车数据存储在car数组中
    },
    mutations:{//this.$store.commit('方法名称','按需传递唯一参数')
        addToCar(state,goodsinfo){
            //点击加入购物车，将商品信息保存到store中的car上
            //分析：
            //1.如果之前购物车里已经有该商品的信息，只用更新数量就行
            //2.如果没有直接把商品数据psh到car即可
            //刚开始在购物车没有找到对用的商品
            var flag = false
            state.car.some(item=>{
                if(item.id==goodsinfo.id){
                    item.count+=parseInt(goodsinfo.count)
                    flag=true
                    return true
                }
            })
            //如果循环完毕后没找到，直接把商品对象加入car列表
            if(!flag){
                state.car.push(goodsinfo)
            }
            //当更新完后保存到本地
            localStorage.setItem('car',JSON.stringify(state.car))
        },
        //通过numberbox里的加减更新car里对应id的count数量
        updategoodsinfo(state,goodsinfo){
            state.car.some(item=>{
                if(item.id==goodsinfo.id){
                    item.count=parseInt(goodsinfo.count)
                    return true
                }
            })
            localStorage.setItem('car',JSON.stringify(state.car))
        },
        //通过删除键，删掉购物车里的对应id的商品
        remove(state,id){
            state.car.some((item,index)=>{
                if(item.id==id){
                    state.car.splice(index,1)
                    return true
                }
            })
            //当更新完后保存到本地
            localStorage.setItem('car',JSON.stringify(state.car))
        },
        updateselected(state,info){//将select的状态传递进来
            state.car.forEach(item=>{
                if(item.id==info.id){
                    item.selected=info.selected
                }
            })
            //当更新完后保存到本地
            localStorage.setItem('car',JSON.stringify(state.car))
        }
    },
    getters:{//this.$store.getters.***相当于一个计算属性
        //计算购物车徽标的数量
        getAllcount(state){
            var c=0;
            state.car.forEach(item=>{//通过循环每一个item的属性得到所有item包含的所有数量
                c+=item.count
            })
            return c
        },
        getShopid(state){//得到商品id对应的数量
            var o={}
            state.car.forEach(item=>{
                o[item.id]=item.count
            })
            return o
        },
        getgoodselect(state){
            var o={}
            state.car.forEach(item =>{
                o[item.id]=item.selected
            })
            return o
        },
        getgoodsprice(state){
            var c={
                count:0,
                mount:0//勾选的总价
            }
            state.car.forEach(item=>{
                if(item.selected){
                    c.count+=item.count
                    c.mount+=item.price*item.count
                }
            })
            return c
        }
    }
})

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
// import { Header, Swipe, SwipeItem ,Button ,Lazyload } from 'mint-ui';
// import 'mint-ui/lib/style.css'
// Vue.component(Header.name, Header); 
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);
// Vue.use(Lazyload);
import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'
//安装图片预览组件
import VuePreview from 'vue-preview'

// defalut install
Vue.use(VuePreview)

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
Vue.http.options.emulateJSON = true

var vm=new Vue({
    el:"#app",
    render: c => c(app),
    router,//1.4挂载路由对象到VM实例上
    store//将vuex创建的store 挂在到vm实例上
})