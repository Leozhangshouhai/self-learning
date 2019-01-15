import template from 'template';
import Storage from '../../../lib/storage';
import lh from '../../../lib/location-helper';
import on from '../../../lib/event';
import Datepicker from '../datepicker/datepicker';
import BatchInput from '../batch-input/batch-input';

export default function ( searchConfig = {} ) {
    const STORAGENAME = 'ComponentSearch';
    const getStorageContent = () => Storage.ls.get( STORAGENAME ) || {};

    let onInit = {
        _getValue ( key ) {
            return lh.queryString( key ) || getStorageContent()[ key ];
        },
        select ( configObj ) {
            configObj.optionText = configObj.optionText == undefined ? '全部' : configObj.optionText;
            configObj[ 'value' ] = onInit._getValue( configObj.key ) || 'false';
            configObj[ 'options' ] = searchConfig.searchConf[ configObj.key ];
        },
        dateRange ( configObj ) {
            let value = {};

            [ 'begin', 'end' ].forEach( function ( item ) {
                let _value = onInit._getValue( configObj.key[ item ] );

                // 如果没有搜索过并且配置了默认值
                if ( !_value && configObj.defaultValue && configObj.defaultValue[ item ] ) {
                    value[ item ] = configObj.defaultValue[ item ];
                } else {
                    value[ item ] = _value;
                }
            } );

            // 日期
            configObj[ 'value' ] = value;
        },
        dateSingle ( configObj ) {
            let _value = onInit._getValue( configObj.key );

            configObj[ 'value' ] = !_value && configObj.defaultValue ? configObj.defaultValue : _value;
        }
    };

    return {
        template: template.main,

        data () {
            return {
                params: {},

                widgetConfig: {
                    input: 'input',
                    select: 'select',
                    dateRange: 'dateRange',
                    dateSingle: 'dateSingle',
                    batchInput: 'batchInput'
                },

                // 把所有搜索项的value回填回来
                config: searchConfig.config.map( function ( configObj ) {
                    (onInit[ configObj.type ] || function ( c ) {
                        c[ 'value' ] = onInit._getValue( c.key ) || '';
                    })( configObj );
                    return configObj;
                } )
            }
        },

        computed: {
            enterDisable () {
                return this.$store.state.searchEnterDisable;
            }
        },

        created () {
            this.params = this.gatherParams();
        },

        mounted () {
            const vm = this;
            // 有些场景需要禁用回车
            on( 'keydown', document, function ( e ) {
                if ( e.which === 13 && !vm.enterDisable) {
                    vm.submit();
                }
            } );
        },

        methods: {
            gatherParams () {
                let params = {};
                const that = this;

                this.config.forEach( function ( c ) {
                    if ( c.type === that.widgetConfig.dateRange ) {
                        [ 'begin', 'end' ].forEach( function ( name ) {
                            let v = c.value[ name ];
                            if ( v && v !== '' ) {
                                params[ c.key[ name ] ] = v;
                            }
                        } );
                    } else {
                        if ( c.value && c.value !== '' && c.value !== 'false' ) {
                            params[ c.key ] = c.value;
                        }
                    }
                } );

                return params;
            },

            changeDatesingle ( type, name, value ) {
                const vm = this;
                this.config.forEach( function ( c ) {
                    if ( c.type === vm.widgetConfig.dateRange ) {
                        [ 'begin', 'end' ].forEach( function ( key ) {
                            if ( c.key[ key ] === name ) {
                                c.value[ key ] = value;
                            }
                        } );
                    } else if ( c.type === vm.widgetConfig.dateSingle ) {
                        c.value = value;
                    }
                } );

            },

            changeBatchInput ( type, name, value) {
                let vm = this;
                this.config.forEach( function ( c ) {
                    if ( c.type === vm.widgetConfig.batchInput && c.key === name ) {
                        c.value = value;
                    }
                } );
            },

            submit () {
                this.params = this.gatherParams();
            },
            reset: function () {
                const vm = this;

                // TODO 如果有默认值 datepicker重置回默认值？
                vm.config = searchConfig.config.map( function ( configObj ) {
                    if ( configObj.type === vm.widgetConfig.dateRange ) {
                        configObj[ 'value' ].begin = '';
                        configObj[ 'value' ].end = '';
                    } else if ( configObj.type === vm.widgetConfig.select ) {
                        configObj[ 'value' ] = 'false';
                    } else {
                        configObj[ 'value' ] = '';
                    }
                    return configObj;
                } );

                this.params = this.gatherParams();
            }
        },

        watch: {
            params ( searchParams ) {
                this.$store.commit( 'SEARCH', searchParams );
                Storage.ls.set( STORAGENAME, searchParams );
            }
        },

        components: {
            datepicker: $$Component( 'datepicker', Datepicker ),
            batchInput: $$Component( 'batchInput', BatchInput )
        }
    };
}