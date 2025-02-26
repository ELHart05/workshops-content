<template>
    <div>
        <span></span>
    </div>
</template>

<script>
    export default {
        name: 'LoadingView'
    }
</script>

<style lang="scss" scoped>
    @keyframes rotation {
        100% {
            transform: rotate(360deg);
        }
    }
    
    div {
        height: 100%;
        width: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background-color: black;
        transition: 1s;
        opacity: .7;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 99;

        span {
            height: 50px;
            width: 50px;
            border-radius: 50%;
            border: 2px solid white;
            border-color: white transparent white transparent;
            animation: rotation infinite 900ms ease-in-out;
        }
    }
</style>