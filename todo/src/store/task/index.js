import Vue from 'vue';
const that = Vue.prototype;

export default {
    namespaced: true,

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
        reload(state, newList) {
            state.list = newList;
        },

        // 控制显示：全部、已完成、进行中
        showType(state, type) {
            state.showLi = type;
        }
    },

    actions: {

        // 查询列表需要根据用户 id，从另一个模块的 state 中取值，利用 rootState
        getList({ commit, rootState }) {
            const callback = (data) => {
                commit('reload', data);
            };
            const params = {
                user_id: rootState.user.user_id
            };
            that._ajax('get', 'api/task', callback, params);
        },

        addTask({ dispatch }, task) {
            const callback = () => {
                dispatch('getList');
            };
            that._ajax('post', 'api/task', callback, task);
        },

        changeTask({ dispatch }, task) {
            const callback = () => {
                dispatch('getList');
            };
            that._ajax('put', 'api/task', callback, task);
        },
        
        // 也需要用户 id
        changeAllTask({ dispatch, rootState }, type) {
            const callback = () => {
                dispatch('getList');
            };
            const params = {
                type,
                user_id: rootState.user.user_id
            };
            that._ajax('put', 'api/task/all', callback, params);
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

        // 也需要用户 id
        deleteDoneTask({ dispatch, rootState }) {
            const callback = () => {
                dispatch('getList');
            };
            that._ajax('delete', 'api/task/done', callback, {user_id: rootState.user.user_id});
        }
    }
}