import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const that = Vue.prototype;

export default new Vuex.Store({
    state: {
        loading: false,
        list: [],
        showLi: undefined,
        user_id: JSON.parse(sessionStorage.getItem('user')) ? JSON.parse(sessionStorage.getItem('user'))._id : ''
    },

    getters: {
        totalCount(state) {
            return state.list.length;
        },
        undoCount(state) {
            return state.list.filter(item => {
                return !item.complete;
            }).length;
        },
        doneCount(state) {
            return state.list.filter(item => {
                return item.complete;
            }).length;
        },
        allComplete(state) {
            // 全部都完成，allComplete = true
            return state.list.every(item => {
                // 完成了
                return item.complete;
            }) && state.list.length > 0;
        }
    },

    mutations: {
        clearUser(state) {
            state.user_id = '';
        },
        
        updateUser(state) {
            state.user_id = JSON.parse(sessionStorage.getItem('user'))._id
        },

        blockUI(state) {
            state.loading = true;
        },

        unblockUI(state) {
            state.loading = false;
        },

        reload(state, newList) {
            state.list = newList;
        },

        showType(state, type) {
            state.showLi = type;
        }
    },
    actions: {
        getList({ commit, state }) {
            const callback = (data) => {
                commit('reload', data);
            };
            const params = {
                user_id: state.user_id
            };
            that._ajax('get', 'api/task', callback, params);
        },

        addTask({ dispatch }, task) {
            const callback = (res) => {
                dispatch('getList');
            };
            that._ajax('post', 'api/task', callback, task);
        },

        changeTask({ dispatch }, task) {
            const callback = (res) => {
                dispatch('getList');
            };
            that._ajax('put', 'api/task', callback, task);
        },

        changeAllTask({ dispatch, state }, type) {
            const callback = (res) => {
                dispatch('getList');
            };
            const params = {
                type,
                user_id: state.user_id
            };
            that._ajax('put', 'api/allTask', callback, params);
        },

        deleteTask({ dispatch }, _ids) {
            const callback = () => {
                dispatch('getList');
            };
            const params = {
                _ids
            };
            that._ajax('delete', 'api/task', callback, params);
        },

        deleteDoneTask({ dispatch, state }) {
            const callback = () => {
                dispatch('getList');
            };
            that._ajax('delete', 'api/doneTask', callback, {user_id: state.user_id});
        }
    }
});