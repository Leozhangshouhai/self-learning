import Modal from '../modal';
import * as typeCheck from '../../../../lib/typeCheck'

export default function () {
    return {
        template: `<modal-alert ref="alertModal"><p slot="body" v-html="msg" class="aligned center"></p></modal-alert>`,
        data(){
            return {
                msg: ''
            };
        },
        components: {
            'modal-alert': $$Component( 'modal-alert', Modal, {
                title: '提示',
                onConfirm() {
                    this.hide();
                }
            } )
        },
        methods: {
            show( msg, onConfirm ){
                this.msg = msg;

                if ( typeCheck.isFunction( onConfirm ) ) {
                    this.$refs.alertModal.onConfirm = () => {
                        onConfirm();
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
