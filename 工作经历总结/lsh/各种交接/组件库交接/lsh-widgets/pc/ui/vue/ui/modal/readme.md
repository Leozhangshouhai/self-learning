# Modal

## 版本
V1.0

## 简述

Modal组件为一个模态框，提供模态框显隐操作方法及回调操作。

## 快速入门

### 1. 引入组件

组件基于Vue框架，在引入组件之前需要先引入Vue；

```javascript
// PATH为当前开发目录相对与pc/目录的相对路径
import Vue from 'PATH/ui/third-party/vue';
import Modal from 'PATH/ui/vue/ui/modal/modal';
```

### 2. 简单示例

使用Modal展示一段说明文案，如下：

HTML

```html
<div class="test">
    <my-modal ref="modal">
        <article slot="body">
            <h3>说明文案</h3>
            <p>这是Modal的说明文案第一段！！！！</p>
            <p>这是Modal的说明文案第二段！！！！</p>
        </article>
    </my-modal>
</div>
```

通过`solt="body"`可以定义Modal主体部分的内容或DOM结构。在自定义的`my-modal`标签中定义ref属性及值，方便获取组件实例。

JS

```javascript
// PATH为当前开发目录相对与pc/目录的相对路径
import Vue from 'PATH/ui/third-party/vue';
import Modal from 'PATH/ui/vue/ui/modal/modal';

new Vue({
    el: ".test",
    data() {
        return {}
    },
    components: {
        'my-modal': Modal({
            title: "说明",
            onConfirm() {
                console.log("执行了一次点击确认按钮的回调函数");
                this.$refs.modal.hide();
            },
            // 若不定义onCancel的回调方法，则modal底部默认只显示确认按钮
            // 若定义onCancel则显示取消按钮
            onCancel() {
                console.log("执行了一次点击取消按钮的回调函数");
                this.$refs.modal.hide();
            }
        })
    }
})
```

## 入口参数

**Modal(options)**

| 参数 | 必选 |类型 | 描述 |
| --- | --- | --- | --- |
| options | false | Object | Modal配置参数 |

在使用组件时，需要在JS文件中实例化组件。

## options

| 参数 | 类型 | 必要 | 描述 | 默认值 |
| --- | --- | --- | --- | --- |
| title | String | false | 定义Modal头部标题文案 | |
| closeBtn | Boolean | false | 是否显示右上角的关闭按钮，默认显示 | true |
| confirmText | String | false | 设置确认按钮文案 | "确认" |
| cancelText | String | false | 设置取消按钮文案 | "取消" |
| onConfirm | Function | false | 定义点击确认按钮的回调方法 | noop |
| onCancel | Function | false | 定义点击取消按钮的回调方法，默认方法会关闭Modal，若重新定义了此方法，需要手动调用Modal的hide方法来关闭Modal | (() => {this.hide();}) |
| onClose | Function | false | 定义关闭按钮的回调方法 |  |

## API

| 函数名 | 返回类型 | 描述 |
| :--- | :--- | :--- |
| show()| null | 显示Modal |
| hide() | null | 隐藏Modal |



---------

---------

# Alert

## 版本
V1.0

## 简述

基于Modal组件封装的Alert弹框，模拟原生alert效果且保证整站UI统一性。

## 快速入门

### 1. 引入组件

组件基于Vue框架，在引入组件之前需要先引入Vue；组件基于Modal组件进行封装，在使用组件前请确保项目中包含`/pc/ui/vue/ui/modal/`下的所有文件。组件依赖于`/pc/ui/lib`下提供的`typeCheck.js`，在使用组件前请确保已经引入该文件。**注意不要轻易修改引入依赖文件路径结构，若有路径调整，需要修改组件源码中的文件依赖相关代码。** 在使用Alert组件之前要确认页面已经引入`basic.js`，Alert对Modal的封装中调用了`basic.js`中的方法。

在页面中引入basic.js

```javascript
// 页面引入basic.js, PATH_NAME表示你的路径
<script type="text/javascript" src="PATH_NAME/ui/vue/basic.js"></script>
```

在业务层js开发中引入组件

```javascript
// PATH为当前开发目录相对与pc/目录的相对路径
import Modal from 'PATH/ui/vue/ui/modal/alert/alert';

// 注册组件，
// $$Component为basic.js封装的注册组件方法
$$Component('my-alert', Alert);

// 页面根实例，$$Page为basic层封装并扩展的new Vue方法
$$Page({
    data() {
        return {}
    }
    listeners: {
        'click .alert-demo': function(e, vm) {
            vm.$refs.alert.show("我是一个alert", () => {
                console.log("执行了一次点击确认按钮的回调函数");
            })
        }
    }
});
```

HTML

```html
<div class="test">
    <my-alert ref="alert"></my-alert>
    <button class="alert-demo">alert demo</button>
</div>
```

## API

| 函数名 | 返回类型 | 描述 |
| :--- | :--- | :--- |
| show(msg, callback) | null | 显示Alert，可传入两个参数，第一个参数msg为提示文案配置，第二个参数callback为点击确认按钮后触发的回调方法 |
| hide() | null | 隐藏Alert |

---------

---------

# Confirm

## 版本
V1.0

## 简述

基于Modal组件封装的Confirm弹框，模拟原生confirm效果且保证整站UI统一性。

## 快速入门

### 1. 引入组件

组件基于Vue框架，在引入组件之前需要先引入Vue；组件基于Modal组件进行封装，在使用组件前请确保项目中包含`/pc/ui/vue/ui/modal/`下的所有文件。组件依赖于`/pc/ui/lib`下提供的`typeCheck.js`，在使用组件前请确保已经引入该文件。**注意不要轻易修改引入依赖文件路径结构，若有路径调整，需要修改组件源码中的文件依赖相关代码。** 在使用Confirm组件之前要确认页面已经引入`basic.js`，Confirm对Modal的封装中调用了`basic.js`中的方法。

在页面中引入basic.js

```javascript
// 页面引入basic.js, PATH_NAME表示你的路径
<script type="text/javascript" src="PATH_NAME/ui/vue/basic.js"></script>
```

在业务层js开发中引入组件

```javascript
// PATH为当前开发目录相对与pc/目录的相对路径
import Modal from 'PATH/ui/vue/ui/modal/confirm/confirm';

// 注册组件，
// $$Component为basic.js封装的注册组件方法
$$Component('my-confirm', Confirm);

// 页面根实例，$$Page为basic层封装并扩展的new Vue方法
$$Page({
    data() {
        return {}
    }
    listeners: {
        'click .confirm-demo': function(e, vm) {
            vm.$refs.alert.show("我是一个confirm", () => {
                console.log("执行了一次点击确认按钮的回调函数");
            }, () => {
                console.log("执行了一次点击取消按钮的回调函数");
            })
        }
    }
});
```

HTML

```html
<div class="test">
    <my-confirm ref="confirm"></my-confirm>
    <button class="confirm-demo">confirm demo</button>
</div>
```

## API

| 函数名 | 返回类型 | 描述 |
| :--- | :--- | :--- |
| show(msg, onConfirm, onCancel) | null | 显示Confirm，可传入三个参数，第一个参数msg为提示文案配置，第二个参数onConfirm为点击确认按钮后触发的回调方法，第三个参数onCancel为点击取消按钮后触发的回调方法 |
| hide() | null | 隐藏Confirm |
