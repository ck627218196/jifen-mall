import Vue from 'vue'
import Vuex from 'vuex'

// 1. 引入各个模块对象
import state from './state'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex);

export default new Vuex.Store({
    state,
    mutations,
    actions
})
