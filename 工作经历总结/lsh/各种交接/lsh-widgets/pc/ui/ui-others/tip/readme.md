# Tip

## 版本
V1.0

## 简述

提示浮层UI控件。

## 引入组件

```javascript
// PATH为当前开发目录相对与pc/目录的相对路径
import Tips from 'PATH/ui/ui-othors/tip/tip';
```

## 简单示例

```html
<button onclick="testTip" class="test-tip">test tip</button>
```

```javascript
const el = document.querySelector(".test-tip");
function testTip() {
    Tips.show(el, "tip demo");
    setTimeout(() => {
        Tips.hide(el);
    }, 3000);
}
```

## API

| 函数名 | 返回类型 | 描述 |
| :--- | :--- | :--- |
| show(targetEl, msg)| null | 显示Tip，第一个参数为目标元素（目标元素用于做tip的定位参考），第二个参数为显示文案配置 |
| hide(targetEl) | null | 关闭Tip，参数为目标元素 |
