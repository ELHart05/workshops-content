<template>
    <div v-if="currentBlog.length>0">
        <NavBarView />
        <section class="preview">
            <div class="intro">
                <h2>{{ currentBlog[0].blogTitle }}</h2>
                <div>
                    <div v-if="isAdmin" @click="deletePost(currentBlog[0].blogCoverPhoto)"
                        class="card-edit-icons delete"></div>
                    <div v-if="isAdmin" @click="editPost" class="card-edit-icons edit"></div>
                </div>
            </div>
            <p>Posted on: <span>{{ dateFormat() }}</span> <span v-if="currentBlog[0].editTime">(Last edit:
                    {{ editFormat() }})</span></p>
            <div :class="{blogImg: true, heightEdit: imgLoaded}">
                <img :class="{blogCover: true, displayed: imgLoaded}" @load="toggleLoading"
                    :src="currentBlog[0].blogCoverFileURL" :alt="currentBlog[0].blogCoverPhoto">
                <span class="loader" v-if="!imgLoaded"></span>
            </div>
            <div class="html-blog" v-html="currentBlog[0].blogHTML"></div>
            <hr />
            <div class="tags">
                <h4>Tags:</h4>
                <div class="tag" v-for="(tag,index) in currentBlog[0].blogTags" @click="filterPosts(tag)" :key="index">
                    {{ tag }}
                </div>
            </div>
            <hr />
            <div class="likes-section">
                <h4 v-if="!currentBlog[0].likes.length>0">No Likes Right Now!</h4>
                <div v-if="currentBlog[0].likes.length>0 && userState" class="likes">
                    <h4>Liked By: </h4>
                    <div class="like" ref="liker" v-for="(like,index) in currentBlog[0].likes" @click="showInfo(like)"
                        :key="index">
                    </div>
                </div>
                <div v-if="!userState && currentBlog[0].likes.length>0" class="likes">
                    <h4>Liked By: </h4>
                    <div class="like" v-for="(like,index) in currentBlog[0].likes" @click="redirectLogin" :key="index">?
                    </div>
                </div>
            </div>
            <hr />
            <div class="comments-section">
                <h4>Comments: </h4>
                <div class="comments">
                    <div class="new-comment" v-if="userState">
                        <div class="commenter" :style="{background: color}">
                            {{ initialName }}
                            <svg v-if="isAdmin" aria-hidden="true" focusable="false" data-prefix="fal"
                                data-icon="user-crown" class="svg-inline--fa fa-user-crown fa-w-14" role="img"
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path fill="currentColor"
                                    d="M313.6 320c-28.71 0-42.6 16-89.6 16-47.09 0-60.82-16-89.6-16C60.17 320 0 380.17 0 454.4v9.6c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48v-9.6c0-74.23-60.17-134.4-134.4-134.4zM416 464c0 8.82-7.18 16-16 16H48c-8.82 0-16-7.18-16-16v-9.6C32 397.94 77.94 352 134.4 352c19.38 0 39.33 16 89.6 16 49.4 0 70.66-16 89.6-16 56.46 0 102.4 45.94 102.4 102.4v9.6zM224 288c70.7 0 128-57.31 128-128V0l-64 32-64-32-64 32L96 0v160c0 70.69 57.31 128 128 128zM128 51.78l32 16 64-32 64 32 32-16V112H128V51.78zm0 92.22h192v16c0 52.93-43.06 96-96 96s-96-43.07-96-96v-16z">
                                </path>
                            </svg>
                        </div>
                        <div class="comment-content">
                            <textarea placeholder="Drop a comment on this post!" v-model="comment"></textarea>
                            <div class="buttons">
                                <button @click="publishComment">Publish</button>
                            </div>
                        </div>
                    </div>
                    <div class="new-comment" @click="redirectLogin" v-else>
                        <div class="commenter">?</div>
                        <div class="comment-content">
                            <textarea placeholder="Login or Signin so you can commment on posts!" readonly></textarea>
                        </div>
                    </div>
                    <h4 v-if="!currentBlog[0].comments.length>0">No Comments Right Now, Be the first to comment!</h4>
                    <div v-else-if="userState">
                        <h4>Recent Comments:</h4>
                        <div class="new-comment comment" v-for="(comment,index) in currentBlog[0].comments"
                            :key="index">
                            <div class="commenter" ref="commenter" @click="showInfo(comment.owner)">
                            </div>
                            <div class="comment-content">
                                <textarea placeholder="Drop a comment on this post!" ref="textComment" readOnly
                                    v-model="comment.content"></textarea>
                                <p>Commented in: <span>{{ commentFormat(comment.date.seconds) }}</span> <span
                                        v-if="comment.edited">(edited)</span>
                                </p>
                                <div class="buttons">
                                    <button v-if="comment.owner == this.id"
                                        @click="editComment(comment.content,comment.id,$event)">Edit</button>
                                    <button v-if="(comment.owner == this.id) || isAdmin"
                                        @click="deleteComment(comment.id,comment.notificationID)">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <h4>Recent Comments:</h4>
                        <div class="new-comment comment" v-for="(comment,index) in currentBlog[0].comments"
                            :key="index">
                            <div class="commenter" @click="redirectLogin">?</div>
                            <div class="comment-content">
                                <textarea placeholder="Login or Signin so you can commment on posts!" value="??????"
                                    readonly></textarea>
                                <p>Commented in: <span>?? ???,????</span></p>
                                <hr />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <FooterView />
        <LoadingView v-if="loading" />
        <ModalView :modalConfirm="true" :modalPhoto="false" :modalMessage="errorMessage" :modalCase="error"
            @close-modal="closeModal" @confirm-modal="confirmModal" />
        <ModalView :modalConfirm="false" :modalPhoto="false" :modalMessage="errorMessage2" :modalCase="error2"
            @close-modal="closeModal" />
    </div>
