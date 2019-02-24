<template>
    <div class="wrap">
        <todo />
    </div>
</template>

<script>
    import Todo from '../components/Todo.vue';

    export default {
        components: {
            Todo
        }
    }
</script>

<style scoped>
    .wrap {
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>