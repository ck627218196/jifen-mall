<template>
    <div id="GoodItem" style="background-color: #f2f2f2">
        <Header />
        <el-main>
            <el-row :gutter="20" type="flex" class="row-bg">
                <!--商品图片-->
                <el-col :span="7" style=" border: 1px solid #E9EEF3;">
                    <el-image :src="'http://localhost:3000/'+goods_img" style="padding: 20px 0 20px 0;"></el-image>
                </el-col>
                <!--商品介绍-->
                <el-col :span="12" >
                    <div class="grid-content bg-purple-light">
                        <!--商品名称-->
                        <div class="good"><h4>{{goods_title}}</h4></div>
                        <!--商品新闻-->
                        <div class="good news">
                            <span>【全国七仓配送*当日达/次日达-累计畅销超46万+】</span>
                        </div>
                        <!--商品价格-->
                        <div class="good" style="display: flex;justify-content: space-between">
                            <div style="display: flex;">
                                <div class="title" >
                                    <span style="display:inline-block;margin-top: 10px">价　　格</span>
                                </div>
                                <div class="price" style="margin-left: 20px">
                                    <i style="font-size: 24px;margin-top: 5px;color:#ED0000 ">¥ {{goods_price}}</i>
                                    <span class="news">降价通知</span>
                                </div>
                            </div>
                            <div>
                                <p class="comment" style=" ;font-size: 14px;">累计评价</p>
                                <a class="count" style="font-size: 18px;color: #005ea7">4.9万+</a>

                            </div>
                        </div>
                        <!--商品价格提示-->
                        <div class="good news" >
            <span>电商价格会实时变动，最终价格以“通知发货”时为准！<br>
请注意查看“提交订单”后“温馨提示（带通知发货操作）”页面的价格。</span>
                        </div>
                        <!--供应商-->
                        <div class=" good label">
                            <span style="line-height: 40px">供应商：     北京京东世纪信息技术有限公司</span>
                        </div>
                        <!--配送地址-->
                        <div class=" good label">
                            <span>配送至：</span>
                            <div style="margin-right:10px;display: inline-block;width: 300px ">
<!--                                {{user_addresslist.address_address}}-->
                                <el-select v-model="address_value" placeholder="请选择" @change="pppp(address_value)" size="mini" style="width: 250px" >
                                    <el-option
                                            v-for="item in user_addresslist"
                                            :key="item.id"
                                            :label="item.address_address"
                                            :value="item.id"
                                            >
                                    </el-option>
                                </el-select>
                            </div>
                            <span style="color:#c81623 ">有货</span>
                        </div>
                        <!--积点分类-->
                        <div class="good label">
                            <span>弹性激励计划：</span>
                            <span>{{g_category}}</span>
                        </div>
                        <!--购买数量-->
                        <div class="good" style="display: flex">
<!---------------------立即购买按钮开始------------------------->
                            <el-row>
                                <el-button disabled>1</el-button>
                                <el-button type="primary" style="color:#fff;" @click="open">立即购买</el-button>
                            </el-row>
