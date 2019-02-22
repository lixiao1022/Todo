<template>
    <div>
        <input type="checkbox" @click="selectAll()" :checked="allComplete">

        <input v-model="taskName" placeholder="待办" @keyup.enter="add()">

        <todo-item></todo-item>

        <div v-show="totalCount > 0 ? true : false">
            <span>{{ undoCount }} 条待办</span>
            <button>全部</button>
            <button>进行中</button>
            <button>已完成</button>
            <button>删除已完成</button>
        </div>
    </div>
</template>

<script>
    import TodoItem from './TodoItem.vue';
    import { mapState, mapGetters, mapActions } from 'vuex';

    export default {
        components: {
            TodoItem
        },

        data() {
            return {
                taskName: ''
            };
        },

        computed: {
            ...mapState([
                'list'
            ]),
            ...mapGetters([
                'totalCount',
                'undoCount',
                'allComplete'
            ])
        },

        methods: {
            ...mapActions([
                'getList',
                'addTask',
                'changeAllTask'
            ]),

            add() {
                const name = this.taskName;
                this.taskName = '';
                if (name != '') {
                    this.addTask({
                        name,
                        complete: false
                    });
                }
            },

            selectAll() {
                this.changeAllTask(this.allComplete);
            }
        },

        created() {
            this.getList();
        }
    }
</script>

<style scoped>

</style>