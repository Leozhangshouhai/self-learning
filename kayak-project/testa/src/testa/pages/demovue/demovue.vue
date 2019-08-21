define('testa/pages/demovue/demovue', function (require, exports, module) {
  var page;

  const columns = [{
    title: 'Name',
    dataIndex: 'name',
  }, {
    title: 'Age',
    dataIndex: 'age',
  }, {
    title: 'Address',
    dataIndex: 'address',
  }];

  const data = [];
  for (let i = 0; i < 46; i++) {
    data.push({
      key: i,
      name: `Edward King ${i}`,
      age: 32,
      address: `London, Park Lane no. ${i}`,
    });
  }

  page = VuePage({
    source: ['testa/pages/demovue/demovue.tpl',
      'testa/pages/demovue/demovue.css',
    ],
    el: 'testa-pages-demovue',
    //这里必须 使用一个方法返回给data
    data: function () {
      return {
        formLayout: 'horizontal',
        newrulevisible: false,

        data,
        columns,
        selectedRowKeys: [], // Check here to configure the default column
        loading: false,
      }
    },
    mounted() {
    //进入页面
    //cabinVue 里面所有的this 都指向当前这个vue 实例
    //vue 更多使用方法请查看vue官方文档
      this.$nextTick(function(){
      //nextTick 用于当data数据改变,触发vue 渲染,且渲染完毕使用

      });
    },
    //如果 不需要保存页面状态必须添加下面这个方法
    beforeDestroy:function () {
      Object.assign(this.$data, this.$options.data());
    },
    destroyed: function () {
      //离开页面方法
    },
    //监听属性变化，，变量必须是data里声明的
    watch:{},
    //监听属性变化，配置变量的同时也起到data声明的作用
    computed: {      
      selectmsg () {
        return `已选择 ${this.selectedRowKeys.length} 项`
      },
      formItemLayout () {
        return this.formLayout === 'horizontal' ? {
          labelCol: { span: 5 },
          wrapperCol: { span: 19 },
        } : {};
      },
      hasSelecte:function() {
        return this.selectedRowKeys.length > 0
      }
    },
    methods: {
      //自定义方法
      showModal() {
        this.newrulevisible = true
      },
      handleOk(e) {
        this.newrulevisible = false
      },
      start:function() {
        this.loading = true;
        // ajax request after empty completing
        setTimeout(() => {
          this.loading = false;
          this.selectedRowKeys = [];
        }, 1000);
      },
      onSelectChange (selectedRowKeys) {
        this.selectedRowKeys = selectedRowKeys
      }
    }
  });
  return page;
});
