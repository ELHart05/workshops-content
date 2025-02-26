<template>
    <header>
        <NotificationsView :notificationsShow="displayNotifications" @close-modal="closeNotifications" />
        <router-link :to="{name: 'home'}" class="brand">RealBlogs</router-link>
        <nav>
            <ul ref="ul">
                <router-link :to="{name: 'home'}">HOME</router-link>
                <a @click="redirectBlogs">BLOGS</a>
                <router-link v-if="userState && isAdmin" :to="{name: 'create-post'}">CREATE POST</router-link>
                <router-link v-if="userState && !isAdmin" :to="{name: 'admin-request'}">BECOME ADMIN</router-link>
                <router-link v-if="!userState" :to="{name: 'login'}">LOGIN/REGISTER</router-link>
                <div v-if="userState" @click="toggleDetailsDiv"
                    :class="{user: true, notification: notifications.filter((notification) => {return !notification.readed}).length>0}"
                    :style="{background: color}">
                    <svg :class="{noNotification: notifications.filter((notification) => {return !notification.readed}).length == 0}"
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path fill="black"
                            d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z" />
                    </svg>
                    {{ initialName }}
                </div>
                <div v-if="userState" class="user-details" ref="details">
                    <div class="infos">
                        <div class="user menu" @click="showNotifications">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path fill="white"
                                    d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z" />
                            </svg>
                            <div class="notificationCount">
                                {{ notifications.filter((notification) => {return !notification.readed}).length }}</div>
                        </div>
                        <div class="info">
                            <p>{{ `${firstName} ${lastName}` }}</p>
                            <p>{{ `@${username}` }}</p>
                            <p>{{ email }}</p>
                        </div>
                    </div>
                    <hr>
                    <div class="options">
                        <router-link :to="{name: 'profile'}" class="option">
                            <svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="user-alt"
                                class="svg-inline--fa fa-user-alt fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512">
                                <path fill="currentColor"
                                    d="M256 32c61.8 0 112 50.2 112 112s-50.2 112-112 112-112-50.2-112-112S194.2 32 256 32m128 320c52.9 0 96 43.1 96 96v32H32v-32c0-52.9 43.1-96 96-96 85 0 67.3 16 128 16 60.9 0 42.9-16 128-16M256 0c-79.5 0-144 64.5-144 144s64.5 144 144 144 144-64.5 144-144S335.5 0 256 0zm128 320c-92.4 0-71 16-128 16-56.8 0-35.7-16-128-16C57.3 320 0 377.3 0 448v32c0 17.7 14.3 32 32 32h448c17.7 0 32-14.3 32-32v-32c0-70.7-57.3-128-128-128z">
                                </path>
                            </svg>
                            <p>Profile</p>
                        </router-link>
                        <router-link v-if="isAdmin" :to="{name: 'admin'}" class="option">
                            <svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="user-crown"
                                class="svg-inline--fa fa-user-crown fa-w-14" role="img"
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path fill="currentColor"
                                    d="M313.6 320c-28.71 0-42.6 16-89.6 16-47.09 0-60.82-16-89.6-16C60.17 320 0 380.17 0 454.4v9.6c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48v-9.6c0-74.23-60.17-134.4-134.4-134.4zM416 464c0 8.82-7.18 16-16 16H48c-8.82 0-16-7.18-16-16v-9.6C32 397.94 77.94 352 134.4 352c19.38 0 39.33 16 89.6 16 49.4 0 70.66-16 89.6-16 56.46 0 102.4 45.94 102.4 102.4v9.6zM224 288c70.7 0 128-57.31 128-128V0l-64 32-64-32-64 32L96 0v160c0 70.69 57.31 128 128 128zM128 51.78l32 16 64-32 64 32 32-16V112H128V51.78zm0 92.22h192v16c0 52.93-43.06 96-96 96s-96-43.07-96-96v-16z">
                                </path>
                            </svg>
                            <p>Admin</p>
                        </router-link>
                        <div class="option" @click="signOut">
                            <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="sign-out-alt"
                                class="svg-inline--fa fa-sign-out-alt fa-w-16" role="img"
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path fill="currentColor"
                                    d="M272 112v51.6h-96c-26.5 0-48 21.5-48 48v88.6c0 26.5 21.5 48 48 48h96v51.6c0 42.6 51.7 64.2 81.9 33.9l144-143.9c18.7-18.7 18.7-49.1 0-67.9l-144-144C323.8 48 272 69.3 272 112zm192 144L320 400v-99.7H176v-88.6h144V112l144 144zM96 64h84c6.6 0 12 5.4 12 12v24c0 6.6-5.4 12-12 12H96c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h84c6.6 0 12 5.4 12 12v24c0 6.6-5.4 12-12 12H96c-53 0-96-43-96-96V160c0-53 43-96 96-96z">
                                </path>
                            </svg>
                            <p class="signout">Sign Out</p>
                        </div>
                    </div>
                </div>
            </ul>
        </nav>
        <svg @click="toggleNavBar" aria-hidden="true" focusable="false" data-prefix="far" data-icon="bars"
            class="svg-inline--fa fa-bars fa-w-14 bars" role="img" xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512">
            <path fill="currentColor"
                d="M436 124H12c-6.627 0-12-5.373-12-12V80c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12z">
            </path>
        </svg>
        <svg v-if="notifications.filter((notification) => {return !notification.readed}).length>0"
            xmlns="http://www.w3.org/2000/svg" class="bell" viewBox="0 0 448 512">
            <path fill="black"
                d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z" />
        </svg>
    </header>
</template>

