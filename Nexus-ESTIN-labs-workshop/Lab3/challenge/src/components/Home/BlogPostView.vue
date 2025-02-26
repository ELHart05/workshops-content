<template>
    <div class="blog-post-container" :class="{welcome: post.welcomeScreen}">
        <div class="blog-content">
            <div class="blog-content-wrapper">
                <h2 v-if="post.welcomeScreen">{{ post.title }}</h2>
                <h2 v-else>{{ post.blogTitle }}</h2>
                <p v-if="post.welcomeScreen">{{ post.blogPost }}</p>
                <p v-else v-html="post.blogHTML.slice(0,40).concat('...')" style="display: flex;"></p>
                <div v-if="!post.welcomeScreen" class="tags">
                    <div class="tag" ref="blogTag" v-for="(tag,index) in post.blogTags" @click="filterPosts(tag)"
                        :key="index">
                        {{ tag }}
                    </div>
                </div>
                <router-link v-if="post.welcomeScreen" :to="{name: 'register'}" class="welcome-a">LOGIN/REGISTER <svg
                        aria-hidden="true" focusable="false" data-prefix="fal" data-icon="arrow-right"
                        class="svg-inline--fa fa-arrow-right fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512">
                        <path fill="white"
                            d="M216.464 36.465l-7.071 7.07c-4.686 4.686-4.686 12.284 0 16.971L387.887 239H12c-6.627 0-12 5.373-12 12v10c0 6.627 5.373 12 12 12h375.887L209.393 451.494c-4.686 4.686-4.686 12.284 0 16.971l7.071 7.07c4.686 4.686 12.284 4.686 16.97 0l211.051-211.05c4.686-4.686 4.686-12.284 0-16.971L233.434 36.465c-4.686-4.687-12.284-4.687-16.97 0z">
                        </path>
                    </svg>
                </router-link>
                <router-link v-else :to="{name: 'view-post', params:{blogid: post.blogID}}" class="posts-a">VIEW
                    THE POST <svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="arrow-right"
                        class="svg-inline--fa fa-arrow-right fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512">
                        <path fill="currentColor"
                            d="M216.464 36.465l-7.071 7.07c-4.686 4.686-4.686 12.284 0 16.971L387.887 239H12c-6.627 0-12 5.373-12 12v10c0 6.627 5.373 12 12 12h375.887L209.393 451.494c-4.686 4.686-4.686 12.284 0 16.971l7.071 7.07c4.686 4.686 12.284 4.686 16.97 0l211.051-211.05c4.686-4.686 4.686-12.284 0-16.971L233.434 36.465c-4.686-4.687-12.284-4.687-16.97 0z">
                        </path>
                    </svg>
                </router-link>
            </div>
        </div>
        <div class="blogImg" :class="{setHight: !imgLoaded}">
            <img v-if="post.welcomeScreen" @load="toggleLoading" :class="{displayed: imgLoaded}"
                :src="require(`../../assets/${post.photo}`)" alt="#">
            <img v-else ref="blogPhoto" @load="toggleLoading" :src="post.blogCoverFileURL"
                :class="{blogCoverPhoto: true, displayed: imgLoaded}" alt="#">
            <span :class="{loader: true, welcomeLoader: post.welcomeScreen}" v-if="!imgLoaded"></span>
        </div>
    </div>
</template>

<script>
    import {
        mapState
    } from 'vuex';
    export default {
        name: "MainSectionView",
        props: ["post"],
        data() {
            return {
                imgLoaded: false
            }
        },
        methods: {
            toggleLoading() {
                this.imgLoaded = true;
            },
            filterPosts(tag) {
                this.$store.commit("changeCurrentBlogPosts", this.blogPosts.filter((post) => {
                    return post.blogTags.includes(tag);
                }));
                this.$store.commit("changeCurrentTag", tag);
                this.$router.push({
                    name: "blogs"
                });
            }
        },
        computed: {
            ...mapState(["blogPosts", "contentLoaded"])
        }
    }
</script>

<style lang="scss" scoped>
    @use '../../assets/sass/mixins.scss'as *;

    @keyframes rotation {
        100% {
            transform: rotate(360deg);
        }
    }

    .blog-post-container:nth-child(even) {
        .blogImg {
            order: 1;
        }

        .blog-content {
            order: 2;
        }
    }

    .blog-post-container {
        @include flex(center,center,row);
        height: 650px;

        @include width(700px) {
            flex-direction: column;
            height: unset;
        }

        .blog-content {
            width: 100%;
            @include flex(center,center,column);
            flex: 3;
            height: 100%;

            @include width(800px) {
                flex: 4;
            }

            @include width(700px) {
                order: 2;
            }

            .blog-content-wrapper {
                width: 100%;
                padding: 0 24px;
                max-width: 375px;

                @include width(700px) {
                    max-width: 340px;
                    padding: 72px 24px;
                }

                h2 {
                    font-weight: 300;
                    font-size: 40px;
                    text-transform: uppercase;

                    @include width(700px) {
                        font-size: 32px;
                    }

                    @include width(400px) {
                        font-size: 25px;
                    }
                }

                p {
                    margin: 25px 0;
                    font-size: 15px;
                    font-weight: 300;
                    line-height: 1.7;
                }

                .posts-a {
                    color: black;

                    &:hover {
                        text-decoration-color: black;
                    }
                }

                .welcome-a {
                    color: white;

                    &:hover {
                        text-decoration-color: white;
                    }
                }

                a {
                    display: flex;
                    align-items: center;
                    margin-top: 32px;
                    text-decoration: underline 0.2px rgba(255, 255, 255, 0);
                    text-underline-offset: 3px;
                    transition: 300ms;
                    padding-top: 10px;
                    width: fit-content;

                    svg {
                        margin-left: 5px;
                        height: 15px;
                        width: 15px
                    }
                }

                .tags {
                    display: flex;
                    flex-direction: row;
                    gap: 5px;
                    margin-top: 15px;
                    width: 100%;
                    overflow-y: scroll;
                    -ms-overflow-style: none;
                    scrollbar-width: none;

                    &::-webkit-scrollbar {
                        display: none;
                    }

                    .tag {
                        transition: .5s;
                        padding: 6px;
                        font-size: 13px;
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
        }

        .blogImg {
            @include flex(center,center,row);
            flex: 4;
            height: 100%;
            overflow: hidden;

            @include width(800px) {
                flex: 3;
            }

            @include width(700px) {
                width: 100%;
                flex: unset;
                order: 1;
            }


            img {
                height: 100%;
                width: 100%;
                object-fit: cover;
                display: none;
            }

            .loader {
                height: 50px;
                width: 50px;
                border-radius: 50%;
                border: 2px solid white;
                border-color: black transparent black transparent;
                animation: rotation infinite 900ms ease-in-out;
            }

            .welcomeLoader {
                border-color: white transparent white transparent;
            }

            .displayed {
                display: flex;
            }
        }

        .setHight {
            @include width(700px) {
                min-height: 300px;
            }
        }
    }

    .welcome {
        background-color: #303030;
        color: white;
    }
</style>