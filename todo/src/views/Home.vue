<template>
    <div class="m-home">
        <div class="out">
            <button @click="loginOut()">退出登录</button>
        </div>
        <todo />
    </div>
</template>

<script>
    import Todo from '../components/Todo.vue';
    import { mapMutations } from 'vuex';

    export default {
        components: {
            Todo
        },
        methods: {
            ...mapMutations('user', [
                'clearUser'
            ]),
            loginOut() {
                sessionStorage.clear();
                this.clearUser();
                this.$router.push('/login');
            }
        }
    }
</script>

<style scoped lang="less">
    .m-home {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .out {
            align-self: flex-end;
            margin: 5px;
            button {
                font-size: 16px;
                font-weight: bold;
                padding: 10px;
                border: none;
                color: #fff;
                background-color: brown;
            }
        }
    }
</style>