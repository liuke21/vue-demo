<template>
    <div class="mui-numbox">
		<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <!-- 接收父组件numbox传进来的值initcount对应id的数量，goodsid商品的id -->
		<input class="mui-input-numbox" type="number" :value="initcount" @change="countchange" ref="boxnumber" readonly/>
		<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
	</div>
</template>
<script>
import mui from "../../mui/dist/js/mui.min.js";
export default {
    data(){
        return{

        }
    },
    mounted(){
        //初始化数组选择框组件
        mui(".mui-numbox").numbox()
    },
    methods:{
        countchange(){//通过文本框值的改变，把值传递给父组件
           this.$store.commit('updategoodsinfo',{id:this.goodsid,count:this.$refs.boxnumber.value})
        }
    },
    props:['initcount','goodsid']//接受父组件传递进来的值
}
</script>
<style lang="scss" scoped>

</style>
