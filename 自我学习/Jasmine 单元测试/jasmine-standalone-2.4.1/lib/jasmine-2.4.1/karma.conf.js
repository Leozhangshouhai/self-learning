// Karma configuration
// Generated on Fri Jul 08 2016 15:10:40 GMT+0800 (CST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    plugins: [
        require("karma-coverage"),
        require("karma-phantomjs-launcher"),
        // require("karma-mocha-reporter"),
        require("karma-jasmine"),
    ],


    // list of files / patterns to load in the browser
    files: [
        //库相关文件
        'node_modules/jquery/dist/jquery.js',
        'node_modules/jasmine-jquery/lib/jasmine-jquery.js',
        'vender/angular/angular.1.4.8.min.js',
        'vender/angular_plugins/**/*.js',
        'vender/ui_bootstrap/ui_bootstrap_tpls.2.1.2.js',
        // 'vender/highstock/highstock_all.js',
        // 'vender/highstock/highcharts-ng.js',
        'node_modules/angular-mocks/angular-mocks.js',

        /*组件部分*/
        'components/const/js/const.js',
        'components/const/js/*.js',
        'components/helper/js/helper.js',
        'components/helper/js/*.js',

        //模块部分
        'modules/anti_fraud/js/anti_fraud.js',
        'modules/anti_fraud/js/*.js',

        'modules/monitor/js/monitor.js',
        'modules/monitor/js/*.js',

        'modules/signin/js/signin.js',
        'modules/signin/js/*.js',

        'modules/merchant/js/merchant.js',
        'modules/merchant/js/*.js',
        'modules/intercalate/js/intercalate.js',
        'modules/intercalate/js/*.js',
        'modules/application_manage/js/application_manage.js',
        'modules/application_manage/js/*.js',

        'components/**/test/*.spec.js',
        'modules/**/test/*.spec.js',

        {
            pattern     : 'json_data/{*,**/*}.json',
            watch       : true,
            served      : true,
            included    : false
        },
    ],


    // list of files to exclude
    exclude: [
        'modules/account/js/*.js',
        'modules/account/test/*.spec.js',
        'modules/anti_fraud/js/anti_fraud.directive.js',
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        './{modules,components}/**/js/*.js' : [ 'coverage' ]
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    // reporters: ['mocha', 'coverage'],
    reporters: ['progress', 'coverage'],
    // mochaReporter: {
    //     colors: {
    //         success: 'green',
    //         info: 'bgGreen',
    //         warning: 'yellow',
    //         error: 'red'
    //     },
    //     symbols: {
    //         success: '+',
    //         info: '#',
    //         warning: '!',
    //         error: 'x'
    //     }
    // },
    coverageReporter: {
        dir : 'public/coverage',
        reporters : [{
            type : 'html',
            subdir : 'report-html'
        },{
            type : 'lcov',
            subdir : 'report-lcov'
        },{
            type : 'text',
            subdir : 'text.txt'
        },{
            type : 'text-summary',
            subdir : 'text-summary.txt'
        }]
    },


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    // browsers: ['Chrome'],
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