<!---------------------立即购买按钮结束------------------------->
                        </div>
                        <!--温馨提示-->
                        <div class="good">
                            <span>温馨提示：该商品不支持7天无理由退货。</span>
                        </div>
                    </div>
                </el-col>
                <!--联系客服-->
                <el-col :span="5" style=" border: 1px solid #E9EEF3;padding: 0 0">
                    <div class="grid-content bg-purple">
                        <div class="provider_logo">
                            <span>&nbsp;<img src="./../../assets/images/icon-1.png">&nbsp;京东</span>
                        </div>
                        <div id="linkProvider" style="display: flex;justify-content: center;align-items: center">
                            <el-button type="info"
                                       style="padding: 12px 40px 12px 40px;margin:20px auto;"
                                       @click="dialogFormVisible = true">
                                <i class="el-icon-user-solid"></i>联系卖家
                            </el-button>
                            <el-dialog title="在线客服" :visible.sync="dialogFormVisible">
                                <el-form :model="form">
                                    <el-form-item label="姓名" :label-width="formLabelWidth">
                                        <el-input v-model="form.user_name" autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="电话" :label-width="formLabelWidth">
                                        <el-input v-model="form.user_phone" autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="邮箱" :label-width="formLabelWidth">
                                        <el-input v-model="form.user_email" autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="留言" :label-width="formLabelWidth">
                                        <el-input v-model="form.name" autocomplete="off"></el-input>
                                    </el-form-item>
                                </el-form>
                                <div slot="footer" class="dialog-footer">
                                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                                    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                                </div>
                            </el-dialog>

                        </div>
                        <div class="table">
                            <div><span>电话：4006062868 专属服务号:10010</span></div>
                            <div><span>QQ：暂无</span></div>
                            <div><span>邮箱：jidong@163.com</span></div>
                            <div><span>地址：北京市XX区XX开发区科创XX街X号院</span></div>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </el-main>
        <el-footer>
            <el-row>
                <el-col :span="5" :offset="2"><div class="grid-content bg-purple">
                    <div style="display: flex">
                        <img src="./../../assets/images/tese_tb1.png">
                        <span class="text">品类齐全&nbsp;&nbsp;轻松购物</span>
                    </div>
                </div>
                </el-col>
                <el-col :span="5"><div class="grid-content bg-purple">
                    <div style="display: flex">
                        <img src="./../../assets/images/tese_tb2.png" alt="">
                        <span class="text">品类齐全&nbsp;&nbsp;轻松购物</span>
                    </div>
                </div></el-col>
                <el-col :span="5"><div class="grid-content bg-purple">
                    <div style="display: flex">
                        <img src="./../../assets/images/tese_tb3.png" alt="">
                        <span class="text">多仓直发&nbsp;&nbsp;极速配送</span>
                    </div>
                </div></el-col>
                <el-col :span="5" :right="2"><div class="grid-content bg-purple">
                    <div style="display: flex">
                        <img src="./../../assets/images/tese_tb4.png" alt="">
                        <span class="text">正品行货精致服务</span>
                    </div>
                </div></el-col>
            </el-row>
            <el-row>
                <el-col :span="4" :offset="2"><div class="grid-content bg-purple">
                    <h5>购物指南</h5>
                    <ul class="unstyled">
                        <li>购物流程</li>
                        <li>会员介绍</li>
                        <li>生活旅行/团购</li>
                        <li>常见问题</li>
                        <li>购物指南</li>
                    </ul>
                </div></el-col>
                <el-col :span="4"><div class="grid-content bg-purple">
                    <h5>配送方式</h5>
                    <ul class="unstyled">
                        <li>上门自提</li>
                        <li>211限时达</li>
                        <li>配送服务查询</li>
                        <li>配送费收取标准</li>
                        <li>海外配送</li>
                    </ul>
                </div></el-col>
                <el-col :span="4"><div class="grid-content bg-purple"><h5>支付方式</h5>
                    <ul class="unstyled">
                        <li>货到付款</li>
                        <li>在线支付</li>
                        <li>分期付款</li>
                        <li>邮局汇款</li>
                        <li>公司转账</li>
                    </ul></div></el-col>
                <el-col :span="4"><div class="grid-content bg-purple">
                    <h5>售后服务</h5>
                    <ul class="unstyled">
                        <li>售后政策</li>
                        <li>价格保护</li>
                        <li>退款说明</li>
                        <li>返修/退换货</li>
                        <li>取消订单</li>
                    </ul>
                </div></el-col>
                <el-col :span="4" :right="2"><div class="grid-content bg-purple">
                    <h5>特色服务</h5>
                    <ul class="unstyled">
                        <li>夺宝岛</li>
                        <li>DIY装机</li>
                        <li>延保服务</li>
                    </ul>
                </div></el-col>
            </el-row>
            <div class="footer-three">
                <ul class="helpLink">
                    <li>关于我们<span class="space"></span></li>
                    <li>联系我们<span class="space"></span></li>
                    <li>联系客服<span class="space"></span></li>
                    <li>合作招商<span class="space"></span></li>
                    <li>商家帮助<span class="space"></span></li>
                    <li>营销中心<span class="space"></span></li>
                    <li>友情链接<span class="space"></span></li>
                    <li>销售联盟<span class="space"></span></li>
                    <li>友情链接<span class="space"></span></li>
                    <li>隐私政策</li>
                </ul>
                <div>
                    <p>京公网安备 1****002000088号|京ICP证0*****9号|互联网药品信息服务资格证编号(京)-经营性-2014-0008|新出发京零 字第大1*****2号</p>
                    <p>京ICP备0*****1号京公网安备1***********2</p>
                </div>

            </div>
        </el-footer>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'
    import Header from "./../../components/Header";
    export default {
        components: {Header},
        data() {
            return {
                options: [],
                address_value:'',
                address_value1:{},
                goods_id:'',
                goods_list:[],
                goods_title:'',
                goods_img:'',
                goods_price:'',
                goods_class:'',
                goods_id1:'',
                user_addresslist:[],
                g_category:'年节慰问计划',
                dialogTableVisible: false,
                dialogFormVisible: false,
                form: {
                    user_name: '',
                    user_phone:'',
                    user_email:'',
                    /*delivery: false,
                    type: [],
                    resource: '',
                    desc: ''*/
                },
                formLabelWidth: '40px',
                start_jidian:'',
                spend_jidian:'',
                now_jidian:'',

            }
        },
        methods:{
            pppp(address_value){
                let arr1 = this.user_addresslist;
                arr1.forEach((value,index)=> {
                    // 得用箭头函数，不能用function，这样this才会指向vue
                    if (value.id === address_value){
                        this.address_value1 = value
                    }
                });
            },
            ...mapActions(['initUserInfo']),
            // 更新用户信息
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
            // 重新计算余额的方法
            ComputedJidian(){
                this.$axios.post('http://localhost:3000/api/user/ComputedJidian',{
                    now_jidian:this.now_jidian,
                    spend_jidian:this.spend_jidian,
                    user_id:this.address_value1.user_id,
                }).then((res)=>{
                    console.log(2222);
                    console.log(res.data.data);
                    // 成功
                    if(res.data.state === 1){
                        console.log('重新计算成功');
                        this.getUserInfo();
                    }else { //失败
                        this.$message({
                            message: res.data.msg,
                            type: 'error'
                        });
                    }
                })
            },
            // 点击购买触发
            open(){
                this.$confirm('您确定购买吗？',{
                    confirmButtonText:'确定',
                    concelButtonText:'取消',
                    type:'info'
                }).then((res)=>{
                    if(this.now_jidian<this.goods_price){
                        this.$message({
                            message: '余额已不足',
                            type: 'error'
                        });
                    }else{
                        console.log(this.address_value);
                        this.$axios.post('http://localhost:3000/api/order/CreateOrders',{
                            user_id:this.address_value1.user_id,
                            goods_id:Number(this.goods_id),
                            goods_title:this.goods_title,
                            goods_class:this.goods_class,
                            goods_price:this.goods_price,
                            goods_img:this.goods_img,
                            goods_address:this.address_value1.address_address,
                            goods_name:this.address_value1.address_name,
                            goods_phone:this.address_value1.address_phone
                        }).then((res)=>{
                            if(res.data.state === 1){ // 成功
                                console.log(999)
                                // this.order_list = res.data.data;
                                this.$message({
                                    message: '下单成功',
                                    type: 'success'
                                });
                                // 重新计算出余额
                                console.log(this.goods_price);
                                this.now_jidian -= this.goods_price;
                                this.spend_jidian = this.start_jidian - this.now_jidian
                                this.ComputedJidian()
                            }else { //失败
                                this.$message({
                                    message: '下单失败',
                                    type: 'error'
                                });
                            }

                        })
                    }

                })
            },


        },

        mounted() {
            // 1.取出缓存中的个人信息
            let YqMallUser= localStorage.getItem('yqMallUser');
            let YqMallUserobj = JSON.parse(YqMallUser);
            this.start_jidian = YqMallUserobj.user_start_jidian;
            this.spend_jidian = YqMallUserobj.user_spend_jidian;
            this.now_jidian = YqMallUserobj.user_now_jidian;

            // 2.请求商品数据
            console.log(this.$route.params.goods_id);
            this.goods_id= this.$route.params.goods_id
            this.$axios.post('http://localhost:3000/api/source/GoodId',{
                GoodsId : this.goods_id
            }).then(res=>{
                    console.log(res.data);
                    if(res.data.state === 1){ // 成功
                        console.log(2323);
                        this.goods_title = res.data.data[0].goods_title;
                        console.log(this.goods_title);
                        this.goods_img = res.data.data[0].source_img;
                        this.goods_price = res.data.data[0].goods_price;
                        this.goods_class = res.data.data[0].goods_class;

                    }else { //失败
                        alert(result.msg);
                    }
                })
                .catch(res=>{

                });

            //3.请求地址数据
            this.$axios.post('http://localhost:3000/api/user/GetAddress',{
                user_id : YqMallUserobj.id
            })
                .then(res=>{
                    console.log(res.data.data);
                    if(res.data.state === 1){ // 成功
                        console.log(444);
                        this.user_addresslist = res.data.data;
                    }else { //失败
                        alert(result.msg);
                    }
                })
                .catch(res=>{

                })
        }
    }
