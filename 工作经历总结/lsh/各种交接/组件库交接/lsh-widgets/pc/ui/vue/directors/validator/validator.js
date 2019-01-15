import {Deferred, when} from '../../../lib/deferred'
import on from '../../../lib/event'
import * as typeCheck from '../../../lib/typeCheck'
import Tip from '../../ui-others/../tip/tip'

function removeClass( el, name ) {
    el.className = (el.className || "").replace( name, "" ).trim();
}
function addClass( el, name ) {
    let ori = el.className || "";

    if ( ori.indexOf( name ) === -1 ) {
        el.className = ( ori + " " + name ).trim();
    }
}
function scrollTo( target ) {
    if ( !target ) {
        return;
    }

    var top = target.offsetTop;

    while ( target = target.offsetParent ) {
        top += target.offsetTop;
    }

    document.body.scrollTop = top;
}

(function ( global, factory ) {
    typeof exports == "object" && typeof module !== "undefined" ? module.exports = factory() :
        typeof define === "function" && define.amd && define( factory );
})( this, function () {
    function install( v ) {
        const targetElements = [ "input", "textarea", "select" ];
        const targetAttrs = [ "required", "pattern", "custom" ];
        const eventMap = {
            "input.text": "blur",
            "input.email": "blur",
            "input.tel": "blur",
            "input.checkbox": "change",
            "input.file": "change",
            "input.password": "blur",
            "input.radio": "change",
            "select": "change",
            "textarea": "blur"
        };

        const validator = {
            elements: [],
            result: {},

            init ( form, onSubmit = function () {}, customValidations = {} ) {
                this.el = form;

                this.el.reset = () => {
                    this.reset();
                };
                this.el.validateAll = () => {
                    this.validateAll();
                };

                // 所有待校验的元素
                this.elements = Array.from( this.getTargetEls() );
                this.elements.forEach( this.initialize.bind( this ) );

                // 需要校验的表单基本都是手动去提交的
                // 所以这里默认情况下会拦截表单的提交
                this.onSubmit = onSubmit;
                this.enhanceSubmit( form, this.elements, this.onSubmit );

                // 自定义校验所用到的各个校验函数
                this.customValidations = customValidations;

                // 组件绑定指令时可能还没有渲染出表单元素
                // 提供一个触发指令绑定事件的方法
                // TODO 寻找更优雅的方式来实现（update？）
                // this.vm.$on( "validator-attached", (function ( el ) {
                //     this.elements.push( el );
                //     this.initialize( el );
                // }).bind( this ) );
            },

            /* 各属性校验方法 */
            validators: {
                required ( el, value, _, validator ) {
                    let passed = false;
                    // radio是个比较特殊的元素
                    if ( el.type === "radio" ) {
                        validator.el.querySelectorAll( `input[name=${el.name}]` ).forEach( function ( radioBox ) {
                            if ( radioBox.checked ) {
                                passed = true;
                            }
                        } );
                    }

                    if ( value === "" || (el.type === "radio" && !passed) ) {
                        return Deferred.reject( el.getAttribute( "emsg" ) );
                    } else {
                        return Deferred.resolve();
                    }
                },

                pattern ( el, value, reg ) {
                    if ( !new RegExp( reg ).test( value ) ) {
                        return Deferred.reject( el.getAttribute( "cmsg" ) );
                    } else {
                        return Deferred.resolve();
                    }
                },

                custom ( el, value, handlerName, validator ) {
                    const customValidation = validator.customValidations[ handlerName ];
                    const def = new Deferred();

                    if ( typeCheck.isFunction( customValidation ) ) {
                        // 如果有校验函数，依赖于用户决定
                        customValidation( value, def );
                    } else {
                        // 否则认为是成功的
                        def.resolve();
                    }

                    return def.then( null, function ( msg = el.getAttribute( "cmsg" ) ) {
                        return Deferred.reject( msg );
                    } );
                }
            },

            /* 单元素校验 */
            validateElement ( el ) {
                const value = el.value.trim();
                const def = new Deferred();
                const validator = this;

                // 如果成功，成功回调返回对应dom的name和value
                // 如果失败，进行相应的错误处理，失败回调不返回任何东西
                when( ...targetAttrs.map( function ( attrToValidate /* 要校验的属性 */ ) {
                    if ( el.hasAttribute( attrToValidate ) ) {
                        return validator.validators[ attrToValidate ]( el, value, el.getAttribute( attrToValidate ), validator );
                    } else {
                        // 如果没有这个属性，直接成功
                        return Deferred.resolve();
                    }
                } ) ).then( function () {
                    validator.resetError( el );
                    def.resolve( validator.mapValue( el, value ) );
                }, function ( msg ) {
                    validator.setErrorPerformance( el, msg );
                } );

                return def;
            },

            /* 指定的一些元素和事件才做校验 */
            getTargetEvent ( el ) {
                return eventMap[ el.nodeName.toLocaleLowerCase() + "." + el.type ];
            },

            /* 单元素报错 */
            setErrorPerformance ( el, msg ) {
                addClass( el, 'field-error' );
                Tip.show( el, msg );
            },

            /* 报错重置 */
            resetError( el ) {
                removeClass( el, 'field-error' );
                Tip.hide( el );
            },

            reset () {
                Array.from( this.elements ).forEach( element => this.resetError( element ) );
            },

            mapValue ( el, input ) {
                let name, cur;
                let tempArray = [];

                // 必须有name属性
                if ( name = el.getAttribute( "name" ) ) {
                    if ( (el.type === "checkbox" || el.type === "radio") && !el.checked ) {return;}
                    // 如果已存在对应的值，则当做一组来对待
                    if ( cur = this.result[ name ] ) {
                        typeCheck.isArray( cur ) ? cur.push( input ) : (this.result[ name ] = [ cur, input ]);
                    } else {
                        this.result[ name ] = input;
                    }
                }
            },

            enhanceSubmit() {
                const validator = this;

                // 屏蔽H5的校验
                validator.el.setAttribute( "novalidate", "" );

                on( "submit", validator.el, new Proxy( validator.onSubmit, {
                    apply: function ( fn, context, args ) {
                        if ( typeCheck.isFunction( fn ) ) {
                            // 阻止表单提交
                            args[ 0 ].preventDefault();

                            // 重新收集结果集
                            validator.result = {};

                            // 表单预提交
                            // 校验通过以后直接执行业务层的真实提交逻辑
                            // 并把序列化的表单数据传给业务方
                            when( ...validator.elements.map( el => validator.validateElement( el ) ) ).then( function () {
                                fn( validator.result );
                            }, function () {
                                scrollTo( validator.el.querySelector( '.field-error' ) );
                                console.warn( "提交失败，表单校验未通过！" );
                            } );
                        }
                    }
                } ) );
            },

            /* 对外暴露的整体校验方法 */
            validateAll () {
                let validator = this;
                validator.result = {};
                when( ...this.elements.map( el => validator.validateElement( el ) ) ).then( function () {
                    typeCheck.isFunction( validator.onSubmit ) && validator.onSubmit( validator.result );
                }, function () {
                    scrollTo( validator.el.querySelector( '.field-error' ) );
                    console.warn( "提交失败，表单校验未通过！" );
                } );
            },

            /* 初始化获取所有目标元素 */
            getTargetEls () {
                var els = [];

                targetElements.forEach( function ( element ) {
                    targetAttrs.forEach( function ( attr ) {
                        els.push( `${element}[${attr}]` );
                    } );
                } );

                return this.elements = this.el.querySelectorAll( els.join() );
            },

            /* 单元素绑定校验事件 */
            initialize ( el ) {
                let event;

                // filter disabeld or hidden element
                if ( !el.disabled && ( typeof el.type && el.type !== "hidden" && (event = this.getTargetEvent( el ))) ) {
                    on( event + ".validator", el, this.validateElement.bind( this, el ) );
                }

            }
        };

        v.directive( "validate", {
            bind ( form, binding ) {
                Object.assign({}, validator).init( form, binding.value.onSubmit, binding.value.customValidations );
            }
        } );
    }

    return install;
} );