/*
 * @description: 响应式布局JS
 * @author: 郑小芳
 * @update: 郑小芳 (2016-09-20)
 */
!(function(win, doc){
    function setFontSize() {
        var winWidth =  document.documentElement.clientWidth;
        doc.documentElement.style.fontSize = (winWidth / 750) * 100+ 'px' ;  //1rem=100
    }
    var evt = 'onorientationchange' in win ? 'orientationchange' : 'resize';
    var timer = null;
    win.addEventListener(evt, function () {
        clearTimeout(timer);
        timer = setTimeout(setFontSize, 300);
    }, false);
    win.addEventListener("pageshow", function(e) {
        if (e.persisted) {
            clearTimeout(timer);
            timer = setTimeout(setFontSize, 300);
        }
    }, false);
    setFontSize();
}(window, document));
function setfont (doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function () {
      var clientWidth = docEl.clientWidth;
      if (!clientWidth) return;
      docEl.style.fontSize = 10*10* (clientWidth / 750) + 'px';
    };
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);

}
window.onload=setfont(document, window);
/**
 *
 * 头部公用部分函数
 *
 */
var common={
  head:function(){
    $('.header-return').click(function(){
      window.history.back();
    })
  }
};
$(function(){
  common.head();
});