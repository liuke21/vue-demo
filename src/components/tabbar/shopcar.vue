<template>
    <div class="goodscarinfo-continer">
        <!-- 商品购买 -->
        <div class="mui-card">
			<div class="mui-card-content">
				<div class="mui-card-content-inner" v-for="(item, i) in shoplist" :key="item.id">
                    <mt-switch 
                    v-model="$store.getters.getgoodselect[item.id]"
                    @change="selectChange(item.id,$store.getters.getgoodselect[item.id])"></mt-switch> 
                    <img :src="item.thumb_path" alt="">
                    <div class="carinfo">
                        <h1>{{item.title}}</h1>
                        <p>
                            <span>${{item.sell_price*$store.getters.getShopid[item.id]}}</span>
                            <!-- numbox父组件把值传递给子组件initcount对应id的数量，goodsid商品的id -->
                            <numbox :initcount="$store.getters.getShopid[item.id]" :goodsid="item.id"></numbox>
                            <a @click.prevent="removegoods(item.id,i)">删除</a>
                        </p>
                    </div>
                </div>
			</div>
        </div>
        <!-- 商品结算 -->
        <div class="mui-card">
			<div class="mui-card-content">
				<div class="mui-card-content-inner jiesuan">
                   <div class="left">
                       <p>总计(不含运费)</p>
                       <p>已勾选商品 <span class="red">{{$store.getters.getgoodsprice.count}}</span> 件, 总计: <span class="red">￥{{$store.getters.getgoodsprice.mount}}</span></p>
                   </div>
                   <mt-button type="danger">去结算</mt-button>
				</div>
			</div>
        </div>
    </div>
</template>
<script>
import numbox from '../goods/goodscarnum'
export default {
    data(){
        return{
            shoplist:[],//购物车列表
        }
    },
    created(){
        this.getcarinfo()
    },
    methods:{
        getcarinfo(){
            var idArr=[];
            //设置一个空列表，把store里的商品id添加到idArr里面
            this.$store.state.car.forEach(item=>idArr.push(item.id));
            //如果刚开始购物车没有数据，即数组为空，return返回，防止因列表为空报错
            if(idArr==0){
                return;
            }
            //api接口需要把商品列表的id拼接出来
            this.$http.get('api/goods/getshopcarlist/' + idArr.join(",")).then(result=>{
                this.shoplist=result.body.message
            })
        },
        removegoods(id,index){//删掉购物车对应id的商品
            this.shoplist.splice(index,1);//删掉页面中的商品
            this.$store.commit('remove',id)//通过vuex仓储删掉localstorage中的数据
        },
        selectChange(id,val){
            //每当点击开关把最新的状态同步到store中
            this.$store.commit('updateselected',{id,selected:val})
        }
    },
    components:{//注册numbox组件
        numbox
    }
}
</script>

<style lang="scss" scoped>
    .goodscarinfo-continer{
        .mui-card{
            margin: 10px 5px;
            .mui-card-content-inner{
                display: flex;
                align-items: center;
                h1{
                    font-size: 13px;
                }
                img{
                    width: 60px;
                    height: 60px;
                    margin: 0 3px;
                }
                span{
                    color: red;
                    font-size: 15px;
                    font-weight: bold;
                }
                
            }
            .jiesuan{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .red{
                        color: red;
                        font: 16px;
                        font-weight: bold;
                    }
                }
        }
    }
</style>
