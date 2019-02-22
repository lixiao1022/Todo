<template>
    <div>
        <ul>
            <li v-for="item in data" :key="item._id">
                <input type="checkbox">
                <span class="content">{{ item.name }}</span>
                <span class="close"></span>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        props: {
            data: {
                type: Array,
                default: []
            }
        }
    }
</script>

<style scoped>
    .content {
        margin: 0 50px 0 10px;
    }
    .close {
        color: brown;
    }
    .close::before {
        content: '\2716';
    }
</style>