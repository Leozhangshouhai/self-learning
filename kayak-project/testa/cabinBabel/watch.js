/*
 * grunt watch执行运行
 */
module.exports = function (action, filepath, target) {
  var babelFn = require('../cabinBabel/babelFn.js'),
    tools = require('../cabinBabel/tools.js'),
    jqReg = /\w*.(jq)$/,
    vueReg = /\w*.(vue)$/;
  console.log(target + ': ' + filepath + ' has ' + action);

  var index = filepath.lastIndexOf('.'),
    pathStr = filepath.substring(0, index),
    extName = filepath.substring(index + 1, filepath.length);

  if (extName != 'tpl' && extName != 'vue' && extName != 'jq') { //仅对tpl和.vue、.jq文件做处理  
    return;
  }
  if (extName == 'tpl') {
    var path = require('path'),
      prePath = path.resolve(pathStr, '..'),
      lists = tools.readAllFile(prePath, /\w*.(vue)$/);

    lists && lists.length > 0 ? extName = 'vue' : extName = extName;
  }
  if (extName != 'vue' && extName != 'jq') {
    return;
  }
  babelFn(pathStr, extName); //编译文件
}
