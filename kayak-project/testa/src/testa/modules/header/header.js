(function () {
    var handle, _fn, CFG, kDom, _TOUCH, temps = [],ROUTER,ajax, POP, LOADING,cgiMain;
    CFG = {
        CONTAINER_CLS: 'J_Header'
    }
    handle = {
        classname: 'testa-header',
        jView: null,
        init: function () {
            _fn.init();
            _fn.render();
            _fn.bind();
        }
    };

    _fn = {
        userCallback: function (res) {
            var user = res.data;
            handle.jView.find('.J_username').attr({
                'master': user.master,
                'data-id': user.id
            }).text(user.realname);
            _fn.render(user);
        },
        init: function () {
            handle.jView = kDom.get(handle.classname, $('.' + CFG.CONTAINER_CLS));
            this.getInfo(this.userCallback);
        },
        //渲染模块
        render: function (user) {
            var jView = handle.jView;
            jView.kInsert();
            if (user) {
                handle.jView.find('.J_username').attr({
                    'master': user.master,
                    'data-id': user.id
                }).text(user.realname);
            }
        },
        //渲染头部信息
        bind: function () {
            var jView = handle.jView;
            if (handle.hasBind) {
                return;
            }
            jView.on('click', function (e) {
                var jTarget = $(e.target);
                switch (true) {
                    case _fn.isIn(jTarget, 'J_back_out'): //点击退出
                        _fn.backOut(jTarget);
                        $('.user_drop').click();
                        break;
                    case _fn.isIn(jTarget, 'user_drop'):
                        $('.user_dropcont').toggle();
                        break;
                }
            });

            $('body').on('click', function (e) {
                var jTarget = $(e.target);
                switch (true) {
                    case !jTarget.hasClass('user_dropcont') && !jTarget.parents('.user_dropcont').length > 0 && !jTarget.hasClass('user_drop') && !jTarget.parents('.user_drop').length > 0:
                        $('.user_dropcont').hide();
                        break;
                }

            });

            handle.hasBind = true;
        },
        //退出
        backOut: function (jTarget) {
            var returnUrl = window.location.href;
            var param = {
                'userId': $('.J_username').data('id'),
                'returnUrl': returnUrl
            }
            LOADING.show();
            ajax.post(cgiMain.loginOut, param, function (res) {
                LOADING.hide();
                if (res.code + '' != '0000') {
                    var popConfig = {
                        msg: res.result,
                        btns: {
                            'ok': {
                                text: '知道了',
                                click: function () {
                                }
                            }
                        }
                    }
                    POP.show(popConfig);
                    return;
                }
                if (res.code + '' == '0000') {
                    //登出跳转页
                    //直接跳登陆页
                    ROUTER.go('#full/testa/login');
                }
            });

        },
        //判断是否是查找元素
        isIn: function (jTarget, cls) {
            if (jTarget.hasClass(cls) || jTarget.parents('.' + cls).length > 0) {
                return true;
            }
            return false;
        },
        //获取用户数据
        getInfo: function (callback) {
            //todo---------------------------
            var url = cgiMain.getUserInfo;
            LOADING.show();
            ajax.post(url, {}, function (res) {
                LOADING.hide();
                if (res.code + '' != '0000') {
                    var popConfig = {
                        title: '',
                        msg: res.result,
                        html: '',
                        btns: {
                            'ok': {
                                text: '知道了',
                                click: function () {
                                }
                            }
                        },
                        onClickMask: function () {
                        }
                    }
                    POP.show(popConfig);
                    return;
                }
                if (res.code + '' == '0000') {
                    if (typeof callback == 'function') {
                        callback(res);
                    }
                }
            });
        }
    };
    define('testa/modules/header/header', function (require, exports, module) {
        require('testa/modules/header/header.css');
        require('testa/modules/header/header.tpl');

        //公用组件
        POP = cabin.widgets.pop;
        LOADING = cabin.widgets.loading;
        ajax = require('testa/common/data/ajax');
        cgiMain = require('testa/config/apimix');
        ROUTER = kayak.router;
        kDom = kayak.dom;
        _TOUCH = ('ontouchend' in document) ? 'touchstart' : 'click';
        module.exports = handle;
    });
})();
