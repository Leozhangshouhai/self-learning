/*
 * 单个文件处理
 * 事件内容：编译不同类型的单个文件
 * 触发命令：npm watch（监听.jq,.vue&.tpl变化时），npm run build（全部打包）
 * 接收参数：
 * [@param] pathStr string类型 必需 文件路径名称
 * [@param] extType string类型 必需 文件扩展名
 */

module.exports = function (pathStr, extType) {
  var fs = require('fs'),
    babel = require("babel-core"),
    compiler = require('vue-template-compiler'), //vue文件的tpl编译需要
    compiler2 = require('vue-template-es2015-compiler');

  var _fn;

  _fn = {
    /*
     * 编译.jq的文件
     * 1、.jq文件做es6的编译为es5
     * 2、生成.js文件      
     * [@param] pathStr string类型 必需 文件路径名称       
     */
    babelJq(pathStr) {
        var jqData = fs.readFileSync(pathStr + '.jq', 'utf8'); //获取当前路径的jq文件数据
        //编译es6为es5
        var result = babel.transform(jqData, {
          code: true,
          presets: ["stage-3", "es2015", "env"]
        });


        var codeArry = result.code.split("'use strict';");
        var codeStr = codeArry.join(''); //去掉'use strict';

        //已经有.js文件，把合并编译后的js写入.js文件,无.js文件会自动生成.js文件
        fs.writeFileSync(pathStr + '.js', codeStr);
      },
      /*
       * 编译.vue文件
       * 1、编译tpl生成render和staticRenderFns方法
       * 2、.vue文件做es6编译为es5
       * 3、合并tpl和.vue生成.js文件
       * [@param] pathStr string类型 必需 文件路径名称
       */
      babelVue(pathStr) {
        var tplData = fs.readFileSync(pathStr + '.tpl', 'utf8'); //获取当前路径的tpl文件数据
        if (!tplData) {
          return;
        }

        //编译tpl生成render和staticRenderFns方法
        var funArr = _fn.compile(tplData);
        var vueData = fs.readFileSync(pathStr + '.vue', 'utf8'); //.vue文件字符流
        var vueDataResult = babel.transform(vueData, {
          code: true,
          presets: ["stage-3", "es2015", "env"]
        }); //转es5
        var hasRenderFlag = _fn.vueHasRender(vueDataResult.ast); //判断.vue文件是否含有render方法

        if (hasRenderFlag) { //已有render不做处理
          return;
        }

        //没有render方法，自己添加render
        //合并tpl和.vue文件
        var jsCont = _fn.mergeTplVue(vueData, funArr);

        //把babel生成的放在define外部的code放在define方法内部的最前面
        jsCont = _fn.optimizeJs(jsCont);

        //生成.js文件
        _fn.createJsFile(jsCont);
      },
      //判断当前目录下的.vue文件里是否已经注册了render方法
      vueHasRender(fileStr) {
        var flag = false; //是否有render方法
        if (fileStr && fileStr.program && fileStr.program.body && fileStr.program.body.length > 0) {
          var bodyLists = fileStr.program.body;
          //console.log('1层')

          for (var i = 0; i < bodyLists.length; i++) {
            if (bodyLists[i].type &&
              bodyLists[i].type == 'ExpressionStatement' &&
              bodyLists[i].expression &&
              bodyLists[i].expression.type &&
              bodyLists[i].expression.type == 'CallExpression' &&
              bodyLists[i].expression.callee &&
              bodyLists[i].expression.callee.name &&
              bodyLists[i].expression.callee.name == 'define' && bodyLists[i].expression.arguments &&
              bodyLists[i].expression.arguments.length > 0) {
              //console.log('2层')
              var defineFunContent = bodyLists[i].expression.arguments; //找到define方法ast数组

              for (var j = 0; j < defineFunContent.length; j++) {
                if (defineFunContent[j].type == 'FunctionExpression' &&
                  defineFunContent[j].body &&
                  defineFunContent[j].body.body &&
                  defineFunContent[j].body.body.length > 0) {
                  //console.log('3层')
                  var VuePageContent = defineFunContent[j].body.body;

                  for (var k = 0; k < VuePageContent.length; k++) {
                    if (VuePageContent[k].type == 'ExpressionStatement' &&
                      VuePageContent[k].expression &&
                      VuePageContent[k].expression.right &&
                      VuePageContent[k].expression.right.callee &&
                      VuePageContent[k].expression.right.callee.name == 'VuePage' &&
                      VuePageContent[k].expression.right.arguments &&
                      VuePageContent[k].expression.right.arguments.length > 0
                    ) {
                      //console.log('4层')
                      var VuePageArguments = VuePageContent[k].expression.right.arguments; //得到VuePage的键值对参数

                      for (var m = 0; m < VuePageArguments.length; m++) {
                        if (VuePageArguments[m].type == 'ObjectExpression' && VuePageArguments[m].properties) {
                          var VuePageArgProperties = VuePageArguments[m].properties;
                          for (var n = 0; n < VuePageArgProperties.length; n++) {
                            if (VuePageArgProperties[n] && VuePageArgProperties[n].key && VuePageArgProperties[n].key.name && VuePageArgProperties[n].key.name == 'render') {
                              flag = true;
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        return flag;
      },
      //编译tpl生成render和staticRenderFns方法
      compile(data) {
        var obj = compiler.compileToFunctions(data);
        var renderFn = compiler2(obj.render.toString()); //得到render方法
        var render = _fn.getFnCont(renderFn); //获取render方法的方法体
        var staticRenderFns = _fn.compileStaticRenderFn(obj.staticRenderFns.toString()); //获取staticRenderFns的完整拼接

        return {
          render: 'render(){' + render + '},',
          staticRenderFns: staticRenderFns
        };
      },
      //编译 多个staticRenderFns
      compileStaticRenderFn(staticRenderFnsStr) {
        var staticRenderFns = ''; //返回完整的staticRenderFns
        if (!staticRenderFnsStr) { //没有静态函数时
          staticRenderFns = 'staticRenderFns:{},';
          return staticRenderFns;
        }
        var newStaticRenderFnsStr = staticRenderFnsStr.replace(/function anonymous\(\)/g, 'function anonymous(\n)');

        var staticRenderLists = newStaticRenderFnsStr.split('function anonymous(\n) {'); //拆分成数组
        staticRenderLists.shift(); //删除第一项无用的

        if (staticRenderLists.length > 1) { //多个方法
          for (var i = 0; i < staticRenderLists.length; i++) {
            if (i == staticRenderLists.length - 1) { //数组最后一项
              var itemFn = compiler2('function anonymous(){' + staticRenderLists[i]); //拼接完整方法再次编译
              itemFn = _fn.getFnCont(itemFn); ////获取方法的方法体
              staticRenderFns += i + ':function(){' + itemFn + '}';
            } else {
              var itemFn = staticRenderLists[i].substring(0, staticRenderLists[i].length - 1); //去除逗号，
              itemFn = compiler2('function anonymous(){' + itemFn); //拼接完整方法再次编译
              itemFn = _fn.getFnCont(itemFn); ////获取方法的方法体
              staticRenderFns += i + ':function(){' + itemFn + '},';
            }
          }
          staticRenderFns = 'staticRenderFns:{' + staticRenderFns + '},';
        } else { //只有一个方法           
          var staticFn = compiler2('function anonymous(){' + staticRenderLists[0]); //拼接完整方法再次编译
          staticFn = _fn.getFnCont(staticFn); ////获取方法的方法体
          staticRenderFns = 'staticRenderFns:{0:function(){' + staticFn + '}},';
        }

        return staticRenderFns;
      },
      //获取方法的方法体
      getFnCont(fnStr) {
        var fnCont = '',
          index;
        fnCont = fnStr.substring(0, fnStr.length - 1); //移除最后一个字符‘}’
        index = fnStr.indexOf('{'); //获取第一个字符'{'的位置
        fnCont = fnCont.substring(index + 1, fnCont.length); //移除前面无用部分，得到方法体

        return fnCont;
      },
      //合并tpl和.vue文件得到完整js
      mergeTplVue(vueData, funArr) {
        //找到VuePage({的结束位置
        //插入render和staticRenderFns方法
        var index1 = vueData.indexOf('VuePage'),
          str1 = vueData.substring(index1, vueData.length - 1),
          index2 = str1.indexOf('('),
          str2 = str1.substring(index2, str1.length - 1),
          index3 = str2.indexOf('{'),
          index = index1 + 1 + index2 + 1 + index3 + 1, //VuePage({ 所在位置
          newStr = funArr.render,
          staticNewStr = funArr.staticRenderFns,
          jsCont = vueData.slice(0, index + 1) + newStr + staticNewStr + vueData.slice(index + 1);

        return jsCont;
      },
      //把babel生成的放在define外部的code放在define方法内部的最前面
      optimizeJs(jsCont) {
        //得到文件编译为es5后的code，以及code编译后的ast
        var result = babel.transform(jsCont, {
            code: true,
            presets: ["stage-3", "es2015", "env"]
          }),
          resultCode = babel.transform(result.code, {
            code: true,
            presets: ["stage-3", "es2015", "env"]
          }); //需要编译result.code得到ast

        //根据ast找到code中define方法开始的位置，和内容开始位置
        var indexs = _fn.findIndexs(resultCode.ast, result.code);

        //得到外部的代码块
        //把外部代码块放入define方法内部，得到优化的代码
        var optimizedCodes = _fn.optimize(indexs.beginIndex, indexs.contentIndex, result.code);

        //返回优化后的完整代码
        return optimizedCodes;
      },
      //根据ast找到code中define方法开始的位置，和内容开始位置
      findIndexs(fileAst, fileCode) {
        if (fileAst && fileAst.program && fileAst.program.body && fileAst.program.body.length > 0) {
          var beginIndex, //define方法开始的位置
            contentIndex; //define方法内容开始的位置


          var bodyLists = fileAst.program.body;
          //console.log('1层')

          //得到define方法开始的位置，和define方法内容开始的位置
          for (var i = 0; i < bodyLists.length; i++) {
            if (bodyLists[i].type &&
              bodyLists[i].type == 'ExpressionStatement' &&
              bodyLists[i].expression &&
              bodyLists[i].expression.type &&
              bodyLists[i].expression.type == 'CallExpression' &&
              bodyLists[i].expression.callee &&
              bodyLists[i].expression.callee.name &&
              bodyLists[i].expression.callee.name == 'define' && bodyLists[i].expression.arguments &&
              bodyLists[i].expression.arguments.length > 0) {
              //console.log('2层')
              var defineFunContent = bodyLists[i].expression.arguments; //找到define方法ast数组

              beginIndex = bodyLists[i].expression.callee.start; //define方法开始的位置

              for (var j = 0; j < defineFunContent.length; j++) {
                if (defineFunContent[j].type == 'FunctionExpression' &&
                  defineFunContent[j].body &&
                  defineFunContent[j].body.body &&
                  defineFunContent[j].body.body.length > 0) {
                  //console.log('3层')
                  var VuePageContent = defineFunContent[j].body.body;

                  contentIndex = VuePageContent[0].start; //define方法内容开始的位置
                }
              }
            }
          }
          return {
            beginIndex: beginIndex,
            contentIndex: contentIndex
          }
        }
      },
      //得到外部的代码块
      //把外部代码块放入define方法内部
      optimize(beginIndex, contentIndex, fileCode) {
        var codeBeforeDefine = ''; //define方法前面的code 
        if (beginIndex >= 0 && contentIndex > 0) {
          codeBeforeDefine = fileCode.slice(0, beginIndex); //获取define前面部分code

          var codeBeforeDefineArry = codeBeforeDefine.split("'use strict';");
          codeBeforeDefine = codeBeforeDefineArry.join(''); //去掉'use strict';

          var andFile = fileCode.slice(0, contentIndex) + codeBeforeDefine + fileCode.slice(contentIndex, fileCode.length);

          andFile = andFile.substring(beginIndex - 1, andFile.length - 1);
          return andFile;
        }
      },
      //生成.js文件
      createJsFile(jsCont) {
        //已经有.js文件，把合并编译后的js写入.js文件,无.js文件会自动生成.js文件
        fs.writeFileSync(pathStr + '.js', jsCont);
      }
  }

  if (!pathStr || !extType) {
    return;
  }

  //.jq文件
  if (extType == 'jq') {
    _fn.babelJq(pathStr); //编译.jq的文件
  }
  //.vue文件
  if (extType == 'vue') {
    _fn.babelVue(pathStr); //编译.vue文件
  }


}
