import Modal from '../modal';
import * as typeCheck from '../../../../lib/typeCheck'

export default function () {
    return {
        template: `<modal-confirm ref="alertModal"><p slot="body" v-html="msg" class="aligned center"></p></modal-confirm>`,
        data(){
            return {
                msg: ''
            };
        },
        components: {
            'modal-alert': $$Component( 'modal-confirm', Modal, {
                title: '提示',
                onConfirm() {
                    this.hide();
                },
                onCancel() {
                    this.hide();
                }
            } )
        },
        methods: {
            show( msg, onConfirm, onCancel ){
                this.msg = msg;

                if ( typeCheck.isFunction( onConfirm ) ) {
                    this.$refs.alertModal.onConfirm = () => {
                        onConfirm();
                        this.hide();
                    };
                }

                if ( typeCheck.isFunction( onCancel ) ) {
                    this.$refs.alertModal.onCancel = () => {
                        onCancel();
                        this.hide();
                    };
                }

                this.$refs.alertModal.show();
            },
            hide(){
                this.$refs.alertModal.hide();
            }
        }
    };
};