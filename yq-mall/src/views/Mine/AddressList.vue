<template>
    <div>
      <!--------------头部标题开始--------------------->
      <div class="gray-box" style="border:none;margin-top: 50px;margin-right: 50px ">
        <div class="title">
          <h2>收货地址</h2>
          <div @click="address_add" class="address_add">
            添加地址
          </div>
        </div>
      </div>
      <!--------------头部标题结束--------------------->

      <!-------------------地址字段开始----------------->

      <div class="address_title" style="margin-right: 50px">
         <el-row>
           <el-col :span="5">
             <div style="text-align: center;line-height: 40px">姓名</div>
           </el-col>
           <el-col :span="5"><div style="text-align: center;line-height: 40px">联系电话</div></el-col>
           <el-col :span="8"><div style="text-align: center;line-height: 40px">详细地址</div></el-col>
         </el-row>
      </div>
        <!-------------------地址字段结束----------------->
      <div class="Address"
           style="border:none;margin-right: 50px;margin-bottom: 5px; "
           v-for="(item, i) in address_list"
           :key="i"
      >
        <addressContent :item="item" @Replace="getAddress"/>
      </div>
      <div><el-button type="primary" @click="getSure()" style="margin: 10px 445px;width: 200px">确定修改</el-button></div>

    </div>

</template>
<script>
  import addressContent from "./../../components/addressContent";
    export default {
        name: "AddressList",
        components:{addressContent},
        data() {
            return {
              address_list:[],
              YqMallUserobj:{}
            }
        },
        mounted(){
          this.YqMallUserobj = JSON.parse(localStorage.getItem('yqMallUser'));
          this.getAddress();
        },
        methods:{
          // 获取地址数据

          getAddress(){
            this.$axios.post('http://localhost:3000/api/user/GetAddress',{
              user_id : this.YqMallUserobj.id
            })
                    .then(res=>{
                      console.log(res.data.data[0]);
                      if(res.data.state === 1){ // 成功
                        // console.log(444);
                        this.address_list = res.data.data;
                      }else { //失败
                        alert(result.msg);
                      }
                    })
                    .catch(res=>{

                    })
          },

          // 提交地址数据
          getSure(){
            this.$confirm('您确定要发起修改吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(()=>{
              this.$axios.post('http://localhost:3000/api/user/postAddress',{
                address_list: this.address_list
              })
                      .then(res=>{
                        console.log(res.data.data);
                        if(res.data.state === 1){ // 成功
                          console.log(444);
                          this.$message({
                            message: res.data.msg,
                            type: 'success'
                          })
                        }else { //失败
                          this.$message({
                            message: res.data.msg,
                            type: 'error'
                          })
                        }
                      })
                      .catch(res=>{

                      })
            }).catch(()=>{
              this.$message({
                type: 'info',
                message: '已取消删除'
              });
            })
          },
            address_add(){
                let id1 = 0;
                let id2 = 0;
              this.address_list.forEach((value,index)=>{
                if(id2<index){
                  if(id1<=value.id){
                    id1 = value.id
                  }
                  id2 ++;
                }else {
                    console.log(id1)
                  this.address_list.push({
                    id:id1,
                    user_id:this.YqMallUserobj.id,
                    address_name:'陈吉康',
                    address_phone:'10010',
                    address_address:'待添加'
                  });
                }
              });

            },
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
</style>