</template>

<script>
    import {
        filter
    } from '../../assets/badWords.js';
    import {
        db,
        storage
    } from '../../firebase/index.js';
    import {
        doc,
        getDoc,
        updateDoc,
        deleteDoc
    } from 'firebase/firestore';
    import {
        ref,
        deleteObject
    } from 'firebase/storage';
    import NavBarView from '../../components/Main/NavBarView.vue';
    import FooterView from '../../components/Main/FooterView.vue';
    import LoadingView from '../../components/PopUps/LoadingView.vue';
    import ModalView from '../../components/PopUps/ModalView.vue';
    import {
        mapGetters,
        mapState
    } from 'vuex';
    import moment from 'moment';
    export default {
        name: "ViewBlog",
        components: {
            NavBarView,
            FooterView,
            LoadingView,
            ModalView,
            LoadingView
        },
        data() {
            return {
                loading: false,
                currentBlog: [],
                error: false,
                errorMessage: '',
                error2: false,
                errorMessage2: '',
                confirmType: '',
                comment: '',
                blogComments: [],
                currentCommentID: '',
                currentNotificationID: '',
                savedComment: [],
                userNotifications: [],
                postDeleted: false,
                imgLoaded: false,
                blogsWithSameFileName: [],
                userRef: null
            }
        },
        async mounted() {
            const docRef = doc(db, 'blogs', this.$route.params.blogid);
            await getDoc(docRef)
                .then((res) => {
                    this.currentBlog.push({
                        ...res.data()
                    });
                    if (!Object.keys(this.currentBlog[0]).length) {
                        this.$router.push({
                            name: 'pathnotfound'
                        })
                        return;
                    }
                });
            if (this.currentBlog[0].profileID != this.id) {
                this.userRef = doc(db, 'users', this.currentBlog[0].profileID);
                await getDoc(this.userRef).then((res) => {
                    this.userNotifications = res.data().notifications;
                })
            }
            this.blogComments = this.currentBlog[0].comments.slice();
            if (this.userState) {
                this.getLikesAndComments();
            }
        },
        watch: {
            //review any change on the blogPosts if there's just recall the mounted function to reget the comments and likes and the notifications
            blogPosts() {
                this.loadContent();
            },
            blogUsers() {
                this.loadContent();
            }
        },
        methods: {
            async loadContent() {
                if (!this.postDeleted) {
                    const docRef = doc(db, 'blogs', this.$route.params.blogid);
                    await getDoc(docRef).then((res) => {
                        this.currentBlog = [];
                        this.currentBlog.push({
                            ...res.data()
                        });
                        this.blogComments = this.currentBlog[0].comments.slice();
                        if (this.userState) {
                            this.getLikesAndComments();
                        }
                    })
                    if (this.currentBlog[0].profileID != this.id) {
                        this.userRef = doc(db, 'users', this.currentBlog[0].profileID);
                        await getDoc(this.userRef).then((res) => {
                            this.userNotifications = res.data().notifications;
                        })
                    }
                } else {
                    this.$router.push({
                        name: 'blogs'
                    })
                }
            },
            toggleLoading() {
                this.imgLoaded = true;
            },
            editPost() {
                this.$router.push({
                    name: 'edit-post',
                    params: {
                        blogid: this.currentBlog[0].blogID
                    }
                });
            },
            deletePost(fileName) {
                this.error = true;
                this.errorMessage = "Are you sure you want to delete this post?";
                this.confirmType = 'post-delte';
                if (this.userNotifications.length) {
                    this.blogsWithSameFileName = this.blogPosts.slice().filter((post) => {
                        return post.blogCoverPhoto == fileName
                    });
                }
            },
            async confirmModal() {
                this.loading = true;
                this.error = false;
                this.errorMessage = "";
                const docRef = doc(db, 'blogs', this.currentBlog[0].blogID);
                switch (this.confirmType) {
                    case 'post-delte': //delete the post
                        this.postDeleted = true;
                        const storageRef = ref(storage, `document/BlogCards/${this.currentBlog[0].blogCoverPhoto}`);
                        if (this.blogsWithSameFileName.length == 0) {
                            deleteObject(storageRef)
                        }
                        await deleteDoc(docRef)
                            .then(() => {
                                this.loading = false;
                                this.$store.commit("changeCurrentTag", 'All');
                                this.$router.push({
                                    name: 'blogs'
                                })
                                return;
                            })
                        break;
                    case 'delete': //delete specific comment
                        this.blogComments = this.blogComments.filter((comment) => {
                            return comment.id != this.currentCommentID;
                        });
                        if (this.currentBlog[0].profileID != this.id) {
                            this.userNotifications = this.userNotifications.filter((notification) => {
                                return notification.id != this.currentNotificationID;
                            })
                            await updateDoc(this.userRef, {
                                notifications: this.userNotifications
                            })
                        }
                        await updateDoc(docRef, {
                                comments: this.blogComments
                            })
                            .then(() => {
                                this.loading = false;
                                this.error2 = true;
                                this.errorMessage2 = "Comment Deleted Successfully!";
                            })
                        break;
                    case 'publish': //publish comment
                        if (this.currentBlog[0].profileID != this.id) {
                            this.userNotifications.unshift({
                                userID: this.id,
                                blogID: this.currentBlog[0].blogID,
                                id: this.userNotifications.length,
                                type: 'comment',
                                readed: false,
                                date: new Date()
                            });
                            await updateDoc(this.userRef, {
                                notifications: this.userNotifications
                            });
                        }
                        if (filter.clean(this.comment).includes('*')) {
                            for (let i = 0; i < this.blogAdmins.length; i++) {
                                if (this.blogAdmins[i].id != this.id) {
                                    const adminNotifications = this.blogAdmins[i].notifications;
                                    adminNotifications.unshift({
                                        userID: this.id,
                                        blogID: this.currentBlog[0].blogID,
                                        id: this.userNotifications.length,
                                        type: 'bad-word-comment',
                                        readed: false,
                                        date: new Date()
                                    })
                                    await updateDoc(doc(db, 'users', this.blogAdmins[i].id), {
                                        notifications: adminNotifications
                                    })
                                }
                            }
                        }
                        this.blogComments.unshift({
                            owner: this.id,
                            content: filter.clean(this.comment),
                            notificationID: this.userNotifications.length,
                            date: new Date(),
                            edited: false,
                            id: this.blogComments.length
                        });
                        await updateDoc(docRef, {
                                comments: this.blogComments
                            })
                            .then(() => {
                                this.loading = false;
                                this.error2 = true;
                                this.errorMessage2 = "Comment Added Successfully!";
                                this.comment = '';
                            })
                        break;
                }
            },
            publishComment() {
                if (!this.comment) {
                    this.error2 = true;
                    this.errorMessage2 = "Can't publish, Comment it's empty!";
                    return;
                }
                this.error = true;
                this.errorMessage = "Are you sure you want to publish this comment?";
                this.confirmType = 'publish';
            },
            editComment(content, id, e) {
                const reference = this.$refs.textComment[this.blogComments.length - id - 1];
                this.confirmType = 'edit';
                if (e.target.textContent == 'Edit') {
                    reference.readOnly = false;
                    reference.focus();
                    e.target.textContent = 'Save';
                    this.savedComment = content;
                } else {
                    const docRef = doc(db, 'blogs', this.currentBlog[0].blogID);
                    if (!reference.value) {
                        this.error2 = true;
                        this.errorMessage2 = "Can't publish, it's an empty Comment!";
                        return;
                    }
                    if (this.blogComments[this.blogComments.length - id - 1].content == this.savedComment) {
                        this.error2 = true;
                        this.errorMessage2 = "Can't publish, You didn't change the Comment!";
                        return;
                    } {
                        this.blogComments[this.blogComments.length - id - 1].content = filter.clean(content);
                        this.blogComments[this.blogComments.length - id - 1].edited = true;
                        this.loading = true;
                        reference.readOnly = true;
                        reference.blur();
                        updateDoc(docRef, {
                            comments: this.blogComments
                        }).then(() => {
                            this.loading = false;
                            this.error2 = true;
                            this.errorMessage2 = "Comment Edited Successfully!";
                        })
                        e.target.textContent = 'Edit';
                    }
                }
            },
            deleteComment(id, notificationID) {
                this.error = true;
                this.errorMessage = "Are you sure you want to delete this comment?";
                this.currentCommentID = id;
                this.currentNotificationID = notificationID;
                this.confirmType = 'delete';
            },
            redirectLogin() {
                this.$router.push({
                    name: 'login'
                });
                window.scrollTo(0, 0);
            },
            async showInfo(like) {
                const docRef = doc(db, 'users', like);
                this.loading = true;
                await getDoc(docRef).then((res) => {
                    this.loading = false;
                    this.error2 = true;
                    if (res.data().isAdmin) {
                        this.errorMessage2 =
                            `<h4>ADMIN!</h4> Full Name: ${res.data().firstName} ${res.data().lastName}. <br /> Username: @${res.data().username}`;
                    } else {
                        this.errorMessage2 =
                            `<h4>USER</h4> Full Name: ${res.data().firstName} ${res.data().lastName}. <br /> Username: @${res.data().username}`;
                    };
                });
            },
            closeModal() {
                this.error = false;
                this.errorMessage = '';
                this.error2 = false;
                this.errorMessage2 = '';
            },
            filterPosts(tag) {
                this.$store.commit("changeCurrentBlogPosts", this.blogPosts.filter((post) => {
                    return post.blogTags.includes(tag);
                }));
                this.$store.commit("changeCurrentTag", tag);
                this.$router.push({
                    name: 'blogs'
                });
            },
            dateFormat() {
                return moment.unix(this.currentBlog[0].blogTime.seconds).format('LL');
            },
            editFormat() {
                return moment.unix(this.currentBlog[0].editTime.seconds).format('LLLL');
            },
            commentFormat(date) {
                return moment.unix(date).format('llll');
            },
            getLikesAndComments() {
                var adminBadge =
                    `<img src="https://i.postimg.cc/rsNrhTdx/user-crown-light.png" style="position: absolute; top: -13px; right: -4px; border: transparent; height: 25px; width: 25px; border: 1px solid black; background-color: white; border-radius: 50%;" alt="#">`;
                for (let i = 0; i < this.currentBlog[0].likes.length; i++) {
                    const docRef = doc(db, 'users', this.currentBlog[0].likes[i]);
                    getDoc(docRef).then((res) => {
                        this.$refs.liker[i].textContent =
                            `${res.data().firstName[0]}${res.data().lastName[0]}`;
                        this.$refs.liker[i].style.backgroundColor = res.data().color;
                        if (res.data().isAdmin) {
                            this.$refs.liker[i].innerHTML += adminBadge;
                        }
                    });
                }
                for (let i = 0; i < this.currentBlog[0].comments.length; i++) {
                    const docRef = doc(db, 'users', this.currentBlog[0].comments[i].owner);
                    getDoc(docRef).then((res) => {
                        this.$refs.commenter[i].textContent =
                            `${res.data().firstName[0]}${res.data().lastName[0]}`;
                        this.$refs.commenter[i].style.backgroundColor = res.data().color;
                        if (res.data().isAdmin) {
                            this.$refs.commenter[i].innerHTML += adminBadge;
                        }
                    });
                }
            }
        },
        computed: {
            ...mapState(['blogPosts', 'userState', 'color', 'initialName', 'id', 'isAdmin', 'blogUsers']),
            ...mapGetters(['blogAdmins'])
        }
    }
