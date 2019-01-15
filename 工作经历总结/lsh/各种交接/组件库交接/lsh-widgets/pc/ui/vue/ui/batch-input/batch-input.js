/*
 * 批量搜索输入框
 */
import * as typeCheck from '../../../lib/typeCheck';
import Modal from '../modal/modal';

export default function () {

    let template = `<div class="ui-batch-input">
                        <div :data-type="type" class="batch-input">
                            <input :value="query | formatData(',')" type="text" :class="cssClass" :placeholder="placeholder" :name="name" @change="changeBatch"/>
                            <span class="btn btn-in-input btn-batch-query" @click="batchInput"></span>
                        </div>
                        <batch-input-modal ref="batchInputModal">
                            <div slot="body">
                                <textarea class="batch-textarea" placeholder="数据之间请使用换行(回车)分隔" ref="batchValue" :value="query | formatData"></textarea>
                            </div>
                        </batch-input-modal>
                    </div>`;

    return {
        props: [ 'name', 'value', 'type', 'placeholder', 'cssClass' ],
        template: template,
        data () {
            return {}
        },
        computed: {
            query() {
                return this.value;
            }
        },
        methods: {
            // 批量输入
            batchInput () {
                this.$refs.batchInputModal.show();
                // 通知search暂时禁用回车
                this.$store.commit( 'SEARCHENTERDISABLE', true );
            },
            changeBatch (e) {
                let value = [];
                e.target.value.split(",").forEach((item) => {
                    if (item && item.trim()) {
                        value.push(item.trim());
                    }
                });
                let result = JSON.stringify(value);
                this.query = result;
                this.$emit( 'change', this.type, this.name, result == "[]" ? '' : result );
            }
        },
        filters: {
            formatData (data, sign) {
                return JSON.parse(data || "[]").join(sign || '\n');
            }
        },
        created () {

        },
        components: {
            batchInputModal: $$Component( 'batch-input-modal', Modal, {
                title: "批量查询",
                onConfirm () {
                    let vm = this.$parent;
                    let value = [];
                    vm.$refs.batchValue.value.split("\n").forEach((item) => {
                        if (item && item.trim()){
                            value.push(item.trim());
                        }
                    });
                    let result = JSON.stringify(value);
                    vm.query = result;
                    vm.$emit( 'change', vm.type, vm.name, result == "[]" ? '' : result );
                    vm.$refs.batchInputModal.hide();
                    vm.$store.commit( 'SEARCHENTERDISABLE', false );
                },
                onClose () {
                    let vm = this.$parent;
                    vm.$store.commit( 'SEARCHENTERDISABLE', false );
                }
            } ),
        }
    }
}