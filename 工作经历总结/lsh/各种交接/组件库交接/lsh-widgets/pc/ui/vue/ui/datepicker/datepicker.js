import libDatepicker from 'datepicker-lib';

export default function () {
    return {
        props: [ 'name', 'value', 'options', 'limits', 'type' ],
        template: '<date-picker :date="date" :option="option" :limit="limit" :name="name" @change="change"></date-picker>',
        data(){
            return {
                timeoption: {
                    type: 'min',
                    week: [ '周一', '周二', '周三', '周四', '周五', '周六', '周日' ],
                    month: [ '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月' ],
                    format: 'YYYY-MM-DD HH:mm'
                },
                multiOption: {
                    type: 'multi-day',
                    week: [ '周一', '周二', '周三', '周四', '周五', '周六', '周日' ],
                    month: [ '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月' ],
                    format: "YYYY-MM-DD HH:mm"
                }
            }
        },
        computed: {
            date () {
                return {
                    time: this.value
                };
            },
            option () {
                return Object.assign( {
                    type: 'day',
                    week: [ '周一', '周二', '周三', '周四', '周五', '周六', '周日' ],
                    month: [ '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月' ],
                    format: 'YYYY-MM-DD',
                    placeholder: '',
                    color: {
                        header: '#ccc',
                        headerText: '#03A9F3',
                        checkedDay: '#03A9F3'
                    },
                    buttons: {
                        ok: '确定',
                        cancel: '取消'
                    },
                    overlayOpacity: 0.5, // 0.5 as default
                    dismissible: true // as true as default
                }, this.options );
            },
            limit () {
                return this.limits || [];
            }
        },
        methods: {
            change ( value, name ) {
                this.$emit( 'change', this.type, name, value );
            }
        },
        components: {
            'date-picker': libDatepicker
        }
    };
};
