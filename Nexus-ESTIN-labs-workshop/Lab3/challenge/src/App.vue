<template>
  <router-view v-if="contentLoaded" />
  <LoadingView v-else />
</template>


<script>
  import {
    auth,
    colRef,
    newBlogsRef
  } from './firebase/index.js';
  import {
    onAuthStateChanged
  } from 'firebase/auth';
  import LoadingView from './components/PopUps/LoadingView.vue';
  import {
    onSnapshot
  } from 'firebase/firestore';
  import {
    mapGetters,
    mapState
  } from 'vuex';
  export default {
    name: "App",
    components: {
      LoadingView
    },
    data() {
      return {
        currentUser: false
      }
    },
    created() {
      onAuthStateChanged(auth, (user) => {
        this.$store.commit("updateUserState", user);
        if (user) {
          this.$store.dispatch("getNewUserData");
        }
        this.currentUser = user;
      });
      onSnapshot(colRef, async () => {
        if (this.currentUser) {
          this.$store.dispatch("getNewUserData");
        }
        this.$store.commit("resetUserNames");
        this.$store.commit("resetUsers");
        await this.$store.dispatch("getUsers");
      })
      onSnapshot(newBlogsRef, async () => {
        this.$store.commit("resetBlogs");
        this.$store.commit("resetTotalBlogTags");
        await this.$store.dispatch("getPosts");
      })
    },
    computed: {
      ...mapState(["contentLoaded"]),
      ...mapGetters(['blogAdmins'])
    }
  }
</script>