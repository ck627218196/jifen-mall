<template>
<div class='homepage'>
  <Header />
  <div style="background-color: #f2f2f2">
<!--    轮播图-->

    <section class="Home_Sowing">
      <el-carousel :interval="5000" arrow="always" height='400px'>
        <el-carousel-item v-for="(item, i) in sowinglist" :key="i">
          <!-- <h3>{{ item.img_url }}</h3> -->
          <img :src="item.img_url" class="sowing_img">
        </el-carousel-item>
      </el-carousel>
    </section>
<!--    轮播图end-->

<!------------------手机数码开始------------------------->
    <section class="Home_Goods" >
      <div class="gray-box" style="border:none">
        <div class="title">
          <h2>手机数码</h2>
          <div>
            <slot name="right">
              <div class="moreGoods" @click="morePhones">更多<i class="el-icon-d-arrow-right"></i></div>
            </slot>
          </div>
        </div>
        <!--内容-->
        <div>
          <slot name="content"></slot>
        </div>
      </div>
      <el-row>
        <el-col :span="6" v-for="(item, i) in electronics_list" :key="i" :offset="0" >
          <div class="card" @click="GoGoodDetail(item.id)" >
          <el-card :body-style="{ padding: '0px',height:'400px' }" shadow="hover" style="border:none" >
            <img :src="'http://localhost:3000/' +item.source_img" class="image">
            <div style="padding: 14px;">
              <div class="price">￥{{item.goods_price}}</div>
              <div class="bottom clearfix">
                <!-- <time class="time">{{ currentDate }}</time> -->
                <el-button type="text" class="button">查看详情</el-button>
              </div>
            </div>
          </el-card>
          </div>
        </el-col>
      </el-row>
    </section>
<!------------------手机数码结束------------------------->

<!------------------服饰开始---------------------------->
    <section class="Home_Goods" >
      <div class="gray-box" style="border:none">
        <div class="title">
          <h2>服饰</h2>
          <div>
            <slot name="right">
              <div class="moreGoods" @click="moreCloths">更多<i class="el-icon-d-arrow-right"></i></div>
            </slot>
          </div>
        </div>
        <!--内容-->
        <div>
          <slot name="content"></slot>
        </div>
      </div>
      <el-row>
        <el-col :span="6" v-for="(item, i) in clothing_list" :key="i" :offset="0" >
          <div class="card" @click="GoGoodDetail(item.id)" >
            <el-card :body-style="{ padding: '0px',height:'400px' }" shadow="hover" style="border:none" >
              <img :src="'http://localhost:3000/' +item.source_img" class="image">
              <div style="padding: 14px;">
                <div class="price">￥{{item.goods_price}}</div>
                <div class="bottom clearfix">
                  <!-- <time class="time">{{ currentDate }}</time> -->
                  <el-button type="text" class="button">查看详情</el-button>
                </div>
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </section>
<!----------------------服饰结束---------------------------->

<!----------------------食品开始---------------------------->
    <section class="Home_Goods" >
      <div class="gray-box" style="border:none">
        <div class="title">
          <h2>食品</h2>
          <div>
            <slot name="right">
              <div class="moreGoods" @click="moreEatings">更多<i class="el-icon-d-arrow-right"></i></div>
            </slot>
          </div>
        </div>
        <!--内容-->
        <div>
          <slot name="content"></slot>
        </div>
      </div>
      <el-row>
        <el-col :span="6" v-for="(item, i) in eating_list" :key="i" :offset="0" >
          <div class="card" @click="GoGoodDetail(item.id)" >
            <el-card :body-style="{ padding: '0px',height:'400px' }" shadow="hover" style="border:none" >
              <img :src="'http://localhost:3000/' +item.source_img" class="image">
              <div style="padding: 14px;">
                <div class="price">￥{{item.goods_price}}</div>
                <div class="bottom clearfix">
                  <!-- <time class="time">{{ currentDate }}</time> -->
                  <el-button type="text" class="button">查看详情</el-button>
                </div>
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </section>
<!----------------------食品结束---------------------------->

<!----------------------护肤开始---------------------------->
    <section class="Home_Goods" >
      <div class="gray-box" style="border:none">
        <div class="title">
          <h2>美妆护肤</h2>
          <div>
            <slot name="right">
              <div class="moreGoods" @click="moreCosmetics">更多<i class="el-icon-d-arrow-right"></i></div>
            </slot>
          </div>
        </div>
        <!--内容-->
        <div>
          <slot name="content"></slot>
        </div>
      </div>
      <el-row>
        <el-col :span="6" v-for="(item, i) in cosmetics_list" :key="i" :offset="0" >
          <div class="card" @click="GoGoodDetail(item.id)" >
            <el-card :body-style="{ padding: '0px',height:'400px' }" shadow="hover" style="border:none" >
              <img :src="'http://localhost:3000/' +item.source_img" class="image">
              <div style="padding: 14px;">
                <div class="price">￥{{item.goods_price}}</div>
                <div class="bottom clearfix">
                  <!-- <time class="time">{{ currentDate }}</time> -->
                  <el-button type="text" class="button">查看详情</el-button>
                </div>
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </section>
<!----------------------护肤结束---------------------------->
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
            electronics_list:[],
            clothing_list:[],
            eating_list:[],
            cosmetics_list:[],
            sowinglist:[
              {img_url:require('./../../assets/images/main-content.jpg')},
              {img_url:require('./../../assets/images/蓝牙手表.jpg')},
              {img_url:require('./../../assets/images/丝之物语.jpg')},
              {img_url:require('./../../assets/images/低音炮.jpg')},
            ],
          }
        },
        created(){
          this.$axios.get('http://localhost:3000/api/source/list')
          .then(res=>{
            if(res.data.status === 1){ // 成功
                    // console.log(result);
                    // console.log(res.data);
                    let electronics_list1 = res.data.data.filter(function (item,arr) {
                      return item.goods_class ==='手机数码'
                    });
                    this.electronics_list = electronics_list1.slice(0,8);

                    let clothing_list1 = res.data.data.filter(function (item) {
                      return item.goods_class ==='服饰'
                    });
                    this.clothing_list = clothing_list1.slice(0,8);

                    let eating_list1 = res.data.data.filter(function (item) {
                      return item.goods_class ==='食品'
                    });
                    this.eating_list = eating_list1.slice(0,8);

                    let cosmetics_list1 = res.data.data.filter(function (item) {
                      return item.goods_class ==='护肤'
                    });
                    this.cosmetics_list = cosmetics_list1.slice(0,8);
                }else { //失败
                    alert(result.msg);

                }
          })
          .then(res=>{

          })
        },
        methods:{
          GoGoodDetail(goods_id){
            console.log(goods_id);
            this.$router.push({name:'GoodDetail',params:{goods_id:goods_id}})
          },
          morePhones(){
            this.$router.push({name:'More',params:{goods_class:'手机数码'}})
          },
          moreCloths(){
            this.$router.push({name:'More',params:{goods_class:'服饰'}})
          },
          moreEatings(){
            this.$router.push({name:'More',params:{goods_class:'食品'}})
          },
          moreCosmetics(){
            this.$router.push({name:'More',params:{goods_class:'护肤'}})
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

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  .Home_Sowing{
    margin: 0 150px;
    border: 0px;
    background-color: #ffffff
  }
  .sowing_img{
    width: 100%;
    height: 100%
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
  .moreGoods{
    cursor:pointer;
  }


</style>
