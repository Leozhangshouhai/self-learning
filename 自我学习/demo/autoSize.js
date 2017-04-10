/*
 * @description: 响应式布局JS
 */
!(function(win, doc){
    function setFontSize() {
        var winWidth =  window.innerWidth;
        doc.documentElement.style.fontSize = (winWidth / 640) * 10 *1.5 + 'px' ;
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