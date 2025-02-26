<template>
    <PathNotFoundView v-if="!userState" />
    <div v-else>
        <NavBarView />
        <section class="profile">
            <h2>Account Settings</h2>
            <form @keydown.enter.prevent class="edit-profile">
                <label for="inputColor" class="user" :style="{background: color}">
                    <span>{{ initialName }}</span>
                </label>
                <div class="admin" ref="admin" v-if="isAdmin" @click="adminRules">
                    <svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="user-crown"
                        class="svg-inline--fa fa-user-crown fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512">
                        <path fill="currentColor"
                            d="M313.6 320c-28.71 0-42.6 16-89.6 16-47.09 0-60.82-16-89.6-16C60.17 320 0 380.17 0 454.4v9.6c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48v-9.6c0-74.23-60.17-134.4-134.4-134.4zM416 464c0 8.82-7.18 16-16 16H48c-8.82 0-16-7.18-16-16v-9.6C32 397.94 77.94 352 134.4 352c19.38 0 39.33 16 89.6 16 49.4 0 70.66-16 89.6-16 56.46 0 102.4 45.94 102.4 102.4v9.6zM224 288c70.7 0 128-57.31 128-128V0l-64 32-64-32-64 32L96 0v160c0 70.69 57.31 128 128 128zM128 51.78l32 16 64-32 64 32 32-16V112H128V51.78zm0 92.22h192v16c0 52.93-43.06 96-96 96s-96-43.07-96-96v-16z">
                        </path>
                    </svg>Admin
                </div>
                <input id="inputColor" type="color" v-model="color" ref="inputColor">
                <div class="inputs">
                    <label for="first-name">First Name:</label>
                    <input type="text" id="first-name" v-model="firstName">
                </div>
                <div class="inputs">
                    <label for="last-name">Last Name:</label>
                    <input type="text" id="last-name" v-model="lastName">
                </div>
                <div class="inputs">
                    <label for="username">Username:</label>
                    <input @input="usernameChange" type="text" id="username" v-model="username">
                </div>
                <div class="inputs">
                    <label for="email">Email:</label>
                    <input class="protected" type="email" id="email" v-model="email" readonly @click="emailProtection">
                </div>
                <div>
                    <button class="save-changes" @click.prevent="saveChanges">SAVE CHANGES</button>
                    <button class="delete-account" @click.prevent="deleteAccount">DELETE ACCOUNT</button>
                </div>
            </form>
        </section>
        <FooterView />
        <LoadingView v-if="loading" />
        <ModalView :modalConfirm="false" :modalPhoto="false" :modalMessage="errorMessage" :modalCase="error"
            @close-modal="closeModal" />
        <ModalView :modalConfirm="true" :modalPhoto="false" :modalMessage="errorMessage2" :modalCase="error2"
            @close-modal="closeModal" @confirm-modal="confirmModal" />
    </div>
</template>

