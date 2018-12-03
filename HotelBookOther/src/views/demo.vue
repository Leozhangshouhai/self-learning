<template>
    <div id="example">
        <swiper :options="swiperOption" ref="mySwiper">
            <!-- slides -->
            <swiper-slide>
               <div class="swiper-slide" >
                   <img src="../assets/img/demo1.jpg" alt="">
               </div>
            </swiper-slide>
            <swiper-slide>
               <div class="swiper-slide" >
                   <img src="../assets/img/demo2.jpg" alt="">
               </div>
            </swiper-slide>
            <swiper-slide>
                <div class="swiper-slide" >
                    <img src="../assets/img/demo1.jpg" alt="">
                </div>
            </swiper-slide>


            <!-- Optional controls -->
            <div class="swiper-pagination"  slot="pagination"></div>

            <div class="swiper-scrollbar"   slot="scrollbar"></div>
        </swiper>
    </div>
</template>

<script>
    import Vue from 'vue'
    import fly from "../assets/js/linyer"
    import Wx from "../assets/js/wxApi"

    import { swiper, swiperSlide } from 'vue-awesome-swiper'


    export default {
        data() {
            return {
                swiperOption: {
                    // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
                    notNextTick: true,
                    // swiper configs 所有的配置同swiper官方api配置
                    autoplay: 3000,
                    prevButton:'.swiper-button-prev',
                    nextButton:'.swiper-button-next',
                    effect: 'coverflow',
                    grabCursor: true,
                    centeredSlides: true,
                    slidesPerView: 'auto',
                    coverflow: {
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows : true
                    }
                }
            };
        },
        created() {
            const _self = this;
            Wx.getlocation();
        },
        watch: {},
        methods: {},
        components:{
            swiperSlide,
            swiper,

        }

    };
</script>

<style scoped >
    @import "../assets/css/swiper.min.css";
    #example {
        background-color: #EBEBEB;
        padding-top: 8%;
        height: 100%;
    }
    .swiper-slide{
        width: 50%;
        height: 3rem;

    }
    img{
        height:3rem;
    }


</style>
