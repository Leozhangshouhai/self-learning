// 操作Dom写法
import $$ from '../third-party/zepto';
let templat = `<div class="mod-loading">
                    <div class="background"></div>
                    <div class="content">
                        <div class="spin-wrap in-center">
                            <span class="loading-img"></span>
                        </div>
                        <div class="msg"></div>
                    </div>
                </div>`;
let $Loading = null;
function init() {
    if (!$Loading) {
        let $body = $$("body");
        $Loading = $$(templat).appendTo($body);
    }
}
init();

export default {
    // Vue 组件写法
    // 由于Vue组件使用时需要注册, Loading存在于每个请求中, 直接在请求时将loading插入body即可
    // @author Kongkong
    // return {
    //     template: `<div class="mod-loading" :style="style">
    //                     <div class="background"></div>
    //                     <div class="content">
    //                         <div class="spin-wrap in-center">
    //                             <span class="loading-img"></span>
    //                         </div>
    //                         <div v-html="msg" class="msg"></div>
    //                     </div>
    //                 </div>`,
    //
    //     data(){
    //         return {
    //             msg: '',
    //             style: ''
    //         };
    //     },
    //     methods: {
    //         show( msg ){
    //             if (msg) {
    //                 this.msg = msg;
    //             }
    //             this.style = {
    //                 "display": "block"
    //             }
    //         },
    //         hide(){
    //             this.style = {
    //                 "display": "none"
    //             }
    //         }
    //     }
    // };

    show () {
        $Loading[0].style.display = "block";
    },
    hide () {
        // 500毫秒后消失, 用户体验上会更好
        setTimeout(function () {
            $Loading[0].style.display = "none";
        }, 500);
    }
};