<script>
    import {
        updateDoc,
        doc,
        deleteDoc,
        setDoc
    } from 'firebase/firestore';
    import {
        auth,
        db
    } from '../../firebase/index.js';
    import {
        deleteUser
    } from 'firebase/auth';
    import PathNotFoundView from '../Error/PathNotFoundView.vue';
    import NavBarView from '../../components/Main/NavBarView.vue';
    import FooterView from '../../components/Main/FooterView.vue';
    import LoadingView from '../../components/PopUps/LoadingView.vue';
    import ModalView from '../../components/PopUps/ModalView.vue';
    import {
        mapState
    } from 'vuex';
    export default {
        name: "ProfileView",
        components: {
            PathNotFoundView,
            NavBarView,
            FooterView,
            LoadingView,
            ModalView
        },
        data() {
            return {
                loading: false,
                error: false,
                errorMessage: '',
                error2: false,
                errorMessage2: '',
                savedFirstName: '',
                savedLastName: '',
                savedUsername: '',
                savedColor: '',
                userNotifications: [],
                profileLikesComments: [] //for deleted user
            }
        },
        mounted() {
            if (!this.userState) {
                this.$router.push({
                    name: 'home'
                });
                return;
            };
            this.userNotifications = this.notifications.slice();
            this.savedFirstName = this.firstName;
            this.savedLastName = this.lastName;
            this.savedUsername = this.username;
            this.savedColor = this.color;
        },
        methods: {
            usernameChange() {
                this.usernames = this.blogUsernames;
            },
            emailProtection() {
                this.error = true;
                this.errorMessage = 'Email Address is a non-changed data!';
            },
            closeModal() {
                this.error = false;
                this.errorMessage = '';
                this.error2 = false;
                this.errorMessage2 = '';
            },
            async confirmModal() {
                this.loading = true;
                this.error2 = false;
                this.errorMessage2 = '';
                const docRef = doc(db, 'users', this.id);
                this.profileLikesComments = this.blogPosts.slice();
                for (let i = 0; i < this.blogUsers.length; i++) {
                    this.userNotifications = this.blogUsers[i].notifications.filter((notification) => {
                        return notification.userID != this.id;
                    });
                    setDoc(doc(db, 'users', this.blogUsers[i].id), {
                        notifications: this.userNotifications
                    });
                }
                await deleteUser(auth.currentUser).then(() => {
                        for (let i = 0; i < this.profileLikesComments.length; i++) {
                            this.profileLikesComments[i].likes = this.profileLikesComments[i].likes.filter((
                                like) => {
                                return like != this.id
                            });
                            this.profileLikesComments[i].comments = this.profileLikesComments[i].comments.filter((comment) => {
                                    return comment.owner != this.id
                                })
                            deleteDoc(doc(db, 'blogs', this.profileLikesComments[i].blogID));
                            setDoc(doc(db, 'blogs', this.profileLikesComments[i].blogID), {
                                ...this.profileLikesComments[i]
                            });
                        };
                        updateDoc(docRef, {
                            notifications: this.userNotifications
                        })
                        deleteDoc(docRef);
                        this.$router.push({
                            name: 'home'
                        });
                        window.scrollTo(0, 0);
                    })
                    .catch((err) => {
                        this.loading = false;
                        this.error = true;
                        if (err.code = 'auth/requires-recent-login') {
                            this.errorMessage =
                                "For Security reasons try to Re-signIn to prove that you're the real User then delete your account";
                        } else {
                            this.errorMessage = err.code;
                        }
                    });
            },
            deleteAccount() {
                this.error2 = true;
                this.errorMessage2 = "Are you sure you want to delte your account permenantly?";
            },
            saveChanges() {
                if ((this.savedFirstName != this.firstName) || (this.savedLastName != this.lastName) || (this.savedUsername != this.username) || (this.savedColor != this.color)) {
                    if ((this.firstName != '') && (this.lastName != '') && (this.username != '')) {
                        if (!(this.blogUsernames.includes(this.username.toLowerCase())) || (this.savedUsername == this.username)) {
                            if (!this.username.includes(' ')) {
                                this.loading = true;
                                const docRef = doc(db, 'users', auth.currentUser.uid);
                                this.userNotifications.unshift({
                                    userID: null,
                                    blogID: null,
                                    type: 'profile',
                                    readed: false,
                                    date: new Date()
                                })
                                updateDoc(docRef, {
                                        firstName: this.firstName,
                                        lastName: this.lastName,
                                        username: this.username,
                                        notifications: this.userNotifications,
                                        color: this.color
                                    })
                                    .then(() => {
                                        this.userNotifications = this.notifications.slice();
                                        this.savedFirstName = this.firstName;
                                        this.savedLastName = this.lastName;
                                        this.savedUsername = this.username;
                                        this.savedColor = this.color;
                                        this.loading = false;
                                        this.error = true;
                                        this.errorMessage =
                                            "Account Informations Edited and Submited Successfully!";
                                        this.$store.commit("setInitialName");
                                    })
                                    .catch((err) => {
                                        this.loading = false;
                                        this.error = true;
                                        this.errorMessage = err.message.slice(9, -1);
                                    });
                                return;
                            } {
                                this.error = true;
                                this.errorMessage = "Username do not accept spaces!";
                                return;
                            }
                        } {
                            this.error = true;
                            this.errorMessage =
                                "Username reserved, each user have a unique username ... Please Try Again!";
                            return;
                        }
                    } {
                        this.error = true;
                        this.errorMessage = "Please fill out all the fields!";
                        return;
                    }
                } {
                    this.error = true;
                    this.errorMessage = "Can't Save Changes, You Didn't Change Any Field!";
                }
            }
        },
        computed: {
            ...mapState(['initialName', 'userState', 'isAdmin', 'blogPosts', 'id',
                'notifications', 'blogUsernames'
            ]),
            firstName: {
                get() {
                    return this.$store.state.firstName;
                },
                set(payload) {
                    this.$store.commit("firstNameEdit", payload);
                }
            },
            lastName: {
                get() {
                    return this.$store.state.lastName;
                },
                set(payload) {
                    this.$store.commit("lastNameEdit", payload);
                }
            },
            username: {
                get() {
                    return this.$store.state.username;
                },
                set(payload) {
                    this.$store.commit("usernameEdit", payload);
                }
            },
            color: {
                get() {
                    return this.$store.state.color;
                },
                set(payload) {
                    this.$store.commit("colorEdit", payload)
                }
            },
            ...mapState(['blogUsernames', 'email', 'id', 'blogUsers'])
        }
    }
</script>

<style lang="scss" scoped>
    @use '../../assets/sass/mixins.scss'as *;
    @use '../../assets/sass/classStyles.scss'as *;

    .profile {
        @include flex(center,center,column);
        padding: 70px 25px;

        h2 {
            text-align: center;
            margin-bottom: 16px;
            font-weight: 300;
            font-size: 32px;
        }

        form {
            @include flex(center,center,column);
            margin: 32px 0;
            border-radius: 8px;
            box-shadow: 0 4px 6px -1px rgb(0 0 0 / 10%), 0 2px 4px -1px rgb(0 0 0 / 6%);
            padding: 32px;
            background-color: #f1f1f1;
            width: 100%;
            max-width: 600px;
            row-gap: 32px;

            .admin {
                @include flex(center,center,row);
                transition: .5s;
                padding: 8px 24px 8px 15px;
                border: none;
                background-color: #303030;
                color: white;
                border-radius: 8px;
                cursor: pointer;

                &:hover {
                    background-color: gray;
                }

                svg {
                    position: relative;
                    left: 8px;
                    height: 15px;
                    width: 15px;
                }
            }

            .user {
                @extend %user;
                position: relative;
                height: 80px;
                width: 80px;
                font-size: 32px;
                cursor: pointer;

                span::selection {
                    background-color: transparent;
                }
            }


            input[type="color"] {
                visibility: hidden;
                position: fixed;
                top: -30px;
                left: 0;
            }

            .inputs {
                @include flex(flex-start,flex-start,column);
                width: 100%;

                .protected {
                    border: 1px solid #303030;
                }

                input {
                    border: none;
                    outline: none;
                    background-color: #f2f7f6;
                    padding: 8px;
                    height: 50px;
                    width: 100%;
                }

                label {
                    cursor: pointer;
                    font-size: 14px;
                    display: block;
                    padding-bottom: 6px;
                }
            }

            div {
                @include flex(center,center,row);
                gap: 15px;
                flex-wrap: wrap;

                button {
                    @extend %btn;
                }

                .delete-account {
                    background-color: red;
                }
            }
        }
    }
</style>