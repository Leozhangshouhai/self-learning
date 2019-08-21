;(function () {
	var _fn,
		handle,api,
		CFG;
	CFG = {
		TIMEOUT: 200000 // 超时时间       
	}
	handle = {
		//get请求
		query: function () {
			var url,
				param,
				type,
				callback;
			if (arguments.length == 3) {
				url = arguments[0];
				type = 'json';
				param = arguments[1];
				callback = arguments[2];
			} else if (arguments.length == 4) {
				url = arguments[0];
				type = arguments[1];
				param = arguments[2];
				callback = arguments[3];
			} else {
				return;
			}

			url = _fn.getUrl(url);
			param = param || {};
			param = _fn.decorateParam(param);
			$.ajax({
				url: url,
				dataType: 'json',
				data: param,
				xhrFields: {
					withCredentials: true
				},
				contentType: false,
				type: 'GET',
				cache: false,
				timeout: CFG.TIMEOUT,
				success: function (res) {
					if (typeof callback == 'function') {
						_fn.callbackProxy(res, callback);
					}
				},
				error: function () {
					var data = {
						code: '-1',
						result: '加载数据失败',
						data: {}
					};
					if (typeof callback == 'function') {
						_fn.callbackProxy(data, callback);
					}
				}
			});
		},
		//post请求
		post: function () {
			var url,
				param,
				type,
				callback;
			if (arguments.length == 3) {
				url = arguments[0];
				type = 'json';
				param = arguments[1];
				callback = arguments[2];
			} else {
				return;
			}
						
			url = _fn.getUrl(url);
			param = param || {};
			param = _fn.decorateParam(param);
			$.ajax({
				url: url,
				dataType: 'json',
				data: param,
				xhrFields: {
					withCredentials: true
				},
				type: 'POST',
				cache: false,
				timeout: CFG.TIMEOUT,
				success: function (res) {
					if (typeof callback == 'function') {
						_fn.callbackProxy(res, callback);
					}
				},
				error: function () {
					var data = {
						code: '-1',
						result: '加载数据失败',
						data: {}
					};
					if (typeof callback == 'function') {
						_fn.callbackProxy(data, callback);
					}
				}
			});
		},
		//文件上传
		postFile: function (option) {
			var url,
				param,
				file,
				type,
				callback;
			if (arguments.length == 3) {
				url = api[arguments[0]];
				type = 'json';
				param = arguments[1].param;
				file = arguments[1].file;
				callback = arguments[2];
			} else {
				return;
			}
			url = _fn.getUrl(url);
			var formData = new FormData();
			formData.append("file", file);
			for (var i in param) {
				formData.append(i, param[i]);
			}

			$.ajax({
				url: url,
				type: "POST",
				data: formData,
				xhrFields: {
					withCredentials: true
				},
				/**
				 *必须false才会自动加上正确的Content-Type
				 */
				contentType: false,
				/**
				 * 必须false才会避开jQuery对 formdata 的默认处理
				 * XMLHttpRequest会对 formdata 进行正确的处理
				 */
				processData: false,
				success: function (res) {
					if (typeof callback == 'function') {
						_fn.callbackProxy(res, callback);
					}
				},
				error: function (res) {
					if (typeof callback == 'function') {
						_fn.callbackProxy(res, callback);
					}
				}
			});
		}
	};
	_fn = {
		// 装饰参数
		decorateParam: function (param) {
			return param;
		},
		// 统一回调方案
		callbackProxy: function (data, callback) {
			// 这里可以做统一拦截方案
			if (typeof callback == 'function') {
				callback(data);
			}
		},
		//获取需要的url
		getUrl: function (str) {
			var url = '';
			if (!str) {
				return str;
			}
			if (str.indexOf('http://') > -1 || str.indexOf('https://') > -1) { //传入的是完整的url
				url = str;
			} else { //传入的是字符串，需要在API中寻找
				url = api[str];
			}
			return url;
		}
		
	}
    define('testa/common/data/ajax', function (require, exports, module) {
    api = require('testa/config/apimix');  
		module.exports = $.extend(handle, {
			EVT: api.EVT
		});
    });
})();
