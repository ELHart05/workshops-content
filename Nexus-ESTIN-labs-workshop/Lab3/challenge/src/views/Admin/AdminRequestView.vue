<template>
    <PathNotFoundView v-if="isAdmin || !userState" />
    <div v-else>
        <NavBarView />
        <section class="admin">
            <h2>Administrartion</h2>
            <form @submit.enter.prevent class="admin-form">
                <h3>Request Being Admin</h3>
                <p>Being an Admin means you can post, edit and delete blogs.</p>
                <button @click="requestAdminAction">REQUEST</button>
            </form>
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
        db
    } from '../../firebase/index.js';
    import {
        doc,
        updateDoc
    } from 'firebase/firestore';
    import NavBarView from '../../components/Main/NavBarView.vue';
    import PathNotFoundView from '../Error/PathNotFoundView.vue';
    import FooterView from '../../components/Main/FooterView.vue';
    import LoadingView from '../../components/PopUps/LoadingView.vue';
    import ModalView from '../../components/PopUps/ModalView.vue';
    import {
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
                userSelected: [],
                error: false,
                errorMessage: '',
                error2: false,
                errorMessage2: '',
                loading: false
            }
        },
        methods: {
            closeModal() {
                this.error = false;
                this.errorMessage = '';
                this.error2 = false;
                this.errorMessage2 = '';
            },
            async confirmModal() {
                this.userSelected = await this.blogUsers.filter((user) => {
                    return user.email == this.email;
                });
                this.error = false;
                this.errorMessage = '';
                if (!this.userSelected[0].requestAdmin) {
                    this.loading = true;
                    const docRef = doc(db, 'users', this.userSelected[0].id);
                    updateDoc(docRef, {
                            requestAdmin: true
                        })
                        .then(() => {
                            this.loading = false;
                            this.error2 = true;
                            this.errorMessage2 =
                                "Request added Successfully, wait until the response of the other admins!";
                        })
                        .catch((err) => {
                            this.loading = false;
                            this.error2 = true;
                            this.errorMessage2 = err.message.slice(9,-1);
                        })
                } else {
                    this.error2 = true;
                    this.errorMessage2 = "You've already requested to become admin!"
                }
            },
            requestAdminAction() {
                this.error = true;
                this.errorMessage = "Are you sure you want to request being admin?"
            }
        },
        mounted() {
            if (this.isAdmin) {
                this.$router.push({
                    name: 'admin'
                })
            }
        },
        updated() {
            if (this.isAdmin) {
                this.$router.push({
                    name: 'admin'
                })
            }
        },
        computed: {
            ...mapState(['isAdmin', 'blogUsers', 'email', 'userState'])
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

            h3 {
                text-align: center;
                margin-bottom: 32px;
                font-weight: 300;
                font-size: 32px;
            }

            p {
                text-align: center;
                margin-bottom: 28px;
            }

            input {
                border: none;
                outline: none;
                background-color: #f2f7f6;
                padding: 8px;
                height: 50px;
                width: 100%;
            }

            button {
                @extend %btn;
                margin-top: 10px;
            }
        }
    }
</style>