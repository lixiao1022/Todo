<template>
    <div :class="{ block: loading }">
        <p>todo首页</p>

        <button @click="get()">get</button>

        <button @click="post()">post</button>
        
        <button @click="put()">put</button>

        <button @click="del()">delete</button>

    </div>
</template>

<script>
    import { mapState, mapMutations } from 'vuex';

    export default {

        computed: {
            ...mapState({
                loading: 'loading'
            }),
        },

        methods: {

            get() {
                this._ajax('get', 'api/list', (data) => {
                    console.log(data);
                }, {
                    name: 'lx'
                });
            },

            post() {
                this._ajax('post', 'api/add', (data) => {
                    console.log(data);
                }, {
                    name: 'lx',
                    complete: false
                });
            },
            
            put() {
                this._ajax('put', 'api/edit', (data) => {
                    console.log(data);
                }, {
                    name: 'lx',
                    age: '25',
                    xtt: 'true'
                });
            },
            
            del() {
                this._ajax('delete', 'api/delete', (data) => {
                    console.log(data);
                }, {
                    name: 'lx',
                    age: '25',
                    xtt: 'true',
                    xttage: '25'
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
        }
    }
</script>

<style scoped>
    .block {
        border: 1px solid red;
    }
</style>