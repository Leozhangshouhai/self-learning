/**
 * Created by leo on 2017/3/23.
 */
/*
* 实例可以再jasmine官网ctrl+F 搜到*/
    // 验证调用次数
    //expect(foo.setBar).toHaveBeenCalledTimes(2);
    //验证是否调用
    //expect(foo.setBar).toHaveBeenCalled();
    //匹配历史调用记录
    // expect(foo.setBar).toHaveBeenCalledWith(123);
    //spyOn(foo, 'setBar');
    // 在foo对象上添加spy
    // 此时调用foo对象上的方法，均为模拟调用，因此不会执行实际的代码.实际代码不会改变
    // and.callThrough():追踪最真实的调用
    // and.returnValue();所有的调用都返回一个特殊的值
    //  and.returnValues()： 返回一个系列的特定的值，按照调用顺序匹配，
//and.callFake()，所有调用该spy的都将调用其提供的函数
//and.throwError()，调用该spy的将以一个错误的形式抛出特殊返回值，
//and.stub(),Spy链式调用以上某一个策略后，可以调用and.stub随时返回之前保存的原始数据，而不进行修改。
//1. .calls.any()：一次都没调用时返回false，一旦调用至少一次就返回true；
//2. .calls.count()：返回spy调用的次数
//3. .calls.argsFor(index)：返回第index+1次调用时传递的参数，index从0开始；
//4. .calls.allArgs()：以数组的形式返回调用时传递的所有参数；
//5. .calls.all()：以对象形式返回上下文（this），以及所有传递的参数；
//6. .calls.mostRecent()：以对象形式返回最近一次调用的上下文（this），以及传递的参数；
//7. .calls.first()：以对象形式返回第一次调用的上下文（this），以及传递的参数；（当检查.calls.all()，.calls.mostRecent()，.calls.first()返回的对象时，.object属性指向的是调用该spy的this对象）
//8. .calls.reset()：清空spy的所有追踪。
//如果没有一个函数可以spyOn，jasmine.createSpy可以创建一个“空白”的spy。该spy会像其他间谍一样追踪调用，函数等等，但是在其之后并不会有实际实现的返回值
//为了创建一个多重spies的模拟，使用jasmine.createSpyObj()并传递一个字符串的数组，将会返回一个对象，对象包括每个字符串绑定的spy属性
//jasmine.any传递一个构造函数（constructor）或者“类”（class）作为一个期望值，如果实际构造函数和传递的参数相同则返回true
//jasmine.objectContaining()用于匹配那些只关心实际值中是否存在预测键值对的时候，若存在则返回true
//jasmine.stringMatching()用于你不想在一个较大的对象精确匹配字符串时，或者只是匹配spy预测值的部分字符串时，匹配成功返回true
describe("算法测试", function () {
    describe('冒泡算法', function () {
        var demo;
        beforeEach(function () {
            demo = function () {
                for (var i = 0; i < 12; i++) {
                    i++;
                }
                return true
            };
        });
        it('时间冒泡', function () {
            var start = "12:23";
            var end = '23:45';
            expect(false).toBe(air_price.order_by_time(start, end));
            expect(air_price.order_by_time(start, end)).toBeFalsy();
            //expect(demo).toThrow()
        });
        it('联合验证排序', function () {
            var arr = [
                {
                    timediff: '1小时32分钟',
                    id: 32
                }, {
                    timediff: '1小时42分钟',
                    id: 42
                }, {
                    timediff: '1小时22分钟',
                    id: 22
                },
            ];
            var rightarr = [
                {
                    timediff: '1小时42分钟',
                    id: 42
                }, {
                    timediff: '1小时32分钟',
                    id: 32
                }, {
                    timediff: '1小时22分钟',
                    id: 22
                }];
            expect(rightarr).toEqual(air_price.bubbling_order(arr, 'speed'));
        })

        it('函数模块检测', function () {
            //demo();
            var bar = function () {
                return 1 + 1;
            };
            var ber = function () {
                throw 'error';
            };
            var brr = function () {
                throw 'what';
            };
            expect(bar).not.toThrow();
            expect(ber).toThrow('error');
            expect(brr).toThrow('what');
            //expect(demo).toThrowError('error');
        });
        it("The 'toThrowError' matcher is for testing a specific thrown exception", function () {
            var foo = function () {
                throw new TypeError("foo bar baz");
            };

            expect(foo).toThrowError("foo bar baz");
            expect(foo).toThrowError(/bar/);
            expect(foo).toThrowError(TypeError);
            expect(foo).toThrowError(TypeError, "foo bar baz");
        });
        describe('A spec using beforeAll and afterAll', function () {
            var foo;
            beforeAll(function () {
                foo = 1;
            });

            afterAll(function () {
                foo = 0;
            });

            it("sets the initial value of foo before specs run", function () {
                expect(1).toEqual(foo);
                foo += 1;
            });

            it("does not reset foo between specs", function () {
                expect(foo).toEqual(1);
            });
            it("can be declared by calling 'pending' in the spec body", function () {
                expect(true).toBe(false);
                pending('this is why it is pending');
            });
            it("does not reset foo between specs", function () {
                expect(foo).toEqual(1);
            });
        });
        describe("A spy", function () {
            var foo, bar = 21143,newss;

            beforeEach(function () {
                foo = {
                    setBar: function (value) {
                        bar = value;
                    },
                    sss:function(){
                        return  bar;
                    },
                    aaa:function(){
                        newss=12345;
                        return newss;
                    }
                };
                spyOn(foo, 'setBar').and.callThrough();
                  spyOn(foo, 'sss');
                spyOn(foo, "aaa").and.returnValues('www',"fetched first", "fetched second");

                foo.setBar(123);
                foo.setBar(456, 'another param');
               foo.sss();
               foo.aaa();
            });
            it("when called multiple times returns the requested values in order", function() {
                expect(foo.aaa()).toEqual("fetched first");
                expect(foo.aaa()).toEqual("fetched second");
                expect(foo.aaa()).toBeUndefined();
            });

            it("tracks that the spy was called", function () {
                //验证是否调用
                //expect(foo.setBar).toHaveBeenCalled();
                expect(bar).toEqual(456);

            });


            it("tracks that the spy was called x times", function () {
                // 验证调用次数
                //expect(foo.setBar).toHaveBeenCalledTimes(2);
            });

            it("stops all execution on a function", function () {
                //验证是否为空,前面是模拟调用
                expect(bar).toBeNull();
            });
            it("tracks all the arguments of its calls", function () {
                //匹配历史调用记录
                expect(foo.setBar).toHaveBeenCalledWith(123);
                expect(foo.setBar).toHaveBeenCalledWith(456, 'another param');
            });


        });
    });
    describe("A spy, when configured to throw an error", function() {
        var foo, bar;

        beforeEach(function() {
            foo = {
                setBar: function(value) {
                    bar = value;
                }
            };
            spyOn(foo, "setBar").and.throwError("quux");
        });

        it("throws the value", function() {
            expect(function() {
                foo.setBar(123)
            }).toThrowError("quux");
        });
    });
    describe("A spy", function() {
        var foo, bar = null;

        beforeEach(function() {
            foo = {
                setBar: function(value) {
                    bar = value;
                }
            };

            spyOn(foo, 'setBar').and.callThrough();
        });

        it("can call through and then stub in the same spec", function() {
            foo.setBar(123);//调用策略and.callThrough()所定义的spy
            expect(bar).toEqual(123);//bar数值被修改为123

            foo.setBar.and.stub();//调用and.stub(),保存前面的数值

            bar = null;

            foo.setBar(2343);//调用spy
            expect(bar).toBe(null);//bar不再返回and.callThrough()的实现值
        });
    });

});