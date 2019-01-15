# Validator

## 版本
V1.0


## 简述

Validator组件为表单提供定制的验证功能，基本满足项目开发过程中的表单校验需求，使用简单、灵活。


## 快速入门

### 1. 原理

表单元素触发blur、change、click事件，获取当前表单元素value值，判断元素值是否符合该元素配置的所有校验规则，并处理校验结果。处理结果最终以正误状态的不同样式表示。

### 2. 引入组件

注：组件依赖于`/pc/ui/lib`下提供的`deferred.js`，`event.js`，`typeCheck.js`文件，请确认在引入组件之前项目下已经引入这些文件。组件做提示需要依赖Tip组件，请确认在引入组件之前项目下已经引入`/pc/ui/ui-others/tip`下所有文件。**注意不要轻易修改引入依赖文件路径结构，若有路径调整，需要修改组件源码中的文件依赖相关代码。**

```javascript
    // PATH为当前开发目录相对与pc/目录的相对路径
    // 引入Vue
    import Vue from 'PATH/ui/third-party/vue';
    // 引入validator
    import Validator from 'PATH/ui/vue/directors/validator';
    Vue.use(Validator);
```

### 3. 简单示例

实现一个对输入框进行非空校验、错误提示信息为“请输入用户名!”的效果，可通过组件提供的required、emsg属性实现，如下：

HTML

```html
<form novalidate v-validate="{onSubmit: submitForm}">
    <fieldset>
        <label>账户名</label>
            <input v-model="username" name="username"
                   required emsg="请输入用户名"/>
    </fieldset>
</form>
```

JS

```javascript
new Vue({
        data() {
            return {
                username: ""
            }
        },
        methods: {
            submitForm (formData) {
                console.log(formData);
            }
        }
    }
)
```

上述示例中，通过v-validate指令绑定校验通过后的回调方法onSubmit，方法实现定义在Vue实例的methods下，回调方法的第一个参数为需要校验的表单数据。

### 4. 正则校验

对于input和textarea，多数情况有通过正则校验来限制输入内容的需求，可通过组件提供的pattern、cmsg属性实现。例如校验输入手机号的合法性，实现如下：

```html
<form novalidate v-validate="{onSubmit: submitForm}">
    <fieldset>
        <label>账户名</label>
            <input v-model="phone" name="phone"
                   pattern="^1[34578]\d{9}$" cmsg="手机号格式不正确"/>
    </fieldset>
</form>
```

```javascript
new Vue({
        data() {
            return {
                phone: ""
            }
        },
        methods: {
            submitForm (formData) {
                console.log(formData);
            }
        }
    }
)
```

pattern属性是正则校验规则，cmsg为不满足此校验规则时的错误提示信息。

### 5. 整体校验

包含校验属性的表单元素，组件触发校验的条件是blur、change，点击表单中的`<button>`元素，可以触发表单的整体校验，所以建议在编写form表单时，若希望某些按钮的点击操作不触发整体校验事件，推荐使用其他标签替代，如`<a>`等。

```html
<form novalidate v-validate="{onSubmit: submitForm}">
    <fieldset>
        <label>账户名</label>
            <input v-model="username" name="username"
                   required emsg="请输入用户名"/>
    </fieldset>
    <fieldset>
        <label>账户名</label>
            <input v-model="phone" name="phone"
                   pattern="^1[34578]\d{9}$" cmsg="手机号格式不正确"/>
    </fieldset>
    <button>提交</button>
</form>
```

```javascript
new Vue({
        data() {
            return {
                username: "",
                phone: ""
            }
        },
        methods: {
            submitForm (formData) {
                console.log(formData);
            }
        }
    }
)
```

有时候，若触发表单整体校验的按钮不是当前form表单节点的子节点，则要想触发表单的整体校验，则可以使用指令实例的`validateAll()`方法。

```html
<button @click="submitAll">提交</button>
<form novalidate v-validate="{onSubmit: submitForm}" ref="testForm">
    <fieldset>
        <label>账户名</label>
            <input v-model="username" name="username"
                   required emsg="请输入用户名"/>
    </fieldset>
    <fieldset>
        <label>账户名</label>
            <input v-model="phone" name="phone"
                   pattern="^1[34578]\d{9}$" cmsg="手机号格式不正确"/>
    </fieldset>
</form>
```

