import template from 'template';
import Storage from '../../../lib/storage';

export default function () {
    return {
        // TODO wrap需要做出解释
        wrap: 'body',

        template: template.nav,

        props: [ 'total', 'size', 'scrollpaing' ],

        data () {
            return {
                STORAGENAME: 'ComponentPages',
                DEFAULT_ITEM: 7,
                curNav: 'nav-current',
                first: '首页',
                prev: '上页',
                next: '下页',
                last: '尾页',
                current: null,
                nav: []
            };
        },

        created () {
            let cur;

            this.current = (cur = Storage.ls.get( this.STORAGENAME )) ? cur : 0;
        },

        computed: {
            pageNumbers () {
                let size = this.size;
                let total = this.total;
                let num = 1;

                if ( total > 0 && total > size ) {
                    num = Math.ceil( total / size );
                }
                return num;
            },
            navs () {
                let nav = [];
                let current = this.current;
                let end = Math.min( current + 6, this.pageNumbers );
                let start = end - this.DEFAULT_ITEM;

                for ( let i = start, length = end; i < length; i++ ) {
                    i >= 0 && nav.push( { index: i + 1, cur: current == i } );
                }

                return nav;
            }
        },

        listeners: {
            'click.jpages .navitem' ( e, vm ) {
                if ( !this.hasAttribute( 'disabled' ) ) {
                    vm.paginate( this.dataset.nav );
                }
            }
        },

        methods: {
            paginate ( index ) {
                let current = +this.current;
                let _cur;

                // 处于边界时, 样式会保证不会触发越界的点击
                // 但这里为保险起见, 仍然会对异常做处理
                if ( index === 'first' ) {
                    _cur = 0;
                } else if ( index === 'prev' ) {
                    _cur = current == 0 ? current : current - 1;
                } else if ( index === 'next' ) {
                    _cur = current == (this.total - 1) ? current : current + 1;
                } else if ( index === 'last' ) {
                    _cur = this.pageNumbers - 1;
                } else {
                    _cur = index - 1;
                }

                if ( _cur >= this.pageNumbers || _cur == current ) {
                    return;
                }

                this.current = _cur;
            }
        },

        watch: {
            current: function () {
                this.$store.commit( 'PAGINATE', this.current );
                Storage.ls.set( this.STORAGENAME, this.current );
            }
        }
    };
}