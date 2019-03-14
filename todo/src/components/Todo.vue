<template>
    <div class="m-todo">
        <div class="title">
            todos
        </div>
        <div class="content">
            <div class="header">
                <input v-show="totalCount" type="checkbox" @click="selectAll()" :checked="allComplete">

                <input class="todo-input" v-model="taskName" placeholder=" 输入待办事项" @keyup.enter="add()">
            </div>

            <todo-item></todo-item>

            <div class="footer" v-show="totalCount">
                <span>{{ undoCount }} 条待办</span>
                <span class="util">
                    <a :class="{ select: showTaskType == 'all' }" href="javascript:void(0)" @click="toggle('all')">全部</a>
                    <a :class="{ select: showTaskType == 'ing' }" href="javascript:void(0)" @click="toggle('ing')">进行中</a>
                    <a :class="{ select: showTaskType == 'done' }" href="javascript:void(0)" @click="toggle('done')">已完成</a>
                </span>
                <a class="deleteDone" href="javascript:void(0)" v-show="doneCount" @click="deleteDoneTask()">删除已完成</a>
            </div>
        </div>
    </div>
</template>

<script>
    import TodoItem from './TodoItem.vue';
    import {
        mapState,
        mapGetters,
        mapActions,
        mapMutations
    } from 'vuex';

    export default {
        components: {
            TodoItem
        },

        data() {
            return {
                taskName: '',
                showTaskType: 'all'
            };
        },

        computed: {
            ...mapState('task', [
                'list'
            ]),
            ...mapState('user', [
                'user_id'
            ]),
            ...mapGetters('task',[
                'totalCount',
                'undoCount',
                'doneCount',
                'allComplete'
            ])
        },

        methods: {
            ...mapActions('task',[
                'getList',
                'addTask',
                'changeAllTask',
                'deleteDoneTask'
            ]),
            ...mapMutations('task',[
                'showType'
            ]),

            add() {
                const name = this.taskName;
                this.taskName = '';
                // 输入框不为空就添加到 todos
                if (name != '') {
                    this.addTask({
                        user_id: this.user_id,
                        name,
                        complete: false
                    });
                }
            },

            // 全选或者取消全选，传入当前的状态
            selectAll() {
                this.changeAllTask(this.allComplete);
            },

            toggle(type) {
                this.showTaskType = type;
                switch (type) {
                    case 'all':
                        this.showType();
                        break;
                    case 'ing':
                        this.showType(true);
                        break;
                    case 'done':
                        this.showType(false);
                        break;

                    default:
                        break;
                }
            }
        },

        created() {
            this.getList();
        }
    }
</script>

<style scoped lang="less">
    @borderStyle: 1px solid gray;

    .m-todo {
        .title {
            text-align: center;
            font-size: 80px;
        }

        .content {
            width: 600px;
            border: @borderStyle;

            .header {
                padding: 15px;
                border-bottom: @borderStyle;
                display: flex;
                align-items: center;
                position: relative;
                height: 40px;

                .todo-input {
                    height: 40px;
                    border: none;
                    outline: none;
                    font-size: 24px;
                    position: absolute;
                    right: 240px;
                }
            }

            .footer {
                padding: 15px 20px;
                font-size: 18px;
                display: flex;
                align-items: center;
                position: relative;

                .util {
                    position: absolute;
                    right: 200px;
                }

                .deleteDone {
                    position: absolute;
                    right: 30px;
                }
            }
        }
    }

    .input::-webkit-input-placeholder {
        color: gray;
    }

    input[type="checkbox"] {
        zoom: 200%;
    }

    a {
        color: gray;
        border: 1px solid #fff;
        padding: 5px;
        margin: 0 10px;
    }

    a.select {
        border-color: gray;
    }
</style>