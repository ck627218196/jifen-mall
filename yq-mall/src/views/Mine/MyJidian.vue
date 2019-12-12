<template>
    <div>
      <div class="gray-box" style="border:none;margin-top: 50px;margin-right: 50px ">
        <div class="title">
          <h2>我的积点</h2>
          <div @click="address_add" class="address_add">
            
          </div>
        </div>

      </div>
      <div class="Address" style="border:none;margin-right: 50px ">
        <div class="address_title">
          <el-row>
            <el-col :span="4"><div style="text-align: center;line-height: 40px">已发积点</div></el-col>
            <el-col :span="12"><div style="text-align: center;line-height: 40px">已消费</div></el-col>
            <el-col :span="8"><div style="text-align: center;line-height: 40px">余额</div></el-col>
          </el-row>
        </div>
        <div class="address_content">
          <el-row>
            
            <el-col :span="4"><div style="text-align: center;line-height: 120px">{{start_jidian}}</div></el-col>
            <el-col :span="12"><div style="text-align: center;line-height: 120px">{{spend_jidian}}</div></el-col>
            <el-col :span="8"><div style="text-align: center;line-height: 120px">{{now_jidian}}</div></el-col>
          
            
          </el-row>
        </div>
      </div>

    </div>
</template>
<script>
  import {mapActions} from 'vuex'
    export default {
        data() {
            return {
              start_jidian:'',
              spend_jidian:'',
              now_jidian:'',
              user_id:''
            }
        },
      created(){
        this.getUserInfo();
      },
        mounted(){
          let YqMallUser= localStorage.getItem('yqMallUser');
          let YqMallUserobj = JSON.parse(YqMallUser);
          this.start_jidian = YqMallUserobj.user_start_jidian;
          this.spend_jidian = YqMallUserobj.user_spend_jidian;
          this.now_jidian = YqMallUserobj.user_now_jidian;
          this.user_id = YqMallUserobj.id
        },
        methods:{
          ...mapActions(['initUserInfo']),

          // 发起请求获取用户信息
            getUserInfo(){
              let userInfo = JSON.parse(localStorage.getItem('yqMallUser'));
              this.user_id = userInfo.id;
              console.log(this.user_id);
              this.$axios.post('http://localhost:3000/api/user/getUserInfo',{
                user_id : this.user_id
              }).then(res=>{
                console.log(res.data);
                if(res.data.state === 1){ // 成功
                  console.log(2323);
                  this.initUserInfo(res.data);
                }else { //失败
                  alert(result.msg);
                }
              })
            },

            address_add(){
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
    height: 160px;
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
