<template>
    <div class="notifications" ref="notifications" v-if="notificationsShow">
        <div class="modal-content">
            <div class="params">
                <p class="title">Notifications</p>
                <p :class="{clearAll: true,disabled: notifications.filter((notification) => {return !notification.readed}).length == 0}"
                    @click="clearAll">Mark all as read ✔</p>
            </div>
            <div ref="allNotifications" :class="{allNotifications: true, centerInfos: !notifications.length>0}">
                <h4 v-if="!notifications.length>0">No Notifications Right Now!</h4>
                <div v-else class="wrapper" v-for="(notification,index) in notifications" :key="index">
                    <div :class="{notification:true, readed: notification.readed}">
                        <div class="content">
                            <h3 @click="redirectNotification(notification)">
                                {{ notificationMessage(notification.type) }}</h3>
                            <p>{{ notificationDetails(notification.type) }}</p>
                            <p>{{ dateFormat(notification.date.seconds) }}</p>
                        </div>
                        <div class="user" ref="user" @click="showInfo(notification.userID)">
                        </div>
                    </div>
                    <hr v-if="!notification.readed">
                </div>
            </div>
            <div class="btn-container">
                <button @click="closeNotifications">Close</button>
            </div>
        </div>
    </div>
    <LoadingView v-if="loading" />
    <ModalView :modalConfirm="false" :modalPhoto="false" :modalMessage="errorMessage" :modalCase="error"
        @close-modal="closeModal" />
</template>

<script>
    import moment from 'moment';
    import {
        mapState
    } from 'vuex';
    import {
        updateDoc,
        getDoc,
        doc
    } from 'firebase/firestore';
    import {
        db,
        auth
    } from '../../firebase/index.js'
    import ModalView from './ModalView.vue';
    import LoadingView from './LoadingView.vue';
    export default {
        name: "NotificationView",
        components: {
            ModalView,
            LoadingView
        },
        data() {
            return {
                error: false,
                errorMessage: "",
                loading: false
            }
        },
        emits: ['close-modal'],
        updated() {
            if (this.$refs.notifications) {
                for (let i = 0; i < this.notifications.length; i++) {
                    if (this.notifications[i].userID) {
                        const docRef = doc(db, "users", this.notifications[i].userID);
                        getDoc(docRef).then((res) => {
                            this.$refs.user[i].style.backgroundColor = res.data().color;
                            this.$refs.user[i].textContent =
                                `${res.data().firstName[0]}${res.data().lastName[0]}`;
                        });
                    } else {
                        this.$refs.user[i].style.display = "none";
                    }
                }
            }
        },
        methods: {
            closeModal() {
                this.error = false;
                this.errorMessage = "";
            },
            closeNotifications() {
                this.$emit("close-modal");
            },
            showInfo(id) {
                const docRef = doc(db, 'users', id);
                this.loading = true;
                getDoc(docRef).then((res) => {
                    this.error = true;
                    this.loading = false;
                    if (res.data().isAdmin) {
                        this.errorMessage =
                            `<h4>ADMIN!</h4> Full Name: ${res.data().firstName} ${res.data().lastName}. <br /> Username: @${res.data().username}`;
                    } else {
                        this.errorMessage =
                            `<h4>USER</h4> Full Name: ${res.data().firstName} ${res.data().lastName}. <br /> Username: @${res.data().username}`;
                    };
                });
            },
            dateFormat(time) {
                return moment.unix(time).format("lll");
            },
            notificationMessage(type) {
                switch (type) {
                    case "profile":
                        return "Profile have been changed Successfully!";
                        break;
                    case "like":
                        return `Like have been added to your post!`;
                        break;
                    case "comment":
                        return `comment have been added to your post!`;
                        break;
                    case "save":
                        return `your blog have been added as a blogMark!`;
                        break;
                    case "new-post":
                        return `your blog have been posted Successfully!`;
                        break;
                    case "new-user":
                        return `Welcome to the RealBlogs Community!`;
                        break;
                    case "new-admin":
                        return `You're an admin now!`;
                        break;
                    case "remove-admin":
                        return `You've been removed as an Admin!`;
                        break;
                    case "bad-word-comment":
                        return `A BAD WORD detected on comments section!`
                        break;
                }
            },
            notificationDetails(type) {
                switch (type) {
                    case "profile":
                        return "Profile Data changed, review if there's any error in!";
                        break;
                    case "like":
                        return `You can check the users liked on your post now!`;
                        break;
                    case "comment":
                        return `You can check the users commented on your post now!`;
                        break;
                    case "save":
                        return `Reading saved blogs later is awesome, go to blogs and filter theme!`;
                        break;
                    case "new-post":
                        return `post released Successfully, check it now!`;
                        break;
                    case "new-user":
                        return `We're really happy that you've joined us, You can custom your color by clicking on the profile initial, let's go!`;
                        break;
                    case "new-admin":
                        return `you're an admin which means you can post, delete and edit blogs and comments, the website is your responsibility!`;
                        break;
                    case "remove-admin":
                        return `For some reasons you've been removed as an admin contact other admin for more details!`;
                        break;
                    case "bad-word-comment":
                        return `a user have commented using a bad word which is agains our standars, take a decision!`
                        break;
                }
            },
            async clearAll() {
                let allNotifications = this.notifications.slice();
                for (let i = 0; i < allNotifications.length; i++) {
                    allNotifications[i].readed = true;
                }
                const docRef = doc(db, "users", this.id);
                await updateDoc(docRef, {
                    notifications: allNotifications,
                })
            },
            async redirectNotification(notification) {
                let allNotifications = this.notifications.slice();
                for (let i = 0; i < allNotifications.length; i++) {
                    if ((allNotifications[i].type == notification.type) && (allNotifications[i].blogID == notification.blogID) && (allNotifications[i].userID == notification.userID)){
                        allNotifications[i].readed = true;
                    }
                }
                if (notification.type == 'new-admin') {
                    this.$router.push({
                        name: "admin"
                    })
                    return;
                }
                if (notification.type == 'delete-admin') {
                    this.$router.push({
                        name: "admin-request"
                    })
                    return;
                }
                if (!notification.blogID) {
                    this.$router.push({
                        name: "profile"
                    })
                } else {
                    this.$router.push({
                        name: "view-post",
                        params: {
                            blogid: notification.blogID
                        }
                    });
                }
                const docRef = doc(db, "users", auth.currentUser.uid);
                await updateDoc(docRef, {
                    notifications: allNotifications,
                });
            }
        },
        props: ["notificationsShow"],
        computed: {
            ...mapState(["notifications", "id"])
        }
    }
