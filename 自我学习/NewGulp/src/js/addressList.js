/**
 * Created by leo on 2017/6/5.
 */

$(function () {
    $('#container').css('visibility','visible')
    var data = {
        isdefaultImg: ['../img/air/address-01.png', '../img/air/air-info-3.png'],
        addressinfo: [
            /*    {
             id: '',
             name: '时李明',
             phone: '13661801507',
             address: '浙江省绍兴市盛世命运3期3运3期31栋一单元901室浙江省绍兴市盛世命运3期3运3期31栋一单元901室',
             isdefault: true,
             orderNum: 1,
             img: '../img/air/address-01.png'
             },
             {
             id: '',
             name: '挑剔',
             phone: '13661801507',
             address: '浙江省绍兴市盛世命运3期3运3期31栋一单元901室浙江省绍兴市盛世命运3期3运3期31栋一单元901室',
             isdefault: false,
             orderNum: 2,
             img: '../img/air/air-info-3.png'
             },
             {
             id: '',
             name: '理事国',
             phone: '13661801507',
             address: '浙江省绍兴市盛世命运3期3运3期31栋一单元901室浙江省绍兴市盛世命运3期3运3期31栋一单元901室',
             isdefault: false,
             orderNum: 2,
             img: '../img/air/air-info-3.png'
             }*/
        ],
        controller: true
    };
    var info = {
        getddressList: {
            url: 'http://101.37.32.245/hmp_website/user/addresslist.json',
            parameters: {},
            success: function (success) {
                console.log(success);
                if (success.head.rtnCode === '000000') {
                    // 成功获取列表
                    success.body.forEach(function (e,index) {
                        e.init=false;
                        if(e.isdefault){
                            e.init=true;
                        };
                    })
                    data.addressinfo =success.body
                } else {
                    //  其他情况
                }
            },
            error: function (error) {
                console.log(error);
                // 业务异常
                ZSH_Extent.createLoading(error.head.rtnMsg)
            }
        },
        deleteAddress: {
            url: 'http://101.37.32.245/hmp_website/user/deleteaddress.json',
            parameters: {
                id: ''
            },
            success: function (success) {
                console.log(success);
                if (success.head.rtnCode === '000000') {
                    //地址删除过后 从新进行请求
                    Ajax_json(info.getddressList, changeIp);
                } else {
                    //  其他情况
                }
            },
            error: function (error) {
                console.log(error);
                // 业务异常
                ZSH_Extent.createLoading(error.head.rtnMsg)
            }
        },
        setInitAddress: {
            url: 'http://101.37.32.245/hmp_website/user/setdefaultaddress.json',
            parameters: {
                id: ''
            },
            success: function (success) {
                console.log('默认地址');
                console.log(success);
                if (success.head.rtnCode === '000000') {
                    //地址删除过后 从新进行请求
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


    }
    function changeIp(hmp_website_Ip) {
        info.getddressList.url = hmp_website_Ip + 'hmp_website/user/addresslist.json';
        info.deleteAddress.url = hmp_website_Ip + 'hmp_website/user/deleteaddress.json';
        info.setInitAddress.url = hmp_website_Ip + 'hmp_website/user/setdefaultaddress.json';
    };
    Ajax_json(info.getddressList, changeIp);
    var address = new Vue({
        el: '#container',
        data: data,
        methods: {
            controllerClick: function () {
                //  控制器
                this.controller = !this.controller;
                this.addressinfo.forEach(function (e, index) {
                    e.init = !data.controller;
                })

            },
            chooseInit: function (num) {
                var Iindex = num;
                this.addressinfo.forEach(function (e, index) {
                    e.orderNum = 2;
                    // e.init=false;
                    e.isdefault=false;
                    if (index === Iindex) {
                        e.orderNum = 1;
                        e.isdefault=true;
                    };
                });
                console.log(num+'  -------------');
                info.setInitAddress.parameters.id=data.addressinfo[num].id;
                this.addressinfo = _.orderBy(this.addressinfo, 'orderNum', 'ase');
                Ajax_json(info.setInitAddress, changeIp)
                //    向服务器发送请求，改变现有的状态 index
            },
            deleteAddress: function (num) {
                ZSH_Extent.createCanleOrSure('确认删除该地址', '', function () {
                    info.deleteAddress.parameters.id=data.addressinfo[num].id;
                    Ajax_json(info.deleteAddress, changeIp)
                })
            },
            editAddress:function (num) {
                self.location.href='../pages/addNewAddress.html?addressId='+data.addressinfo[num].id;
            },

        }
    });
    $('.header-return-special').on('click',function(){
        self.location.href='../pages/air_info_confirm.html?sign=special'
    });
})