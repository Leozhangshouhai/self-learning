// Karma configuration
// Generated on Fri Jun 23 2017 17:00:44 GMT+0800 (CST)

var webpack = require('webpack');

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'sinon-chai'],


    // list of files / patterns to load in the browser
    files: [
      'test/unit/**/*.spec.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        'test/unit/**/*.spec.js': ['webpack']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['spec', 'coverage'],

    coverageReporter: {
        type: 'html',
        dir: 'coverage/',
        reporters: [
            { type: 'lcov', subdir: '.' },
            { type: 'text-summary' }
        ]
    },


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,

    // webpake config
    webpack: {
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    loader: 'babel-loader',
                    query: {
                        presets: ['es2015', 'stage-2']
                    }
                },
                {
                    test: /\.vue$/,
                    loader: 'vue-loader'
                },
            ]
        },
        vue: {
            loaders: {
                js: 'babel-loader'
            }
        },
        babel: {
            presets: ['es2015']
        },
        // 指向Vue的Vue.js文件，默认指向文件无模板引擎
        resolve: {
            alias: {
                vue: 'vue/dist/vue.js'
            }
        }
    },
    // 关闭webpack打包编译相关的输出信息
    webpackMiddleware: {
        noInfo: true
    }
  })
}
