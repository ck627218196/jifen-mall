<template>
    <div class="note">
    <el-main>
<!--      登录模块-->
        <div class="login">
          <div class="form-box">
            <el-form :model="numberValidateForm" status-icon ref="numberValidateForm" class="demo-ruleForm">
<!--              账号输入框-->
              <el-form-item prop="name" label="账号" :rules="[{ required: false, message: '账号不能为空'},]">
                <el-input type="text" v-model.number="numberValidateForm.name" placeholder="OA账户名" class="text1" v-on:keyup.13.native="submitForm('numberValidateForm')"></el-input>
              </el-form-item>
<!--              密码输入框-->
              <el-form-item prop="pass" label="密码" :rules="[{ required: false, message: '密码不能为空'},]">
                <el-input type="password" v-model.number="numberValidateForm.pass" autocomplete="off" placeholder="密码" class="text1" v-on:keyup.13.native="submitForm('numberValidateForm')"></el-input>
              </el-form-item>
              <!--<span @click="register">立即注册</span>-->
<!--              忘记密码-->
              <el-form-item class="addel">
                <el-button type="text" @click="forgetpass">忘记密码?</el-button>
              </el-form-item>
          <!--登录按钮-->
              <el-form-item>
                <el-button type="primary" round @click="submitForm('numberValidateForm')" class="loginn">
                  立即登录
                </el-button>
              </el-form-item>
            </el-form>
          </div>

        </div>
    </el-main>
   </div>
</template>
<script>
    import {mapActions} from 'vuex'
    export default {
  data() {
    return {
      numberValidateForm: {
        name: "",
        pass: ""
      }
    };
  },
  methods: {
    ...mapActions(['initUserInfo']),

    // 用户登录方法
    submitForm(formName) {
        console.log(111);
      this.$refs[formName].validate(valid => {
        if (valid) {
            if(!this.numberValidateForm.name){
                alert('请输入用户名!');
                return false;
            }
            if(!this.numberValidateForm.pass){
                alert('请输入密码!');
                return false;
            }
            console.log(222);
            this.$axios.post("http://localhost:3000/api/user/login",{
              // 提交用户名与密码
              user_name: this.numberValidateForm.name,
              user_pwd: this.numberValidateForm.pass
            }).then((res)=>{
                console.log(res.data.state);
                if(res.data.state === 1){ // 成功
                    this.initUserInfo(res.data);
                    // console.log(result);
                    console.log('0000');
                    alert(res.data.msg);
                    // 持久化数据到本地
                    localStorage.setItem('yq_token', res.data.token);
                    // alert(result.msg);
                    // 跳转到主界面
                    this.$router.push('/')
                }else { //失败
                    alert(res.data.msg);
                }
          })
        } else {
          console.log("error submit!!");

        }
      });
    },


    //忘记密码的绑定方法
    forgetpass(){//忘记密码的绑定方法
      this.$alert('请联系系统中心管理员', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `请尽快联系`
            });
          }
        });
    },

    //跳转到注册页面
    register(){
      this.$router.push({ name: "register" });
    }
  },

};
</script>



<style scoped>
body {
  margin: 0;
  padding: 0;
}
.note {
  position: relative;
  height: 750px;
}
.form-box{
    margin-top: 40%;
    margin-left: 10%;

}
.loginn{
    width:100%;
    letter-spacing: 2px;
}
@media screen and (min-width:768px){
/*#app{*/
/*  height: 100%;*/
/*}*/

.note {
  position: relative;
  background:url('./../../assets/background.jpg') no-repeat fixed;
  background-size: cover;
  min-height: 100vh;
}

/*.el-main  {*/
/*  width: 100%;*/
/*  position: relative;*/
/*  !*box-sizing: border-box;*!*/
/*  height: 750px;*/
/*}*/

.login {
  width: 377px;
  height: 450px;
  background: #ffffff;
  box-shadow: 4px 3px 16px 0px#cacaca;
  position: absolute;
  margin-top: 100px;

  /* position: relative; */
  right: 3%;
}
.form-box {
  width: 282px;
  height: 324px;
  margin-top: 14%;
  margin-left: 13%;
  /* margin: auto;
  margin-top: 53px;  */
  /*box-sizing: border-box;*/
  overflow: hidden;
}

.loginn{
  width: 100%;
  /* margin:20% 10% 10%; */
  /* background-color: #7d7d7d;
	box-shadow: 0px 3px 5px 0px
	rgba(195, 195, 195, 0.74);
  color: #ffffff;
	opacity: 0.8;
  letter-spacing: 2px;
  border: none; */
}
}
/*立即登陆按钮的样式*/
</style>
