/**
 * Created by yuchuang on 2017/2/14.
 */
//改变viewport大小


var ZSH_Extent = {
    /**
     * 验证身份证
     * @returns {boolean}
     */
    isIdCardNo: function (cid) {
        var arrExp = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];//加权因子
        var arrValid = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2];//校验码
        if (/^\d{17}\d|x$/i.test(cid)) {
            var sum = 0, idx;
            for (var i = 0; i < cid.length - 1; i++) {
                // 对前17位数字与权值乘积求和
                sum += parseInt(cid.substr(i, 1), 10) * arrExp[i];
            }
            // 计算模（固定算法）
            idx = sum % 11;
            // 检验第18为是否与校验码相等
            return arrValid[idx] == cid.substr(17, 1).toUpperCase();
        } else {
            return false;
        }
    },
    /**
     * 获取url参数
     * @returns {{}}
     */
    getUrl: function () {
        var find_val = "";
        var paramJson = {};

        var search = window.location.search;
        search = search.substr(1);
        var searchs = search.split("&");

        for (var i = 0, l = searchs.length; i < l; i++) {
            var this_val = searchs[i],
                this_num = this_val.indexOf('='),
                this_key = this_val.substr(0, this_num),
                this_vals = this_val.substr(this_num + 1, this_val.length - 1);
            paramJson[this_key] = decodeURI(this_vals);
        }
        return paramJson;
    },
    /**
     * 根据条件获取url参数
     * @param param
     * @returns {string}
     */
    getParamFromUrl: function (param) {
        var find_val = "";

        var search = window.location.search;
        search = search.substr(1);
        var searchs = search.split("&");

        for (var i = 0, l = searchs.length; i < l; i++) {
            var this_val = searchs[i],
                this_keys = this_val.split("="),
                this_key = this_keys[0];

            if (this_key == param) {
                find_val = this_keys[1];
                break;
            }
        }
        return decodeURI(find_val);
    },
    /**
     * 跳转页面带参数
     * @param url
     * @param data
     */
    locationHref: function (url, data) {
        var urlData = "";
        var urlEed = "";
        if (data) {
            for (var item in data) {
                urlData += item + "=" + data[item] + "&";//key所对应的value
            }
            urlEed = urlData.substr(0, urlData.length - 1);
        }
        window.location.href = url + '?' + urlEed;
    },
    /**
     *
     * 移除空格
     * @param text
     */
    removeSpace: function (text) {
        return text.replace(/\s/g, "")
    },
    /**
     *
     * 创建弹层,
     * string 文本传入
     * */
    createLoading: function (string,error) {

        var $popup =
            $('<div id="createPopup">' +
            '<div class="popup-box">' +
            '<p class="popup-tips">'+string+'</p>' +
            '<div class="popup-make" >确&nbsp;&nbsp;&nbsp;定</div>' +
            '</div>' +
            '</div>');
        $('body').append($popup);
        $('#createPopup').find('.popup-make').on('click',function(){
           $popup.remove();
            if(error=='error'){
               self.location.href='../pages/air.html';
            }
       });

        $('#createPopup').css({
            'position': 'fixed',
            'z-index': 100,
            'left': 0,
            'right': 0,
            'top': 0,
            'bottom': 0,
            'background-color': ' rgba(0, 0, 0, .1)'
        }).find('.popup-box').css({
            'position': 'absolute',
            'width': '90%',
            'margin-left':'5%',
            'background-color':'rgba(255,255,255,.9)',
            'border-radius':'.7rem',
            'padding':'1rem 0',
            'text-align': 'center',
            'top': '45%',
            'margin-top': '-5rem'
        }).find('.popup-tips').css({
            'font-size': '2.2rem',
            'color': 'black',
            'margin-bottom': '1rem'
        }).siblings('.popup-make').css({
            'font-size': '2.2rem',
            'margin-top':'1.5rem',
            'width': '90%',
            'margin-left':'5%',
            'border-radius':'inherit',
            'background-color':'#0077DB',
            'color': 'white',
            'padding':'.8rem 0',
            'margin-bottom': '1rem'
        });


    },
    // 获取url的参数
    getPostUrl: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null)return unescape(r[2]);
            return null;
    },
    //判断是否安卓
    /*
    * TRUE 表示是安卓*/
    judgeAndroid:function () {
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
        return isAndroid;
    },
    judegeIOs:function () {
        var u = navigator.userAgent;
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        return isiOS;
    },
    /*
    * 日期比较
    * */
    judgeDate:function (a,b) {
        var arr = a.split("-");
        var starttime = new Date(arr[0], arr[1], arr[2]);
        var starttimes = starttime.getTime();

        var arrs = b.split("-");
        var lktime = new Date(arrs[0], arrs[1], arrs[2]);
        var lktimes = lktime.getTime();

        if (starttimes >= lktimes) {
            return false;
        }
        else
            return true;

    },
    /*
    时间比较
    * */
    judgeTime:function () {
        var beginTime = "2009-09-21 00:00:00";
        var endTime = "2009-09-21 00:00:01";
        var beginTimes = beginTime.substring(0, 10).split('-');
        var endTimes = endTime.substring(0, 10).split('-');
        beginTime = beginTimes[1] + '-' + beginTimes[2] + '-' + beginTimes[0] + ' ' + beginTime.substring(10, 19);
        endTime = endTimes[1] + '-' + endTimes[2] + '-' + endTimes[0] + ' ' + endTime.substring(10, 19);
        var a = (Date.parse(endTime) - Date.parse(beginTime)) / 3600 / 1000;
        if (a < 0) {
           return true
        } else if (a > 0) {
          return false
        } else if (a == 0) {
            return 'equal'
        } else {
            return 'exception'
        }
    },
    /*
    冒泡排序
    arr: 需要排序的数组
     countOrderSign： true or false  升序还是降序
     kind：对象中需要比较的属性名
     judgeFn：比较规则
    * */
    orderBy:function (arr,countOrderSign,kind,judgeFn) {
        var temp,i,j;
        if(countOrderSign){
            for (i = 0; i < arr.length; i++) {
                if(i==arr.length-1){
                    break;
                }
                for ( j = i + 1; j < arr.length; j++) {
                    if(judgeFn(arr[i][kind],arr[j][kind],countOrderSign)) {
                    } else {
                        temp = arr[i];
                        arr[i] = arr[j];
                        arr[j] = temp;
                    }
                }
            }
        }else{
            for (i = 0; i < arr.length; i++) {
                if(i==arr.length-1){
                    break;
                }
                for ( j = i + 1; j < arr.length; j++) {
                    if(judgeFn(arr[i][kind],arr[j][kind],countOrderSign)) {
                    } else {
                        temp = arr[i];
                        arr[i] = arr[j];
                        arr[j] = temp;
                    }
                }
            }
        }
    }
}




