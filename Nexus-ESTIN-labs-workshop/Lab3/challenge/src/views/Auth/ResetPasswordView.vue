<template>
    <div class="forgot-password-container">
        <div class="form-content">
            <form @keydown.enter.prevent class="forgot-password-form">
                <p class="back">Back to <router-link :to="{name: 'login'}">Login</router-link>
                </p>
                <h2>Reset Password</h2>
                <p class="forgot-content">Forgot your passowrd? Enter your email to reset it</p>
                <div class="inputs">
                    <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="envelope"
                        class="svg-inline--fa fa-envelope fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512">
                        <path fill="currentColor"
                            d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm0 48v40.805c-22.422 18.259-58.168 46.651-134.587 106.49-16.841 13.247-50.201 45.072-73.413 44.701-23.208.375-56.579-31.459-73.413-44.701C106.18 199.465 70.425 171.067 48 152.805V112h416zM48 400V214.398c22.914 18.251 55.409 43.862 104.938 82.646 21.857 17.205 60.134 55.186 103.062 54.955 42.717.231 80.509-37.199 103.053-54.947 49.528-38.783 82.032-64.401 104.947-82.653V400H48z">
                        </path>
                    </svg>
                    <input type="email" placeholder="Email" v-model="email" ref="email">
                </div>
                <button @click.prevent="resetPassword">RESET</button>
                <AngleView />
            </form>
        </div>
        <BackgroundView />
    </div>
    <LoadingView v-if="loading" />
    <ModalView :modalConfirm="false" :modalPhoto="false" :modalMessage="errorMessage" :modalCase="error"
        @close-modal="closeModal" />
</template>

<script>
    import {
        auth
    } from '../../firebase/index.js';
    import {
        sendPasswordResetEmail
    } from 'firebase/auth';
    import AngleView from '../../components/Auth/AngleView.vue';
    import BackgroundView from '../../components/Auth/BackgroundView.vue';
    import LoadingView from '../../components/PopUps/LoadingView.vue';
    import ModalView from '../../components/PopUps/ModalView.vue';
    export default {
        name: "ResetPasswordView",
        components: {
            AngleView,
            BackgroundView,
            LoadingView,
            ModalView
        },
        data() {
            return {
                email: '',
                error: false,
                errorMessage: '',
                loading: false
            }
        },
        mounted() {
            this.$refs.email.focus();
        },
        methods: {
            closeModal() {
                this.error = false;
                this.errorMessage = '';
                this.email = '';
            },
            resetPassword() {
                if (this.email != '') {
                    this.loading = true;
                    sendPasswordResetEmail(auth, this.email)
                        .then(() => {
                            this.errorMessage = "if your account exists, you will receive an email!";
                            this.loading = false;
                            this.error = true;
                        })
                        .catch((err) => {
                            this.errorMessage = err.message.slice(9, -1);
                            this.loading = false;
                            this.error = true;
                        })
                    return;
                } {
                    this.error = true;
                    this.errorMessage = "Please fill out the field!";
                }
            }
        }
    }
</script>

<style lang="scss">
    @use '../../assets/sass/mixins.scss'as *;
    @use '../../assets/sass/classStyles.scss'as *;

    .forgot-password-container {
        @include flex(center,center,row);
        height: 100vh;
        overflow: hidden;

        .form-content {
            width: 38%;
            height: 100%;
            display: flex;

            @include width(900px) {
                width: 100%;
            }

            form {
                position: relative;
                @include flex(center,center,column);
                padding: 0 50px;
                flex: 1;

                @include width(900px) {
                    padding: 0 10px;
                }

                .back {
                    text-align: center;
                    margin-bottom: 15px;

                    a {
                        transition: 300ms;
                        margin-left: 2px;
                        color: #000;

                        &:hover {
                            text-decoration: none;
                            color: grey;
                        }
                    }
                }

                .forgot-content {
                    text-align: center;
                    margin-bottom: 32px;
                }

                h2 {
                    color: #303030;
                    font-size: 40px;
                    text-align: center;
                    margin-bottom: 10px;

                    @include width(900px) {
                        font-size: 32px;
                    }
                }

                .inputs {
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    max-width: 350px;

                    svg {
                        font-weight: 800;
                        position: absolute;
                        height: 16px;
                        width: 16px;
                        margin: 17px 0 0 8px;
                    }

                    input {
                        outline: none;
                        border: transparent;
                        padding: 4px 4px 4px 30px;
                        height: 50px;
                        width: 100%;
                        background-color: #f2f7f6;
                        cursor: pointer;
                    }

                }

                button {
                    @extend %btn;
                    margin-top: 35px;
                }
            }
        }
    }
</style>