/*
   1) 界面提交
   2) 提交mutations
*/
import {INIT_USER_INFO, AUTO_LOGIN_INFO} from './mutations-type'
import {getStore} from "../assets/js/global";

export default {
    // 初始化用户信息
    initUserInfo({commit}, userInfo){
        commit(INIT_USER_INFO, userInfo);
    },
    // 自动登录
   autoLogin({commit}){
        // 1. 从本地去取用户数据
        const userInfo = JSON.parse(getStore('yqMallUser'));
        commit(AUTO_LOGIN_INFO, userInfo);
    }
}