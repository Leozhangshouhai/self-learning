/**
 * Created by leo on 2017/3/30.
 */
var  gulp = require('gulp'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect'),
    //less = require('gulp-less'),
    minifyCss = require('gulp-minify-css'),
    minify = require('gulp-minify'),
    zip = require('gulp-zip'),
    moment = require("moment"),
    ftp = require('gulp-ftp'),
    fileCopy = require('gulp-file-copy'),
    git = require('gulp-git'),
    runSequence = require('run-sequence'),
    argv = require('minimist')(process.argv.slice(2)),
    del = require('del'),
    uglify = require('gulp-uglify'),
    imgmin = require('gulp-imagemin'),
    jshint=require('gulp-jshint'),
    htmlmin = require('gulp-htmlmin');
    //ngAnnotate = require('gulp-ng-annotate');
var path={
    input:{
        html:['src/pages/*.html'],
        js:['src/js/*.js'],
        css:['src/css/*.css'],
        image:['src/img/*/*'],
        fonts:['src/fonts/*/*'],
        copycss:'src/css/**'  //**表示所有后代，*表示子代
    },
    output:{
        css:'dist/minCss',
        html:'dist/minHtml',
        js:'dist/minJs',
        img:'dist/img' ,
        copy:'dist/plus'

    },
    del:{
        css:'dist/minCss',
        js:'dist/minJs',
        img:'dist/img'
    }
};
//HTMl 压缩
gulp.task('minhtml',function(){
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src('src/pages/*.html')
       .pipe(htmlmin(options))
        .on('error',function(error){
            console.log(error.message);
            // console.log(error)
        })
        .pipe(gulp.dest(path.output.html))

})
// css 压缩
gulp.task('mincss',function(){
   return  gulp.src(path.input.css)
        .pipe(minifyCss())
        .pipe(gulp.dest(path.output.css))
});
// JS 压缩并混淆加密
gulp.task('minjs',function(){
    gulp.src(path.input.js)
        .pipe(uglify(options))
        // .pipe(concat('index.js'))
        .pipe(gulp.dest(path.output.js))
        //.pipe(jshint())
});

// JS 语法检查
function Jshit(){
    gulp.src(path.input.js)
        .pipe(jshint())
        .pipe(jshint.reporter())
        .pipe(concat('allindex.js'))
        .pipe(gulp.dest(path.output.js))


}
gulp.task('jshint', Jshit);
// 图片压缩

gulp.task('imgmin',function(){
  return  gulp.src(path.input.image)
        .pipe(imgmin([
          imgmin.gifsicle({interlaced: true}),
          imgmin.jpegtran({progressive: true}),
          imgmin.optipng({optimizationLevel: 5}),
          imgmin.svgo({plugins: [{removeViewBox: true}]})
      ]))
        .pipe(gulp.dest(path.output.img))
});
// 文件copy
function file_copy(){
    gulp.src(path.input.copycss)
        .pipe(gulp.dest(path.output.copy))
}
gulp.task('copy',file_copy);
// 文件清除，用于每次连续生成DEV的时候，清除原来的
function del_file(path){
    return  del([path])
}
gulp.task('clean',function(){
    del_file('dist/');
});

// 实时刷新
gulp.task('connect',function(){
    connect.server({
         root:'src',
         port:9090,
         livereload:true
     });
});
// 打出提示，注册任务
gulp.task('css', function () {
    gulp.src(path.input.css)
        .pipe(connect.reload());
});
//实时监听
gulp.task('watch',function(){
    gulp.watch(path.input.css,['css']);
});
gulp.task('liveport',['connect','watch']);