</script>

<style lang="scss" scoped>
    @use '../../assets/sass/classStyles.scss'as *;
    @use '../../assets/sass/mixins.scss'as *;

    .notifications {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        z-index: 98;
        @include flex(center,center,row);
        background-color: rgba(0, 0, 0, 0.7);

        .modal-content {
            display: flex;
            flex-direction: column;
            border-radius: 8px;
            padding: 40px 30px;
            background-color: white;
            width: 90%;
            max-width: 400px;

            .params {
                @include flex(space-between,center,row);
                gap: 10px;
                flex-wrap: wrap;

                .title {
                    font-weight: 500;
                    font-size: 18px;
                }

                .clearAll {
                    color: blue;
                    transition: .3s;
                    cursor: pointer;

                    &:hover {
                        color: rgb(54, 109, 213)
                    }
                }

                .disabled {
                    pointer-events: none;
                    color: gray;
                }
            }

            .centerInfos {
                align-items: center;
                justify-content: center;
            }

            .allNotifications {
                display: flex;
                flex-direction: column;
                margin-top: 25px;
                gap: 15px;
                height: 200px;
                overflow-y: scroll;
                -ms-overflow-style: none;
                scrollbar-width: none;

                &::-webkit-scrollbar {
                    display: none;
                }

                h4 {
                    text-align: center;
                    font-size: 32px;
                }

                .wrapper {

                    .notification {
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        padding: 10px;
                        border-radius: 8px;
                        transition: .5s;

                        h3 {
                            transition: .3s;
                            cursor: pointer;

                            &:hover {
                                color: blue;
                            }
                        }

                        .content {
                            display: flex;
                            flex-direction: column;
                            gap: 10px;
                        }

                        .user {
                            @extend %user;
                        }
                    }

                    hr {
                        margin-top: 10px;
                    }

                    .readed {
                        background-color: gray;

                        h3 {
                            &:hover {
                                color: white;
                            }
                        }
                    }
                }
            }

            .btn-container {
                margin-top: 20px;
                text-align: center;

                button {
                    @extend %btn;
                }
            }
        }
    }
</style>