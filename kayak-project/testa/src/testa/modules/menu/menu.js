;
(function () {
  var handle, _fn, CFG, kDom, temps = [],cabinMenu, AJAX, cgiMain;

  var opt = {
    menu: []
  }
  CFG = {
    CONTAINER_CLS: 'J_Menu'
  }
  handle = {
    classname: 'testa-menu',
    jView: null,
    init: function (data) {
      _fn.init();
    }
  }
  _fn = {
    init: function () {
      handle.jView = kDom.get(handle.classname, $('.' + CFG.CONTAINER_CLS));
      handle.jView.kInsert();

      //本地配置menu数据
      opt.menu = [
        {
          icon: "cabin-nav-icon icon-nav-vc-gongzuotai",
          name: "demo",
          children: [
            {
              name: "jq版",
              router: "#index/testa/demojq"
                },
            {
              name: "vue版",
              router: "#index/testa/demovue"
                },
            {
              name: "登陆页",
              router: "#full/testa/login"
                },
                {
                  name: "测试test_vue",
                  router: "#index/testa/test"
                    }
            ]
        }
    ];
      opt.theme = 'light';
      //菜单插件加载
      handle.jView.find('#J_menuCont').CabinMenu(opt);
      return;
      //todo-------------
      //接口拿菜单数据
      AJAX.post(cgiMain.menuTree, {}, function (res) {
        var data = res.data;
        opt.menu = data;
        opt.theme = 'light';
        //菜单插件加载
        handle.jView.find('#J_menuCont').CabinMenu(opt);
      });
    }
  }
  define('testa/modules/menu/menu', function (require, exports, module) {
    require('testa/modules/menu/menu.css');
    require('testa/modules/menu/menu.tpl');
    //组件
    cabinMenu = require('cabin/widgets/menu/menu');

    AJAX = require('testa/common/data/ajax');
    cgiMain = require('testa/config/apimix');
    //底层资源
    kDom = kayak.dom;
    module.exports = handle;
  });
})();
