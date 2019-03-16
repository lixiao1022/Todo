<template>
    <div>
        <nav class="m-crumb m-crumb-arr">
            <ul class="f-cb">
                <li><a href="javascript:void(0)" @click="$router.push('/')">首页</a></li>
                <li>用户管理</li>
            </ul>
        </nav>
        <div>
            <div class="m-table-toolbar">
                <button class="u-btn" @click="showDialog()">增加用户</button>
            </div>
            <table class="m-table">
                <thead>
                    <tr>
                        <th>手机号</th>
                        <th>用户名</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in userList" :key="user._id">
                        <td>{{ user.tel }}</td>
                        <td>{{ user.name }}</td>
                        <td><button class="u-btn u-btn-c1" :disabled="user.tel == 'admin'" @click="remove(user._id)">删除</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="m-dialog-wrap" v-show="visible">
            <div class="m-dialog" @keyup.enter="add">
                <div class="u-input-wrap">
                    <span class="label">手机号：</span>
                    <input class="input u-ipt" type="text" v-model="user.tel">
                </div>
                <div class="u-input-wrap">
                    <span class="label">用户名：</span>
                    <input class="input u-ipt" type="text" v-model="user.name">
                </div>
                <div class="u-button-wrap">
                    <button class="u-btn" @click="add()">确定</button>
                    <button class="u-btn u-btn-c4" @click="hideDialog()">取消</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        mapState
    } from 'vuex';
    export default {
        data() {
            return {
                userList: [],
                user: {},
                visible: false
            }
        },
        computed: {
            ...mapState('user', [
                'pages'
            ])
        },
        methods: {
            getUserList() {
                const callback = (data) => {
                    this.userList = data;
                };
                this._ajax('get', 'api/user', callback, {})
            },
            showDialog() {
                this.visible = true;
            },
            hideDialog() {
                this.visible = false;
                this.user = {};
            },
            add() {
                const callback = () => {
                    this.hideDialog();
                    this.getUserList();
                    alert('操作成功！');
                };
                const params = Object.assign(this.user, {
                    password: '123456',
                    pages: ['/']
                });
                if (this.user.tel && this.user.name) {
                    this._ajax('post', 'api/user', callback, params);
                } else {
                    alert('输入完整的用户信息！');
                }
            },
            remove(_id) {
                const callback = () => {
                    this.getUserList();
                    alert('操作成功！');
                };
                this._ajax('delete', 'api/user', callback, {
                    _id
                });
            }
        },
        created() {
            this.getUserList();
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                if (!vm.pages.includes(to.path)) {
                    next(from.path)
                }
            });
        }
    }
</script>

<style scoped lang="less">
    @td-height: 40px;
    @border-style: 1px solid #ddd;

    .m-table-toolbar {
        width: 90%;
        margin: 15px auto 0 auto;
    }

    .m-table {
        width: 90%;
        margin: 5px auto;
        font-size: 16px;
        border-collapse: separate;
        border: @border-style;
        border-radius: 5px;

        tr {
            display: flex;

            td,
            th {
                flex: 1;
                text-align: center;
                height: @td-height;
                line-height: @td-height;
                border: @border-style;
                border-width: 0 1px 1px 0;

                &:last-child {
                    border-width: 0 0 1px 0;
                }
            }

            &:last-child {
                td {
                    border-width: 0 1px 0 0;

                    &:last-child {
                        border-width: 0;
                    }
                }

            }
        }

    }

    .m-dialog-wrap {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.6);
    }

    .m-dialog {
        position: fixed;
        width: 350px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border: @border-style;
        border-radius: 5px;
        background-color: #fff;
    }

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
        }
    }

    .u-button-wrap {
        margin: 10px 20px;
        text-align: right;

        button {
            &:last-child {
                margin-left: 20px;
            }
        }
    }
    .m-crumb {
        margin: 20px;
    }
</style>