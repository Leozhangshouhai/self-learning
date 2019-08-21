define('testa/layout/full/full', function (require, exports, module) {
	var Layout = require('cabincore/layout/layout'); // 这个可优化为cabin.Layout

	return Layout({
		name: 'cabinfull',
		tpl: 'cabincore/layout/full/full.tpl',
		widgets: {
			menu: '',
			header: ''
		}
	});
});
