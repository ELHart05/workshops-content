<template>
    <PathNotFoundView v-if="!isAdmin" />
    <div v-else>
        <NavBarView />
        <section class="admin">
            <h2>Administrartion</h2>
            <form @submit.enter.prevent class="admin-form">
                <h3>Add/Remove Admin</h3>
                <input type="text" placeholder="Enter user mail so we make them admin!" v-model="emailAdded">
                <div>
                    <button class="add" @click="addAdmin">ADD</button>
                    <button class="remove" @click="removeAdmin">REMOVE</button>
                </div>
            </form>
            <div class="admins">
                <h3>Admins List</h3>
                <p>
                    <span v-if="blogAdmins.length>0">You find bellow the list of all the admins added, you'll see here
                        also the new Admins!</span>
                    <span v-else>Currently, there's no new admin requests!</span>
                </p>
                <div class="total-admins">
                    <div class="an-admin" v-for="(admin, index) in blogAdmins" :key="index" :id="admin.email"
                        :style="{background: admin.color}" @click="selectAdmin(admin)">
                        {{ `${admin.firstName[0]}${admin.lastName[0]}` }}</div>
                </div>
            </div>
            <div class="users">
                <h3>Requests List</h3>
                <p>
                    <span v-if="blogUsersRequest.length>0">You find bellow the list of the admin requests see the
                        details
                        before adding a new Admin!</span>
                    <span v-else>Currently, there's no new admin requests!</span>
                </p>
                <div class="total-users">
                    <div class="request-user" v-for="(user, index) in blogUsersRequest" :key="index" :id="user.email"
                        :style="{background: user.color}" @click="selectUser(user)">
                        {{ `${user.firstName[0]}${user.lastName[0]}` }}</div>
                </div>
            </div>
        </section>
        <FooterView />
        <LoadingView v-if="loading" />
        <ModalView :modalConfirm="true" :modalPhoto="false" :modalMessage="errorMessage" :modalCase="error"
            @close-modal="closeModal" @confirm-modal="confirmModalAdd" />
        <ModalView :modalConfirm="false" :modalPhoto="false" :modalMessage="errorMessage2" :modalCase="error2"
            @close-modal="closeModal" />
        <ModalView :modalConfirm="true" :modalPhoto="false" :modalMessage="errorMessage3" :modalCase="error3"
            @close-modal="closeModal" @confirm-modal="confirmModalRemove" />
    </div>
</template>

