/**
 * 基于jQuery  的 vue 图片上传组件

 * 传入参数 target 上传组件绑定的对象
 *         name 用于确定匹配关系的唯一标识
 *         url 上传url
 *         width 上传控件宽度
 *         height 上传控件高度
 *         src 用于回显的属性名，最多支持三级，如 img一级 img.small两级 img.small.bgImg三级
 *
 * 抛出事件 uploaded
 * 抛出事件参数  target 上传组件绑定的目标对象
 *             res.content 上传成功的content信息
 * by: Mingxu 2017-04-17
 */
var $ = require('../lib/jquery/jquery');

var TEMP = [
    '<label class="label-upload"',
           ':style="\'background-image:\'+\'url(\'+imgSrc+\');width:\'+width+\'px;height:\'+height+\'px;\'"',
           ':for="\'upload\'+name">',
      '<span :class="imgSrc?\'hide\':\'show\'">点击上传图片</span>',
      '<input :id="\'upload\'+name" class="hide" type="file" @change="fileUpload($event,target)">',
    '</label>'
].join("");
// 图片上传组件
var ImageUpload = {
    data: function() {
        return {}
    },
    template: TEMP,
    props: [
        "target", "name", "url", "width", "height","src"
    ],
    computed:{
      // 预览最多支持三级内部属性设置 如 img一级 img.small两级 img.small.bgImg三级
      imgSrc:function(){
          var src = this.src.split(".");
          if (this.target) {
              if(src.length === 1){
                return this.target[src[0]];
              }else if(src.length === 2){
                return this.target[src[0]][src[1]];
              }else if(src.length === 3){
                return this.target[src[0]][src[1]][src[2]];
              }
          }
      }
    },
    methods: {
        fileUpload: function($event, target) {
            var that = this;
            var files = $event.target.files;
            this.upload(files, target)
            .done(function(response){
                var res = JSON.parse(response.match(/{\"ret.+}/m)[0]);
                that.handlerSuccess(res, target);
            })
            .fail(function(err){
                that.handlerFail(err, target);
            });
        },
        upload: function(files) {
            var that = this;
            var formData = new FormData();

            formData.append("fileUp", files[0]);

            return $.ajax({
                url: that.url,
                type: "POST",
                dataType: "html",
                data: formData,
                processData: false, // 告诉jQuery不要去处理发送的数据
                contentType: false // 告诉jQuery不要去设置Content-Type请求头
            });
        },
        // 成功处理操作
        handlerSuccess: function (res, target) {
            this.$emit("uploadedSuccess", target, res.content);
        },
        // 失败处理操作
        handlerFail: function (err, target) {
            this.$emit("uploadedFail", target, err.msg);
        }
    }
}

module.exports = ImageUpload;
