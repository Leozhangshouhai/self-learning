var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')

function resolve(dir) {
	return path.join(__dirname, '..', dir)
}

module.exports = {
	entry: {
		app: ["babel-polyfill", "./src/main.js"]
		// app: './src/main.js'
	},
	output: {
		path: config.build.assetsRoot || config.uat.assetsRoot,
		filename: '[name].js',
		publicPath: process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'uat' ?
			config.build.assetsPublicPath || config.uat.assetsPublicPath :
			config.dev.assetsPublicPath
	},
	resolve: {
		extensions: ['.js', '.vue', '.json'],
		alias: {
			'vue$': 'vue/dist/vue.esm.js',
			'@': resolve('src'),
			'src': path.resolve(__dirname, '../src'),
			// // 2. 定义别名和插件位置  
			'mui': path.resolve(__dirname, '../src/assets/js/mui.min.js')  
		}
	},
	module: {
		rules: [
			// {
			// 	test: /\.css$/,
			// 	include: [
			// 	  /src/,//表示在src目录下的css需要编译
			// 	  '/node_modules/element-ui/lib/'   //增加此项
			// 	],
			// 	loader: 'style-loader!css-loader'
			//   },
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: vueLoaderConfig
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				include: [resolve('src'), resolve('test')]
			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: utils.assetsPath('img/[name].[hash:7].[ext]')
				}
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 100000,
					name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
				}
			},
			{
				test: /\.mp3(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: utils.assetsPath('media/[name].[hash:7].[ext]')
				}
			}
		]
	},
	
}