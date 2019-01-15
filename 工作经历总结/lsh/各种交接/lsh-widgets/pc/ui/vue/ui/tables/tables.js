import template from 'template';
import Storage from '../../../lib/storage';
import * as typeCheck from '../../../lib/typeCheck'
import {fetch} from '../../../lib/fetch';
import Pages from '../pages/pages';
import scrollable from '../../../ui-others/scrollable/scrollable';

var conf = window.conf || {};
var cmsConfig = conf.cmsData && conf.cmsData.tables || {};

const tools = {
    getPlainObject ( obj ) {
        return typeCheck.isPlainObject( obj ) ? obj : {};
    },

    dateFormat ( date ) {
        date = new Date( date );
        const o = {
            "M+": date.getMonth() + 1, //月份
            "d+": date.getDate(), //日
            "h+": date.getHours(), //小时
            "m+": date.getMinutes(), //分
            "s+": date.getSeconds(), //秒
            "q+": Math.floor( (date.getMonth() + 3) / 3 ), //季度
            "S": date.getMilliseconds() //毫秒
        };

        if ( /(y+)/.test( format ) ) {
            format = format.replace( RegExp.$1, (date.getFullYear() + "").substr( 4 - RegExp.$1.length ) );
        }

        for ( var k in o ) {
            if ( new RegExp( "(" + k + ")" ).test( format ) ) {
                format = format.replace( RegExp.$1, (RegExp.$1.length == 1) ?
                    (o[ k ]) : (("00" + o[ k ]).substr( ("" + o[ k ]).length )) );
            }
        }
        return format;
    }
};

