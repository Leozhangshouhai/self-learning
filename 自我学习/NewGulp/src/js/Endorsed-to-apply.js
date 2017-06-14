/**
 * Created by leo on 2017/5/4.
 */

var data = {
    Endorsed_selected: '',
    selected: 'selected',
    refund_disable: false,
    refund_disable_sonchoose: false,
    isActive: true,
    isActive2: false,
    isClick: false,
    // 改签原因
    list: [],
    // 退票原因
    refundList: [],
    refunListChoose: false
};
Vue.component('sure-btn', {
    template: '' +
    '<div class="make-sure-pay-box" >' +
    '<button class="make-sure-pay" :disabled="disable" :class="selected" @click="someClick">确&nbsp;&nbsp;&nbsp;&nbsp;定</button>' +
    '</div>',
    props: ['selected', 'disable'],
    methods: {
        someClick: function () {
            this.$emit('refund_click');
        }
    }
})
var container = new Vue({
    el: '#container',
    data: data,
    computed: {
        computedIsActive: function () {
            return !this.isActive
        }
    },
    methods: {
        chooseTitle: function (event) {
            if (event.target.className === '') {
                if (this.isActive === true && this.isActive2 === false) {
                    //点击其他原因
                    if (this.refund_disable_sonchoose) {
                        this.refund_disable = true;
                    } else {
                        this.refund_disable = false;
                    }
                    this.isActive = false;
                    this.isActive2 = true;
                    this.refunListChoose = true;
                    if (this.isClick) {
                        this.selected = 'selected'
                    } else {
                        this.selected = '';
                    }
                } else {
                    //点击自愿退票
                    this.refund_disable = false;
                    getJson.send_refund.parameters.applyForReason = '【旅客自愿退票】：已取消PNR编码；已作废行程单';
                    this.isActive = true;
                    this.isActive2 = false;
                    this.refunListChoose = false;
                    this.selected = 'selected'
                }
            }
        },
        refund_click: function () {
            getJson.send_refund.parameters.outticketorderid = ZSH_Extent.getPostUrl('yiorderid');
            Ajax_json(getJson.send_refund, changeIp)
        },
        endorse_click: function () {
            WebViewJavascriptBridge.callHandler('airPlaneChanged', {'yiorderid': ZSH_Extent.getPostUrl('yiorderid')}, function (response) {

            })
        }
    },
    components: {
        'my-li': {
            template: '<div class="my-li-box" >' +
            '<div @click="my_li" :id="index"><img :src="src" class="my-li-img" :id="index" > ' +
            '<label  :for="index" class="my-li-p" >{{ text}}</label>' +
            ' </div> </div>  ',
            props: ['text', 'index'],
            data: function () {
                return {
                    src: '../img/air/air-info-3.png',
                }
            },
            methods: {
                my_li: function (even) {
                    even.stopPropagation();
                    $('.my-li-img').attr('src', '../img/air/air-info-3.png');
                    $(even.target).parent().find('.my-li-img').attr('src', '../img/air/air-info-2.png');
                    getJson.send_refund.parameters.applyForReason = this.text;  //非自愿退票原因
                    container.refund_disable_sonchoose = true;//btn 解除禁止
                    container.refund_disable = false;//btn 解除禁止
                    container.selected = 'selected';
                    container.Endorsed_selected = 'selected';
                    container.isClick = true;
                    if ($('.header-chufa').attr('id')==='endorsed') {
                       if($(even.target).attr('id') || $(even.target).attr('for')){
                      var reasonId=$(even.target).attr('id') || $(even.target).attr('for');
                       //     本地存储改签原因,用于改签流程中的 改签确认页面
                           Storage.set('endorsedReason',data.list[reasonId])
                       }
                    }

                },
            }
        }
    }
});
var getJson = {
    get_endorsed: {
        url: 'http://118.178.225.32/hmp_website/yiplain/getrefundticketreason.json',
        parameters: {
            'type': '3'
        },
        success: function (databack) {
            console.log(databack);
            data.list = databack.body.list;
            $('#container').show();
        }
    },
    get_refund: {
        url: 'http://118.178.225.32/hmp_website/yiplain/getrefundticketreason.json',
        parameters: {
            'type': '1',
            // 'id':'JP2017042416301493022638034384'
        },
        success: function (databack) {
            data.refundList = databack.body.list;
            $('#container').show();
        }
    },
    send_refund: {
        url: 'http://118.178.225.32/hmp_website/yiplain/refundticketapply.json',
        parameters: {
            'applyForType': '1',
            'outticketorderid': 'JP2017042416301493022638034384',
            'applyForReason': '【旅客自愿退票】：已取消PNR编码；已作废行程单'
            // 'id':'JP2017042416301493022638034384'
        },
        success: function (data) {
            if (data.head.rtnCode === '000000') {
                // 退票成功，返回机票入口页
                ZSH_Extent.createLoading('退票已成功', 'index');
            } else {
                //  其他情况
            }
        },
        error: function (error) {
            console.log(error);
            // 业务异常
            ZSH_Extent.createLoading(error.head.rtnMsg)
        }
    }
};

$(function () {
    Ajax_json(getJson.get_endorsed, changeIp);
    Ajax_json(getJson.get_refund, changeIp);
    $('.header-return').on('click', function () {
        history.go(-1);
    });
});
function changeIp(hmp_website_Ip) {
    getJson.get_endorsed.url = hmp_website_Ip + 'hmp_website/yiplain/getrefundticketreason.json';
    getJson.get_refund.url = hmp_website_Ip + 'hmp_website/yiplain/getrefundticketreason.json';
    getJson.send_refund.url = hmp_website_Ip + 'hmp_website/yiplain/refundticketapply.json';
}
