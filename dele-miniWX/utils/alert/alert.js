export default ((msg,success=()=>{}) => {
  wx.showModal({
    title: '提示',
    content: msg,
    showCancel:false,
    success(res) {
      if (res.confirm) {
        success();
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    }
  })
})