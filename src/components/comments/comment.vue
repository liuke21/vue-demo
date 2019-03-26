<template>
    <div class="comment-continer">
        <h3>这是评论组件</h3>

        <hr>

        <textarea placeholder="请输入要评论的内容"
        maxlength="120" v-model="value">

        </textarea>

        <mt-button type="primary" size="large" @click="postcom">发表评论</mt-button>
        <div class="com-list">
            <div class="com-item" v-for="(item, index) in comment" :key="index">
                <div class="com-title">
                    第{{index + 1}}楼&nbsp;&nbsp;用户:{{item.user_name}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;发表时间：{{item.add_time |dateFormate}}
                </div>
                <div class="com-body">
                    {{item.content==='undefined' ? '此用户很懒,没有评论...' :item.content}}
                </div>
            </div>
        </div>
        <mt-button type="danger" size="large" plain @click="getmore">加载更多</mt-button>
    </div>
</template>

<script>
import {Toast} from "mint-ui";
export default {
    data(){
        return{
            PageIndex:1,//这是展示的第一页数据
            comment:[],
            value:''
        }
    },
    created(){
        this.getcomment()
    },
    methods:{
        getcomment(){
            this.$http.get("api/getcomments/" + this.id + "?pageindex=" + this.PageIndex).then(result=>{
                this.comment=this.comment.concat(result.body.message)//防止添加新的评论数据把之前的评论覆盖
            })
        },
        getmore(){//设置添加更多事件
            this.PageIndex++
            this.getcomment()
        },
        postcom(){//发表评论
            if(this.value.trim().length===0){
                return Toast("评论不能为空")
            }
            this.$http.post('api/postcomment/' + this.$route.params.id, {content:this.value.trim()}).then(function(result){
                this.comment.unshift({add_time:new Date(),content:this.value.trim(),user_name:"匿名用户"})
                this.value=""

            })
            
        }
    },
    props:['id']
}
</script>

<style lang="scss" scoped>
    .comment-continer{
        padding-bottom: 30px;
        h3{
            font-size: 18px;
        }
        textarea{
            height: 70px;
            margin-bottom: 0;
        }
        .com-list{
            .com-title{
                font-size: 13px;
                background-color:#eee;
            }
        }

    }
</style>
