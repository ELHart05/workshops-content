<template>
  <NavBarView />
  <MainSectionView />
  <RecentBlogView />
  <AdContainerView v-if="!userState" />
  <FooterView />
</template>

<script>
  import NavBarView from '../../components/Main/NavBarView.vue';
  import MainSectionView from '../../components/Home/MainSectionView.vue';
  import RecentBlogView from '../../components/Home/RecentBlogView.vue';
  import AdContainerView from '../../components/Home/AdContainerView.vue';
  import FooterView from '../../components/Main/FooterView.vue';
  import {
    mapState
  } from 'vuex';

  export default {
    name: "HomeView",
    components: {
      NavBarView,
      MainSectionView,
      RecentBlogView,
      AdContainerView,
      FooterView
    },
    computed: {
      ...mapState(['userState'])
    }
  }
</script>