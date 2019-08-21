define('testa/layout/column/column', function (require, exports, module) {
	var Layout = require('cabincore/layout/layout'),
		menu = require('testa/modules/menu/menu'),
		header = require('testa/modules/header/header'); // 这个可优化为cabin.Layout

	return Layout({
		name: 'cabinindex',   
		tpl: 'cabincore/layout/column/column.tpl',   
		widgets: {
			menu: menu,
			header:header
		}
	});
});
