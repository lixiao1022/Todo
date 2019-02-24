import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const that = Vue.prototype;

export default new Vuex.Store({
    state: {
        loading: false,
        list: [],
        showLi: undefined
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
        getList({ commit }, type) {
            const callback = (data) => {
                commit('reload', data);
            };
            const params = {
                complete: type
            };
            that._ajax('get', 'api/list', callback, params);
        },

        addTask({ dispatch }, task) {
            const callback = () => {
                dispatch('getList');
            };
            that._ajax('post', 'api/add', callback, task);
        },

        changeTask({ dispatch }, task) {
            const callback = () => {
                dispatch('getList');
            };
            that._ajax('put', 'api/edit', callback, task);
        },

        changeAllTask({ dispatch }, type) {
            const callback = () => {
                dispatch('getList');
            };
            const params = {
                type
            };
            that._ajax('put', 'api/editAll', callback, params);
        },

        deleteTask({ dispatch }, _ids) {
            const callback = () => {
                dispatch('getList');
            };
            const params = {
                _ids
            };
            that._ajax('delete', 'api/delete', callback, params);
        },

        deleteDoneTask({ dispatch }) {
            const callback = () => {
                dispatch('getList');
            };
            that._ajax('delete', 'api/deleteDone', callback, {});
        }
    }
});