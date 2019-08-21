define('testa/layout/index/index', function (require, exports, module) {
	var Layout = require('cabincore/layout/layout'),
		menu = require('testa/modules/menu/menu'),
		header = require('testa/modules/header/header'); // 这个可优化为cabin.Layout

	return Layout({
		name: 'cabinindex',
		tpl: 'cabincore/layout/index/index-light.tpl',
		widgets: {
			menu: menu,
			header:header
		}
	});
});
