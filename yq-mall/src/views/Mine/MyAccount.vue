<template >
<div id="MyAccount" style="background-color: #f2f2f2;">
<!------------------------头部开始------------------------>
  <Header />
<!------------------------头部结束------------------------>
  <div class="MyAccount_content">
    <el-row>
      <el-col :span="6">
        <div style="width:200px;height:662px">

        <div class="SideBox">

          <div class="UserBox">
            <img src="./../../assets/account_logo.jpg" alt="" class="UserImg">
          </div>
          <div class="UserName">
            {{Account_name}}，你好！
          </div>
          <el-menu
                  default-active="this.$router.path"
                  router
                  class="el-menu-vertical-demo"
                  @open="handleOpen"
                  @close="handleClose"
                  background-color="#ffffff"
                  text-color="black"
                  active-text-color='#409EFF'
          >
            <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
              <div style="text-align: center">{{ item.navItem }}</div>
            </el-menu-item>
          </el-menu>
        </div>
        </div>
      </el-col>

      <el-col :span="18">
        <div>
          <div class="account-content">
            <router-view></router-view>
          </div>
        </div>
      </el-col>

    </el-row>
  </div>

</div>
</template>

<script>
    import Header from "./../../components/Header";
    export default {
        name: "MyAccount",
        components: {Header},
        data(){
            return{
                navList:[
                    {name:'/MyAccount/OrderList',navItem:'我的订单'},
                    {name:'/MyAccount/AddressList',navItem:'收货地址'},
                    {name:'/MyAccount/MyJidian',navItem:'我的积点'},
                    {name:'/MyAccount/SetPwd',navItem:'修改密码'},
                    {name:'/MyAccount/Coupon',navItem:'我的优惠'},
                    {name:'/MyAccount/Support',navItem:'售后服务'},

                ],
                Account_name:'',
                Account_img:'./../../assets/联通logo.jpg'
            }
        },
        created(){
        },
        mounted(){
          let YqMallUser= localStorage.getItem('yqMallUser');
          let YqMallUserobj = JSON.parse(YqMallUser)
          this.Account_name = YqMallUserobj.real_name
          // console.log(Account_name)
            // this.Account_name

        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>
<style scoped>
  .MyAccount_content{
    position: relative;
    /*top:50px;*/
    /*left:150px*/
  }

  .UserBox{
    width: 200px;
    height: 200px;
    background-color: #ffffff;
  }
  .UserImg{
  width: 150px;
  height: 150px;
  margin:25px 25px;
  border-radius: 50%;
  }
  .UserName{
    background-color: #ffffff;
    text-align: center;
    color: #6495ED;
    padding: 0 0 10px 0;
  }
  .SideBox{
    margin-top: 50px;
    margin-left: 150px;
position: fixed;
    top:60px;
    width: 200px;

  }





</style>
