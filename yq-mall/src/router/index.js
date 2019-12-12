import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '@/views/Home/HomePage'
import OrderList from '@/views/Mine/OrderList'
import Coupon from '@/views/Mine/Coupon'
import AddressList from '@/views/Mine/AddressList'
import MyJidian from '@/views/Mine/MyJidian'
import Support from '@/views/Mine/Support'
import SetPwd from '@/views/Mine/SetPwd'


Vue.use(VueRouter)

const routes = [
  {path: '/', name: 'HomePage', component: HomePage},
  {path: '/More/:goods_class', name: 'More', component:()=>import('./../views/More/More.vue')},
  {path:'/GoodDetail/:goods_id',name:'GoodDetail',component: ()=>import('./../views/Home/GoodDetail')},
  {path: '/Login', name: 'Login', component: ()=>import('./../views/Login/Login')},
  {
    path: '/MyAccount',
    name: 'MyAccount',
    component: () => import(/* webpackChunkName: "about" */ './../views/Mine/MyAccount.vue'),//路由懒加载
    children: [
      {path:'/MyAccount',redirect:'/MyAccount/OrderList'},
      {path: 'OrderList', name: 'OrderList', component: OrderList},
      {path: 'Coupon', name: 'Coupon', component: Coupon},
      {path: 'AddressList', name: 'AddressList', component: AddressList},
      {path: 'MyJidian', name: 'MyJidian', component: MyJidian},
      {path: 'Support', name: 'Support', component: Support},
      {path: 'SetPwd', name: 'SetPwd', component: SetPwd},
      // {path: 'aihuishou', name: '以旧换新', component: aihuishou}
    ]
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to,from,next)=>{
  // console.log(to.path)
  if(to.path !== '/login'){
    // console.log(window.isLogin);
    let token = localStorage.getItem('yq_token')
    // 已经登录
    if(token){
        console.log('登录成功');
        return next();
    }
    // 没有登录
    return next('/login?redirect=' + to.path);
}
// 放行
next();
})

export default router
