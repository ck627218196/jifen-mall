<template>
    <div>
      <div class="gray-box" style="border:none;margin-top: 50px;margin-right: 50px ">
        <div class="title">
          <h2>售后服务</h2>
          <div @click="address_add" class="address_add">
            客服
          </div>
        </div>

      </div>
      <div class="Address" style="border:none;margin-right: 50px ">
        <div class="address_title">
          <el-row>
            <el-col :span="4"><div style="text-align: center;line-height: 40px">售后服务</div></el-col>
          </el-row>
        </div>
        <div class="address_content">
          <el-row>
            <el-col :span="24"><div style="text-align: center;line-height: 120px">{{info}}</div></el-col>
          </el-row>
        </div>
      </div>

    </div>
</template>
<script>
    export default {
        name: "AddressList",
        data() {
            return {
              info:'点击右上角获取售后服务哦！'
            }
        },
        methods:{
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
