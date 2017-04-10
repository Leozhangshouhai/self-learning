/**
 * Created by leo on 2016/10/24.
 */
/*   注册-登陆的JS  */
// 账户清空  密码可见
var  clearText=document.getElementsByClassName("clear-text");
var num=0 ,num1=0;
clearText[0].onclick=function(){

    document.getElementsByClassName("up-text-box-middle")[0].getElementsByTagName("input")[0].value="";
};
document.getElementsByClassName("look-pwd")[0].onclick=function(){
    num++;

    if(num%2==1){
        console.log("12")
        document.getElementsByClassName("password")[0].getElementsByTagName("input")[0].type="text";
        document.getElementsByClassName("look-pwd")[0].style.color="rgba(0,0,0,.4)";
    }else{
        document.getElementsByClassName("look-pwd")[0].style.color="#001A58";
        document.getElementsByClassName("password")[0].getElementsByTagName("input")[0].type="password";
    }
};

//协议同意
document.getElementsByClassName("choose-right")[0].onclick=function(){
   num1++;
    if(num1%2==1){
        this.innerHTML="&#xe620;";
    }else{
        this.innerHTML="&#xe61a;";
    }

}