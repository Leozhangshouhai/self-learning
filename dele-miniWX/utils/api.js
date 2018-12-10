// const baseUrl ="https://dev.abcbooking.cn:82";
// const baseUrl = "https://pro.abcbooking.cn"; // 线上
const baseUrl = "https://uat.abcbooking.cn:82";  // 测试
module.exports = {
  copponDetail: baseUrl +'/hmp_website/activity/agreementDetail.json',
  couponList: baseUrl +'/hmp_website/activity/recommenderAgreementList.json',
  getOpenId: baseUrl +'/hmp_website/activity/getWechatUserMess4MiniProgram.json',
  getCode: baseUrl +'/hmp_website/activity/recommenderReceiveCoupons.json',
  myList: baseUrl +'/hmp_website/activity/myCoupons.json',
  myDetail: baseUrl +'/hmp_website/activity/couponDetail.json'
}