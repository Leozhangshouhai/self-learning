module.exports = function (grunt) {
  const Sass = require('node-sass');
  grunt.initConfig({
    cabinVersion: "2.0.0", //打包版本，服务器判断版本使用
    //是否需要服务器自动打包,默认false
    //需要请联系测试和运维同学同步修改服务器端
    serverAutoGrunt: false, //是否需要服务器自动打包
    pkg: grunt.file.readJSON('package.json'),
    // 压缩JS代码
    uglify: {
      options: {
        mangle: {
          except: ['require']
        },
        compress: {
          drop_console: true //删除全部console信息
        }
      },
      compressJs: {
        files: [{
          expand: true,
          cwd: 'src',
          src: '**/*.js',
          dest: 'dist'
                }]
      },
    },
    cssmin: {
      options: {
        process: function (content, srcpath) {
          return content.replace(/[sad ]/g, '_');
        }
      },
      target: {
        files: [{
          expand: true,
          cwd: 'src',
          src: '**/*.css',
          dest: 'dist'
                }]
      }
    },
    htmlmin: {
      dist: {
        options: {
          removeComments: true, //清除HTML注释
          collapseWhitespace: true, //压缩HTML
          collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input />
          removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
          removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
          removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
          minifyJS: true, //压缩页面JS
          minifyCSS: true //压缩页面CSS
        },
        files: [{
          expand: true,
          cwd: 'src',
          src: '**/*.tpl',
          dest: 'dist'
                }]
      }
    },
    // 压缩css代码
    cssmin: {
      options: {
        process: function (content, srcpath) {
          return content.replace(/[sad ]/g, '_');
        }
      },
      target: {
        files: [{
          expand: true,
          cwd: 'src',
          src: '**/*.css',
          dest: 'dist'
        }]
      }
    },
    /* scss */
    sass: {
      options: {
        implementation: Sass,
        sourceMap: false
      },
      dist: {       
        files: [{
          expand: true,
          cwd: 'src',
          src: ['testa/**/*.scss'],
          dest: 'src',
          ext: '.css'
            }]
      }
    },
    /*scss动态编译*/
    watch: {
      //src/项目名 目录下的scss
      css: {
        files: ['src/testa/**/*.scss'],
        tasks: ['sass', 'autoprefixer:src'],
        options: {
          spawn: false
        }
      },
      //src/项目名/pages 目录下的.vue
      //src/项目名 目录下的.jq
      scripts: {
        files: ['src/testa/pages/**/*.vue', 'src/testa/**/*.jq'],
        options: {
          spawn: false
        }
      },
      //src/项目名/pages 目录下的.tpl
      tpl: {
        files: ['src/testa/pages/**/*.tpl'],
        options: {
          spawn: false
        }
      },
    },
    // 清理字符
    copy: {
      html: {
        files: [
          {
            expand: true,
            cwd: 'src',
            src: ['**/*.{html,htm,eot,ttf,woff}'],
            dest: 'dist'
          }
        ]
      },
      image: {
        files: [
          {
            expand: true,
            cwd: 'src',
            src: ['**/*.{png,jpg,jpeg,gif,webp,svg,ico,mp3}'],
            dest: 'dist'
          }
        ]
      },
      // 替换css内部图片地址
      fixCss: {
        expand: true,
        cwd: 'dist',
        src: ['**/*.css'],
        dest: 'dist',
        options: {
          process: function (content, srcpath) {
            return content.replace(/\/src\//g, '/dist/');
          }
        }
      },
      fixJs: {
        expand: true,
        cwd: 'dist',
        src: ['**/*.js'],
        dest: 'dist',
        options: {
          process: function (content, srcpath) { //请使用当前项目名称替换以下 testa
            var result = content.replace(/testa\/src\/testa/g, 'testa/dist/testa');
            var getNowFormatDate = function () {
              var date = new Date(),
                year = date.getFullYear() + '',
                month = date.getMonth() + 1,
                strDate = date.getDate(),
                hours = date.getHours(),
                min = date.getMinutes(),
                currentdate = '';

              if (month >= 1 && month <= 9) {
                month = "0" + month;
              }
              if (strDate >= 1 && strDate <= 9) {
                strDate = "0" + strDate;
              }
              if (hours >= 0 && hours <= 9) {
                hours = "0" + hours;
              }
              if (min >= 0 && min <= 9) {
                min = "0" + min;
              }
              currentdate = year + month + strDate + hours + min;
              return currentdate;
            };

            if (srcpath.indexOf('/main/main.js') > -1) {
              //修改时间戳：修改main.js里的‘#versionTime#’字符串，注：不能用$versionTime$,
              result = result.replace(/#versionTime#/g, getNowFormatDate());
            }
            return result;
          }
        }
      }
    },
    // 清空文件
    clean: {
      all: 'dist/*'
    },
    //兼容浏览器 css前缀自动补全
    autoprefixer: {
      options: {
        browserslist: ['last 2 versions', 'chrome', 'ie'],
        map: false
      },
      src: {
        files: [{
          expand: true,
          cwd: 'src',
          src: '**/*.css',
          dest: 'src'
                }]
      }
    }
  });

  // 加载包含 "uglify" 任务的插件。
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  // grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-autoprefixer');

  grunt.registerTask('build', [
    'clean', //删除dist
    'copy:html', //复制html
    'copy:image', //复制图片
    'uglify', // 压缩js到dist目录
    'autoprefixer:src',
    'cssmin', // 压缩css到dist目录
    'htmlmin', //压缩tpl到dist目录
    'copy:fixCss',
    'copy:fixJs',
    // 'sass:dist', //编译scss
  ]);

  // 默认被执行的任务列表。
  grunt.registerTask('default', ['build']);
  grunt.registerTask('watchFiles', ['watch']);

  grunt.event.on('watch', function (action, filepath, target) {
    var watch = require('./cabinBabel/watch.js');
    watch(action, filepath, target);
  });
};
