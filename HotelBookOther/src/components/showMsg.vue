<template>
    <div class="show-msg" v-show="dialogCreate">
        <div class="inner-box animated" :class="showWay">
            <div class="content">
                <slot></slot>
            </div>
            <img @click="closePage" class="close-btn" src="../assets/img/new/icon_closepage.png" alt="">
        </div>

    </div>
</template>

<script>

    export default {
        name: "show-msg",
        props: {
            dialogCreate: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                showWay: 'zoomIn'
            }
        },
        methods: {
            closePage() {
                this.showWay = 'zoomOut'
                setTimeout(() => {
                    // this.dialogCreate = false
                    this.$emit('closeDiaLog', false)
                    this.showWay = 'zoomIn'
                }, 500);
            }
        },
        components: {
        }
    }
</script>

<style scoped lang="scss">
    .show-msg{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.5);
        display: flex;
        justify-content: center;
        align-items: center;
        .inner-box{
            position: relative;
            z-index: 22;
            margin-top: -15%;
            width: 6.25rem;
            height: 7.3rem;
            border-radius: .1rem;
            background: #fff;
            /*overflow-x: hidden;*/
            .content{
                width: 100%;
                height: 100%;
                overflow-y: scroll;
            }
            .close-btn{
                position: absolute;
                height: .7rem;
                width: .7rem;
                bottom: -1.06rem;
                left: 50%;
                transform: translateX(-50%);
            }
        }

    }
    .animated {
        -webkit-animation-duration: 0.7s;
        animation-duration: 0.7s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
    }
    @-webkit-keyframes zoomIn {
        from {
            opacity: 0;
            -webkit-transform: scale3d(0.3, 0.3, 0.3);
            transform: scale3d(0.3, 0.3, 0.3);
        }

        50% {
            opacity: 1;
        }
    }

    @keyframes zoomIn {
        from {
            opacity: 0;
            -webkit-transform: scale3d(0.3, 0.3, 0.3);
            transform: scale3d(0.3, 0.3, 0.3);
        }

        50% {
            opacity: 1;
        }
    }

    .zoomIn {
        -webkit-animation-name: zoomIn;
        animation-name: zoomIn;
    }
    @-webkit-keyframes zoomOut {
        from {
            opacity: 1;
        }

        50% {
            opacity: 0;
            -webkit-transform: scale3d(0.3, 0.3, 0.3);
            transform: scale3d(0.3, 0.3, 0.3);
        }

        to {
            opacity: 0;
        }
    }

    @keyframes zoomOut {
        from {
            opacity: 1;
        }

        50% {
            opacity: 0;
            -webkit-transform: scale3d(0.3, 0.3, 0.3);
            transform: scale3d(0.3, 0.3, 0.3);
        }

        to {
            opacity: 0;
        }
    }

    .zoomOut {
        -webkit-animation-name: zoomOut;
        animation-name: zoomOut;
    }
</style>
