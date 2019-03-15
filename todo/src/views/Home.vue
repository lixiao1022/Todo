<template>
    <div class="m-home">
        <div class="u-button-wrap">
            <button class="u-btn" v-if="pages.includes('/user')" @click="$router.push('/user')">用户管理</button>
            <button class="u-btn u-btn-c1" @click="loginOut()">退出登录</button>
        </div>
        <todo />
    </div>
</template>

<script>
    import Todo from '../components/Todo.vue';
    import { mapState, mapMutations } from 'vuex';

    export default {
        components: {
            Todo
        },
        computed: {
            ...mapState('user', [
                'pages'
            ])
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
        .u-button-wrap {
            margin: 10px;
            width: 95%;
            .u-btn-c1 {
                float: right;
            }
        }
    }
</style>