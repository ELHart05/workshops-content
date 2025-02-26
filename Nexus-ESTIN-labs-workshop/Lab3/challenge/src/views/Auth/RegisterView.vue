<template>
  <div class="register-container">
    <div class="form-content">
      <form @keydown.enter.prevent class="register-form">
        <p>Already have an account?<router-link :to="{name: 'login'}">Login</router-link>
        </p>
        <h2>Create Your RealBlog Account</h2>
        <div class="inputs">
          <div>
            <svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="user-alt"
              class="svg-inline--fa fa-user-alt fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512">
              <path fill="currentColor"
                d="M256 32c61.8 0 112 50.2 112 112s-50.2 112-112 112-112-50.2-112-112S194.2 32 256 32m128 320c52.9 0 96 43.1 96 96v32H32v-32c0-52.9 43.1-96 96-96 85 0 67.3 16 128 16 60.9 0 42.9-16 128-16M256 0c-79.5 0-144 64.5-144 144s64.5 144 144 144 144-64.5 144-144S335.5 0 256 0zm128 320c-92.4 0-71 16-128 16-56.8 0-35.7-16-128-16C57.3 320 0 377.3 0 448v32c0 17.7 14.3 32 32 32h448c17.7 0 32-14.3 32-32v-32c0-70.7-57.3-128-128-128z">
              </path>
            </svg>
            <input type="text" placeholder="First Name" v-model="firstName" ref="firstName">
          </div>
          <div>
            <svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="user-alt"
              class="svg-inline--fa fa-user-alt fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512">
              <path fill="currentColor"
                d="M256 32c61.8 0 112 50.2 112 112s-50.2 112-112 112-112-50.2-112-112S194.2 32 256 32m128 320c52.9 0 96 43.1 96 96v32H32v-32c0-52.9 43.1-96 96-96 85 0 67.3 16 128 16 60.9 0 42.9-16 128-16M256 0c-79.5 0-144 64.5-144 144s64.5 144 144 144 144-64.5 144-144S335.5 0 256 0zm128 320c-92.4 0-71 16-128 16-56.8 0-35.7-16-128-16C57.3 320 0 377.3 0 448v32c0 17.7 14.3 32 32 32h448c17.7 0 32-14.3 32-32v-32c0-70.7-57.3-128-128-128z">
              </path>
            </svg>
            <input type="text" placeholder="Last Name" v-model="lastName">
          </div>
          <div>
            <svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="user-alt"
              class="svg-inline--fa fa-user-alt fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512">
              <path fill="currentColor"
                d="M256 32c61.8 0 112 50.2 112 112s-50.2 112-112 112-112-50.2-112-112S194.2 32 256 32m128 320c52.9 0 96 43.1 96 96v32H32v-32c0-52.9 43.1-96 96-96 85 0 67.3 16 128 16 60.9 0 42.9-16 128-16M256 0c-79.5 0-144 64.5-144 144s64.5 144 144 144 144-64.5 144-144S335.5 0 256 0zm128 320c-92.4 0-71 16-128 16-56.8 0-35.7-16-128-16C57.3 320 0 377.3 0 448v32c0 17.7 14.3 32 32 32h448c17.7 0 32-14.3 32-32v-32c0-70.7-57.3-128-128-128z">
              </path>
            </svg>
            <input type="text" placeholder="Username" v-model="username">
          </div>
          <div>
            <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="envelope"
              class="svg-inline--fa fa-envelope fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512">
              <path fill="currentColor"
                d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm0 48v40.805c-22.422 18.259-58.168 46.651-134.587 106.49-16.841 13.247-50.201 45.072-73.413 44.701-23.208.375-56.579-31.459-73.413-44.701C106.18 199.465 70.425 171.067 48 152.805V112h416zM48 400V214.398c22.914 18.251 55.409 43.862 104.938 82.646 21.857 17.205 60.134 55.186 103.062 54.955 42.717.231 80.509-37.199 103.053-54.947 49.528-38.783 82.032-64.401 104.947-82.653V400H48z">
              </path>
            </svg>
            <input type="email" placeholder="Email" v-model="email">
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
        <button @click.prevent="register">SIGN UP</button>
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
    auth,
    db
  } from '../../firebase/index.js';
  import {
    createUserWithEmailAndPassword
  } from "firebase/auth";
  import {
    doc,
    setDoc
  } from 'firebase/firestore';
  import {
    randomColor,
  } from '../../store/index.js';
  import AngleView from '../../components/Auth/AngleView.vue';
  import BackgroundView from '../../components/Auth/BackgroundView.vue';
  import LoadingView from '../../components/PopUps/LoadingView.vue';
  import ModalView from '../../components/PopUps/ModalView.vue';
  import {
    mapState
  } from 'vuex';
  export default {
    name: "RegisterView",
    components: {
      AngleView,
      BackgroundView,
      LoadingView,
      ModalView
    },
    data() {
      return {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        error: false,
        errorMessage: '',
        loading: false
      }
    },
    mounted(){
      this.$refs.firstName.focus();
    },
    methods: {
      closeModal() {
        this.error = false;
        this.errorMessage = '';
      },
      async register() {
        if ((this.firstName != '') & (this.lastName != '') & (this.username != '') & (this.email != '') & (this.password != '')) {
          if (this.password.length > 5) {
            if (!this.username.includes(' ')) {
              if (!(this.blogUsernames.includes(this.username.toLowerCase()))) {
                this.loading = true;
                this.error = false;
                this.errorMessage = '';
                createUserWithEmailAndPassword(auth, this.email, this.password)
                  .then(() => {
                    const collectionRef = doc(db, 'users', auth.currentUser.uid);
                    setDoc(collectionRef, {
                        firstName: this.firstName,
                        lastName: this.lastName,
                        username: this.username,
                        isAdmin: false,
                        email: this.email,
                        password: this.password,
                        requestAdmin: false,
                        color: randomColor(),
                        notifications: [{
                          userID: null,
                          blogID: null,
                          type: 'new-user',
                          readed: false,
                          date: new Date()
                        }]
                      }).then(() => {
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
                        this.errorMessage = err.message.slice(9,-1);
                      });
                  })
                  .catch((err) => {
                    this.loading = false;
                    this.error = true;
                    this.errorMessage = err.message.slice(9,-1);
                  });
                return;
              } {
                this.error = true;
                this.errorMessage = "Uername reserved, each user have a unique username ... Please Try Again!";
                return;
              }
            } {
              this.error = true;
              this.errorMessage = "Username do not accept spaces!";
              return;
            }
          } {
            this.error = true;
            this.errorMessage = "Password field should be more than 5 characters!";
            return;
          }
        } {
          this.error = true;
          this.errorMessage = "Please fill out all the fields!";
        }
      }
    },
    computed: {
      ...mapState(['blogUsernames'])
    }
  }
</script>

<style lang="scss">
  @use '../../assets/sass/mixins.scss'as *;
  @use '../../assets/sass/classStyles.scss'as *;



  .register-container {
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
          max-width: 350px;

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

        button {
          @extend %btn;
          margin-top: 45px;
        }
      }
    }
  }
</style>