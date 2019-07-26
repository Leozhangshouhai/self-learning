// 此处命名不规范。。

import {Toast, Indicator,MessageBox} from "mint-ui"
// let BASEURL='http://118.24.159.253:8081';
let BASEURL='';
let urls={ 
    get_notice:'user/center/getNotice/',// 强行弹窗
    get_config:'index/index/conf/',
    getCoinList:'user/center/getCoinList/',//获取估值
    hasBuyList:'user/found/hasBuyFoundList/',//购买记录
    getWalletList:'user/wallet/getWalletList/',//体现记录
    cancelQua:'user/found/cancelQua/',// 取消活期基金
    getAddressQrCode:'user/center/getAddressQrCode/',//ETH 二维码
    importByPrivateKey:'user/center/importByPrivateKey/',//ETH 钱包导入
    isNewUser:'user/center/isNewUser/',//私钥检测是否是新用户
    discover:'user/center/discover/',//发现列表
    getQuotesList:'user/center/getQuotesList/',// 行情列表
    getIndexQuotesList:'user/center/getIndexQuotesList/',// 首页列表
    getMyInvite:'user/center/getMyInvite/',//获取邀请人数相关信息
    spreadIncome:'user/wallet/spreadIncome/',//推广收益
    invitedRegister:'user/wallet/invitedRegister/',//邀请注册
    spreadIncomeAll:'user/wallet/spreadIncomeAll/',// 邀请收益
    charge:'user/wallet/charge/',// 查询ETH
    foundincome:'user/wallet/foundincome/',//投资收益
    withdraw:'user/wallet/withdraw/',//ETH提现
    buyPackages:'user/found/buyFound/',//购买基金
    getRichPackages:'user/found/packageList/',//获取购买的ETH列表
  
    getSelfCode:'user/center/getInviteQrCode/',//获取二维码
    getBanner:'user/center/getbanner/',//获取banner
    invitedNumber:'user/center/getInvitedList/',// 邀请注册人数
    getUserInfo:'user/center/getmyinfo/',//获取用户信息
    dailySign:'user/center/sign/' ,//每日签到
    outLogin:'user/center/loginout/',//退出登录
    getsalt:'user/center/getsalt/',//获取salt接口
    exchange:'user/center/exchange/',//币种兑换接口
    transaction:'user/center/transaction/',//内部划转
    getProperty:'user/center/getProperty/',//财产占比
    setPayPasswd:'user/center/updateUserPayPasswd/',//设置支付密码
    setPasswordFirst:'user/center/setPasswordFirst/',// 设置交易密码
    getMyInfo:'user/center/getMyInfo/',//获取用户信息
    updatePassword:'user/center/updatePassword/',//恢复后更新密码
   recoveAccout:'user/center/recoverAccount/',//恢复账户
   login:'user/center/login/' ,//登录
   register:'user/center/register/' ,//注册
   getVarify:'user/center/getVarify/' ,//获取图形验证码
}
if(BASEURL!=''){
    for(var x in urls){
        urls[x]=BASEURL +urls[x];
    };
}
export default  urls;