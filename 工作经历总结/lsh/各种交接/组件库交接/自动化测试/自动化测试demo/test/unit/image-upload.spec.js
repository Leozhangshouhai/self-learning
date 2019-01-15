import Vue from '../../lib/vue/vue';
import chai from 'chai';
import $ from '../../lib/jquery/jquery'

import ImageUpload from '../../widget/image-upload';

import { createVue, destroyVM, createTest, triggerEvent } from '../util';

const expect = chai.expect;

// 组件配置
const options = {
    target: "",
    name: "TestFile",
    url: "/upload",
    width: "111",
    height: "111",
    src: "img.small"
}

const noop = () => {
};

describe ('图片上传组件测试', () => {

    /********************   使用sinon模拟网络请求  *******************/
    let xhr, requests;

    let formData = new FormData();

    // ajax请求虚拟接口"/upload"配置
    let ajaxOption = {
        url: "/upload",
        type: "POST",
        dataType: "html",
        data: formData,
        processData: false,
        contentType: false
    }

    beforeEach(() => {
        xhr = sinon.useFakeXMLHttpRequest();
        requests = [];
        xhr.onCreate = req => requests.push(req);
    })

    afterEach(() => {
        // Like before we must clean up when tampering with globals.
        xhr.restore();
    });
    /******************************************************************/

    describe ('Vue实例创建',() => {
        it ('创建成功', () => {
            let vm = createTest(ImageUpload, options);
            expect(vm.$el.textContent).to.equal('点击上传图片');
            // destroyVM(vm);
        })
    });

    describe ('ajax测试', () => {
        it ('请求成功，返回成功信息', (done) => {
            $.ajax(ajaxOption).then((res) => {
                // 请求成功预期值
                expect(res).to.eql('{"success": true}');
                done();
            }, (error) => {
                console.log(error);
            })

            // 设置请求成功值，设置返回的状态值及结果
            // respond @params (status, headers, body)
            requests[0].respond(200, {}, '{"success": true}');
        });

        it('请求失败', done => {
            $.ajax(ajaxOption).then(res => {
                // console.log("success");
            }, err => {
                expect(err.status.toString() + ' ' + err.responseText).to.contain('404 Not found');
                done();
            });
            requests[0].respond(404, {}, 'Not found');
        });

        it('请求成功，返回后端报错信息', done => {
            $.ajax(ajaxOption).then(res => {
                expect(res).to.eql('{msg: "XXX is error"}');
                done();
            }, err => {
                console.log("error");
            });
            requests[0].respond(201, {}, '{msg: "XXX is error"}');
        })
    });

    describe ('上传功能测试', done => {
        let uploader;
        let $input;

        beforeEach(() => {
            // 生成Vue实例并插入DOM
            // uploader = createTest(ImageUpload, options, true);
            uploader = createVue({
                render(createElement) {
                    return createElement (
                        'img-upload',
                        // render createElement参数用法详见https://cn.vuejs.org/v2/guide/render-function.html
                        {
                            props: options,
                            // 设置ref属性，方便从根实例中获取组件实例
                            ref: "upload",
                            // 事件绑定
                            on: {
                                uploaded() {
                                    console.log('uploaded success');
                                }
                            },
                            // 原生事件
                            nativeOn: {
                                click: function () {
                                    console.log('click');
                                }
                            }
                        }
                    );
                },
                components: {
                    'img-upload': ImageUpload
                }
            }, true)
            $input = uploader.$el.querySelector("#upload" + options.name);
        });

        afterEach(() => {
            destroyVM(uploader);
        });

        it('上传成功处理', done => {
            let files = [{
                name: 'success.png',
                type: 'xml'
            }];

            let result = uploader.$refs.upload.upload(files, $input);

            result.then(res => {
                let response = JSON.parse(res);
                expect(response[0].name).to.equal('success.png');
                expect(response.length).to.equal(1);
                done();
            }, err => {
                console.log(err);
            })

            setTimeout(() => {
                requests[0].respond(200, {}, JSON.stringify(files));
            }, 100);
        });

        it('上传失败处理', done => {
            let files = [{
                name: 'fail.png',
                type: 'xml'
            }];

            let result = uploader.$refs.upload.upload(files, $input);

            result.then(res => {
                console.log(res);
            }, err => {
                let error = JSON.parse(err.responseText);
                expect(error.files[0].name).to.equal('fail.png');
                expect(error.msg).to.equal("400 fail");
                done();
            });

            setTimeout(() => {
                let body = {
                    files: files,
                    msg: "400 fail"
                }
                requests[0].respond(400, {}, JSON.stringify(body));
            }, 100);
        });
    })
})
