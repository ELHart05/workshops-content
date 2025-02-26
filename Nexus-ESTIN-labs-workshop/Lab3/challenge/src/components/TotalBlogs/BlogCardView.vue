<template>
    <div class="card-wrapper">
        <div class="card-img">
            <div v-if="postEdit && isAdmin" @click="deletePost(card.blogCoverPhoto)" class="card-edit-icons delete">
            </div>
            <div v-if="postEdit && isAdmin" @click="editPost" class="card-edit-icons edit"></div>
            <img :class="{bgImg: true, displayed: imgLoaded}" @load="toggleLoading" :src="card.blogCoverFileURL"
                alt="#">
            <span class="loader" v-if="!imgLoaded"></span>
        </div>
        <div class="card-content">
            <h4>{{ card.blogTitle }}</h4>
            <h6>Posted on: <span>{{ dateFormat() }}</span> <span v-if="card.editTime">(edited)</span></h6>
            <div class="tags homepage-padding">
                <div class="tag" v-for="(tag,index) in card.blogTags" @click="filterPosts(tag)" :key="index">
                    {{ tag }}
                </div>
            </div>
            <div class="likes-comments-saved" v-if="!homePage">
                <div class="likes">
                    <svg @click="addLike" ref="svgLike" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path ref="like" :class="{active: card.likes.includes(this.id)}"
                            d="M128 447.1V223.1c0-17.67-14.33-31.1-32-31.1H32c-17.67 0-32 14.33-32 31.1v223.1c0 17.67 14.33 31.1 32 31.1h64C113.7 479.1 128 465.6 128 447.1zM512 224.1c0-26.5-21.48-47.98-48-47.98h-146.5c22.77-37.91 34.52-80.88 34.52-96.02C352 56.52 333.5 32 302.5 32c-63.13 0-26.36 76.15-108.2 141.6L178 186.6C166.2 196.1 160.2 210 160.1 224c-.0234 .0234 0 0 0 0L160 384c0 15.1 7.113 29.33 19.2 38.39l34.14 25.59C241 468.8 274.7 480 309.3 480H368c26.52 0 48-21.47 48-47.98c0-3.635-.4805-7.143-1.246-10.55C434 415.2 448 397.4 448 376c0-9.148-2.697-17.61-7.139-24.88C463.1 347 480 327.5 480 304.1c0-12.5-4.893-23.78-12.72-32.32C492.2 270.1 512 249.5 512 224.1z" />
                    </svg>
                    <span ref="totalLikes">{{ card.likes.length }}</span>
                </div>
                <div class="comments">
                    <svg @click="addComment" ref="svgComment" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                        <path ref="comment"
                            :class="{active: card.comments.filter((ele) => {return ele.owner == this.id}).length>0}"
                            d="M416 176C416 78.8 322.9 0 208 0S0 78.8 0 176c0 39.57 15.62 75.96 41.67 105.4c-16.39 32.76-39.23 57.32-39.59 57.68c-2.1 2.205-2.67 5.475-1.441 8.354C1.9 350.3 4.602 352 7.66 352c38.35 0 70.76-11.12 95.74-24.04C134.2 343.1 169.8 352 208 352C322.9 352 416 273.2 416 176zM599.6 443.7C624.8 413.9 640 376.6 640 336C640 238.8 554 160 448 160c-.3145 0-.6191 .041-.9336 .043C447.5 165.3 448 170.6 448 176c0 98.62-79.68 181.2-186.1 202.5C282.7 455.1 357.1 512 448 512c33.69 0 65.32-8.008 92.85-21.98C565.2 502 596.1 512 632.3 512c3.059 0 5.76-1.725 7.02-4.605c1.229-2.879 .6582-6.148-1.441-8.354C637.6 498.7 615.9 475.3 599.6 443.7z" />
                    </svg>
                    <span ref="totalComments">{{ card.comments.length }}</span>
                </div>
                <div class="allSaved">
                    <svg @click="addSave" class="saveSvg" ref="svgSave" xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 384 512">
                        <path ref="saved" :class="{active: card.saved.includes(this.id)}"
                            d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z" />
                    </svg>
                    <span ref="totalSaves">{{ card.saved.length }}</span>
                </div>
            </div>
            <router-link :to="{name: 'view-post', params:{blogid: card.blogID}}">VIEW THE POST <svg aria-hidden="true"
                    focusable="false" data-prefix="fal" data-icon="arrow-right"
                    class="svg-inline--fa fa-arrow-right fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512">
                    <path fill="currentColor"
                        d="M216.464 36.465l-7.071 7.07c-4.686 4.686-4.686 12.284 0 16.971L387.887 239H12c-6.627 0-12 5.373-12 12v10c0 6.627 5.373 12 12 12h375.887L209.393 451.494c-4.686 4.686-4.686 12.284 0 16.971l7.071 7.07c4.686 4.686 12.284 4.686 16.97 0l211.051-211.05c4.686-4.686 4.686-12.284 0-16.971L233.434 36.465c-4.686-4.687-12.284-4.687-16.97 0z">
                    </path>
                </svg>
            </router-link>
        </div>
    </div>
    <LoadingView v-if="loading" />
    <ModalView :modalConfirm="false" :modalPhoto="false" :modalMessage="errorMessage" :modalCase="error"
        @close-modal="closeModal" />
    <ModalView :modalConfirm="true" :modalPhoto="false" :modalMessage="errorMessage2" :modalCase="error2"
        @close-modal="closeModal" @confirm-modal="confirmModal" />
