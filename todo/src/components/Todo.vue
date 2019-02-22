<template>
    <div>
        <input v-model="taskName" placeholder="待办事项" @keyup.enter="addTask()">

        <todo-item :data="tasks"></todo-item>

        <div v-show="toolbarShow">
            <span>{{ undoCount }} 待办</span>
            <button>全部</button>
            <button>进行中</button>
            <button>已完成</button>
        </div>
    </div>
</template>

<script>
    import TodoItem from './TodoItem.vue';

    export default {
        components: {
            TodoItem
        },

        data() {
            return {
                taskName: '',
                tasks: []
            }
        },

        computed: {
            // 控制下方的工具栏
            toolbarShow() {
                return this.tasks.length > 0 ? true : false;
            },
            
            // 显示代办理数量
            undoCount() {
                return this.tasks.filter(item => {
                    return !item.complete;
                }).length;
            }
        },

        methods: {
            getList(type) {
                const callback = (data) => {
                    this.tasks = data;
                };
                const params = {
                    complete: type
                };
                this._ajax('get', 'api/list', callback, params);
            },
            addTask() {
                const name = this.taskName;
                // 清空输入框
                this.taskName = '';
                if (name != '') {
                    const callback = () => {
                        this.getList();
                    };
                    const params = {
                        name,
                        complete: false
                    };
                    this._ajax('post', 'api/add', callback, params);
                }
            }
        },

        created() {
            this.getList();
        }
    }
</script>

<style scoped>

</style>