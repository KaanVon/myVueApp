import Vue from 'vue'
import Vuex from 'vuex';

Vue.use(Vuex)

const store = new Vuex.Store({   // 注意Store的S大写
    state: {
        myMenuList: [],
    },
    mutations: {
        myMenuList(state, payload) {
            state.myMenuList = payload
        }
    },
    actions: {
        getMyMenuList({commit}) {
            Vue.$http.post("/user/GetMenuPermission").then(res => {
                if (!res.data.iserror) {
                    commit('myMenuList', res.data.data)
                }
            });
        }
    }
})

export default store