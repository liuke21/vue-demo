<template>
  <div class="app-continer">
    <!-- 顶部header区域 -->
    <mt-header fixed title="刘科">
			<span slot="left" @click="goBack" v-show="flag">
        <mt-button icon="back">返回</mt-button>
      </span>
		</mt-header>

    <!-- 中间路由区域 -->
		<transition>
			<router-view></router-view>
		</transition>
		
    <!-- 底部tab区域 -->
    <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item-lk " to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item-lk" to="/member">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item-lk" to="/shopcar">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge" id="badge">{{$store.getters.getAllcount}}</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item-lk" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>
  </div>
</template>
 
<script>
export default{
	data(){
		return{
			flag:false
		}
	},
	created(){
		this.flag= this.$route.path==='/home' ? false : true
	},
	methods:{
		goBack(){
				//点击后退
				this.$router.go(-1)
			}
	},
	watch:{//监听路由地址，如果在主页flag=false不显示返回按钮
		'$route.path':function(val){
			if(val=='/home'){
				this.flag=false
			}else{
				this.flag=true
			}
		}
	}
}
</script>

<style lang="scss" scoped>
// *{
// 	touch-action: none;//指定某个区域是否允许用户操作
// }
  .app-continer{
    padding-top: 40px;
		padding-bottom: 40px;
		overflow-x: hidden;
  }
	.mint-header.is-fixed{
		z-index: 99;
	}
	.v-enter{
		opacity: 0;
		transform: translateX(100%);
	}
	.v-leave-to{
		opacity: 0;
		transform: translateX(-100%);
		position:absolute;
	}
	.v-enter-active,
	.v-leave-active{
		transition: all .3s ease;
	}
	//改类名解决tabbar无法切换的问题
	.mui-bar-tab .mui-tab-item-lk.mui-active {
    color: #007aff;
	}
	.mui-bar-tab .mui-tab-item-lk {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}
.mui-bar-tab .mui-tab-item-lk .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}
.mui-bar-tab .mui-tab-item-lk .mui-icon~.mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
