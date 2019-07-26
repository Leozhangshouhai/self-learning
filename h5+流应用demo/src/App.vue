<template>
    <div id="app">
        <!-- <mt-header title="标题过长会隐藏后面的内容啊哈哈哈哈">
                    <mt-button icon="back" @click="go_pre" slot="left"></mt-button>
                    <mt-button icon="more" slot="right"></mt-button>
                  </mt-header> -->
        <transition :name="pageDirection">
            <router-view class="view-warp" v-if="$route.meta.keepAlive!=true&&isRouterActive" @outlogin="outlogin($event)"></router-view>
        </transition>
        <transition :name="pageDirection">
            <keep-alive>
                <router-view class="view-warp" v-if="$route.meta.keepAlive==true" @outlogin="outlogin($event)"></router-view>
            </keep-alive>
        </transition>
    </div>
</template>

<script>
    import Vue from 'vue';
    import fly from "./assets/js/linyer";
    import axios from "axios";
    import qs from 'qs';
    import {
        mapState,
        mapMutations
    } from 'vuex';
    import {
        Header,
        Button
    } from 'mint-ui';
    import api from './assets/js/api.js';
    import {
        CONFIRM,
        SETUSERINFO
    } from './assets/js/tools.js';
    Vue.component(Header.name, Header);
    Vue.component(Button.name, Button);
    import plus_m from "./assets/js/plus.js";
    import "./assets/js/autoSize(100).js";
    let INDEXLISTS = ["/discover", '/mine', '/wealth', '/index', '/quotation', '/']
    let CANPATHS = ['/login', '/regist', 'recover']
    export default {
        name: 'app',
        data() {
            return {
                wgtVer: null,
                isRouterActive: true,
                first: 0,
                CONFIRMSHOW: false,
                SHOWNAVBAR: false,
            };
        },
        provide() {
            return {
                reload: this.reload
            }
        },
        mounted() {
            this.init();
            // this.initplus();
            // this.notice();
        },

        created() {
            // this.addScript();

        },
        watch: {
            '$route.path': function (newVal, oldVal) {

                console.log(newVal + "---" + oldVal);
                if (INDEXLISTS.indexOf(newVal) > -1) {
                    console.log(newVal.substr(1).length)
                    if (newVal.length > 1) {
                        this.$store.state.selectedIndex = newVal.substr(1);
                    } else {
                        this.$store.state.selectedIndex = 'index';
                    }
                    this.SHOWNAVBAR = true;
                } else {
                    this.SHOWNAVBAR = false;
                }
                document.body.scrollTop = 0
                document.documentElement.scrollTop = 0

            }
        },
        computed: {
            ...mapState([
                'pageDirection'
            ])

        },
        methods: {
            ...mapMutations([
                'afterEnter'
            ]),
            init() {
                let _t = this;
                Vue.prototype.$Axios = function (obj = {
                        url: '',
                        param: '',
                        success() {},
                        type: '',
                        error(res) {

                        }
                    }) {
                        axios({
                            method: "post",
                            withCredentials: true,
                            headers: {
                                // "Content-Type": "application/x-www-form-urlencoded"
                                //   'X-Requested-With':'XMLHttpRequest',
                            },
                            url: obj.url,
                            params: {
                                session: fly.localStore('my_session') || '000001',
                                device_id: window.constID,
                                data: obj.param
                            },
                            baseURL: this.$wapian
                            // baseURL: 'http://118.24.159.253:8081'
                        }).then((res) => {
                            if (res.data.ret == 0 && res.data.content) {
                                obj.success && obj.success(res.data);
                            } else if (res.data.ret == '-50001') {
                                !_t.CONFIRMSHOW && CONFIRM({
                                    msg: res.data.msg
                                }).then(res => {
                                    localStorage.removeItem('my_session');
                                    localStorage.removeItem('my_userInfo');
                                    _t.$router.push('/outerIndex');
                                    _t.$store.state.is_login = false;
                                    _t.CONFIRMSHOW = false;
                                })
                                _t.CONFIRMSHOW = true;
                            } else {
                                obj.error ? obj.error(res.data) :
                                    (() => {
                                        _t.Toast({
                                            message: res.data.msg || '稍后尝试了',
                                            position: 'top',
                                            duration: 3000
                                        });
                                        this.Indicator.close();
                                    })();
                            }
                        }, (res) => {
                            console.log(res);
                            obj.error ? obj.error(res) : _t.Toast({
                                message: res.data.msg || '稍后尝试了',
                                position: 'top',
                                duration: 2000
                            });
                        });
                    },
                    Vue.prototype.$GetUserInfo = function () {
                        let _t = this
                        return new Promise((resolve, reject) => {
                            _t.$Axios({
                                url: api.getUserInfo,
                                param: {},
                                success: (res) => {
                                    SETUSERINFO(res.content, res.content.session);
                                    resolve(res)
                                },
                                error: (error) => {
                                    reject(error)
                                }
                            })
                        })
                    },
                    Vue.prototype.$ChargeEth = function () {
                        let _t = this
                        return new Promise((resolve, reject) => {
                            _t.$Axios({
                                url: api.charge,
                                param: {},
                                success: (res) => {

                                },
                                error: (error) => {
                                    reject(error)
                                }
                            })
                        })
                    }
            },
            notice() {
                let _t = this;
                _t.$Axios({
                    url: api.get_notice,
                    param: {},
                    success: (res) => {
                        //  res = {
                        //     content: {
                        //         is_show: 1,
                        //         msg: '我不是桓公我不是桓公我不是桓公我不是桓公我不是桓公我不是桓公我不是桓公',
                        //         title: '我不是桓公'
                        //     }
                        // };
                        res.content.is_show ==1&& CONFIRM({
                            msg: res.content.msg,
                            title: res.content.title
                        }).then(res => {

                        })

                    },
                    error: (error) => {
                        // reject(error)
                    }
                })
            },
            doCopy(msg = '00909') {
                console.log(msg)
                this.$copyText(msg).then(function (e) {

                    console.log(e)
                }, function (e) {
                    console.log(e)
                })
            },
            downWgt() {
                let _t = this,
                    url = 'https://www.ethtoken.plus/';
                this.Indicator.open('正在打开浏览器...')
                plus.runtime.openURL('https://www.ethtoken.plus/', function () {
                    _t.Indicator.close();
                    CONFIRM({
                        msg: `唤醒浏览器失败,已复制下载地址到剪切板，请手动复制到浏览器下载 ...${url}`,
                    }).then(res => {
                        _.doCopy(url)
                    })

                })
                setTimeout(() => {
                    _t.Indicator.close();
                }, 3000)
                // window.location.href="";
            },
            checkUpdate() {
                try {
                    let _t = this;

                    this.$Axios({
                        url: api.get_config,
                        param: {},
                        success: (res) => {
                            var newVer = res.content.version;
                            window.NETWORKVERSION = res.content.version;
                            if (_t.wgtVer && newVer && (newVer > _t.wgtVer)) {
                                plus.nativeUI.closeWaiting();
                                CONFIRM({
                                    msg: res.content.up_des,
                                }).then(res => {
                                    _t.downWgt();
                                    console.log(res)
                                })
                            } else {
                                plus.nativeUI.closeWaiting();
                            }
                        }
                    })
                } catch (err) {
                    console.log('未在APP内调试，不执行版本更新');

                }
            },
            initplus() {
                let _t = this;

                function plusReady() {
                    plus.key.addEventListener("backbutton", function () {
                        console.log('i in  backbutton')
                        if (_t.$store.state.is_login) {
                            console.log(_t.$route.path);
                            console.log(_t.first)
                            if (_t.$route.path == "/index" || _t.$route.path == "/") {
                                _t.first = _t.first + 1;
                                plus.nativeUI.toast('再按一次退出应用');
                                if (_t.first >= 2) {
                                    plus.runtime.quit();
                                }
                                setTimeout(() => {
                                    _t.first = 0;
                                }, 1000)
                            } else {
                                //    _t.$router.go(-1);
                            }
                        } else {
                            console.log(_t.first)
                            console.log(_t.$route.path)
                            if (_t.$route.path == "/outerIndex") {
                                _t.first = _t.first + 1;
                                plus.nativeUI.toast('再按一次退出应用');
                                if (_t.first >= 2) {
                                    plus.runtime.quit();
                                }
                                setTimeout(() => {
                                    _t.first = 0;
                                }, 1000)
                            } else {
                                // _t.$router.go(-1);
                            }

                        };
                    });

                    plus.runtime.getProperty(plus.runtime.appid, function (inf) {
                        _t.wgtVer = inf.version;
                        console.log("当前应用版本：" + _t.wgtVer);
                        _t.checkUpdate();
                    });
                    var self = plus.webview.currentWebview();
                    // plus.navigator.setStatusBarBackground('#571eeb');
                }
                if (window.plus) {
                    plusReady();
                } else {
                    document.addEventListener('plusready', plusReady, false);
                }
            },
            reload() {
                this.isRouterActive = false;
                this.$nextTick(() => {
                    this.isRouterActive = true;
                })
            },
            go_pre() {
                this.$router.go(-1);
            }
        },
        components: {
           
        }
    }
