<template>
  <div class="login-container">
    <div class="form-content">
      <form @keydown.enter.prevent class="login-form">
        <p>Don't have an account?<router-link :to="{name: 'register'}">Register</router-link>
        </p>
        <h2>Login to RealBlog</h2>
        <div class="inputs">
          <div>
            <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="envelope"
              class="svg-inline--fa fa-envelope fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512">
              <path fill="currentColor"
                d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm0 48v40.805c-22.422 18.259-58.168 46.651-134.587 106.49-16.841 13.247-50.201 45.072-73.413 44.701-23.208.375-56.579-31.459-73.413-44.701C106.18 199.465 70.425 171.067 48 152.805V112h416zM48 400V214.398c22.914 18.251 55.409 43.862 104.938 82.646 21.857 17.205 60.134 55.186 103.062 54.955 42.717.231 80.509-37.199 103.053-54.947 49.528-38.783 82.032-64.401 104.947-82.653V400H48z">
              </path>
            </svg>
            <input type="email" placeholder="Email" v-model="email" ref="email">
          </div>
          <div>
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="lock-alt"
              class="svg-inline--fa fa-lock-alt fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512">
              <path fill="currentColor"
                d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zM264 392c0 22.1-17.9 40-40 40s-40-17.9-40-40v-48c0-22.1 17.9-40 40-40s40 17.9 40 40v48zm32-168H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z">
              </path>
            </svg>
            <input type="password" placeholder="Password" v-model="password">
          </div>
        </div>
        <router-link class="forgett-password" :to="{name: 'reset-password'}">Forgot your password?</router-link>
        <button @click.prevent="login">SIGN IN</button>
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
    signInWithEmailAndPassword
  } from "firebase/auth";
  import AngleView from '../../components/Auth/AngleView.vue';
  import BackgroundView from '../../components/Auth/BackgroundView.vue';
  import ModalView from '../../components/PopUps/ModalView.vue';
  import LoadingView from '../../components/PopUps/LoadingView.vue';
  export default {
    name: "RegisterView",
    components: {
      AngleView,
      BackgroundView,
      ModalView,
      LoadingView
    },
    data() {
      return {
        email: '',
        password: '',
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
      },
      async login() {
        if ((this.firstName != '') & (this.lastName != '') & (this.username != '') & (this.email != '') & (this.password != '')) {
          this.loading = true;
          signInWithEmailAndPassword(auth, this.email, this.password)
            .then(() => {
              this.error = false;
              this.errorMessage = '';
              this.$store.commit("editFirstLogin", true);
              this.$router.push({
                name: 'profile'
              });
              window.scrollTo(0, 0);
              this.loading = false;
            })
            .catch((err) => {
              this.loading = false;
              this.error = true;
              this.errorMessage = err.message.slice(9, -1);
            });
          return;
        } {
          this.error = true;
          this.errorMessage = "Please fill out all the fields!";
        }
      }
    }
  }
</script>

<style lang="scss">
  @use '../../assets/sass/mixins.scss'as *;
  @use '../../assets/sass/classStyles.scss'as *;



  .login-container {
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

        p {
          text-align: center;
          margin-bottom: 32px;

          a {
            transition: 300ms;
            margin-left: 5px;
            color: #000;

            &:hover {
              text-decoration: none;
              color: grey;
            }
          }
        }

        h2 {
          color: #303030;
          font-size: 40px;
          text-align: center;
          margin-bottom: 35px;

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

          div {

            svg {
              font-weight: 800;
              position: absolute;
              height: 16px;
              width: 16px;
              margin: 27px 0 0 8px;
            }

            input {
              outline: none;
              border: transparent;
              padding: 4px 4px 4px 30px;
              height: 50px;
              width: 100%;
              background-color: #f2f7f6;
              margin-top: 10px;
              cursor: pointer;
            }
          }
        }

        .forgett-password {
          font-size: 14px;
          text-decoration: underline 0.2px rgba(255, 255, 255, 0);
          text-underline-offset: 3px;
          transition: 300ms;
          color: black;
          margin-top: 25px;

          &:hover {
            text-decoration-color: black;
          }
        }

        button {
          @extend %btn;
          margin-top: 45px;
        }
      }
    }
  }
</style>