/*
    store中唯一修改状态的地方
*/

import {INIT_USER_INFO, AUTO_LOGIN_INFO} from './mutations-type'
import {setStore} from "../assets/js/global";


export default {
     // 同步用户的信息
     [INIT_USER_INFO](state, value){
         state.userInfo = value;
         // 保存用户信息到本地
         setStore('yqMallUser', value);
     },

     // 自动登录
     [AUTO_LOGIN_INFO](state, value){
         state.userInfo = value;
         // 保存用户信息到本地
         setStore('yqMallUser', value);
     }
}