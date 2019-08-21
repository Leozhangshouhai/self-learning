// 此处命名不规范。。

import store from "@/store";
import fly from "@/assets/js/linyer";
import Vue from 'vue';
import {
    Toast,
    Indicator,
    MessageBox
} from "mint-ui";
import axios from "axios";
import api from '@/assets/js/api.js';
import html2canvas from "html2canvas"
Vue.component(Toast.name, Toast);
// 需要显示底部nav-bar的路径，匹配对应mint-nav-bar的id
export const INDEXLISTS=['/index','/adIndex','/quotation', '/discover', '/register', '/wealth'];

export const setNactiveTopColor = function (color = '#fffffe') {
    window.plus && plus.navigator.setStatusBarBackground(color);
}
export const CHECKISBLANK = function (res, my_session = '') {
    store.state.userInfo = res;
    fly.localStore('my_userInfo', res);
    my_session && fly.localStore('my_session', my_session);
    store.state.is_login = true;
}
export const TODECIMAL2 = function (x, limit = 4) {
    let s = Number(x).toFixed(limit);

    return s;
}
export const ISBUILDING = function (tip = "敬请期待...", time = 3000) {
    Toast({
        message: tip,
        position: 'top',
        duration: time
    })
}
export const COPYFN = function (tip = "复制成功，快去分享吧", time = 3000) {
    Toast({
        message: tip,
        position: 'top',
        duration: time
    })
    setTimeout(() => {
        window.location.href = 'weixin://'
    }, 1400)
}
export const SETUSERINFO = function (res, my_session = '') {
    store.state.userInfo = res;
    console.log(res)
    fly.localStore('my_userInfo', res);
    my_session && fly.localStore('my_session', my_session);
    store.state.is_login = true;
    store.state.my_session = my_session;
}
export const REMOVEUSERINFO = function (res) {
    localStorage.removeItem('my_session');
    localStorage.removeItem('my_userInfo');
    store.state.is_login = false;
}

export const CONFIRM = function (_obj = {

}) {
    _obj = Object.assign({
        msg: '操作成功',
        title: '提示',
        showCancelBtn: false,
        cancelButtonText: '取消',
        btnTextArr: ['确认']
    }, _obj);
    return new Promise(resolve => {
        mui.confirm(_obj.msg, _obj.title, _obj.btnTextArr, function(e) {
            if (_obj.btnTextArr.length > 1) {
                if (e.index == 1) {
                    resolve({
                        e: e,
                        msg: 'sure'
                    });
                } else {
                    resolve({
                        e: e,
                        msg: 'fail'
                    });
                }
            } else {
                resolve({
                    e: e,
                    msg: 'sure'
                });
            }
        })
        // if (window.plus) {
        //     if (!_obj.showCancelBtn) {
        //         _obj.btnTextArr = ['确认'];
        //     }
        //     plus.nativeUI.confirm(_obj.msg, function (e) {
        //         if (_obj.btnTextArr.length > 1) {
        //             if (e.index == 1) {
        //                 resolve({
        //                     e: e,
        //                     msg: 'sure'
        //                 });
        //             } else {
        //                 resolve({
        //                     e: e,
        //                     msg: 'fail'
        //                 });
        //             }
        //         } else {
        //             resolve({
        //                 e: e,
        //                 msg: 'sure'
        //             });
        //         }

        //     }, {
        //         "title": _obj.title,
        //         "buttons": _obj.btnTextArr,
        //     });
        // } else {
        //     MessageBox({
        //         title: _obj.title,
        //         message: _obj.msg,
        //         closeOnClickModal: false,
        //         showCancelButton: _obj.showCancelBtn,
        //         cancelButtonText: _obj.showCancelBtn ? _obj.cancelButtonText : _obj.showCancelBtn,
        //     }).then(res => {
        //         if (res == 'confirm') {
        //             resolve({
        //                 e: res,
        //                 msg: 'sure'
        //             });
        //         } else {
        //             resolve({
        //                 e: res,
        //                 msg: 'fail'
        //             });
        //         }
        //     });
        // }
    }, reject => {

    })


}
export const html2canvasImg = function (Dom) {
    return new Promise((resolve, reject) => {
        let _url = '';
        html2canvas(Dom).then(canvas => {
            console.log(canvas)
            let dataURL = canvas.toDataURL("image/png");
            _url = dataURL;
            if (_url !== "") {
                resolve(_url)
            } else {
                reject(_url)
            }

        });
    })
};
export const DOWNIMG = (_url) => {
    Indicator.open('下载中...');
    return new Promise((resolve, reject) => {
        var downLoader = plus.downloader.createDownload(_url, {
            method: 'GET',
            filename: `_downloads/image${parseInt(Math.random()*10)}.png`
        }, function (download, status) {
            var fileName = download.filename;
            console.log('文件名:' + fileName);
            console.log('下载状态：' + status);
            plus.gallery.save(fileName, function () {
                mui.toast('保存成功');
                Indicator.close();
                // mui.confirm("打开相册", "打开相册？", ["打开", "不看"], function (event) {
                //     var gindex = event.index;
                //     if (gindex == 0) {
                //         plus.gallery.pick(function (file) {
                //             mui.toast("你选择了图片：" + file);
                //         }, function (error) {
                //             console.log(error);
                //         }, {
                //             filter: 'image'
                //         });
                //     }
                // });
                resolve(fileName)
            }, function () {
                Indicator.close();
                mui.toast('保存失败，请重试！');
            });
        });
        downLoader.start();
    })

}