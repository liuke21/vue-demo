<template>
    <div class="photoinfo-continer">
        <h1>{{photolist.title}}</h1>
        <p class="subtitle">
            <span>
                发表时间:{{photolist.add_time | dateFormate}}
            </span>
            <span>
                点击次数：{{photolist.click}}
            </span>
        </p>
        <hr>
        <!-- 缩略图区域 -->
        <!-- <img class="preview-img" v-for="(item,index) in slide1" :src="item.src" 
            height="100"  :key="item.src"
        > -->
        <div class="thumb">
             <vue-preview :slides="slide1"></vue-preview>
        </div>
        <!-- 内容区域 -->
        <div class="content" v-html="photolist.content"></div>
        <hr>
        <!-- 评论子组件 -->
        <comments :id="this.id"></comments>
    </div>
</template>
<script>
//导入评论子组件
import comments from '../comments/comment.vue'
export default {
    data(){
        return{
            id:this.$route.params.id,
            photolist:[],
            slide1:[]//缩略图列表
        }
    },
    created(){
        this.getinfo()
        this.getThumbs()
    },
    methods:{
        getinfo(){
            this.$http.get('api/getimageInfo/' + this.id).then(result=>{
                this.photolist=result.body.message[0]
            })
        },
        getThumbs(){
            this.$http.get('api/getthumimages/' + this.id).then(result=>{
                result.body.message.forEach(item=>{
                    item.w=600;
                    item.h=400;
                    item.msrc=item.src
                })
             this.slide1=result.body.message;
            })
        }
    },
    components:{
        comments
    }
}
</script>
<style lang="scss" scoped>
.photoinfo-continer{
    padding: 20px 5px;
    h1{
        font-size: 18px;
        text-align: left;
        color: #26a2ff;
        padding-bottom: 15px;
    }
    .subtitle{
        display: flex;
        justify-content: space-between;
        font-size: 13px;
    }
    .thumb{
        img{
           
        }
    }
    .content{
        font-size: 15px;
        line-height: 30px;
    }
}
</style>
