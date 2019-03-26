<template>
    <div class="mui-numbox">
		<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
		<input class="mui-input-numbox" type="number" value="1" @change="countchange" ref="boxnumber"/>
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
           this.$emit('getcount',parseInt(this.$refs.boxnumber.value)) 
        }
    }
}
</script>
<style lang="scss" scoped>

</style>
