!function(n){
  var  e=n.document,
    t=e.documentElement,
    i=700,
    d=i/100,
    o="orientationchange"in n?"orientationchange":"resize",
    a=function(){
      var n=t.clientWidth||320;n>700&&(n=700);
      t.style.fontSize=n/d+"px"
    };
  e.addEventListener&&(n.addEventListener(o,a,!1),e.addEventListener("DOMContentLoaded",a,!1))
}(window);
