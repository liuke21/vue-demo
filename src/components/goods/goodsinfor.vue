<template>
    <div class="goodsinfo-continer">
        <!-- 加入购物车动画 -->
        <transition
        @befor-enter="beforeEnter"
        @enter="Enter"
        @after-enter="afterEnter"
        >
            <div class="bull" v-if="flag" ref="ball"></div>
        </transition>
       <!-- 这是商品轮播图区域 -->
       <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<swiper :lunbolist="lunbo" :isfull="false"></swiper>
					</div>
				</div>
			</div>
       <!-- 这是商品购买区域 -->
       <div class="mui-card">
				<div class="mui-card-header">{{goodsinfo.title}}</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
                        <p class="price">
                            市场价:<del>{{goodsinfo.market_price}}</del>&nbsp;&nbsp;&nbsp;&nbsp;销售价:<span class="now_price">{{goodsinfo.sell_price}}</span>
                        </p>
                        <p class="buy">购买数量:<numbox @getcount="getselect"></numbox></p>
                        <p>
                            <mt-button type="primary" size="small" >立即购买</mt-button>
                            <mt-button type="danger" size="small" @click="addcar">加入购物车</mt-button>
                        </p>
					</div>
				</div>
        </div>
       <!-- 这是商品参数区域 -->
       <div class="mui-card">
				<div class="mui-card-header">商品参数</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
                        <p>商品货号:{{goodsinfo.goods_no}}</p>
                        <p>库存情况:{{goodsinfo.stock_quantity-selectcount}}</p>
                        <p>上架时间:{{goodsinfo.add_time |dateFormate}}</p>
					</div>
				</div>
				<div class="mui-card-footer">
                    <mt-button type="primary" size="large" plain @click="goInfo(id)">图文介绍</mt-button>
                    <mt-button type="danger" size="large" plain @click="goComm(id)">商品评论</mt-button>
                </div>
			</div>
    </div>
</template>
<script>
import swiper from '../swiper/swiper.vue'
import numbox from '../goods/goods-nember'
export default {
    data(){
        return{
            id:this.$route.params.id,
            lunbo:[],//轮播图数组
            goodsinfo:[],
            flag:false,
            selectcount:1//默认刚开始选择框的值为1
        }
    },
    created(){
        this.getlunbo()
        this.getgoodsinfo()
    },
    methods:{
        getlunbo(){
            this.$http.get("api/getthumimages/" + this.id).then(result=>{
                var car=result.body.message.forEach(item=>{
                    item.img=item.src
                })
                this.lunbo=result.body.message
            })
        },
        getgoodsinfo(){
            this.$http.get('api/goods/getinfo/' + this.id).then(result=>{
                this.goodsinfo=result.body.message[0]
            })
        },
        goInfo(id){
            this.$router.push({name:'gogoodsInfo',params:{id}})
        },
        goComm(id){
            this.$router.push({name:'gocoms',params:{id}})
        },
        addcar(){
            this.flag=!this.flag
            //{id：商品的id，count：要购买的数量，price:商品的价格，selected：false}
            //拼接一个加入购物车的对象
            var goodsinfo={
                id:this.id,
                count:this.selectcount,
                price:this.goodsinfo.sell_price,
                selected:true}
            //调用store中的mutations来将商品加入购物车
            this.$store.commit("addToCar",goodsinfo)
        },
        beforeEnter(el){
            el.style.transform="translate(0px,0px)"
        },
        Enter(el,done){
            el.offsetWidth
            //获取小球在页面中的位置
            const ballposition=this.$refs.ball.getBoundingClientRect();
            //获取购物车徽标在页面中的位置
            const carposition=document.getElementById("badge").getBoundingClientRect();
            //取他们位置的差值得出小球移动的位置
            const moveX = carposition.left - ballposition.left
            const moveY = carposition.top - ballposition.top
            el.style.transform=`translate(${moveX}px,${moveY}px)`
            el.style.transition='all 1s ease'
            //done()直接调用后面的afterEnter函数
            done()
        },
        afterEnter(el){
            // flag取反 flag true=>flase小点消失
            this.flag=!this.flag
        },
        getselect(count){//从子组件中得到选择框里的值,即将子组件count传递过来
            this.selectcount=count
        }
    },
     components:{
            swiper,
            numbox
        }
}
</script>
<style lang="scss" scoped>
    .goodsinfo-continer{
        background-color: whitesmoke;
        overflow: hidden;
        position: relative;
        .now_price{
            color: red;
            font-size:16px;
            font-weight:bold;
        }
        .buy{
            font-size: 18px;
            font-weight: bold;
        }
        .mui-card-footer{
            display: block;
            .mint-button{
                margin-bottom: 15px;
            }
        }
        .bull{
            width: 15px;
            height: 15px;
            border-radius: 50%;
            z-index: 999;
            background-color: red;
            position: absolute;
            top: 358px;
            left: 157px;
        }
    }
</style>
