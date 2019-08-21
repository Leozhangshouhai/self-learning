/*
 * 批量文件处理
 * 事件内容：编译全局目录下以.jq结尾的所有文件，以及pages目录下以.vue和.tpl结尾的所有文件
 * 触发命令：npm run build（全部打包）
 */
var fs = require('fs');
var tools = require('./tools');
var babelFn = require('./babelFn.js');

var jqReg = /\w*.(jq)$/,
  vueReg = /\w*.(vue)$/;

var jqTemplateDirectory = 'src/testa'; //相对于当前文件的相对路径
var vueTemplateDirectory = 'src/testa/pages'; //相对于当前文件的相对路径
var jqFilesArr = tools.readAllFile(jqTemplateDirectory, jqReg), //获取扩展名为jq的 文件路径 列表
  vueFilesArr = tools.readAllFile(vueTemplateDirectory, vueReg); //获取扩展名为vue的 文件路径 列表
//console.log(files.length ? files.join('\n') : '未找到符合要求的文件');

var _fn;

_fn = {
  //编译.jq文件
  babelJq(fileArr) {
      if (!fileArr || fileArr && fileArr.length < 1) {
        return;
      }

      for (var i in fileArr) {
        var index = fileArr[i].lastIndexOf('.'),
          pathStr = fileArr[i].substring(0, index);

        babelFn(pathStr, 'jq'); //合并.es6和.tpl到.js文件中
      }
    },
    //编译.vue和tpl文件
    babelVue(fileArr) {
      if (!fileArr || fileArr && fileArr.length < 1) {
        return;
      }

      for (var i in fileArr) {
        var index = fileArr[i].lastIndexOf('.'),
          pathStr = fileArr[i].substring(0, index);
        babelFn(pathStr, 'vue'); //合并.es6和.tpl到.js文件中
      }
    }
}

if (jqFilesArr && jqFilesArr.length > 0) {
  //编译.jq文件
  _fn.babelJq(jqFilesArr);

}
if (vueFilesArr && vueFilesArr.length > 0) {
  //编译.vue和tpl文件
  _fn.babelVue(vueFilesArr);
}