</script>

<style scoped>
    span{
        font-size: 12px;
    }
    .good{
        margin-bottom: 10px;
    }
    .news{
        color: #ED0000;
    }
    .el-footer {
        background-color: #fff;
        color: #333;
        text-align: center;
        /*line-height: 60px;*/
    }
    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: left
        /*line-height: 160px;*/
    }
    .el-row {
        border-radius: 8px;
        background-color:#ffffff ;
        /*margin-bottom: 20px;*/
    }
    .el-row:first-child{
        padding:20px;
    }

    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }

    .provider_logo{
        width: 100%;
        height: 60px;
        background-color: #cdcdcd;
        line-height: 60px;
    }
    .provider_logo span {
        width: 100%;
        height: 60px;
        background: #f0f0f0;
        margin-bottom: 5px;
        text-align: left;
        display: block;
        font-size: 17px;
        color: #646464;
    }

    #linkProvider button{
        font-size: 16px;
        margin: 0 auto;
    }
    .table{
        color: #333;
        /*line-height: 20px;*/
        margin: 20px auto;
        padding-left: 10px;
    }
    .table div{
        margin-bottom: 20px;
    }
    h5{
        font-weight: 700;
        font-size: 18px;
        margin: 9px 0;
    }
    .el-footer .footer-two li{
        font-size: 15px;
    }
    .el-footer .footer-three {
        margin-bottom: 20px;
    }
    .el-footer .footer-three ul{
        margin: 10px auto;
    }
    .el-footer .footer-three ul li {
        /*margin-left: 10px;*/
        font-size: 12px;
        display: inline-block;
        /*line-height: 18px;*/
    }
    .el-footer .footer-three ul.helpLink li .space {
        margin: auto 10px;
        border-left: 1px solid #666;
    }
    .el-footer .footer-three p{
        display: inline-block;
        margin: auto;
        font-size: 12px;
    }
    .text{
        display: inline-block;
        font-size: 20px;
        padding-left: 5px;
        margin: auto 0;
    }
    .unstyled{
        font-size: 12px;
    }
    .unstyled li{
        cursor: pointer;
    }
    .helpLink li{
        cursor: pointer;
    }
</style>
