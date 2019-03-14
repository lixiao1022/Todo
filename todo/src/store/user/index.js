export default {
    namespaced: true,
    
    state: {
        user_id: sessionStorage.getItem('user') ? sessionStorage.getItem('user') : ''
    },

    mutations: {
        clearUser(state) {
            state.user_id = '';
        },
        updateUser(state) {
            state.user_id = sessionStorage.getItem('user');
        }
    }
}