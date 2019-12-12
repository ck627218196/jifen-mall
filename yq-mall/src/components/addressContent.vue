<template>
    <div class="address_content">
        <el-row :gutter="10">
            <el-col :span="5">
                <div style="text-align: center;line-height: 120px">
                    <el-input type="text" :value="item.address_name" v-if="edit_address" v-model="item.address_name"></el-input>
                    <span v-else>{{item.address_name}}</span>
                </div>
            </el-col>
            <el-col :span="5">
                <div style="text-align: center;line-height: 120px">
                    <el-input type="text" :value="item.address_phone" v-if="edit_address" v-model="item.address_phone" style="text-align: center"></el-input>
                    <span v-else>{{item.address_phone}}</span>
                </div>
            </el-col>
            <el-col :span="8">
                <div style="text-align: center;line-height: 120px">
                    <el-input type="text" :value="item.address_address" v-if="edit_address" v-model="item.address_address" style="text-align: center"></el-input>
                    <span v-else>{{item.address_address}}</span>
                </div>
            </el-col>
            <el-col :span="6"><div style="text-align: center;line-height: 120px">
                <el-button type="primary" @click="editAddress(item.id)" size="mini">编辑</el-button>
                <el-button type="danger" size="mini" @click="deleteAddress()">删除</el-button>
            </div></el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        props:['item'],
        data(){
            return {
                edit_address:false,
            }
        },
        methods:{
            editAddress(id){
                this.edit_address=!this.edit_address;
            },

            // 删除地址
            deleteAddress(){
                this.$confirm('您确定要删除地址吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(()=>{
                    this.$axios.post('http://localhost:3000/api/user//deleteAddress',{
                        address_id: this.item.id
                    }).then(res=>{
                            console.log(res.data.data);
                            if(res.data.state === 1){
                                console.log(444);
                                this.$message({
                                    message: res.data.msg,
                                    type: 'success'
                                });
                                this.$emit('Replace')
                            }else {
                                this.$message({
                                    message: res.data.msg,
                                    type: 'error'
                                })
                            }
                        })
                }).catch(()=>{
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                })
            }
        }
    }
</script>

<style>
    .address_content .el-input__inner{
             text-align:center!important;
             padding:0px 30px;
             /*width:300px;*/
         }
</style>
