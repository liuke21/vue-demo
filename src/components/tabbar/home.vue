<template>
    <div>
        <!-- 这是轮播图区域 调用新建的轮播图组件 -->
        <swiper :lunbolist="lunbolist" :isfull="true"></swiper>
        <!-- 六宫格区域 -->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/newlist">
		                    <!-- <span class="mui-icon mui-icon-home"></span> -->
                            <img src="https://static.easyicon.net/preview/118/1184013.gif" alt="">
		                    <div class="mui-media-body">新闻</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/photolist">
		                    <!-- <span class="mui-icon mui-icon-email"><span class="mui-badge">5</span></span> -->
                            <img src="https://static.easyicon.net/preview/120/1204563.gif" alt="">
		                    <div class="mui-media-body">图片</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/goodslist">
		                    <!-- <span class="mui-icon mui-icon-chatbubble"></span> -->
                            <img src="https://static.easyicon.net/preview/123/1232376.gif" alt="">
		                    <div class="mui-media-body">商品</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <!-- <span class="mui-icon mui-icon-location"></span> -->
                            <img src="https://static.easyicon.net/preview/122/1229062.gif" alt="">
		                    <div class="mui-media-body">位置</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <!-- <span class="mui-icon mui-icon-search"></span> -->
                            <img src="https://static.easyicon.net/preview/122/1223203.gif" alt="">
		                    <div class="mui-media-body">搜索</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <!-- <span class="mui-icon mui-icon-phone"></span> -->
                            <img src="https://static.easyicon.net/preview/122/1227612.gif" alt="">
		                    <div class="mui-media-body">电话</div></a></li>
		        </ul> 
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
import lunbo from '../swiper/swiper.vue';
export default {//导出对象
    data(){
        return{
            lunbolist:[]//轮播图对象列表
        }
    },
    created(){
        this.lunbotu()
    },
    methods:{
        lunbotu(){//获取轮播图方法
            this.$http.get("api/getlunbo").then(result=>{
                if(result.body.status===0){
                    this.lunbolist = result.body.message//将body对象的message数组添加到轮播图列表
                    Toast("加载轮播图成功。。。。")
                }else{
                    Toast("加载轮播图失败。。。。")
                }
            })
        }
    },
    components:{
        'swiper':lunbo
    }
}
</script>           

<style lang="scss" scoped>
    .mint-swipe{
        height:200px;
        background-color: antiquewhite;
    }
    .mint-swipe-item img{
        width: 100%;
        height: 100%;
    }
    .mui-grid-view.mui-grid-9 .mui-table-view-cell{
        width: 33.33%;
        border: none;
    }
    .mui-grid-view.mui-grid-9{
        background-color: white;
        border: none;
    }
    img{
        width: 100%;
    }
</style>
