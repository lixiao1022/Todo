<template>
    <div :class="{ block: loading }">
        <p>todo首页</p>

        <input v-model="taskName" @keyup.enter="post()">
        
        <button @click="getList()">全部</button>
        <button @click="getList('false')">进行中</button>
        <button @click="getList('true')">已完成</button>

        <ul>
            <li v-for="task in tasks" :key="task._id">
                <input type="checkbox" :checked="task.complete == 'false' ? false : true" @click="edit(task)">
                <span :class="{ complete: task.complete == 'false' ? false : true }" @click="edit(task)">{{ task.name }}</span>
                <span class="close" @click="remove(task._id)"></span>
            </li>
        </ul>

        <button @click="remove()">删除已完成</button>
    </div>
</template>

<script>
    import {
        mapState,
        mapMutations
    } from 'vuex';

    export default {
        data() {
            return {
                taskName: '',
                tasks: []
            }
        },

        computed: {
            ...mapState({
                loading: 'loading'
            }),
        },

        methods: {
            getList(complete) {
                this._ajax('get', 'api/list', (data) => {
                    this.tasks = data;
                }, {
                    complete: complete
                });
            },

            post() {
                if (this.taskName != '') {
                    const name = this.taskName;
                    this.taskName = '';
                    this._ajax('post', 'api/add', (data) => {
                        this.getList();
                    }, {
                        name: name,
                        complete: 'false'
                    });
                }
            },

            edit(task) {
                this._ajax('put', 'api/edit', (data) => {
                    this.getList();
                }, task);
            },

            remove(_id) {
                if (_id) {
                    this.delDB(_id);
                } else {
                    const _ids = this.tasks.filter((item) => {
                        return item.complete == 'true';
                    }).map((item) => {
                        return item._id;
                    }).join(',');
                    this.delDB(_ids);
                }
            },
            delDB(_ids) {
                this._ajax('delete', 'api/delete', (data) => {
                    this.getList();
                }, {
                    _ids: _ids
                });
            },

            // showLoading() {
            //     this.blockUI();
            //     setTimeout(() => {
            //         this.unblockUI();
            //     }, 2000);
            // },

            ...mapMutations([
                'blockUI',
                'unblockUI'
            ])
        },

        created() {
            this.getList();
        }
    }
</script>

<style scoped>
    .block {
        border: 1px solid red;
    }
    .complete {
        text-decoration: line-through;
        opacity: 0.5;
    }
    ul {
        list-style: none;
    }
    .close {
        color: red;
        margin-left: 100px;
    }
    .close::before {
        content: '\2716'
    }
</style>