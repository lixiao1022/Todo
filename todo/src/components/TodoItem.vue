<template>
    <div>
        <ul>
            <li v-for="item in list" :key="item._id">
                <input type="checkbox" @click="changeTask(item)" :checked="item.complete">
                <span :class="{content: true, complete: item.complete}">{{ item.name }}</span>
                <span class="close" @click="remove(item._id)"></span>
            </li>
        </ul>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex';

    export default {
        computed: {
            ...mapState([
                'list'
            ])
        },

        methods: {
            ...mapActions([
                'changeTask',
                'deleteTask'
            ]),

            remove(id) {
                this.deleteTask(id);
            }
        }
    }
</script>

<style scoped>
    ul {
        list-style-type: none;
    }
    .content {
        margin: 0 50px 0 10px;
    }
    .content.complete {
        text-decoration: line-through;
        opacity: 0.5;
    }
    .close {
        color: brown;
    }
    .close::before {
        content: '\2716';
    }
</style>