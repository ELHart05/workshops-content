<template>
    <div v-if="modalCase" class="modal">
        <div :class="{modalContent:true,modalImg: modalPhoto}">
            <p v-html="modalMessage"></p>
            <img v-if="modalPhoto" :src="blogCoverFileURL" alt="#">
            <div>
                <button v-if="modalConfirm" @click="confirmModal">Confirm</button>
                <button @click="closeModal">Close</button>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        mapState
    } from 'vuex';
    export default {
        name: 'ModalView',
        methods: {
            confirmModal() {
                this.$emit('confirm-modal');
            },
            closeModal() {
                this.$emit('close-modal');
            }
        },
        props: ['modalMessage', 'modalCase', 'modalPhoto', 'modalConfirm'],
        computed: {
            ...mapState(['blogCoverFileURL'])
        }
    }
</script>

<style lang="scss" scoped>
    @use '../../assets/sass/mixins.scss'as *;

    .modal {
        @include flex(center,center,row);
        position: fixed;
        height: 100vh;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 100;
        background-color: rgba(0, 0, 0, 0.7);
        opacity: 1;

        .modalContent {
            @include flex(center,center,column);
            border-radius: 8px;
            padding: 40px 30px;
            background-color: white;
            width: 90%;
            max-width: 325px;

            p {
                text-align: center;
            }

            div {
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                gap: 15px;

                button {
                    margin-top: 20px;
                    display: flex;
                    align-items: center;
                    text-align: center;
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

            img {
                width: 95%;
                max-height: 470px;
            }
        }

        .modalImg {
            max-width: 900px;
        }
    }
</style>