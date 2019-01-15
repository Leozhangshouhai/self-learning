export default function ( modalConfig = {} ) {
    return {
        template: `<div class="ui-modal" v-show="showing">
                <div class="main">
                    <h4 class="title" v-html="title"></h4>
                    <span class="close" @click="close" v-if="closeBtn">×</span>
                    <div class="content">
                        <slot name="body"></slot>
                    </div>
                    <div class="footer">
                        <button class="on-confirm btn btn-primary" @click="onConfirm">{{confirmText}}</button>
                        <button v-if="withCancel" class="on-cancel btn btn-white" @click="onCancel">{{cancelText}}</button>
                    </div>
                </div>
                <div class="shadow"></div>
            </div>`,
        data () {
            return {
                showing: false,
                closeBtn: modalConfig.closeBtn !== false,
                title: modalConfig.title,
                withCancel: !!modalConfig.onCancel,
                confirmText: modalConfig.confirmText || '确认',
                cancelText: modalConfig.cancelText || '取消',
            };
        },

        methods: {
            show(){
                this.showing = true;
                document.body.style.overflow = 'hidden';
            },
            hide(){
                this.showing = false;
                document.body.style.overflow = 'auto';
            },
            close(){
                this.hide();
                modalConfig.onClose && modalConfig.onClose.call(this);
            },
            onConfirm: modalConfig.onConfirm || function () {},
            onCancel: modalConfig.onCancel || function () {
                this.hide();
            }
        }
    };
}