</script>
<style lang="scss">
    @import "./assets/css/index";
    @import "./assets/css/iconfont.css";
    /* @import url('//at.alicdn.com/t/font_1175190_yrdcynta6yl.css'); */

    #app {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        /* overflow: auto; */
        /* min-height: 100%;
        width: 100%;
        left: 0;
            top: 0;
            right: 0;
            bottom: 0;
        position: fixed;
        overflow: auto; */
        min-height: 100%;
        .view-warp {
            /* left: 0;
            top: 0;
            right: 0;
            bottom: 0; */
            /* width: 100%; */
            /* height:100%; */
            overflow-y: auto;
            position: absolute;
            min-height: 100%;
            width: 100%;
            transition: all .5s cubic-bezier(.55, 0, .1, 1);
        }
    }

    .fly-index {
        font-size: 24px
    }
    .fixed{
        
    }

    /* 
前进淡入淡出，后退切入
.slide-left-enter,
 .slide-right-leave-active {
     opacity: 0;
    -webkit-transform: translate(100%, 0);
    transform: translate(100%, 0);
}

.slide-left-leave-active,
.slide-right-enter {
     opacity: 0;
    -webkit-transform: translate(-100%, 0);
    transform: translate(-100% 0);
} */

    .slide-left-enter,
    .slide-right-leave-active {
        opacity: 0;
        -webkit-transform: translate(30px, 0);
        transform: translate(30px, 0);
    }

    .slide-left-leave-active,
    .slide-right-enter {
        opacity: 0;
        -webkit-transform: translate(-30px, 0);
        transform: translate(-30px, 0);
    }

    /* 
        前进后退都淡入淡出
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity .5s ease;
    }


    .slide-right-enter-active,
    .slide-right-leave-active,
    .slide-left-enter-active,
    .slide-left-leave-active {
        will-change: transform;
        transition: all 500ms;
        position: absolute;
    }

    .slide-right-enter {
        opacity: 0;
        transform: translate3d(-100%, 0, 0);
    }

    .slide-right-leave-active {
        opacity: 0;
        transform: translate3d(100%, 0, 0);
    }

    .slide-left-enter {
        opacity: 0;
        transform: translate3d(100%, 0, 0);
    }

    .slide-left-leave-active {
        opacity: 0;
        transform: translate3d(-100%, 0, 0);
    }  */
</style>