<template>
    <section class="recent-blogs">
        <h3>View More Recent Blogs</h3>
        <div class="recent-blogs-grid">
            <BlogCardView :card="card" :homePage="true" v-for="(card, index) in recentBlogCards" :key="index" />
        </div>
    </section>
</template>

<script>
    import {
        mapGetters
    } from 'vuex';
    import BlogCardView from '../TotalBlogs/BlogCardView.vue';
    export default {
        name: "RecentBlogView",
        components: {
            BlogCardView
        },
        computed: {
            ...mapGetters(['recentBlogCards'])
        }
    }
</script>

<style lang="scss" scoped>
    @use '../../assets/sass/mixins.scss'as *;

    .recent-blogs {
        display: flex;
        flex-direction: column;
        padding: 100px 30px;
        background-color: #f1f1f1;

        h3 {
            font-size: 28px;
            font-weight: 300;
        }

        .recent-blogs-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 32px;
            margin-top: 32px;

            @include width(1200px) {
                grid-template-columns: repeat(3, 1fr);
            }

            @include width(900px) {
                grid-template-columns: repeat(2, 1fr);
            }

            @include width(500px) {
                grid-template-columns: repeat(1, 1fr);
            }
        }
    }
</style>