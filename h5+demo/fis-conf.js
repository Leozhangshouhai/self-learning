var deployConfig = {
  dev: '/var/www/www/www',
  only:'/var/www/www/invited'
}

// 服务器接收文件配置
var RECEIVER = 'http://118.24.159.253:7089/receiver.php';
const TARGET_PATH = '/var/www/www/www';

/********************************** 目录规范及发布配置 **********************************/

// 调试配置
for (var i in deployConfig) {
  let pushTargetPath = deployConfig[i];
  let deployConf = {
    receiver: RECEIVER,
    to: pushTargetPath
}

  fis.media(i)
      .match('/**', {
          useHash: false,
          isMod: false,
          release: `$0`,
          deploy: [
              fis.plugin('http-push', deployConf)
          ]
      })
    /* .match('projects/*', {
        useHash: false,
        isMod: false,
        release: `$0`,
        deploy: [
            fis.plugin('http-push', deployConf)
        ]
    })
    .match('server/*', {
        useHash: false,
        isMod: false,
        release: `$0`,
        deploy: [
            fis.plugin('http-push', deployConf)
        ]
    })
    .match('share/*', {
        useHash: false,
        isMod: false,
        release: `$0`,
        deploy: [
            fis.plugin('http-push', deployConf)
        ]
    }) 
    //字体文件
    .match('gitbook/fonts/(**).{eot,svg,ttf,woff,woff2,otf}', {
        useHash: false,
        isMod: false,
        release: `$0`,
        deploy: [
            fis.plugin('http-push', deployConf)
        ]
    })
    //js\css
    .match('gitbook/(**).{js,css}', {
        useHash: false,
        isMod: false,
        release: `$0`,
        deploy: [
            fis.plugin('http-push', deployConf)
        ]
    })
    //images
    .match('gitbook/(**).{ico,png,jpg}', {
        useHash: false,
        isMod: false,
        release: `$0`,
        deploy: [
            fis.plugin('http-push', deployConf)
        ]
    })  */
}


// 忽略编译文件
fis.set( 'project.ignore', [
    '/fis-conf.js',
  ] );