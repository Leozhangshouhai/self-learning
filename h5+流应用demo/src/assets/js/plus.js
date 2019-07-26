export  default {
    full_video(){
        var fullScreenOfAndroid = function () {
            if (true) {
                // 最新5+API的支持
                var self = plus.webview.currentWebview();
                self.setStyle({
                    videoFullscreen: 'landscape'
                });
            } else {
                // 如果暂未更新sdk，可以先使用差量升级等方式，做出兼容处理；
                // 旧版本下的兼容处理
                document.addEventListener('webkitfullscreenchange', function () {
                    var el = document.webkitFullscreenElement; //获取全屏元素
                    if (el) {
                        plus.screen.lockOrientation('landscape'); //锁死屏幕方向为横屏
                    } else {
                        plus.screen.unlockOrientation(); //解除屏幕方向的锁定
                    }
                });

            }
        };
        // iOS平台的视频全屏旋转
        var fullScreenOfIos = function (videoElem) {
            // 监听的事件与Android平台有很大区别
            videoElem.addEventListener('webkitbeginfullscreen', function () {
                plus.screen.lockOrientation('landscape'); //锁死屏幕方向为横屏
            });
            videoElem.addEventListener('webkitendfullscreen', function () {
                plus.screen.unlockOrientation(); //解除屏幕方向的锁定
            });
        };
        var osName = plus.os.name;
        plus.device.setWakelock(true);
        if (osName === 'Android') {
            fullScreenOfAndroid();
        } else if (osName === 'iOS') {
            var videoElem = document.getElementById('video');
            fullScreenOfIos(videoElem);
        }
    }
}