<template>
    <div class="goodslist-continer">
        <!-- <router-link :to="'/home/goodsinfo/' + item.id" class="goods-item" v-for="item in goodslist" :key="item.id" tag="div">
            <img :src="item.img_url" alt="">    
            <h1 class="title">{{item.title}}</h1>
            <div class="info">
                <p>
                    <span class="now">${{item.sell_price}}</span>
                    <span class="old">${{item.market_price}}</span>
                </p>
                <p>
                    <span>热卖中</span>
                    <span>剩余:999+</span>
                </p>
            </div>   
        </router-link> -->
        <!-- 使用router的编程式导航 -->
        <div class="goods-item" v-for="item in goodslist" :key="item.id" @click="getinfo(item.id)">
            <img :src="item.img_url" alt="">    
            <h1 class="title">{{item.title}}</h1>
            <div class="info">
                <p>
                    <span class="now">${{item.sell_price}}</span>
                    <span class="old">${{item.market_price}}</span>
                </p>
                <p>
                    <span>热卖中</span>
                    <span>剩余:999+</span>
                </p>
            </div>   
        </div>
    <mt-button type="danger" size="large" @click="getmore">加载更多</mt-button>
    </div>
</template>
<script>
export default {
    data(){
        return{
            PageIndex:1,
            goodslist:[]
        }
    },
    created(){
        this.getgoodlist()
    },
    methods:{
        getgoodlist(){
            this.$http.get("api/getgoods" + "?pageindex=" + this.PageIndex).then(result=>{
                this.goodslist=this.goodslist.concat(result.body.message)
            })
        },
        getmore(){//设置添加更多事件
            this.PageIndex++
            this.getgoodlist()
        },
        getinfo(id){
            this.$router.push({ name: 'getInfo', params: { id }})
        }
    }
}
</script>
<style lang="scss" scoped>
    .goodslist-continer{
        display: flex;
        flex-wrap: wrap;//换行
        padding: 0 5px;
        justify-content: space-between;
        margin-bottom: 40px;
        img{
            width: 100%;
        }
        .goods-item{
            padding-bottom: 64px;
            position: relative;
            margin-top: 6px;
            width: 49%;
            border: 1px solid whitesmoke;
            box-shadow: 0 0 6px gainsboro
        }
        h1{
            font-size: 18px;
        }
        .info{
                width: 100%;
                position: absolute;
                bottom: 0;
                background-color: #eee;
                justify-content: space-between;
                .now{
                font-size: 16px;
                color: red;
                font-weight: bold;
            }
            .old{
                font-size: 14px;
                text-decoration: line-through;
            }
            span{
                margin-right: 35%;
            }
        }
    }
</style>