</script>

<style lang="scss">
    @use '../../assets/sass/mixins.scss'as *;
    @use '../../assets/sass/classStyles.scss'as *;

    @keyframes rotation {
        100% {
            transform: rotate(360deg);
        }
    }

    .preview {
        display: flex;
        flex-direction: column;
        padding: 100px;
        row-gap: 12px;

        @include width(700px) {
            padding: 100px 10px;
        }


        .intro {
            @include flex(space-between, center, row);
            flex-wrap: wrap;
            gap: 10px;

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

            div {
                display: flex;
                gap: 10px;

                .card-edit-icons {
                    background-size: 35%;
                    background-repeat: no-repeat;
                    background-position: center;
                    border: 1px solid black;
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
        }


        p {
            font-weight: 400;
        }

        .blogImg {
            @include flex(center, center, row);
            height: 610px;
            border: 1px solid black;
            max-width: 850px;
            margin-top: 15px;

            .blogCover {
                display: none;
                width: 100%;
                height: 100%;
            }

            .loader {
                height: 50px;
                width: 50px;
                border-radius: 50%;
                border: 2px solid white;
                border-color: black transparent black transparent;
                animation: rotation infinite 900ms ease-in-out;
            }

            .displayed {
                display: flex;
                height: auto;
            }
        }

        .heightEdit {
            height: auto;
        }

        .html-blog {
            margin-top: 15px;
            font-size: 20px;
            line-height: 1.4;
        }

        .likes {
            padding-top: 13px;
        }

        .tags,
        .likes {
            display: flex;
            align-items: center;
            flex-direction: row;
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

            .like {
                @extend %user;
                position: relative;
            }
        }

        .comments-section {

            .comments {
                display: flex;
                flex-direction: column;
                gap: 15px;

                .new-comment {
                    display: flex;
                    align-items: center;
                    gap: 10px;

                    .commenter {
                        @extend %user;
                        position: relative;

                        img {
                            position: absolute;
                            top: -13px;
                            right: -4px;
                            border: transparent;
                            height: 25px;
                            width: 25px;
                            border: 1px solid black;
                            background-color: white;
                            border-radius: 50%;
                        }
                    }

                    .comment-content {
                        display: flex;
                        flex-direction: column;
                        gap: 5px;
                        width: 100%;

                        textarea {
                            border: none;
                            outline: none;
                            background-color: #303030;
                            color: white;
                            padding: 8px;
                            border-radius: 8px;
                            resize: none;
                            height: 55px;
                            font-size: 17px;
                            width: 100%;

                            &::placeholder {
                                color: whitesmoke;
                            }
                        }

                        .buttons {
                            display: flex;
                            align-items: flex-start;
                            justify-content: flex-end;
                            flex-wrap: wrap;
                            gap: 10px;
                            margin-top: 0;

                            button {
                                transition: .5s;
                                padding: 8px;
                                border-radius: 8px;
                                background-color: #303030;
                                color: white;
                                border: none;
                                font-size: 15px;
                                cursor: pointer;

                                &:hover {
                                    background-color: gray;
                                }
                            }
                        }
                    }
                }

                div {
                    margin-top: 10px;

                    .new-comment {
                        display: flex;
                        align-items: center;
                        gap: 10px;

                        .commenter {
                            @extend %user;
                            position: relative;
                        }

                        .comment-content {
                            display: flex;
                            flex-direction: column;
                            gap: 5px;
                            width: 100%;

                            textarea {
                                border: none;
                                outline: none;
                                background-color: #303030;
                                color: white;
                                padding: 8px;
                                border-radius: 8px;
                                resize: none;
                                height: 60px;
                                font-size: 17px;
                                width: 100%;

                                &::placeholder {
                                    color: whitesmoke;
                                }
                            }

                            .buttons {
                                @include flex(flex-end, flex-start, row);
                                flex-wrap: wrap;
                                gap: 10px;
                                margin-top: 0;

                                button {
                                    transition: .5s;
                                    padding: 8px;
                                    border-radius: 8px;
                                    background-color: #303030;
                                    color: white;
                                    border: none;
                                    font-size: 15px;
                                    cursor: pointer;

                                    &:hover {
                                        background-color: gray;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        h4 {
            font-weight: 500;
            font-size: 18px;
        }
    }
</style>