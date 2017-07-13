/*
 * @description: 响应式布局JS
 * @author: 郑小芳
 * @update: 郑小芳 (2016-09-20)
 */
!(function(win, doc){
    function setFontSize() {
        var winWidth =  document.documentElement.clientWidth;
        doc.documentElement.style.fontSize = (winWidth / 320) * 20+ 'px' ;  //1rem=20px
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
	var _hmt = _hmt || [];
    (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?691818e6d3480fce78d46fe8e20ab722";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
    })();
}(window, document));