```javascript
new Vue({
        data() {
            return {
                username: "",
                phone: ""
            }
        },
        methods: {
            submitForm (formData) {
                console.log(formData);
            },
            submitAll () {
                this.$refs.testForm.validateAll();
            }
        }
    }
)
```

通过`validateAll()`方法触发整体校验，校验通过后相关处理逻辑还是在`v-validate`绑定的`onSubmit`回调方法中编写。

以上内容，基本可以满足大部分简单的表单开发需求。下文将详细介绍Validator组件及组件更多的使用方法。

---

## 校验规则配置

组件通过配置表单元素的Attribute属性，可进行个性化的控件的校验规则设置。

| 属性 | 必要 | 说明 | 适用元素 |
| :---: | :--- | :--- | :--- | :--- |
| required | false | 进行非空校验 | input/textarea/select |
| emsg | false | 输入为空时的提示信息，前提是配置required | input/textarea/select |
| pattern | false | 自定义一个正则表达式校验规则 | input/textarea |
| custom | false | 设置自定义事件，custom值为事件名，绑定事件后，校验时会触发同名事件 | input/textarea/select |
| cmsg | false | 输入不满足自定义校验规则的提示信息，前提是配置pattern | input/textarea；或配置了custom自定义事件时，返回Promise的reject状态时 |

除快速入门一节列举的最常用的四个属性外，这里再介绍一个实用的属性。

### 1. custom

custom可用来配置自定义事件，如自定义一个名为“testCustom”事件，检验过程会触发一个同名事件。该事件的逻辑处理过程被定义为一个Promise对象，当返回状态为reject时，会显示cmsg中的内容。如下，实现是个新旧密码输入不能相同的例子：

```html
<form novalidate v-validate="{onSubmit: submitForm, customValidations: {validNewPwd: validNewPwd}}">
    <fieldset>
        <label>旧密码</label>
        <input v-model.trim="oldPwd" type="password" required emsg="旧密码不能为空"/>
    </fieldset>
    <fieldset>
        <label>新密码</label>
        <input v-model.trim="newPwd" type="password"
               required emsg="新密码不能为空" custom="validNewPwd" cmsg=""/>
    </fieldset>
</form>
```
`customValidations`属性为一个Object，可定义多个自定义方法，`custom`属性定义的字符串为Object的属性key，Object的属性value为Vue实例的`methods`属性下的方法。

```javascript
new Vue({
        data() {
            return {
                oldPwd: "",
                newPwd: ""
            }
        },
        methods: {
            submitForm (formData) {
                console.log(formData);
            },
            validNewPwd (_, def) {
                let vm = this;
                if (vm.oldPwd === vm.newPwd) {
                    // 调用reject方法校验不通过
                    def.reject('新旧密码不能相同');
                } else {
                    // 调用resolve方法通过校验
                    def.resolve();
                }
            }
        }
    }
)
```

---


## API

组件提供的一些内置方法便于使用。

| 函数名 | 返回类型 | 描述 |
| :--- | :--- | :--- |
| validateAll()| null | 用于触发表单中绑定了校验属性的表单元素的整体校验 |
| reset() | null | 重置表单校验结果 |


### 1. reset()

组件默认会在验证表单合法后重置校验组的状态，即恢复到无错误显示的样式。如果想手动将错误状态的校验组恢复为最初状态，可使用reset()函数：

```html
<button @click="resetForm">提交</button>
<form novalidate v-validate="{onSubmit: submitForm}" ref="testForm">
    <fieldset>
        <label>账户名</label>
            <input v-model="username" name="username"
                   required emsg="请输入用户名"/>
    </fieldset>
    <fieldset>
        <label>账户名</label>
            <input v-model="phone" name="phone"
                   pattern="^1[34578]\d{9}$" cmsg="手机号格式不正确"/>
    </fieldset>
</form>
```

```javascript
new Vue({
        data() {
            return {
                username: "",
                phone: ""
            }
        },
        methods: {
            submitForm (formData) {
                console.log(formData);
            },
            resetForm () {
                this.$refs.testForm.reset();
            }
        }
    }
)
```

---
