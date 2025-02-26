<template>
    <NavBarView />
    <section class="blogs">
        <div class="params">
            <div class="edit-blogs" v-if="userState">
                <p>Show BlogMarks Based On:</p>
                <select @change="filterPostsBySelect" v-model="select">
                    <option value="Choose a filter parameter" selected disabled>Choose a filter parameter</option>
                    <option value="postedByMe" v-if="isAdmin">Posted By Me</option>
                    <option value="Saved">Saved</option>
                    <option value="Comments">Comments</option>
                    <option value="Likes">Likes</option>
                </select>
            </div>
            <div class="edit-blogs" v-if="isAdmin">
                <p>Toggle Editing Post</p><input type="checkbox" v-model="postEdit">
            </div>
        </div>
        <div class="tags">
            <div class="tag" ref="allBlogTag" @click="getAllPosts()">All</div>
            <div class="tag" ref="blogTag" v-for="(tag,index) in totalBlogTags" @click="filterPostsByTags(tag)"
                :key="index">
                {{ tag }}
            </div>
        </div>
        <div :class="{blogsContainer: true, emptyBlogContainer: !currentBlogPosts.length>0}">
            <h2 v-if="!currentBlogPosts.length>0">No Posts Based On these Filter!</h2>
            <BlogCardView v-else :postEdit="postEdit" :homePage="false" :card="card" v-for="(card, index) in currentBlogPosts"
                :key="index" />
        </div>
    </section>
    <FooterView />
</template>

<script>
    import NavBarView from '../../components/Main/NavBarView.vue';
    import BlogCardView from '../../components/TotalBlogs/BlogCardView.vue';
    import FooterView from '../../components/Main/FooterView.vue';
    import {
        mapState
    } from 'vuex';
    export default {
        name: "TotalBlogsView",
        components: {
            NavBarView,
            BlogCardView,
            FooterView
        },
        data() {
            return {
                error: false,
                errorMessage: '',
                select: 'Choose a filter parameter'
            }
        },
        mounted() {
            setTimeout(this.loadContent, 0)
        },
        watch: {
            currentTag() {
                this.loadContent();
            }
        },
        methods: {
            loadContent() {
                if (this.currentTag != 'Select') {
                    if (this.currentTag == 'All') {
                        this.$refs.blogTag.forEach((e) => {
                            e.classList.remove("active-tag");
                        });
                        this.$refs.allBlogTag.classList.add("all-tags");
                        return;
                    } {
                        this.$refs.blogTag.forEach((e) => {
                            e.classList.remove("active-tag");
                            this.$refs.allBlogTag.classList.remove("all-tags");
                            if (e.textContent == this.currentTag) {
                                e.classList.add("active-tag");
                            }
                        })
                    };
                } else {
                    this.filterPostsBySelect();
                }
            },
            filterPostsBySelect() {
                this.$refs.blogTag.forEach((e) => {
                    e.classList.remove("active-tag");
                });
                this.$refs.allBlogTag.classList.remove("all-tags");
                this.$store.commit("changeCurrentTag", 'Select');
                switch (this.select) {
                    case 'Saved':
                        this.$store.commit("changeCurrentBlogPosts", this.blogPosts.filter((post) => {
                            return post.saved.includes(this.id);
                        }));
                        break;
                    case 'Comments':
                        this.$store.commit("changeCurrentBlogPosts", this.blogPosts.filter(post => post.comments.some(
                            comment => comment.owner == this.id)));
                        break;
                    case 'Likes':
                        this.$store.commit("changeCurrentBlogPosts", this.blogPosts.filter((post) => {
                            return post.likes.includes(this.id);
                        }));
                        break;
                    case 'postedByMe':
                        this.$store.commit("changeCurrentBlogPosts", this.blogPosts.filter((post) => {
                            return post.profileID == this.id;
                        }));
                        break;
                }
            },
            filterPostsByTags(tag) {
                this.$store.commit("changeCurrentBlogPosts", this.blogPosts.filter((post) => {
                    return post.blogTags.includes(tag);
                }));
                this.$store.commit("changeCurrentTag", tag);
                this.$refs.allBlogTag.classList.remove("all-tags");
                this.$refs.blogTag.forEach((e) => {
                    e.classList.remove("active-tag");
                    if (e.textContent == tag) {
                        e.classList.add("active-tag");
                    }
                });
                this.select = 'Choose a filter parameter';
            },
            getAllPosts() {
                this.$refs.blogTag.forEach((e) => {
                    e.classList.remove("active-tag");
                });
                this.$refs.allBlogTag.classList.add("all-tags");
                this.$store.commit("changeCurrentTag", 'All');
                this.$store.commit("changeCurrentBlogPosts", this.blogPosts);
                this.select = 'Choose a filter parameter';
            }
        },
        computed: {
            ...mapState(['blogPosts', 'isAdmin', 'totalBlogTags', 'currentBlogPosts', 'currentTag', 'userState', 'id',
                'blogUsers'
            ]),
            postEdit: {
                get() {
                    return this.$store.state.postEdit;
                },
                set(payload) {
                    this.$store.commit("toggleEditPost", payload);
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @use '../../assets/sass/mixins.scss'as *;

    .blogs {
        background-color: #f1f1f1;
        @include flex(center,center,column);
        padding: 100px 25px;

        .params {
            @include flex(space-between,center,row);
            flex-wrap: wrap;
            width: 100%;
            column-gap: 10px;

            .edit-blogs {
                display: flex;
                align-items: center;
                margin-bottom: 25px;
                flex-wrap: wrap;
                gap: 10px;

                p {
                    font-size: 18px;
                }

                select {
                    border: none;
                    outline: none;
                    font-size: 17px;
                    padding: 2px;
                    background-color: #f2f7f6;
                    cursor: pointer;
                }

                input[type="checkbox"] {
                    position: relative;
                    appearance: none;
                    outline: none;
                    width: 50px;
                    height: 25px;
                    border-radius: 20px;
                    background: white;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                    cursor: pointer;

                    &::selection {
                        background-color: transparent;
                    }

                    &:before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 25px;
                        height: 25px;
                        border-radius: 20px;
                        background: #303030;
                        transform: scale(1.1);
                        transition: 750ms;
                        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

                        &::selection {
                            background-color: transparent;
                        }
                    }

                    &:checked:before {
                        background: white;
                        left: 25px;
                    }
                }
            }
        }

        .tags {
            display: flex;
            column-gap: 10px;
            margin-bottom: 35px;
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


            .active-tag {
                border-color: gray;
                background-color: gray;
            }

            .all-tags {
                background-color: green;
                border-color: green;

                &:hover {
                    border-color: rgb(4, 183, 4);
                    background-color: rgb(4, 183, 4);
                }
            }
        }

        .blogsContainer {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 32px;
            width: 100%;

            @include width(1200px) {
                grid-template-columns: repeat(3, 1fr);
            }

            @include width(900px) {
                grid-template-columns: repeat(2, 1fr);
            }

            @include width(500px) {
                grid-template-columns: repeat(1, 1fr);
            }

            h2 {
                text-align: center;
                font-size: 40px;
                padding: 100px;
            }
        }

        .emptyBlogContainer {
            @include flex(center,center,row);
        }
    }
</style>