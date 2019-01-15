import Alert from '../modal/alert/alert';
import {PostFile} from './post-file';
import * as typeCheck from '../../../lib/typeCheck';

export default function ( config = {} ) {
    // 文件类型
    const TYPE_MAP = {
        "excel": "\.(xlsx|xls)$",
        "image": "\.(jpg|jpeg|gif|png)$"
    };
    const conf = Object.assign({
        // 字段名, 与后端约定好, 默认为字段名为"fileUp"
        name: "fileUp",
        // 请求url
        url: "",
        // 上传按钮文案
        textHtml: "上传",
        // 文件为空报错
        emptyMsg: "请选择文件",
        // 格式错误报错
        typeError: "文件格式错误，请重新上传",
        // 文件类型
        fileType: "excel",
        // 操作成功
        onSuccess: new Function,
        // 操作失败
        onError: new Function,
    }, config);

    let template = `<div class="ui-upload" style="display: inline-block">
                        <input type="file" ref="fileInput" :name="name" @change="chooseFile" style="display: none"/>
                        <span class="btn btn-primary upload-excel" v-html="textHtml" @click="uploadFile"></span>
                        <file-alert ref="fileAlert"></file-alert>
                    </div>`;

    return {
        template: template,
        data () {
            return conf
        },
        computed: {},
        methods: {
            // randomKey () {
            //     return (+(new Date)).toString(36) + '_' + Math.ceil((10e6 * Math.random())).toString(36);
            // },
            chooseFile (e) {
                let vm = this;
                let files = e.target.files[0];

                if (!files) {
                    vm.$refs.fileAlert.show(conf.emptyMsg);
                    return;
                }
                if (!new RegExp( TYPE_MAP[conf.fileType], 'i' ).test(files.name)) {
                    vm.$refs.fileAlert.show(conf.typeError);
                    return;
                }

                let formData = new FormData();

                formData.append(conf.name, files);

                // fetch方法
                PostFile( conf.url, formData ).then( function ( response ) {
                    typeCheck.isFunction(conf.onSuccess) && conf.onSuccess(response, files, vm);
                }, function ( msg ) {
                    e.target.value = "";
                    typeCheck.isFunction(conf.onError) && conf.onError(msg, files, vm);
                } );
            },
            uploadFile (e) {
                this.$refs.fileInput.click();
            }
        },
        components: {
            "file-alert": $$Component( "file-alert", Alert )
        }
    }
}
