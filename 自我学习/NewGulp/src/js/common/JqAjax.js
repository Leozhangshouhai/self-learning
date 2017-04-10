/**
 * Created by leo on 2017/1/11.
 */
//  参数：地址（必须）
//       默认post
//       接受缓存
//        默认异步
//        返回
//        成功函数


function Jqajax(json) {
    $.ajax({
        url: json.url,
        type: json.method ? json.method : "post",
        cache: true,
        async: json.async ? json.async : true,
        success:function(data){
            json.sCallback(data);
        } ,
        // 传参数是键值对
        data: json.parameters ? json.parameters : null,
        error: function (data) {
            console.log();
            console.log(data);
        }
    })
}