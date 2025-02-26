<template>
    <PathNotFoundView v-if="!userState || !isAdmin" />
    <div v-else>
        <NavBarView />
        <section class="preview">
            <h2>{{ blogTitle }}</h2>
            <p>Posted on: <span>{{ blogTime }}</span></p>
            <img :src="blogCoverFileURL" :alt="blogCoverPhoto">
            <div class="html-blog" v-html="blogHTML"></div>
            <hr />
            <div class="tags">
                <div class="tag" v-for="(tag,index) in blogTags" @click="awaitPublish(tag)" :key="index">{{ tag }}</div>
            </div>
            <hr />
        </section>
        <FooterView />
        <ModalView :modalConfirm="false" :modalPhoto="false" :modalMessage="errorMessage" :modalCase="error"
            @close-modal="closeModal" />
    </div>
</template>

<script>
    import PathNotFoundView from '../Error/PathNotFoundView.vue';
    import NavBarView from '../../components/Main/NavBarView.vue';
    import FooterView from '../../components/Main/FooterView.vue';
    import ModalView from '../../components/PopUps/ModalView.vue';
    import {
        mapState
    } from 'vuex';
    export default {
        name: "PreviewNewPost",
        components: {
            PathNotFoundView,
            NavBarView,
            FooterView,
            ModalView
        },
        data() {
            return {
                error: false,
                errorMessage: "",
                validTag: []
            }
        },
        mounted() {
            if (!this.blogTitle) {
                this.$router.push({
                    name: 'create-post'
                })
            }
        },
        methods: {
            closeModal() {
                this.error = false;
                this.errorMessage = "";
            },
            awaitPublish(tag) {
                this.validTag = this.blogPosts.filter((post) => {
                    return post.blogTags.includes(tag);
                })
                if (this.validTag.length > 0) {
                    this.$store.commit("changeCurrentBlogPosts", this.validTag);
                    this.$store.commit("changeCurrentTag",tag);
                    this.$router.push({
                        name: 'blogs'
                    });
                    return;
                } {
                    this.error = true;
                    this.errorMessage = "You Didn't post the blog yet, tag doesn't exist";
                }
            }
        },
        computed: {
            ...mapState(['userState', 'blogTitle', 'blogTime', 'blogHTML', 'blogCoverFileURL', 'blogCoverPhoto',
                'isAdmin', 'blogTags', 'blogPosts'
            ])
        }
    }
</script>

<style lang="scss" scoped>
    @use '../../assets/sass/mixins.scss'as *;
    @use '../../assets/sass/classStyles.scss'as *;

    .preview {
        display: flex;
        flex-direction: column;
        padding: 100px;
        row-gap: 12px;

        @include width(700px) {
            padding: 100px 10px;
        }

        h2 {
            font-weight: 300;
            font-size: 40px;

            &::first-letter {
                text-transform: uppercase;
            }

            @include width(700px) {
                font-size: 32px;
            }
        }

        p {
            font-weight: 400;
        }

        img {
            width: 100%;
            max-width: 850px;
            margin-top: 15px;
            border: 1px solid black;
        }

        .html-blog {
            margin-top: 15px;
            font-size: 20px;
            line-height:1.4;
        }

        .tags {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            gap: 10px;
            width: 100%;
            overflow-y: scroll;
            -ms-overflow-style: none;
            scrollbar-width: none;

            &::-webkit-scrollbar {
                display: none;
            }

            .tag {
                transition: .5s;
                padding: 8px;
                border-radius: 8px;
                background-color: #303030;
                color: white;
                border: 1px solid black;
                cursor: pointer;

                &:hover {
                    border-color: gray;
                    background-color: gray;
                }
            }
        }
    }
</style>