<template>
    <div>
		<!-- 顶部滑动区域 -->
        <div id="slider" class="mui-slider">
				<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
					<div class="mui-scroll">
						<!-- v-for循环的时候只把id==0的那一项添加mui-active的类，显示被选中的颜色 -->
						<a :class="['mui-control-item', item.id==0 ? 'mui-active' :'']" href="#item1mobile" data-wid="tab-top-subpage-1.html" v-for="item in category" :key="item.id" @click="getImg(item.id)">
							{{item.title}}
						</a>
					</div>
				</div>
		</div>
		<!-- 图片区域 -->
		<div class="photo-list">
			<ul>
              <router-link :to="'/home/photoinfo/'+ item.id" v-for="item in list" :key="item.id" tag="li">
                 <img v-lazy="item.img_url">
				 <div class="info">
					 <h1 class="title">{{item.title}}</h1>
					 <div class="img-info">{{item.zhaiyao}}</div>
				 </div>
              </router-link>
            </ul>
		</div>
	</div>
</template>

<script>
//导入JS文件
import mui from '../../mui/dist/js/mui.min.js'
export default {
    data(){
        return{
			category:[],
			list:[]
        }
	},
	created(){
		this.getCategory()
		this.getImg(0)
	},
	mounted(){//初始化滑动控件，必须放在mounted函数里面，在加载完展示
			  //到页面的时候调用这个控价，提前放进去因为页面没有展示出来
			  //调用这个空间无效
		mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});
	},
    methods:{
		getCategory(){
			this.$http.get('api/getimgcategory').then(result=>{
				//手动添加一个全部的类的对象
				result.body.message.unshift({title:"全部",id:0});
				this.category=result.body.message;
				// console.log(result.body)
			})
		},
		getImg(cateid){
			this.$http.get('api/getimages/'+ cateid).then(result=>{
				this.list=result.body.message
			})
		}
    }
}
</script>

<style lang="scss" scoped>
*{
	touch-action: pan-y;
}
ul{
	margin:0;
	padding:0 8px;
	li{
		position: relative;
		margin-bottom:10px;
		list-style:none;
		background-color:#ccc;
		text-align:center;
		box-shadow:0 0 6px #999;
		img{
			width:100%;
			vertical-align:middle;
		}
		img[lazy=loading] {
           width: 40px;
           height: 300px;
           margin: auto;
   		}
		.info{
			color: white;
			bottom: 8px;
			text-align: left;
			position: absolute;
			background-color: rgba(0,0,0,0.4);
			max-height: 84px;
			h1{
				font-size: 16px;
			}
			.img-info{
				font-size: 14px;
			}
		}
	}
}
</style>