<script>
    import {
        auth
    } from '../../firebase/index.js';
    import {
        signOut
    } from 'firebase/auth';
    import NotificationsView from '../PopUps/NotificationsView.vue';
    import {
        mapState
    } from 'vuex';
    export default {
        name: "NavBarView",
        components: {
            NotificationsView
        },
        data() {
            return {
                displayNotifications: false
            }
        },
        methods: {
            closeNotifications() {
                this.displayNotifications = false;
            },
            showNotifications() {
                this.displayNotifications = true;
            },
            redirectBlogs() {
                this.$store.commit("changeCurrentBlogPosts", this.blogPosts);
                this.$store.commit("changeCurrentTag", 'All');
                this.$router.push({
                    name: 'blogs'
                });
                window.scrollTo(0, 0);
            },
            toggleNavBar() {
                this.$refs.ul.classList.toggle("newUl");
            },
            toggleDetailsDiv() {
                this.$refs.details.classList.toggle("showDiv");
            },
            signOut() {
                signOut(auth).then(() => {
                    this.$router.push({
                        name: 'home'
                    });
                    window.scrollTo(0, 0);
                });
            }
        },
        computed: {
            ...mapState(['blogPosts', '', "userState", "initialName", "firstName", "lastName", "email", "username",
                'color', 'isAdmin', 'notifications'
            ])
        }
    }
</script>

<style lang="scss" scoped>
    @use '../../assets/sass/mixins.scss'as *;
    @use '../../assets/sass/classStyles.scss'as *;

    header {
        position: relative;
        @include flex(space-between,center,row);
        padding: 30px;
        background-color: #fff;
        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 10%), 0 2px 4px -1px rgb(0 0 0 / 6%);

        a {
            text-decoration: none;
            color: black;
            cursor: pointer;
        }

        .brand {
            font-weight: 700;
            font-size: 1.5rem;
        }
    }

    ul {
        display: flex;
        align-items: center;
        z-index: 3;
        gap: 45px;

        @include width(750px) {
            gap: 0;
        }

        .user {
            @extend %user;

            span {
                pointer-events: none;

                &::selection {
                    background-color: transparent;
                }
            }

            .noNotification {
                display: none;
            }
        }

        a {
            font-weight: 500;
            transition: .5s;

            &:hover {
                color: #41B883;
            }

            @include width(750px) {
                margin: 10px 0;
                color: white;
            }
        }

        .notification {
            position: relative;

            svg {
                position: absolute;
                @include flex(center,center,row);
                border: 1px solid black;
                top: -5px;
                right: -2px;
                height: 18px;
                width: 18px;
                font-size: 12px;
                background-color: white;
                border-radius: 50%;

                @include width(750px) {
                    display: none;
                }
            }
        }

        .user-details {
            display: flex;
            flex-direction: column;
            position: absolute;
            transition: .5s;
            z-index: 97;
            top: 100px;
            right: -300px;
            width: 100%;
            max-width: 300px;
            background-color: #303030;
            color: white;
            box-shadow: 0 4px 6px -1px rgb(0 0 0 / 10%), 0 2px 4px -1px rgb(0 0 0 / 6%);

            @include width(750px) {
                top: 185px;
                right: 0;
            }

            @include width(230px){
                top: 205px;
            }

            &::before {
                content: "";
                position: absolute;
                transition: 1s;
                background-color: #303030;
                height: 20px;
                width: 20px;
                transform: rotate(224deg);
                top: -10px;
                right: 4px;

                @include width(750px) {
                    display: none;
                }
            }

            .infos {
                @include flex(center,center,row);
                padding: 15px;
                column-gap: 15px;

                .menu {
                    position: relative;
                    color: black;

                    .notificationCount {
                        @include flex(center,center,row);
                        position: absolute;
                        border: 1px solid black;
                        top: -8px;
                        right: -2px;
                        height: 21px;
                        width: 21px;
                        font-size: 12px;
                        background-color: white;
                        border-radius: 50%;
                    }
                }

                p {
                    font-size: 14px;

                    @include width(350px) {
                        font-size: 11px;
                    }
                }
            }

            hr {
                height: 1px;
                border: transparent;
                background-color: white;
            }

            .options {
                padding: 15px;
                display: flex;
                align-items: flex-start;
                flex-direction: column;
                row-gap: 15px;

                .option {
                    @include flex(flex-start,center,row);
                    color: white;
                    font-weight: 300;
                    cursor: pointer;

                    @include width(750px) {
                        margin: 0;
                        color: white;
                    }

                    svg {
                        height: 18px;
                        width: 18px;
                    }

                    p {
                        font-size: 14px;
                        margin-left: 12px;
                    }

                    &:nth-child(2):hover {
                        cursor: pointer;
                    }
                }
            }
        }

        .showDiv {
            right: 36px;

            @include width(750px) {
                right: 300px;
            }
        }

        @include width(750px) {
            position: fixed;
            @include flex(flex-start,flex-start,column);
            padding: 20px;
            width: 70%;
            max-width: 250px;
            height: 100vh;
            top: 0;
            left: -250px;
            background-color: #303030;
            transition: 1s;
        }
    }

    .bars {
        position: relative;
        display: none;
        cursor: pointer;
        top: 2px;

        @include width(750px) {
            display: flex;
            height: 25px;
            width: 25px;
        }
    }

    .bell {
        display: none;

        @include width(750px) {
            @include flex(center,center,row);
            position: absolute;
            border: 1px solid black;
            top: 22px;
            right: 20px;
            height: 18px;
            width: 18px;
            font-size: 12px;
            background-color: white;
            border-radius: 50%;
        }
    }

    .newUl {
        left: 0;
    }
</style>