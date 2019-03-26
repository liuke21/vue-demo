<template>
    <div class="goodsdesc-continer">
        <h2>{{goodsdesc.title}}</h2>
        <hr>
        <div class="content" v-html="goodsdesc.content"></div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            id:this.$route.params.id,
            goodsdesc:[]//图文详情列表
        }
    },
    created(){
        this.getgoodsDesc()
    },
    methods:{
        getgoodsDesc(){
            this.$http.get('api/goods/getdesc/' + this.id).then(result=>{
                this.goodsdesc=result.body.message[0]
                console.log(result.body)
            })
        }
    }
}
</script>
<style lang="scss">
.goodsdesc-continer{
    h2{
        font-size: 16px;
        color: #226aff;
        margin: 15px 0px;
    }
    .content{
        img{
        width: 100%;
    }
    }
}
</style>