<script>
    import {
        db
    } from '../../firebase/index.js';
    import {
        doc,
        updateDoc
    } from 'firebase/firestore';
    import NavBarView from '../../components/Main/NavBarView.vue';
    import FooterView from '../../components/Main/FooterView.vue';
    import PathNotFoundView from '../Error/PathNotFoundView.vue';
    import LoadingView from '../../components/PopUps/LoadingView.vue';
    import ModalView from '../../components/PopUps/ModalView.vue';
    import {
        mapGetters,
        mapState
    } from 'vuex';
    export default {
        name: "Admin",
        components: {
            PathNotFoundView,
            NavBarView,
            FooterView,
            LoadingView,
            ModalView
        },
        data() {
            return {
                emailAdded: '',
                userSelected: null,
                error: false,
                errorMessage: '',
                error2: false,
                errorMessage2: '',
                error3: false,
                errorMessage3: '',
                loading: false,
                userNotifications: []
            }
        },
        watch: {
            blogPosts() {
                this.userNotifications = this.userSelected[0].notifications.slice();
            },
            blogUsers() {
                this.userNotifications = this.userSelected[0].notifications.slice();
            }
        },
        methods: {
            redirectModal() {
                this.$router.push({
                    name: 'home'
                })
            },
            selectUser(user) {
                this.error2 = true;
                this.errorMessage2 =
                    `Email: ${user.email} <br /> Full Name: ${user.firstName} ${user.lastName} <br /> Username: ${user.username}`;
                this.emailAdded = user.email;
            },
            selectAdmin(admin) {
                this.error2 = true;
                this.errorMessage2 =
                    `Email: ${admin.email} <br /> Full Name: ${admin.firstName} ${admin.lastName} <br /> Username: @${admin.username}`;
                this.emailAdded = admin.email;
            },
            closeModal() {
                this.error = false;
                this.errorMessage = '';
                this.error2 = false;
                this.errorMessage2 = '';
                this.error3 = false;
                this.errorMessage3 = '';
            },
            confirmModalAdd() {
                this.error = false;
                this.errorMessage = "";
                this.userSelected = this.blogUsers.filter((user) => {
                    return user.email == this.emailAdded;
                });
                this.userNotifications = this.userSelected[0].notifications.slice();
                if (this.userSelected.length > 0) {
                    if (!this.userSelected[0].isAdmin) {
                        this.loading = true;
                        this.userNotifications.unshift({
                            userID: null,
                            blogID: null,
                            type: 'new-admin',
                            readed: false,
                            date: new Date()
                        });
                        const docRef = doc(db, 'users', this.userSelected[0].id);
                        updateDoc(docRef, {
                                isAdmin: true,
                                notifications: this.userNotifications
                            })
                            .then(() => {
                                this.loading = false;
                                this.error2 = true;
                                this.emailAdded = '';
                                this.errorMessage2 = "Email added as an admin Successfully!";
                            })
                            .catch((err) => {
                                this.loading = false;
                                this.error2 = true;
                                this.errorMessage2 = err.message.slice(9, -1);
                            })
                        return;
                    } else {
                        this.error2 = true;
                        this.errorMessage2 = "The email you provided is already an admin!";
                        return;
                    }
                } {
                    this.error2 = true;
                    this.errorMessage2 = "Sorry but the email you provided isn't an admin's email!";
                }
            },
            confirmModalRemove() {
                this.error3 = false;
                this.errorMessage3 = "";
                this.adminSelected = this.blogUsers.filter((user) => {
                    return user.email == this.emailAdded;
                });
                this.userNotifications = this.adminSelected[0].notifications.slice();
                if (this.adminSelected.length > 0) {
                    if (this.email != this.emailAdded) {
                        if (this.adminSelected[0].isAdmin) {
                            this.loading = true;
                            this.userNotifications.unshift({
                                userID: null,
                                blogID: null,
                                type: 'remove-admin',
                                readed: false,
                                date: new Date()
                            });
                            const docRef = doc(db, 'users', this.adminSelected[0].id);
                            updateDoc(docRef, {
                                    isAdmin: false,
                                    requestAdmin: false,
                                    notifications: this.userNotifications
                                })
                                .then(() => {
                                    this.loading = false;
                                    this.error2 = true;
                                    this.emailAdded = '';
                                    this.errorMessage2 = "Email removed as an admin Successfully!";
                                })
                                .catch((err) => {
                                    this.loading = false;
                                    this.error2 = true;
                                    this.errorMessage2 = err.message.slice(9, -1);
                                })
                            return;
                        } {
                            this.error2 = true;
                            this.errorMessage2 = "Sorry but the email you provided isn't an admin's email!";
                            return;
                        }
                    } {
                        this.emailAdded = '';
                        this.error2 = true;
                        this.errorMessage2 =
                            "Sorry but you can't delete yourself as an admin, contact other admins to complete the process!";
                        return;
                    }
                } {
                    this.error2 = true;
                    this.errorMessage2 = "Sorry but the email you provided isn't a user's email!";
                }
            },
            addAdmin() {
                if (this.emailAdded) {
                    this.error = true;
                    this.errorMessage = "Are you sure you want to add this email as an admin?"
                } else {
                    this.error2 = true;
                    this.errorMessage2 = "Please make sure you've filled the fields!"
                }
            },
            removeAdmin() {
                if (this.emailAdded) {
                    this.error3 = true;
                    this.errorMessage3 = "Are you sure you want to remove this email as an admin?"
                } else {
                    this.error2 = true;
                    this.errorMessage2 = "Please make sure you've filled the fields!"
                }
            }
        },
        watch: {
            isAdmin() {
                if (!this.isAdmin) {
                    this.$router.push({
                        name: 'admin-request'
                    })
                };
            }
        },
        computed: {
            ...mapState(['isAdmin', 'blogUsers', 'username', 'email']),
            ...mapGetters(['blogAdmins', 'blogUsersRequest'])
        }
    }
</script>

<style lang="scss" scoped>
    @use '../../assets/sass/mixins.scss'as *;
    @use '../../assets/sass/classStyles.scss'as *;

    .admin {
        @include flex(center,center,column);
        padding: 70px 25px;

        h2 {
            text-align: center;
            margin-bottom: 16px;
            font-weight: 300;
            font-size: 32px;
            padding: 0 10px;
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

            h3 {
                text-align: center;
                font-weight: 300;
                font-size: 32px;
            }

            input {
                border: none;
                outline: none;
                background-color: #f2f7f6;
                padding: 8px;
                height: 50px;
                width: 100%;
            }

            div {
                display: flex;
                flex-wrap: wrap;
                gap: 15px;

                button {
                    @extend %btn;
                }

                .remove {
                    background-color: red;
                }
            }

        }

        .users {
            margin-top: 32px;
        }

        .users,
        .admins {
            @include flex(center,center,column);
            width: 100%;
            max-width: 600px;
            background-color: #f1f1f1;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 6px -1px rgb(0 0 0 / 10%), 0 2px 4px -1px rgb(0 0 0 / 6%);

            h3 {
                text-align: center;
                margin-bottom: 16px;
                font-weight: 300;
                font-size: 32px;
            }

            p {
                text-align: center;
            }

            .total-users,
            .total-admins {
                @include flex(center,center,row);
                gap: 10px;
                flex-wrap: wrap;
                width: 100%;
                max-width: 600px;
                margin-top: 15px;

                .request-user,
                .an-admin {
                    @extend %user;
                    height: 55px;
                    width: 55px;
                    font-size: 18px;
                }
            }
        }
    }
</style>