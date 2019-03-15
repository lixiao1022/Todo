<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
    import { mapActions } from 'vuex';

    export default {
        methods: {
            ...mapActions('user', [
                'getPages'
            ])
        },
        created() {
            this.getPages();
        }
    }
</script>

<style scoped>
    
</style>