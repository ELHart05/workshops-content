<template>
  <div class="angle"></div>
</template>

<script>
  export default {
    name: 'AngleView'
  }
</script>

<style lang="scss" scoped>
  @use '../../assets/sass/mixins.scss'as *;

  .angle {
    height: 101%;
    width: 60px;
    right: -30px;
    background-color: #fff;
    transform: rotate(3deg);
    position: absolute;

    @include width(900px) {
      display: none;
    }
  }
</style>