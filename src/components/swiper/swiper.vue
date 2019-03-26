<template>
    <div>
        <mt-swipe :auto="4000">
            <!-- 谁使用轮播图谁就传递lunbolist列表数据 -->
            <mt-swipe-item v-for="(item,index) in lunbolist" :key="index">
               <img :src="item.img" alt="" :class="{full:isfull}">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>
<script>
export default {
    props:['lunbolist','isfull']
}
</script>
<style lang="scss" scoped>
    .mint-swipe{
        height:200px;
        background-color:white;
    }
    .mint-swipe-item{
        text-align: center;
    }
    .mint-swipe-item img{
        // width: 100%;
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
    .full{
        width: 100%;
    }
</style>
