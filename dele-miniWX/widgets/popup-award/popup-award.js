// widgets/popup-award.js

const {
  $Message
} = require('../../widgets/base/index.js');
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type:Boolean,
      value: true,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    code:''
  },
  
  /**
   * 组件的方法列表
   */
  methods: {
    _hidePup(e) {
      var is_box = e.currentTarget.dataset.box ? true : false;
      if (is_box) {
        this.setData({
          show: true
        })
      }
      console.log(e.currentTarget.dataset.box);
    },
    myCatchTouch() {
      return false;
    },
    _sureBtn(){
      if(this.data.code==""){
        $Message({
          content: "优惠券码不能为空 ",
          type: 'error'
        });
        return false;
      }
      this.setData({
        show: false
      });
      this.triggerEvent('outerEvent',this.data.code);
    },
    _setVal(e){
      this.setData({
        code:e.detail.value
      })
    
    }
  }
})
