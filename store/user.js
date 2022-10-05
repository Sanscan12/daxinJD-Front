export default {
    namespaced: true,

    state: () => ({
        // 用户登录成功有数据
        token: uni.getStorageSync('token') || '',
        // 用户基本信息
        userinfo: JSON.parse(uni.getStorageSync('userinfo') || '{}'),
        // 登录成功 后 重定向
        redirectInfo: null
    }),

    mutations: {
        // 更新用户基本信息
        updateUserInfo(state, userinfo) {
            state.userinfo = userinfo
            this.commit('m_user/saveUserInfoToStorage')
        },
        saveUserInfoToStorage(state) {
            uni.setStorageSync('userinfo', JSON.stringify(state.userinfo))
        },
        // 更新 tocken
        updateToken(state, token) {
            state.token = token
            this.commit('m_user/saveTokenToStorage')
        },
        saveTokenToStorage(state) {
            uni.setStorageSync('token', state.token)
        },
        // 重定向信息
        updateRedirectInfo(state , info){
            state.redirectInfo = info
        }
    },

    getters: {}
}