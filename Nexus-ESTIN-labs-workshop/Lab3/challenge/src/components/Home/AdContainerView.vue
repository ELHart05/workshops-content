<template>
    <div class="container">
        <h2>NEVER MISS A POST. REGISTER FOR YOUR FREE ACCOUNT TODAY!</h2>
        <router-link :to="{name: 'register'}">REGISTER FOR FIREBLOG <svg aria-hidden="true" focusable="false"
                data-prefix="fal" data-icon="arrow-right" class="svg-inline--fa fa-arrow-right fa-w-14" role="img"
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path fill="currentColor"
                    d="M216.464 36.465l-7.071 7.07c-4.686 4.686-4.686 12.284 0 16.971L387.887 239H12c-6.627 0-12 5.373-12 12v10c0 6.627 5.373 12 12 12h375.887L209.393 451.494c-4.686 4.686-4.686 12.284 0 16.971l7.071 7.07c4.686 4.686 12.284 4.686 16.97 0l211.051-211.05c4.686-4.686 4.686-12.284 0-16.971L233.434 36.465c-4.686-4.687-12.284-4.687-16.97 0z">
                </path>
            </svg>
        </router-link>
    </div>
</template>

<script>
    export default {
        name: 'AdContainerView'
    }
</script>

<style lang="scss" scoped>
    @use '../../assets/sass/mixins.scss'as *;
    @use '../../assets/sass/classStyles.scss'as *;

    .container {
        padding: 125px 25px;
        @include flex(space-between,center,row);

        a {
            @extend %btn;

            svg {
                height: 15px;
                width: 15px;
                margin-left: 5px;
            }

        }

        h2 {
            width: 100%;
            max-width: 425px;
            font-size: 40px;
            font-weight: 300;

            @include width(800px) {
                font-size: 32px;
                text-align: center;
            }
        }

        @include width(800px) {
            flex-direction: column;
            row-gap: 20px;
        }
    }
</style>