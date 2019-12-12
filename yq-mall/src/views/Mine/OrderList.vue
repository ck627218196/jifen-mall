<template>
  <div>
<!-------------------    我的订单开始      --------------->
    <div class="gray-box" style="border:none;margin-top: 50px;margin-right: 50px ">
      <div class="title">
        <h2>我的订单</h2>
        <div @click="address_add" class="address_add">
        </div>
      </div>
    </div>
<!-------------------    我的订单结束      --------------->

<!-----------------    订单字段开始    ---------------->
    <div class="address_title" style="margin-right: 50px">
      <el-row>
        <el-col :span="4"><div style="text-align: center;line-height: 40px">商品图</div></el-col>
        <el-col :span="3"><div style="text-align: center;line-height: 40px">商品名</div></el-col>
        <el-col :span="3"><div style="text-align: center;line-height: 40px">价格</div></el-col>
        <el-col :span="6"><div style="text-align: center;line-height: 40px">收货地址</div></el-col>
        <el-col :span="3"><div style="text-align: center;line-height: 40px">联系电话</div></el-col>
        <el-col :span="3"><div style="text-align: center;line-height: 40px">联系人</div></el-col>
      </el-row>
    </div>
    <!-----------------    订单字段结束    ---------------->


    <div class="Address"
         style="border:none;margin-right: 50px;margin-bottom: 5px;"
         v-for="(item, i) in order_list"
         :key="i"
    >
      <div >
        <div class="address_content" >
          <el-row>
            <el-col :span="4"><div style="text-align: center;height: 100px;margin-top: 10px" class="GoodsImgBox">
              <img :src="'http://localhost:3000/' +item.goods_img" alt="GoodsImg" class="GoodsImg">
            </div></el-col>
            <el-col :span="3"><div style="text-align: center;line-height: 120px">{{item.goods_class}}</div></el-col>
            <el-col :span="3"><div style="text-align: center;line-height: 120px">{{item.goods_price}}</div></el-col>

            <el-col :span="6"><div style="text-align: center;line-height: 120px">{{item.goods_address}}</div></el-col>
            <el-col :span="3"><div style="text-align: center;line-height: 120px">{{item.goods_phone}}</div></el-col>
            <el-col :span="3"><div style="text-align: center;line-height: 120px">{{item.goods_name}}</div></el-col>
            <el-col :span="2"><div style="text-align: center;line-height: 120px"><el-button type="danger" @click="getback(item.id)">退货</el-button></div></el-col>
          </el-row>
        </div>
      </div>

      </div>

  </div>
</template>

<script>
    export default {
        name: "OrderList",
        data() {
            return {
              order_list:[],
              order_id:''
            }
        },
        mounted(){
          this.getOrders()
        },
        methods:{
            getOrders(){
              let YqMallUser= localStorage.getItem('yqMallUser');
              let YqMallUserobj = JSON.parse(YqMallUser);
              this.$axios.post('http://localhost:3000/api/order/GetOrders',{
                user_id : YqMallUserobj.id
              })
                      .then(res=>{
                        console.log(2222);
                        console.log(res.data.data);
                        if(res.data.state === 1){ // 成功
                          console.log(444);
                          this.order_list = res.data.data;

                        }else { //失败
                          alert(result.msg);
                        }
                      })
                      .catch(res=>{

                      })
            },
            address_add(){

            },
            getback(id){
              this.order_id = id;
              console.log(this.order_id);
              // 1.确认是否继续
              this.$confirm('您确定要发起退货吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                console.log(234);
                //2. 确认则发起请求
                this.$axios.post('http://localhost:3000/api/order/ReduceOrder',{
                  order_id: this.order_id
                }).then((res)=>{
                  console.log(2222);
                  console.log(res.data.data);
                  if(res.data.state === 1){ // 成功
                    this.$message({
                      message: res.data.msg,
                      type: 'success'
                    });
                    this.getOrders()
                  }else { //失败
                    this.$message({
                      message: res.data.msg,
                      type: 'error'
                    });
                  }
                })
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消删除'
                });
              });
          }
        }
    }
</script>

<style lang="less" scoped>
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
    padding: 0 10px 0 55px;
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

  .Address{
    background-color: #ffffff;
    height: 120px;
  }
  .address_title{
    background-color:#f3f3f3;
    height:40px;
    box-shadow:rgba(0, 0, 0, .06) 0 1px 7px;
    border-bottom: 1px solid #d4d4d4;
  }
  .address_add{
    cursor:pointer;
    padding-right: 30px;

  }
  .GoodsImgBoxmgbox{

  }
  .GoodsImg{
    width:100px;
    height: 100px;
  }
</style>
