$(function () {

  'use strict';

  var console = window.console || { log: function () {} },
      $alert = $('.docs-alert'),
      $message = $alert.find('.message'),
      showMessage = function (message, type) {
        $message.text(message);

        if (type) {
          $message.addClass(type);
        }

        $alert.fadeIn();

        setTimeout(function () {
          $alert.fadeOut();
        }, 3000);
      };

  // Demo
  // -------------------------------------------------------------------------

  (function () {
    //var $image = $('#img_pop_1');
        //$dataX = $('#dataX'),
        //$dataY = $('#dataY'),
        //$dataHeight = $('#dataHeight'),
        //$dataWidth = $('#dataWidth'),
        //$dataRotate = $('#dataRotate'),
    //    options = {
    //      // strict: false,
    //      // responsive: false,
    //      // checkImageOrigin: false
    //
    //      // modal: false,
    //      // guides: false,
    //      // highlight: false,
    //      // background: false,
    //
    //      // autoCrop: false,
    //      // autoCropArea: 0.5,
    //      // dragCrop: false,
    //      // movable: false,
    //      // resizable: false,
    //      // rotatable: false,
    //      // zoomable: false,
    //      // touchDragZoom: false,
    //      // mouseWheelZoom: false,
    //
    //      // minCanvasWidth: 320,
    //      // minCanvasHeight: 180,
    //      // minCropBoxWidth: 160,
    //      // minCropBoxHeight: 90,
    //      // minContainerWidth: 320,
    //      // minContainerHeight: 180,
    //
    //      // build: null,
    //      // built: null,
    //      // dragstart: null,
    //      // dragmove: null,
    //      // dragend: null,
    //      // zoomin: null,
    //      // zoomout: null,
    //
    //      aspectRatio: 16 / 9,
    //      preview: '.img-preview',
    //      crop: function (data) {
    //        $dataX.val(Math.round(data.x));
    //        $dataY.val(Math.round(data.y));
    //        $dataHeight.val(Math.round(data.height));
    //        $dataWidth.val(Math.round(data.width));
    //        $dataRotate.val(Math.round(data.rotate));
    //      }
    //    };
    //
    //$image.on({
    //  'build.cropper': function (e) {
    //    console.log(e.type);
    //  },
    //  'built.cropper': function (e) {
    //    console.log(e.type);
    //  },
    //  'dragstart.cropper': function (e) {
    //    console.log(e.type, e.dragType);
    //  },
    //  'dragmove.cropper': function (e) {
    //    console.log(e.type, e.dragType);
    //  },
    //  'dragend.cropper': function (e) {
    //    console.log(e.type, e.dragType);
    //  },
    //  'zoomin.cropper': function (e) {
    //    console.log(e.type);
    //  },
    //  'zoomout.cropper': function (e) {
    //    console.log(e.type);
    //  }
    //}).cropper(options);


    // Methods
    $(document.body).on('click', '[data-method]', function () {
      var data = $(this).data(),
          type = data.type,
          $target,
          result;
      console.log(data)

      //$image = $("#img_pop_"+type);
      if (data.method) {
        data = $.extend({}, data); // Clone a new one

        if (typeof data.target !== 'undefined') {
          $target = $(data.target);

          if (typeof data.option === 'undefined') {
            try {
              data.option = JSON.parse($target.val());
            } catch (e) {
              console.log(e.message);
            }
          }
        }

        result =  $("#img_pop_"+type).cropper(data.method, data.option);
        var dataurl = result.toDataURL('image/png');


        var blob = dataURLtoBlob(dataurl);

        if(type ==1)
          pic1 = blob;
        else
          pic2 = blob;

        if (data.method === 'getCroppedCanvas') {
          var height = $(window).height() / 2.8;
          var width = $(window).width() / 1.6;
          popOut(type);
          $("#img_container_"+type).html(convertCanvasToImage(result));
          //$("#img_container_"+type).html(result);
          //alert($("#img_container_"+type+" > img").height());
          $("#file_pop_"+type).html('<img src="" id="img_pop_'+type+'">');
          $("#file_"+type).val('');

          $("#img_container_"+type+" > img").css("height", "100%").css("width", "100%");

        }

        if ($.isPlainObject(result) && $target) {
          try {
            $target.val(JSON.stringify(result));
          } catch (e) {
            console.log(e.message);
          }
        }

      }
    });


    //// Import image
    //var $inputImage = $('#inputImage'),
    //    URL = window.URL || window.webkitURL,
    //    blobURL;
    //
    //if (URL) {
    //  $inputImage.change(function () {
    //    var files = this.files,
    //        file;
    //
    //    if (files && files.length) {
    //      file = files[0];
    //
    //      if (/^image\/\w+$/.test(file.type)) {
    //        blobURL = URL.createObjectURL(file);
    //        $image.one('built.cropper', function () {
    //          URL.revokeObjectURL(blobURL); // Revoke when load complete
    //        }).cropper('reset', true).cropper('replace', blobURL);
    //        $inputImage.val('');
    //      } else {
    //        showMessage('Please choose an image file.');
    //      }
    //    }
    //  });
    //} else {
    //  $inputImage.parent().remove();
    //}
    //

  }());
});

function popOut(type){
  $("#pic_pop_"+type).css("display","none");
  $("#us_warp_"+type).css("display","none");
}

function popIn(type){
  $("#pic_pop_"+type).css("display","block");
  $("#us_warp_"+type).css("display","block");
}

function convertCanvasToImage(canvas) {
  //新Image对象，可以理解为DOM
  var image = new Image();
  // canvas.toDataURL 返回的是一串Base64编码的URL，当然,浏览器自己肯定支持
  // 指定格式 PNG
  image.src = canvas.toDataURL("image/png");
  return image;
}


function readBlobAsDataURL(blob, callback) {
  var a = new FileReader();
  a.onload = function(e) {callback(e.target.result);};
  a.readAsDataURL(blob);
}
function dataURLtoBlob(dataurl) {
  var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while(n--){
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], {type:mime});
}

var pic1;
var pic2;