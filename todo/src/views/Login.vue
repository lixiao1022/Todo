<template>
    <div class="m-login" @keyup.enter="login">
        <div class="u-input-wrap">
            <span class="label">用户名：</span>
            <input class="input" type="text" v-model="user.name">
        </div>
        <div class="u-input-wrap">
            <span class="label">密码：</span>
            <input class="input" type="password" v-model="user.password">
        </div>
        <div class="u-input-wrap">
            <button class="button" @click="login()">登录</button>
        </div>
    </div>
</template>

<script>
    import {
        mapMutations
    } from 'vuex';

    export default {
        data() {
            return {
                user: {
                    name: '',
                    password: ''
                }
            }
        },
        methods: {
            ...mapMutations([
                'updateUser'
            ]),
            login() {
                const params = this.user;
                const callback = (data) => {
                    sessionStorage.setItem('user', JSON.stringify(data));
                    this.updateUser();
                    this.$router.push('/');
                };
                this._ajax('post', 'api/login/in', callback, params);
            }
        }
    }
</script>

<style scoped lang="less">
    .m-login {
        font-size: 20px;
        width: 400px;
        margin: 0 auto;
        margin-top: 200px;
        border: 1px solid gray;
        .u-input-wrap {
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 20px;
            .label {
                flex: 1;
                text-align: right;
            }
            .input {
                flex: 3;
                height: 30px;
                font-size: 20px;
            }
            .button {
                font-size: 20px;
                width: 100%;
                padding: 5px;
            }
        }
    }
</style>