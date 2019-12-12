<template>
    <div class='homepage'>
        <Header />
        <div style="background-color: #f2f2f2">
            <!------------------手机数码开始------------------------->
            <section class="Home_Goods">
                <div class="gray-box" style="border:none">
                    <div class="title">
                        <h2>手机数码</h2>
                        <div>
                            <slot name="right"></slot>
                        </div>
                    </div>
                    <!--内容-->
                    <div>
                        <slot name="content"></slot>
                    </div>
                </div>
                <el-row>
                    <el-col :span="6" v-for="(item, i) in goods_list" :key="i" :offset="0">
                        <div class="card" @click="GoGoodDetail(item.id)">
                            <el-card :body-style="{ padding: '0px',height:'400px' }" shadow="hover" style="border:none" >
                                <img :src="'http://localhost:3000/' +item.source_img" class="image">
                                <div style="padding: 14px;">
                                    <div class="price">￥{{item.goods_price}}</div>
                                    <div class="bottom clearfix">
                                        <!-- <time class="time">{{currentDate}}</time> -->
                                        <el-button type="text" class="button">查看详情</el-button>
                                    </div>
                                </div>
                            </el-card>
                        </div>
                    </el-col>
                </el-row>
            </section>
            <!------------------------手机数码结束------------------------->
        </div>
    </div>
</template>

<script>
    import Header from "./../../components/Header";
    export default {
        name: "HomePage",
        components: {Header},
        // currentDate: new Date()
        data(){
            return{
             goods_list:[],
             goods_class:''
            }
        },
        created(){
            this.goods_class= this.$route.params.goods_class;
            this.$axios.post('http://localhost:3000/api/source/class',{
                goods_class:this.goods_class
            })
            .then(res=>{
                    if(res.data.state === 1){ // 成功
                        //console.log(result);
                        console.log(res.data);
                        this.goods_list = res.data.data
                    }else { //失败
                        alert(result.msg);
                    }
                })
        },
        methods:{
            GoGoodDetail(goods_id){
                console.log(goods_id);
                this.$router.push({name:'GoodDetail',params:{goods_id:goods_id}})
            }
        }
    }
</script>

<style scoped>
    .homepage{
        width:100%;
        height: 100%;
    }
    .el-carousel__item h3 {
        color: #475669;
        font-size: 18px;
        opacity: 0.75;
        line-height: 300px;
        margin: 0;
    }
    .Home_Goods{
        margin: 40px 150px;
        font-size: 30px;
    }
    .time {
        font-size: 13px;
        color: #999;
    }
    .bottom {
        margin-top: 13px;
        line-height: 12px;
    }
    .button {
        padding: 0;
        float: right;
    }
    .card{
        width: 100%;
        height: 100%;
        transition: all .5s;
    }
    .card:hover{
        transform: translateY(-3px);
        box-shadow: 1px 1px 20px #999;
    }
    .image {
        width: 100%;
        height: 80%;
        /* text-align: center;
        transform: transformX(50%);
        display: block; */
    }
    .price{
        font-size: 20px;
        color: red
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    .clearfix:after {
        clear: both
    }
    .gray-box {
        position: relative;
        margin-bottom: 0px;
        overflow: hidden;
        background: #fff;
        border-radius: 8px;
        border: 1px solid #dcdcdc;
        border-color: rgba(0, 0, 0, .14);
        box-shadow: 0 3px 8px -6px rgba(0, 0, 0, .1);
    }
    .title {
        padding-left: 30px;
        position: relative;
        z-index: 10;
        height: 60px;
        padding: 0 10px 0 24px;
        border-bottom: 1px solid #d4d4d4;
        border-radius: 8px 8px 0 0;
        box-shadow: rgba(0, 0, 0, .06) 0 1px 7px;
        background: #f3f3f3;
        background: -webkit-linear-gradient(#fbfbfb, #ececec);
        background: linear-gradient(#fbfbfb, #ececec);
        line-height: 60px;
        font-size: 18px;
        color: #333;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    h2 {
        font-size: 18px;
        font-weight: 400;
        color: #626262;
        display: inline-block;
    }


</style>
