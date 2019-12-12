<template>
    <div>
        <div class="gray-box" style="border:none;margin-top: 50px;margin-right: 50px ">
            <div class="title">
                <h2>修改密码</h2>
                <div class="address_add">
                </div>
            </div>

        </div>
        <div class="Address" style="border:none;margin-right: 50px ">
            <div class="address_title">
                <el-row>
                    <el-col :span="4"><div style="text-align: center;line-height: 40px">修改密码</div></el-col>
                </el-row>
            </div>
            <div class="address_content">
                <el-row>
                    <el-col :span="18"><div style="text-align: center;line-height: 120px">
                        <div style="margin-top: 40px;margin-left: 200px">
                            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                                <el-form-item label="原有密码" prop="oldPass">
                                    <el-input v-model.number="ruleForm.oldPass"></el-input>
                                </el-form-item>
                                <el-form-item label="新密码" prop="pass">
                                    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="确认密码" prop="checkPass">
                                    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                                </el-form-item>

                                <el-form-item>
                                    <el-button type="primary" @click="submitForm('ruleForm')">确认修改</el-button>
<!--                                    <el-button @click="resetForm('ruleForm')">重置</el-button>-->
                                </el-form-item>
                            </el-form>
                        </div>
                    </div>
                    </el-col>
                </el-row>
            </div>
        </div>

    </div>
</template>
<script>
        export default {
            data() {
                var validateoldPass = (rule, value, callback) => {
                    if (value === '') {
                        callback(new Error('请输入原密码'));
                    } else {
                        if (this.ruleForm.oldpass !== '') {
                            this.$refs.ruleForm.validateField('oldPass');
                        }
                        callback();
                    }
                };
                var validatePass = (rule, value, callback) => {
                    if (value === '') {
                        callback(new Error('请输入密码'));
                    } else {
                        if (this.ruleForm.checkPass !== '') {
                            this.$refs.ruleForm.validateField('checkPass');
                        }
                        callback();
                    }
                };
                var validatePass2 = (rule, value, callback) => {
                    if (value === '') {
                        callback(new Error('请再次输入密码'));
                    } else if (value !== this.ruleForm.pass) {
                        callback(new Error('两次输入密码不一致!'));
                    } else {
                        callback();
                    }
                };
                return {
                    ruleForm: {
                        pass: '',
                        checkPass: '',
                        oldPass: '',
                        user_id:''
                    },
                    rules: {
                        pass: [
                            { validator: validatePass, trigger: 'blur' }
                        ],
                        checkPass: [
                            { validator: validatePass2, trigger: 'blur' }
                        ],
                        age: [
                            { validator: validateoldPass, trigger: 'blur' }
                        ]
                    }
                };
            },
            methods: {

                // 点击修改按钮触发
                submitForm(formName) {
                    this.$refs[formName].validate((valid) => {
                        if (valid) {
                            this.SetPsass();
                        } else {
                            console.log('提交失败!!');
                            return false;
                        }
                    });
                },


                // 发起请求
                SetPsass(){
                    let userInfo = JSON.parse(localStorage.getItem('yqMallUser'));
                    this.user_id = userInfo.id;
                    this.$axios.post('http://localhost:3000/api/user/SetPass',{
                        pass:this.ruleForm.pass,
                        checkPass:this.ruleForm.checkPass,
                        oldPass:this.ruleForm.oldPass,
                        user_id:this.user_id
                    }).then((res)=>{
                        console.log(res.data);
                        if(res.data.state === 1){ // 成功
                            console.log(2323);
                            this.$message({
                                message: res.data.msg,
                                type: 'success'
                            });
                        }else { //失败
                            this.$message({
                                message: res.data.msg,
                                type: 'error'
                            });
                        }
                    }).catch((error)=>{
                        alert(error)
                    })
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
        height: 360px;
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
