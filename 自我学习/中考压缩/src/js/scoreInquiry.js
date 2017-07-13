$(function(){
    $(".input_error").html("");
    $(".input_btn").on("click",function(){
        var _Name = $(".user_name").val();
        var _Id = $(".user_num").val();
        
        $("#input_btn").attr("disabled",true).css({
            background: '#a0cccc',
            color: '#81a4a4'
        });
        
        setTimeout(function(){
            $("#input_btn").attr("disabled",false).css({
                background: '#1eb6b7',
                color: '#fff'
            });
        },2000)
        init(_Name,_Id);

    });

    hideshow($(".input_box").find("input"));
    clear();

})
 
//输入框删除按钮
function hideshow(ele){
    var len = ele.length;
    ele.each(function(index, el) {
        $(this).bind("focus",function(){
            $(this).parent().find(".delet").show();
        });
        $(this).bind("blur" ,function(){
            if($(this).val()===""){
            var thisInput = $(this)
                setTimeout(function(){
                    thisInput.parent().find(".delet").hide(300);
                },300)
            }
        })
    });
}
//清空输入框内容
function clear(){
    $(".delet").on("click",function(){
        $(this).parent().find("input").val("");
        $(this).hide(300);
    })
}




function init(userName,userId){
    var appid = "BAS5-520100-0001";
    var appkey = "02e45ae192526ce470d8352e7403134a92526ce470d8352e";
    var body = {"name":encodeURI(userName),"entry_no":userId};
    /*console.log(body);*/
    var b = new Base64();
    var sign = encrypt_string(appkey, hex_md5(b.encode(appid + JSON.stringify(body))));
    var accessTicket = "7226aa8ee4ea432bb34bcbd9a1cb118b";
    var version = "2.0";
    var req = {
        "body": body,
        "head": {
            "sign": sign,
            "accessTicket": accessTicket,
            "appid": appid,
            "version": version
        }
    };

    $.ajax({
        url: "http://www.zhuminsheng.com/middleexam/service/ST0001",
        contentType: "application/json; charset=utf-8",
        type: "post",
        dataType : "json",
        data : JSON.stringify(req),
        success : initpagecallback
    });
}
function initpagecallback(result){
   /* console.log(JSON.stringify(result));*/
    
    if(result.body.has){

        window.location.href = "scoreInfo.html";
        /*console.log("有数据");*/
        var stuInfo = result.body.student;
        /*console.log(stuInfo.entry_no);*/
        if(stuInfo.transfer_student==""){
            stuInfo.transfer_student = "否"
        }
        var userInfo = [
            {"data":stuInfo.entry_no,"name":"考生号"},
            {"data":stuInfo.student_name,"name":"姓名"},
            {"data":stuInfo.area,"name":"所在地区"},
            {"data":stuInfo.student_type,"name":"考生类别"},
            {"data":stuInfo.transfer_student,"name":"是否转校生"}
        ];
        /*console.log(userInfo[0].data);*/
        //中考成绩
        var total_score = stuInfo.total_score;//总分
        var stuScore = [
            {"data":stuInfo.chinese_score,"name":"语文"},
            {"data":stuInfo.math_score,"name":"数学"},
            {"data":stuInfo.english_score,"name":"英语"},
            {"data":stuInfo.physical_score,"name":"理化"},
            {"data":stuInfo.sports_score,"name":"体育"},
            {"data":stuInfo.arts,"name":"文综"},
            {"data":stuInfo.science,"name":"地生"},
            {"data":stuInfo.plus_score,"name":"政策加分"}
        ];
        
        for(var i = 0 ; i < stuScore.length; i++){
            if(stuScore[i].data == "NULL"){
                stuScore[i].data = "暂无"
            } 
        }

        //毕业考评成绩
        /*var stuScoreLevel = [stuInfo.chinese,stuInfo.math,stuInfo.english,stuInfo.politics,stuInfo.history,stuInfo.physical,stuInfo.chemistry,stuInfo.geography,stuInfo.biology,stuInfo.sports,stuInfo.music,stuInfo.painting,stuInfo.activity];*/
        var stuScoreLevel = [
            {"data":stuInfo.chinese,"name":"语文"},
            {"data":stuInfo.math,"name":"数学"},
            {"data":stuInfo.english,"name":"英语"},
            {"data":stuInfo.politics,"name":"政治"},
            {"data":stuInfo.history,"name":"历史"},
            {"data":stuInfo.physical,"name":"物理"},
            {"data":stuInfo.chemistry,"name":"化学"},
            {"data":stuInfo.geography,"name":"地理"},
            {"data":stuInfo.biology,"name":"生物"},
            {"data":stuInfo.music,"name":"音乐"},
            {"data":stuInfo.painting,"name":"美术"},
            {"data":stuInfo.sports,"name":"体育与健康"},
            {"data":stuInfo.activity,"name":"综合实践"},
        ];

        for(var i = 0 ; i < stuScoreLevel.length; i++){
            if(stuScoreLevel[i].data == "NULL"){
                stuScoreLevel[i].data = "暂无"
            } 
        }
        //综合素质评价
        var synLevel = [
            {"data":stuInfo.moral,"name":"道德品质"},
            {"data":stuInfo.accomplishment,"name":"公民素质"},
            {"data":stuInfo.learning,"name":"学习能力"},
            {"data":stuInfo.exchange,"name":"交流与合作"},
            {"data":stuInfo.health,"name":"运动与健康"},
            {"data":stuInfo.taste,"name":"审美与表现"}
        ];

        for(var i = 0 ; i < synLevel.length; i++){
            if(synLevel[i].data=='NULL'){
                synLevel[i].data = "暂无"
            }
            console.log(synLevel[i]);
        }

        //存数据
        localStorage.setItem("total_score", total_score);
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        localStorage.setItem("stuScore", JSON.stringify(stuScore));
        localStorage.setItem("synLevel", JSON.stringify(synLevel));
        localStorage.setItem("stuScoreLevel", JSON.stringify(stuScoreLevel));
    }else{
        $(".input_error").html("您输入的报名号或者姓名有误，请重新输入");
        $(".input_error").show(500);
        setTimeout(function(){
            $(".input_error").hide(500);
        },2000)
    }      
}


