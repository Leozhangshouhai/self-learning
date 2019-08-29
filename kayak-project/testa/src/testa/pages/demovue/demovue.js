
define('testa/pages/demovue/demovue', function (require, exports, module) {
  

var page;

  var columns = [{
    title: 'Name',
    dataIndex: 'name'
  }, {
    title: 'Age',
    dataIndex: 'age'
  }, {
    title: 'Address',
    dataIndex: 'address'
  }];

  var _data = [];
  for (var i = 0; i < 46; i++) {
    _data.push({
      key: i,
      name: 'Edward King ' + i,
      age: 32,
      address: 'London, Park Lane no. ' + i
    });
  }

  page = VuePage({
    render: function render() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "testa-pages-demovue content-container", attrs: { "id": "testa-pages-demovue" } }, [_c('div', { staticClass: "container-scroll" }, [_c('section', { staticClass: "layout-pad-full layout-margin-bottom back-white" }, [_c('d-breadcrumb', [_c('d-breadcrumb-item', [_vm._v("首页")]), _vm._v(" "), _c('d-breadcrumb-item', [_vm._v("列表")]), _vm._v(" "), _c('d-breadcrumb-item', [_vm._v("查询表格")])], 1)], 1), _vm._v(" "), _c('section', { staticClass: "layout-pad-full layout-pad-top-nil layout-margin-bottom back-white" }, [_c('h1', { staticClass: "holder-title" }, [_vm._v("查询表格")]), _vm._v(" "), _c('d-form', { staticClass: "cabinvue-search-form" }, [_c('d-row', { attrs: { "gutter": 24 } }, [_c('d-col', { attrs: { "xl": 6, "lg": 8, "md": 8, "sm": 12, "xs": 24 } }, [_c('div', { staticClass: "search-form-item" }, [_c('div', { staticClass: "item-label" }, [_c('span', [_vm._v("姓名")])]), _vm._v(" "), _c('div', { staticClass: "item-control" }, [_c('d-input', { directives: [{ name: "decorator", rawName: "v-decorator", value: ["rule-name", {
            rules: [{
              required: true,
              message: 'Input something!'
            }]
          }], expression: "[\n                  `rule-name`,\n                  {\n                    rules: [{\n                      required: true,\n                      message: 'Input something!',\n                    }],\n                  }\n                ]" }], attrs: { "placeholder": "规则名称" } })], 1)])]), _vm._v(" "), _c('d-col', { attrs: { "xl": 6, "lg": 8, "md": 8, "sm": 12, "xs": 24 } }, [_c('div', { staticClass: "search-form-item" }, [_c('div', { staticClass: "item-label" }, [_c('span', [_vm._v("规则名称")])]), _vm._v(" "), _c('div', { staticClass: "item-control" }, [_c('d-input', { directives: [{ name: "decorator", rawName: "v-decorator", value: ["rule-name", {
            rules: [{
              required: true,
              message: 'Input something!'
            }]
          }], expression: "[\n                  `rule-name`,\n                  {\n                    rules: [{\n                      required: true,\n                      message: 'Input something!',\n                    }],\n                  }\n                ]" }], attrs: { "placeholder": "规则名称" } })], 1)])]), _vm._v(" "), _c('d-col', { attrs: { "xl": 6, "lg": 8, "md": 8, "sm": 12, "xs": 24 } }, [_c('div', { staticClass: "search-form-item" }, [_c('div', { staticClass: "item-label" }, [_c('span', [_vm._v("规则名称规则名称")])]), _vm._v(" "), _c('div', { staticClass: "item-control" }, [_c('d-select', { directives: [{ name: "decorator", rawName: "v-decorator", value: ['use-state', { rules: [{ required: true, message: 'Please select an state!' }] }], expression: "[\n                    'use-state',\n                    {rules: [{ required: true, message: 'Please select an state!' }]}\n                  ]" }], attrs: { "placeholder": "使用状态" } }, [_c('d-select-option', { attrs: { "value": "Large" } }, [_vm._v("\n                    关闭\n                  ")]), _vm._v(" "), _c('d-select-option', { attrs: { "value": "Middle" } }, [_vm._v("\n                    运行中\n                  ")])], 1)], 1)])]), _vm._v(" "), _c('d-col', { attrs: { "xl": 6, "lg": 8, "md": 8, "sm": 12, "xs": 24 } }, [_c('div', { staticClass: "search-form-item" }, [_c('div', { staticClass: "item-label" }, [_c('span', [_vm._v("规则名称规则名称")])]), _vm._v(" "), _c('div', { staticClass: "item-control" }, [_c('d-select', { directives: [{ name: "decorator", rawName: "v-decorator", value: ['use-state', { rules: [{ required: true, message: 'Please select an state!' }] }], expression: "[\n                    'use-state',\n                    {rules: [{ required: true, message: 'Please select an state!' }]}\n                  ]" }], attrs: { "placeholder": "使用状态" } }, [_c('d-select-option', { attrs: { "value": "Large" } }, [_vm._v("\n                    关闭\n                  ")]), _vm._v(" "), _c('d-select-option', { attrs: { "value": "Middle" } }, [_vm._v("\n                    运行中\n                  ")])], 1)], 1)])]), _vm._v(" "), _c('d-col', { attrs: { "xl": 6, "lg": 8, "md": 8, "sm": 12, "xs": 24 } }, [_c('div', { staticClass: "search-form-item" }, [_c('div', { staticClass: "item-label" }, [_c('span', [_vm._v("调用次数")])]), _vm._v(" "), _c('div', { staticClass: "item-control" }, [_c('d-input-number', { directives: [{ name: "decorator", rawName: "v-decorator", value: ["call-times", {
            rules: [{
              required: true,
              message: 'Input something!'
            }]
          }], expression: "[\n                  `call-times`,\n                  {\n                    rules: [{\n                      required: true,\n                      message: 'Input something!',\n                    }],\n                  }\n                ]" }], staticStyle: { "width": "100%" }, attrs: { "placeholder": "调用次数" } })], 1)])]), _vm._v(" "), _c('d-col', { attrs: { "xl": 6, "lg": 8, "md": 8, "sm": 12, "xs": 24 } }, [_c('div', { staticClass: "search-form-item" }, [_c('div', { staticClass: "item-label" }, [_c('span', [_vm._v("规则名称规则名称")])]), _vm._v(" "), _c('div', { staticClass: "item-control" }, [_c('d-select', { directives: [{ name: "decorator", rawName: "v-decorator", value: ['use-state', { rules: [{ required: true, message: 'Please select an state!' }] }], expression: "[\n                    'use-state',\n                    {rules: [{ required: true, message: 'Please select an state!' }]}\n                  ]" }], attrs: { "placeholder": "使用状态" } }, [_c('d-select-option', { attrs: { "value": "Large" } }, [_vm._v("\n                    关闭\n                  ")]), _vm._v(" "), _c('d-select-option', { attrs: { "value": "Middle" } }, [_vm._v("\n                    运行中\n                  ")])], 1)], 1)])])], 1), _vm._v(" "), _c('hr'), _vm._v(" "), _c('div', { staticClass: "form-option-area" }, [_c('d-button', { staticClass: "space-margin-right", attrs: { "type": "primary" } }, [_vm._v("查询")]), _vm._v(" "), _c('d-button', [_vm._v("重置")])], 1)], 1)], 1), _vm._v(" "), _c('section', { staticClass: "layout-pad-full layout-margin-bottom back-white" }, [_c('div', { staticClass: "table-option-area space-margin-bottom" }, [_c('d-button', { staticClass: "space-margin-right", attrs: { "type": "primary", "icon": "plus" }, on: { "click": _vm.showModal } }, [_vm._v("新建规则")]), _vm._v(" "), _c('d-button', [_vm._v("批量操作")])], 1), _vm._v(" "), _c('d-alert', { attrs: { "message": _vm.selectmsg, "type": "info", "show-icon": "" } }), _vm._v(" "), _c('d-table', { attrs: { "row-selection": { selectedRowKeys: _vm.selectedRowKeys, onChange: _vm.onSelectChange }, "columns": _vm.columns, "data-source": _vm.data } })], 1)])]);
    },
    staticRenderFns: {}, source: ['testa/pages/demovue/demovue.tpl', 'testa/pages/demovue/demovue.css'],
    el: 'testa-pages-demovue',
    //这里必须 使用一个方法返回给data
    data: function data() {
      return {
        formLayout: 'horizontal',
        newrulevisible: false,

        data: _data,
        columns: columns,
        selectedRowKeys: [], // Check here to configure the default column
        loading: false
      };
    },
    mounted: function mounted() {
      //进入页面
      //cabinVue 里面所有的this 都指向当前这个vue 实例
      //vue 更多使用方法请查看vue官方文档
      this.$nextTick(function () {
        //nextTick 用于当data数据改变,触发vue 渲染,且渲染完毕使用

      });
    },

    //如果 不需要保存页面状态必须添加下面这个方法
    beforeDestroy: function beforeDestroy() {
      Object.assign(this.$data, this.$options.data());
    },
    destroyed: function destroyed() {
      //离开页面方法
    },
    //监听属性变化，，变量必须是data里声明的
    watch: {},
    //监听属性变化，配置变量的同时也起到data声明的作用
    computed: {
      selectmsg: function selectmsg() {
        return '\u5DF2\u9009\u62E9 ' + this.selectedRowKeys.length + ' \u9879';
      },
      formItemLayout: function formItemLayout() {
        return this.formLayout === 'horizontal' ? {
          labelCol: { span: 5 },
          wrapperCol: { span: 19 }
        } : {};
      },

      hasSelecte: function hasSelecte() {
        return this.selectedRowKeys.length > 0;
      }
    },
    methods: {
      //自定义方法
      showModal: function showModal() {
        this.newrulevisible = true;
      },
      handleOk: function handleOk(e) {
        this.newrulevisible = false;
      },

      start: function start() {
        var _this = this;

        this.loading = true;
        // ajax request after empty completing
        setTimeout(function () {
          _this.loading = false;
          _this.selectedRowKeys = [];
        }, 1000);
      },
      onSelectChange: function onSelectChange(selectedRowKeys) {
        this.selectedRowKeys = selectedRowKeys;
      }
    }
  });
  return page;
})