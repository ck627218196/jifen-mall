<template>
    <div id="HeaderBox">
        <div class="headerBar">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#545c64"
                 text-color="#fff"
                 active-text-color="#ffffff">
          <el-menu-item index="1" class="Header_shouye" @click="Header_shouye">商城首页</el-menu-item>
          <el-submenu index="2">
            <template slot="title">弹性激励计划</template>
            <el-menu-item index="2-1">扶贫计划</el-menu-item>
            <el-menu-item index="2-2">女职工保健计划</el-menu-item>
            <el-menu-item index="2-3">“三防计划”</el-menu-item>
            <el-menu-item index="2-4">年节慰问计划</el-menu-item>
            <el-menu-item index="2-5">疗休养计划</el-menu-item>

          </el-submenu>
          <el-menu-item index="3" >特惠专区</el-menu-item>
          <el-menu-item index="4" class="Header_fp">扶贫专区</el-menu-item>
            <el-menu-item index="6" class="Header_MyAccount" @click="Header_MyAccount">我的</el-menu-item>
          <el-menu-item index="5" class="Header_Login" @click="HeaderLogout">退出登录</el-menu-item>

        </el-menu>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Header",
        data() {
            return {
                activeIndex: '1',
                activeIndex2: '1'
            };
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            Header_shouye(){
                this.$router.push({ path: '/' });
            },
            HeaderLogout(){
                // this.$router.push({ path: '/Login' });
                this.$confirm('此操作将退出登录哦, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    window.localStorage.removeItem('yqMallUser'); //清除文件
                    window.localStorage.removeItem('yq_token'); //清除文件
                    this.$router.go(0)
                }).catch(() => {
                    this.$message({
                        type: 'success',
                        message: '已取消退出'
                    });
                });
            },
            Header_MyAccount(){
                this.$router.push({ path: '/MyAccount' });
            }
        }
    }
</script>

<style scoped>
    .headerBar{
        position: fixed;
        top: 0;
        z-index: 999;
        width:100%;
    }
    #HeaderBox{
      background-color: #545c64;
      border: none;
      padding: 0;
      margin-bottom: 60px;

    }
    .Header_shouye{
        margin-left: 150px!important;
    }
    .Header_fp{
        margin-right: 41%!important;
    }

    .el-menu--horizontal>.el-menu-item{
      border:none!important
    }
</style>
