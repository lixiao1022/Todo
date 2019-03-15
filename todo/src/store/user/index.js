import Vue from 'vue';
const that = Vue.prototype;

export default {
    namespaced: true,
    
    state: {
        user_id: sessionStorage.getItem('user') ? sessionStorage.getItem('user') : '',
        pages: []
    },

    mutations: {
        clearUser(state) {
            state.user_id = '';
            state.pages = [];
        },
        updateUser(state) {
            state.user_id = sessionStorage.getItem('user');
        },
        updatePages(state, newPages) {
            state.pages = newPages;
        }
    },

    actions: {
        getPages({ commit, state }) {
            if (state.user_id) {
                const callback = (data) => {
                    commit('updatePages', data);
                };
                that._ajax('get', 'api/user/pages', callback, { _id: state.user_id });
            }
        }
    }
}