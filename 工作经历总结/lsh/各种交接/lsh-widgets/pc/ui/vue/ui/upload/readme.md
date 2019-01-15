# Upload

## 版本
V1.0

## 简述

Upload组件提供excel、image等文件上传功能。使用FormData实现。

## 快速入门

### 1. 引入组件

注：组件依赖于`/pc/ui/lib`下提供的`deferred.js`、`typeCheck.js`，以及`/pc/ui/ui-othors/`下的Loading组件、`/pc/ui/vue/ui/modal/alert`下的Alert组件，请确认在引入组件之前项目下已经引入这些文件。**注意不要轻易修改引入依赖文件路径结构，若有路径调整，需要修改组件源码中的文件依赖相关代码。** 由于Upload组件中注册的Alert组件，调用了`basic.js`提供的API，在使用Upload组件之前要确认页面已经引入`basic.js`。

在页面中引入basic.js

```javascript
// 页面引入basic.js, PATH_NAME表示你的路径
<script type="text/javascript" src="PATH_NAME/ui/vue/basic.js"></script>
```

```javascript
// PATH为当前开发目录相对与pc/目录的相对路径
import Upload from 'PATH/ui/vue/ui/upload/upload';
```

### 2. 简单示例

在业务层注册一个Upload组件，上传文件格式为图片格式，文件接收路径为`/test/upload`：

```html
<upload></upload>
```

```javascript
// PATH为当前开发目录相对与pc/目录的相对路径
import Upload from 'PATH/ui/vue/ui/upload/upload';

$$Component('upload', Upload, {
    url: "/test/upload"
    textHtml: "上传图片测试按钮",
    fileType: "image",
    onSuccess (res, file, vm) {
        vm.$refs.fileAlert.show("上传成功", () => {
            location.reload();
        });
    },
    onError (msg, file, vm) {
        vm.$refs.fileAlert.show(msg || "上传失败");
    }
});
```

## 入口参数

**Upload(options)**

| 参数 | 必选 |类型 | 描述 |
| --- | --- | --- | --- |
| options | false | Object | Upload配置参数 |

## options

| 参数 | 类型 | 必要 | 描述 | 默认值 |
| --- | --- | --- | --- | --- |
| name | String | false | 上传表单的字段名，[type="file"]的name属性值 | "fileUp" |
| url | String | true | 上传url地址 |  |
| textHtml | String | false | 上传显示按钮文案 | "上传" |
| emptyMsg | String | false | 文件为空报错文案 | "请选择文件" |
| typeError | String | false | 文件格式错误报错文案 | "文件格式错误，请重新上传" |
| fileType | String | false | 上传文件类型，参数值为"excel"/"image"，分别对excel文件与图片进行格式校验 | "excel" |
| onSuccess(response, files, vm) | Function | false | 上传成功回调函数，第一个参数为请求返回结果，第二个参数为上传文件对象，第三个参数为Upland的viewModel实例 | noop |
| onError(response, files, vm) | Function | false | 上传失败回调函数，第一个参数为请求返回结果，第二个参数为上传文件对象，第三个参数为Upland的viewModel实例 | noop |

## API

目前Upload组件暂不对外暴露方法。
