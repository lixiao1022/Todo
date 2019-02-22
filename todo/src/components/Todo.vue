<template>
    <div>
        <input type="checkbox" @click="selectAll()" :checked="allComplete">

        <input v-model="taskName" placeholder="待办" @keyup.enter="add()">

        <todo-item></todo-item>

        <div v-show="totalCount">
            <span>{{ undoCount }} 条待办</span>
            <button @click="showType()">全部</button>
            <button @click="showType(true)">进行中</button>
            <button @click="showType(false)">已完成</button>
            <button v-show="doneCount">删除已完成</button>
        </div>
    </div>
</template>

<script>
    import TodoItem from './TodoItem.vue';
    import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

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
                'doneCount',
                'allComplete'
            ])
        },

        methods: {
            ...mapActions([
                'getList',
                'addTask',
                'changeAllTask'
            ]),
            ...mapMutations([
                'showType'
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