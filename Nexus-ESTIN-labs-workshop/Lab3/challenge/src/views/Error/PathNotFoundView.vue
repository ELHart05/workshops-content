<template>
  <div class="error">
    <img src="../../assets/error.png" alt="#">
    <p>We're sorry, the page you requested could not be found, Please go back to the homepage.
      <span v-if="!userState">Or create account to have access!</span>
      <span v-if="userState && !isAdmin">Or send a request to become an admin for full controll!</span>
    </p>
    <div class="routers">
      <router-link :to="{name: 'home'}">Go back home</router-link>
      <router-link v-if="userState && !isAdmin" :to="{name: 'admin-request'}">Become An Admin</router-link>
      <router-link v-if="!userState" :to="{name: 'login'}">Go And Login</router-link>
      <router-link v-if="!userState" :to="{name: 'register'}">Go And Register</router-link>
    </div>
  </div>
</template>

<script>
  import {
    mapState
  } from 'vuex'
  export default {
    name: 'PathNotFoundView',
    computed: {
      ...mapState(['isAdmin', 'userState'])
    }
  }
</script>

<style lang="scss" scoped>
  @use '../../assets/sass/mixins.scss'as *;

  .error {
    position: fixed;
    text-align: center;
    padding: 0 20px;
    background-color: #f7f7f7;
    @include flex(center,center,column);
    height: 100vh;
    width: 100%;
    z-index: 100;

    img {
      width: 90%;
      max-width: 430px;
    }

    h2 {
      font-size: 40px;
      margin-top: 20px;
    }

    p {
      text-align: center;
      font-size: 18px;
      width: 50%;

      @include width (700px) {
        width: 100%;
      }

      span {
        color: red;
      }
    }

    .routers {
      @include flex(center,center,row);
      flex-wrap: wrap;
      margin-top: 25px;
      gap: 15px;

      a {
        padding: 12px 24px;
        color: #fff;
        background-color: #303030;
        border-radius: 20px;
        text-decoration: none;
        border: none;
        transition: 1s;
        cursor: pointer;

        &:hover {
          background-color: grey;
        }
      }
    }
  }
</style>