</template>

<script>
    import {
        doc,
        deleteDoc,
        updateDoc,
        getDoc
    } from 'firebase/firestore';
    import {
        db,
        blogsRef,
        storage,
        auth
    } from '../../firebase/index.js';
    import {
        deleteObject,
        ref
    } from 'firebase/storage';
    import LoadingView from '../PopUps/LoadingView.vue';
    import ModalView from '../PopUps/ModalView.vue';
    import {
        mapState
    } from 'vuex';
    import moment from 'moment';
    export default {
        name: "BlogCardView",
        components: {
            LoadingView,
            ModalView
        },
        props: ["card", "postEdit", "homePage"],
        data() {
            return {
                loading: false,
                imgLoaded: false,
                error: false,
                errorMessage: "",
                error2: false,
                errorMessage2: "",
                blogLikes: [],
                blogComments: [],
                blogSaved: [],
                userNotifications: [],
                blogsWithSameFileName: [],
                userRef: null
            };
        },
        mounted() {
            this.blogLikes = this.card.likes.slice();
            this.blogComments = this.card.comments.slice();
            this.blogSaved = this.card.saved.slice();
        },
        updated() {
            this.loadedContent();
        },
        watch: {
            blogUsers() {
                this.loadedContent();
            },
            blogPosts() {
                this.loadedContent();
            }
        },
        methods: {
            async loadedContent() {
                if ((this.card.profileID != this.id) && (this.userState)) {
                    this.userRef = doc(db, 'users', this.card.profileID);
                    await getDoc(this.userRef).then((res) => {
                        this.userNotifications = res.data().notifications;
                    })
                }
            },
            toggleLoading() {
                this.imgLoaded = true;
            },
            async addLike() {
                if (this.userState) {
                    this.loading = true;
                    const docRef = doc(db, 'blogs', this.card.blogID);
                    this.$refs.svgLike.classList.add("disabled");
                    if (this.$refs.like.classList.contains("active")) {
                        this.blogLikes = this.blogLikes.filter((like) => {
                            return (like != auth.currentUser.uid);
                        });
                        if (this.card.profileID != this.id) {
                            this.userNotifications = this.userNotifications.filter((notification) => {
                                return ((notification.type != 'like') || (notification.blogID != this.card
                                    .blogID) || (notification.userID != this.id));
                            })
                            await updateDoc(this.userRef, {
                                notifications: this.userNotifications
                            })
                        }
                        await updateDoc(docRef, {
                                likes: this.blogLikes
                            })
                            .then(() => {
                                this.$refs.svgLike.classList.remove("disabled");
                                this.loading = false;
                                this.error = true;
                                this.errorMessage = "Like removed Successfully!";
                            });
                    } else {
                        this.blogLikes.push(auth.currentUser.uid);
                        if (this.card.profileID != this.id) {
                            this.userNotifications.unshift({
                                userID: this.id,
                                blogID: this.card.blogID,
                                id: this.userNotifications.length,
                                type: 'like',
                                readed: false,
                                date: new Date()
                            });
                            await updateDoc(this.userRef, {
                                notifications: this.userNotifications
                            })
                        }
                        await updateDoc(docRef, {
                            likes: this.blogLikes
                        }).then(() => {
                            this.$refs.svgLike.classList.remove("disabled");
                            this.loading = false;
                            this.error = true;
                            this.errorMessage = "Like added Successfully!";
                        });
                    }
                    return;
                } {
                    this.$router.push({
                        name: 'login'
                    });
                    window.scrollTo(0, 0);
                }
            },
            addComment() {
                if (this.userState) {
                    this.$router.push({
                        name: 'view-post',
                        params: {
                            blogid: this.card.blogID
                        }
                    });
                    return;
                }
                this.$router.push({
                    name: 'login'
                });
            },
            async addSave() {
                if (this.userState) {
                    this.loading = true;
                    const docRef = doc(db, 'blogs', this.card.blogID);
                    this.$refs.svgSave.classList.add("disabled");
                    if (this.$refs.saved.classList.contains("active")) {
                        this.blogSaved = this.blogSaved.filter((like) => {
                            return (like != auth.currentUser.uid);
                        });
                        if (this.card.profileID != this.id) {
                            this.userNotifications = this.userNotifications.filter((notification) => {
                                return ((notification.type != 'save') || (notification.blogID != this.card.blogID) || (notification.userID != this.id));
                            })
                            await updateDoc(this.userRef, {
                                notifications: this.userNotifications
                            })
                        }
                        await updateDoc(docRef, {
                                saved: this.blogSaved
                            })
                            .then(() => {
                                this.$refs.svgSave.classList.remove("disabled");
                                this.loading = false;
                                this.error = true;
                                this.errorMessage = "Blog removed from blogmarks Successfully!";
                            });
                    } else {
                        this.blogSaved.push(auth.currentUser.uid);
                        if (this.card.profileID != this.id) {
                            this.userNotifications.unshift({
                                userID: this.id,
                                blogID: this.card.blogID,
                                id: this.userNotifications.length,
                                type: 'save',
                                readed: false,
                                date: new Date()
                            });
                            await updateDoc(this.userRef, {
                                notifications: this.userNotifications
                            })
                        }
                        await updateDoc(docRef, {
                                saved: this.blogSaved
                            })
                            .then(() => {
                                this.$refs.svgSave.classList.remove("disabled");
                                this.loading = false;
                                this.error = true;
                                this.errorMessage = "Blog added in blogmarks Successfully!";
                            });
                    }
                    return;
                } {
                    this.$router.push({
                        name: 'login'
                    });
                    window.scrollTo(0, 0);
                }
            },
            filterPosts(tag) {
                this.$store.commit("changeCurrentBlogPosts", this.blogPosts.filter((post) => {
                    return post.blogTags.includes(tag);
                }));
                this.$store.commit("changeCurrentTag", tag);
                this.$router.push({
                    name: 'blogs'
                })
            },
            closeModal() {
                this.error = false;
                this.errorMessage = "";
                this.error2 = false;
                this.errorMessage2 = "";
            },
            async confirmModal() {
                this.error2 = false;
                this.errorMessage2 = "";
                this.loading = true;
                const docRef = doc(blogsRef, this.card.blogID);
                const storageRef = ref(storage, `document/BlogCards/${this.card.blogCoverPhoto}`);
                if (this.blogsWithSameFileName.length == 0) {
                    await deleteObject(storageRef)
                }
                deleteDoc(docRef)
                    .then(() => {
                        this.loading = false;
                        this.error = true;
                        this.$store.commit("changeCurrentTag", 'All');
                        this.errorMessage = "Post Deleted Successfully!";
                        return;
                    })
                    .catch((err) => {
                        this.loading = false;
                        this.error = true;
                        this.errorMessage = err.message.slice(9, -1);
                    });
            },
            dateFormat() {
                return moment.unix(this.card.blogTime.seconds).format("LL");
            },
            editFormat() {
                return moment.unix(this.currentBlog[0].editTime.seconds).format('LLLL');
            },
            deletePost(fileName) {
                this.error2 = true;
                this.errorMessage2 = "Are you sure you want to delete this post?";
                this.blogsWithSameFileName = this.blogPosts.slice().filter((post) => {
                    return post.blogCoverPhoto == fileName
                });
            },
            editPost() {
                this.$router.push({
                    name: 'edit-post',
                    params: {
                        blogid: this.card.blogID
                    }
                });
            }
        },
        computed: {
            ...mapState(['isAdmin', 'blogPosts', 'userState', 'id', 'notifications', 'blogUsers'])
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

    .card-wrapper {
        @include flex(center,center,column);
        border-radius: 8px;
        min-height: 420px;
        text-decoration: none;
        transition: .5s;
        background-color: white;
        color: black;

        &:hover {
            transform: rotate(-1deg);
            box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
        }

        .card-img {
            @include flex(center,center,row);
            position: relative;
            width: 100%;
            max-height: 200px;
            min-height: 200px;

            .loader {
                height: 50px;
                width: 50px;
                border-radius: 50%;
                border: 2px solid white;
                border-color: black transparent black transparent;
                animation: rotation infinite 900ms ease-in-out;
            }

            .bgImg {
                width: 100%;
                height: 100%;
                border-top-left-radius: 8px;
                border-top-right-radius: 8px;
                min-height: 200px;
                object-fit: cover;
                display: none;
            }

            .displayed {
                display: flex;
            }

            .card-edit-icons {
                position: absolute;
                background-size: 35%;
                background-repeat: no-repeat;
                background-position: center;
                border: 1px solid black;
                top: 5px;
                right: 5px;
                height: 40px;
                width: 40px;
                padding: 0;
                transition: .5s;
                border-radius: 50%;
                background-color: white;
                cursor: pointer;

                &:hover {
                    background-color: rgb(188, 182, 182);
                }
            }

            .edit {
                background-image: url(../../assets/Icons/edit-regular.svg);
                right: 50px;
            }

            .delete {
                background-image: url(../../assets/Icons/trash-regular.svg);
            }
        }


        .card-content {
            @include flex(center,flex-start,column);
            padding: 32px 16px;
            height: 100%;
            width: 100%;

            h4 {
                font-size: 20px;
                font-weight: 300;
            }

            h6 {
                font-size: 12px;
                font-weight: 400;
                margin-top: 12px;
            }

            a {
                @include flex(center,center,row);
                font-weight: 500;
                font-size: 12px;
                color: black;
                justify-self: flex-end;
                text-decoration: none;
                text-decoration: underline 0.2px rgba(255, 255, 255, 0);
                text-underline-offset: 3px;
                transition: 300ms;
                margin-top: auto;

                &:hover {
                    text-decoration-color: black;
                }

                svg {
                    height: 9px;
                    width: 9px;
                    margin-left: 3px;
                }

            }

            .tags {
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                gap: 5px;
                margin-top: 15px;
                width: 100%;

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

            .homepage-padding{
                padding-bottom: 15px;
            }
        }

        .likes-comments-saved {
            display: flex;
            margin: 15px 0;
            flex-wrap: wrap;
            gap: 10px 30px;
            width: 100%;

            div {
                display: flex;
                align-items: center;

                span {
                    font-size: 20px;
                    margin-left: 5px;
                }

                svg {
                    height: 25px;
                    width: 25px;
                    cursor: pointer;

                    path {
                        transition: .5s;
                    }

                    .active {
                        fill: #41B883;
                    }

                    &:hover path {
                        fill: #41B883;
                    }
                }

                .saveSvg {
                    height: 26px;
                    width: 16px;
                }

                .disabled {
                    pointer-events: none;
                    cursor: not-allowed;
                }
            }
        }

    }
</style>