<template>
    <section class="main">
        <BlogPostView v-if="!userState" :post="welcomeScreen" />
        <BlogPostView :post="post" v-for="(post, index) in mainBlogPosts" :key="index" />
    </section>
</template>

<script>
    import {
        mapGetters,
        mapState
    } from 'vuex';
    import BlogPostView from './BlogPostView.vue';
    export default {
        name: 'MainSectionView',
        components: {
            BlogPostView
        },
        data() {
            return {
                welcomeScreen: {
                    title: 'WELCOME!',
                    blogPost: 'Weekly blog articles with all things programming including HTML, CSS, JavaScript and more. Register today to never miss a post!',
                    photo: 'welcomeHome.jpg',
                    welcomeScreen: true
                }
            }
        },
        computed: {
            ...mapGetters(['mainBlogPosts']),
            ...mapState(['userState'])
        }
    }
</script>

<style lang="scss" scoped>
    @use '../../assets/sass/mixins.scss'as *;

    .main {
        display: flex;
        flex-direction: column;
    }
</style>