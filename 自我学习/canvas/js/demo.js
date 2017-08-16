/**
 * Created by leo on 2017/8/15.
 */
var c=document.getElementById("myCanvas");
var cxt=c.getContext("2d");
// //   画一个矩形
cxt.fillStyle="#FF0000";
cxt.fillRect(10,10,50,50);//x,y,w,h

//  画一条线,画布足够大的时候，可以随意绘画
cxt.lineWidth=10;
cxt.strokeStyle ="#005320";
cxt.moveTo(10,10);
cxt.lineTo(10,60);
cxt.lineTo(60,60);
cxt.lineTo(60,10);
cxt.lineTo(10,10);
cxt.stroke();
//  画一个圆
cxt.moveTo(30,30);
cxt.beginPath();
cxt.fillStyle="#ECD407";
//圆的x,y,r,起始角度，结束角度，顺时针还是逆时针
cxt.arc(75,20,15,0,Math.PI*2,true);
cxt.closePath();
cxt.fill();
// 渐变--线性渐变，放射性渐变，自定义渐变，指定方向渐变(图形填充)
/*
 1-线性--- createLinearGradient(x0,y0,x1,y1)
 2-放射性---createRadialGradient(x0,y0,r0,x1,y1,r1)
 3-自定义-- addColorStop(stop,color)
 4-指定方向--createPattern(img,"repeat|repeat-x|repeat-y|no-repeat")
 */

  var i=0,
    grd=cxt.createLinearGradient(100*(i+1),0,100*(i+1)+80,50);
  grd.addColorStop(0,"#FF0000");
  grd.addColorStop(1,"#00FF00");
  cxt.fillStyle=grd;
  cxt.fillRect(100*(i+1),0,100*(i+1)+80,100*(i+1)+80);


 grd=cxt.createRadialGradient(120,250,5,150,280,60);        //创建放射状/环形的渐变（用在画布内容上）
grd.addColorStop(0,"green");                                //规定渐变对象中的颜色和停止位置
grd.addColorStop(0.5,"red");
grd.addColorStop(1,"white");
cxt.fillStyle=grd;
cxt.fillRect(120,250,150,100);

 var img=document.getElementById("pic");
  var  pat=cxt.createPattern(img,'no-repeat');
   cxt.fillStyle=pat;

   cxt.font='30px 微软雅黑';
   cxt.stokeStyle='yellow';
   cxt.lineWidth=4;
      cxt.fillStyle='red';
   cxt.fillText('我已经醒了',400,400);
   cxt.strokeText('还有45分钟',200,200);

function convertCanvasToImage(canvas) {
  var image = new Image();
  image.src = canvas.toDataURL("image/png");
  return image;
}
var img=convertCanvasToImage(c);
document.getElementById("pic").src=img.src;