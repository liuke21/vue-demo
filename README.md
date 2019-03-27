# vue-demo
新建vuecli项目
2019年3月25号上传
总结一下写这个项目的流程和遇到的坑
 1.大致的框架header区域，中间路由区域，和底部tabbar区域
 2.用到的框架mui和mint-ui
 3.涉及的知识点：路由，父子组件的传值问题，通过api接口进行get请求，mui和mint-ui的使用，缩略图数据的引用，通过引入时间格式化组件对时间的格式化，最重要的是购物车问题，涉及到vuex仓储保存公共数据和一些方法
 4.项目流程：
    4.1：header引用mitn-ui,tabbar引用mui,中间是路由区域(<router-view></router-view>),把路由匹配规则写在router.js里面；路由区域还涉及路由切换的动画
    4.2：主路由包括：主页home、会员member、购物车shopcar、搜索search;具体在App.vue里面;
    4.3.:home页：轮播图区域：需要调用轮播图组件，通过get方法获取轮播图数据；六宫格区域：引用mui；具体在home.vue;
    4.3.1:六宫格：这个区域主要有新闻页=>news组件、图片页=>phote组件、商品页=>goods组件
    4.3.2：新闻页：newslist=>newsinfo:新闻详情需要获取父组件newlist的id: this.$route.params.id将url获取的id传递到newsinfo组件中,get方法时需要加上对应的id；评论区域：先创建评论组件，然后再评论区域调用评论组件，需要把id传递给评论组件:id="this.id,评论子组件通过props:['id']，通过传递进来的id在newsinfo中展示对应的评论
    4.3.3:图片页：photolist=>photoinfo;photolist:顶部活动区域，引用mui,还需要引用对应的js文件，在mounted函数中初始化滑动控件；
    photoinfo:获取父组件的id，缩略图引用mint-ui,还需要调用评论组件
    4.3.4：商品页：goodslist=>goodsinfo=>goinfo
    goodsinfo:1.需要获取子组件goods-number传递的count值@getcount="getselect",子组件goods-number把count传给父组件this.$emit('getcount',count)；加入购物车方法addcar:完成小球加入购物车的动画和拼接一个购物车goodsinfo对象存储到vuex公共仓储中：this.$store.commit("addToCar",goodsinfo)
    4.4：购物车页面：1.获取添加到购物车的商品：api接口需要把商品列表的id拼接出来，通过this.$store.state.car.forEach(item=>idArr.push(item.id))把仓储里商品的id获取并添加到idArr列表里面，再通过api接口get到购物车里的商品；2.number的值是在vuex里getter方法里设置了对应id的数量o[item.id]=item.count,传递给子组件goodscarnum显示出对应的count值，并把goodsid传递进来，在子组件设置countchange方法，通过+ -修改仓储中商品的数量
