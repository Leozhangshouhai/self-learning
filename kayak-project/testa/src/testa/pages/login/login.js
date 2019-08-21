define('testa/pages/login/login', function (require, exports, module) {
  var handle, page;
  var AJAX = require('testa/common/data/ajax');
  var cgiMain = require('testa/config/apimix');

  page = Page({
    nodeClass: 'testa-pages-login',
    parentClass: 'J_Main', // 没有就直接插入body，或者不插入
    source: ['testa/pages/login/login.tpl', 'testa/pages/login/login.css'],
    show: function () {
      handle.jView = this.jView;
    },
    hide: function () {}
  });
  handle = {};
  return page;
});
