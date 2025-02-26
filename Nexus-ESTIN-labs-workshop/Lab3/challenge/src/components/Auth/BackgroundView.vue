<template>
  <div class="background"></div>
</template>

<script>
  export default {
    name: 'BackgroundView'
  }
</script>

<style lang="scss" scoped>
  @use '../../assets/sass/mixins.scss'as *;

  .background {
    width: 62%;
    flex: 2;
    background-image: url(../../assets/background.png);
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    height: 100%;

    @include width(900px) {
      display: none;
    }
  }
</style>