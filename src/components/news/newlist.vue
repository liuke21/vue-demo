<template>
    <div>
        <ul class="mui-table-view">
			<li class="mui-table-view-cell mui-media" v-for="item in getList" :key="item.id">
				<router-link :to="'/home/newsinfo/' + item.id">
					<img class="mui-media-object mui-pull-left" :src="item.img_url">
					<div class="mui-media-body">
						<h1>{{item.title}}</h1>
						<p class='mui-ellipsis'>
                            <span>发表于:{{item.add_time | dateFormate}}</span>
                            <span>浏览次数:{{item.click}}</span>
                        </p>
					</div>
				</router-link>
			</li>		
		</ul>
    </div>
</template>

<script>
export default {
    data(){
        return{
            getList:[]
        }
    },
    created(){
        this.getlist()
    },
    methods:{
        getlist(){
            this.$http.get("api/getnewslist").then(result=>{
                this.getList=result.body.message
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .mui-table-view{
      li{
        h1{
            font-size: 14px;
        }
        .mui-ellipsis{
            font-size: 12px;
            color: #226aff;
            display: flex;
            justify-content: space-between;
        }
      }
    }
</style>
