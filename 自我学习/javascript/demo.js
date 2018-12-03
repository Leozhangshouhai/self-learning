






// 各种小的 原生的JS语法和注解


for (var i = 0; i < 3; i++) {
    setTimeout(function () {
        console.log('i=' + i);
    }, 1000)
}
// 这是经常遇到的，但是这里结果会打印3次  i=3;  因为setTimeout是一个异步执行队列任务，所以，当执行console.log(i)的时候，for早已经循环完毕，所以i=3会被打印3次。现做出如下修改
// 1:闭包存值
 
for (var i = 0; i < 3; i++) {
    (function (i) {
        setTimeout(function () {
            console.log('i=' + i);
        }, 1000)
    })(i)
}
//2:块级作用域存值
for (let i = 0; i < 3; i++) {

    setTimeout(function () {
        console.log('i=' + i);
    }, 1000)

} 
//可以利用闭包，做如下修改,把每次的i  保存在一个封闭的环境，这里采用了匿名的自执行函数（也可以用显示函数）。 当时间函数顺着作用域链查找时，会先找到封闭在闭包环境重的i，
//所以下列结果打印就是 i=1,i=2,i=3


/*
 apply/call 

    区别：第一个参数都死this上下文，参数，appl是所有参数为数组（不确定有多少个参数），call是确定参数个数，
    obj1.fn.call(obj2,arg1,arg2,arg3) == obj1.fn.apply(obj2,arguments) ;  - - - obj2调用obj1下的fn 方法
*/
var obj1 = {
        fn() {
            this.b = '456';
        }
    },
    obj2 = {};
obj1.fn.apply(obj2, []);
console.log(obj1.b); //  undefined
console.log(obj2.b); //  456



/* 

函数节流 ：

    如：window.onresize/mousemove/文件上传等事件，需要大量的重复触发，而显然对于用户，没必要如此频繁的去触发事件。
    这是就可以利用setTimeout来做函数节流，即按照我们要求（例：每1000毫秒执行一次）。

*/
var throttle = function (fn, interval) {
    var _self = fn,
        timer, firstTime = true;
    return function () {
        var args = arguments,
            _me = this;
        if (firstTime) {
            _self.apply(_me, args);
            return firstTime = false;
        }
        if (timer) {
            console.log(timer)
            return false;
        }
        timer = setTimeout(function () {
            _self.apply(_me, args);
            clearTimeout(timer);
            timer = undefined;

        }, interval || 1000)
    }
};
window.onresize = throttle(() => {
    console.log(1232);
}, 1000)


/*
 * 单例模式：保证一个类仅有一个实例，并且提供一个能访问天的全局访问点
 * 通用的惰性单例模式：遵从单一职责，唯一性，使用时才创建 
 * 
 */
var getSignle = (fn) => {
    //  通用单例方法
    var result;
    return () => {
        return result || (result = fn.apply(this.arguments));
    }
};
var createLogin = () => {
    var div = document.createElement('div');
    div.innerHTML = '我是登陆框';
    div.style.display = 'none';
    document.body.appendChild(div);
    return div;
}
var createSignleLogin = getSignle(createLogin);
document.getElementById('loginBtn').onclick = () => {
    var loginDiv = createSignleLogin();
    loginDiv.style.display = "block";
}


/**
 * 策略模式：
 * 
 * */