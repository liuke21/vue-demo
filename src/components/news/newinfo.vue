<template>
    <div class="newsinfo-continer">
        <!-- 标题内容 -->
        <h1 class="title">{{getnewinfo.title}}</h1>
        <!-- 子标题内容 -->
        <p class="subtitle">
            <span>发表时间：{{getnewinfo.add_time | dateFormate}}</span>
            <span>点击次数：{{getnewinfo.click}}</span>
        </p>

        <hr>
        <!-- 内容区域 -->
        <div class="content" v-html="getnewinfo.content"></div>
        <!-- 评论子组件区域 -->
        <com-box :id="this.id"></com-box>
    </div>
</template>

<script>
//导入评论组件
import comment from '../comments/comment.vue';
export default {
    data(){
        return{
            id:this.$route.params.id,//将url获取的id传递到newsinfo组件中,
            getnewinfo:{}
        }
    },
    created(){
        this.getnewsinfo()
    },
    methods:{
       getnewsinfo(){
            this.$http.get('api/getnew/' + this.id).then(result => {
                this.getnewinfo=result.body.message[0]
            })
       }
    },
    components:{//注册评论组件
        'com-box':comment
    }
}
</script>

<style lang="scss" scoped>
    .newsinfo-continer{
        padding: 0 6px;
        .title{
            font-size: 16px;
            text-align: center;
            color: red;
        }
        .subtitle{
            display: flex;
            justify-content: space-between;
            margin: 0;
            color: #226aff;
        }
    }
</style>