export default function ( tableConfig = {} ) {
    // 传给Vue的data
    let config = Object.assign( {
        // 如果分页，则Table需要等待Pages初始化完成
        initialized: false,

        // 默认是分页的
        paging: true,

        // 勾选功能
        selectable: false,
        // 勾选数据集对应的index列表
        // Vue本身不会对勾选的数据做排序，数组内数据的顺序是跟勾选的先后顺序有关的
        // 所以这里先存一份index的列表，然后对其做排序
        // 再从dataResource.list里边按照排序好的序号依次把数据取出来存到checkeditems里边
        checkedindex: [],
        // 丢给外面使用的勾选项数据集
        checkeditems: [],
        // 全选checkbox的v-model，用来与其余复选框相互响应
        allchecked: false,

        // 异步请求的URL
        url: "",
        // 列表主数据
        dataResource: {},


        // 主数据筛选项
        // 来源于Table本身、Search和分页
        params: {},
        // 默认参数
        defaultParams: {},

        // 分页的相关配置
        pages: {
            // 滚动加载, 优先级高于普通分页
            scrollPaing: false,

            // 默认一页50条数据
            size: 50
        },

        // 有些表项可能只是需要简单的根据搜索的conf做下匹配
        // 最常见的就是type
        searchConf: {},

        STORAGENAME: "ComponentTable",
        SORTNAME: "sort",

        errorMessage: "数据请求错误！"
    }, {
        thead: cmsConfig.thead,
        url: cmsConfig.dataUrl,
        sumcontent: cmsConfig.sumcontent
    }, tableConfig );

    // 传给Vue的methods
    const contentFilters = tools.getPlainObject( tableConfig.filters );

    let methods = {
        // 表项内容
        renderTdContent ( head, body ) {
            var key = head.key;

            // 有的表列使用的是同一字段，且是object类型
            // 这里可以用flag做一级区分
            var flag = head.flag;

            // 内置的一些工具
            var type = head.type;

            // 外部自定义的filter
            if ( typeCheck.isFunction( contentFilters[ key ] ) ) {
                return contentFilters[ key ]( body[ key ], body, flag );
            }

            // 根据搜索的conf做匹配
            if ( head.withConf ) {
                return this.searchConf[ key ][ body[ key ] ];
            }

            // 日期格式化
            if ( type === "date" || type === "time" ) {
                return this.dateFormat( body[ head.key ] * 1000, head.type == "day" ? "yyyy-MM-dd" : "yyyy-MM-dd hh:mm:ss" );
            }

            // 数字类型的数据, 转义成字符串可处理0这些特殊情况
            if ( type === "number" ) {
                return body[ key ];
            }

            return body[ key ] || "--";
        },

        // 设置参数
        setParams () {
            var params = Object.assign( {}, this.defaultParams, this.searchParams );

            if ( this.paging ) {
                Object.assign( params, {
                    pn: this.pageNum * this.pages.size,
                    rn: this.pages.size
                } );
            }

            this.params = params;
        },

        // 读取/写入localstorage的参数、配置等
        getStorageItem ( name ) {
            return (Storage.ls.get( this.STORAGENAME ) || {})[ name ];
        },
        setStorageItem ( name, value, merge ) {
            var item = {};

            item[ name ] = value;

            if ( merge ) {
                item = Object.assign( Storage.ls.get( this.STORAGENAME ) || {}, item );
            }

            Storage.ls.set( this.STORAGENAME, item );
        },

        fetchMainData () {
            var vm = this;
            var params = vm.params;

            fetch( vm.url, params, { beforeSend(){} } ).then( function ( response ) {
                vm.dataResource = response;
                vm.$nextTick( function () {
                    scrollable( ".ui-tables table" );
                } );
            }, function ( msg ) {
                vm.dataResource = null;
                vm.errorMessage = msg || "数据请求错误";
            } );
        },

        // 有些选项是不允许勾选的
        // 这里提供一个方法用以过滤这些选项
        // 需要返回布尔值，默认返回是TRUE
        selectableFilter: typeCheck.isFunction( tableConfig.selectableFilter ) ? tableConfig.selectableFilter : (  () => true ),
        // 点击全选时
        oncheckall () {
            var vm = this;

            // this.checkedindex = this.$refs.checkall.checked ? this.dataResource.list.map( function ( data, index ) {
            //     if ( vm.selectableFilter( data ) ) {
            //         return index;
            //     }
            // } ) : [];
            // map函数不能过滤无效值, 改用forEach方法来除去不满足过滤条件的数据
            var list = [];
            if (this.$refs.checkall.checked) {
                vm.dataResource.list.forEach((data, index) => {
                    if (vm.selectableFilter(data)) {
                        list.push(index);
                    }
                })
            }
            this.checkedindex = list;
        },

        generateSumContent () {
            var data = Object.assign({
                total: this.dataResource.total
            }, this.dataResource.statistics);

            return this.sumcontent.replace( /\\?\{{([^{}]+)\}}/g,
                ( match, name ) => (data[ name ] === undefined) ? '' : (data[ name ] || "0") );
        }
    };

    return {
        template: template.main,

        created () {
            // TODO 排序
            //var params = {};
            // 如果做过排序
            // 排序的筛选由Table自己维护，保存在自己的localstorage中
            //var sortParams = this.getStorageItem( this.SORTNAME );
            //if ( sortParams ) {
            //    $$extend( params, sortParams );
            //}
            //
            //$$extend( params, this.searchParams );

            // 不分页的情况下，到这里就可以发请求加载数据了
            if ( !this.paging ) {
                this.initialized = true;
                this.setParams();
            }
        },

        data () {
            return config;
        },
        vuex: {
            getters: {
                // pageNum ( state ) {
                //     return state.pageNum;
                // },
                // searchParams ( state ) {
                //     return state.searchParams;
                // }
            }
        },
        watch: {
            searchParams () {
                if ( this.initialized && this.pageNum !== 0 && this.paging ) {
                    this.$refs.pages.paginate( "first" );
                } else {
                    this.setParams();
                }
            },
            pageNum () {
                this.initialized = true;
                this.setParams();
            },
            params () {
                this.checkedindex = [];
                this.$refs.checkall && (this.$refs.checkall.checked = false);
                this.initialized && this.fetchMainData();
            },
            checkedindex () {
                if (this.clength !== 0 ) {
                    this.allchecked = this.checkedindex.length === this.clength;
                }
            }
        },
        computed: {
            searchParams (){
                return this.$store.state.searchParams;
            },
            pageNum () {
                return this.$store.state.pageNum;
            },
            // 能够勾选的所有项的个数
            // 只要dataResource.list不变，这个长度就不会变
            clength () {
                var vm = this;
                // 若数据请求出错, 在fetch操作时会将dataResource置为null(@Kongkong)
                // return this.dataResource && this.dataResource.list ? this.dataResource.list.map( function ( data, index ) {
                //     if ( vm.selectableFilter( data ) ) {
                //         return index;
                //     }
                // } ).length : 0;
                // map函数不能过滤无效值, 改用forEach方法来除去不满足过滤条件的数据
                var list = [];
                if (vm.dataResource && vm.dataResource.list) {
                    vm.dataResource.list.forEach((data, index) => {
                        if (vm.selectableFilter(data)) {
                            list.push(index);
                        }
                    })
                }
                return list.length;
            },
            checkeditems: function () {
                var vm = this;

                return vm.checkedindex.concat().sort().map( index => vm.dataResource.list[ index ] );
            }
        },

        methods,

        components: {
            pages: $$Component( "pages", Pages )
        },

        listeners: tableConfig.listeners,
        wrap: tableConfig.wrap
    };
}