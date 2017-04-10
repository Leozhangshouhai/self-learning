/**
 * Created by willy on 2017/3/15.
 *弹窗提示和加载
 */
(function($){
    $.fn.pOpup = function(options){
        var defaults = {
            _pOpupTxt : '加载中...',		  			//提示文字
            _pOpupImg:'../img/loadingPng.png',		  //图片
			_pOpupTime:3000,						  //提示弹窗显示时间,默认为3秒
			_hAvaImg:true,							  //ture表示有图片，false表示没有图片
			_iSGif:'png'						  	  //gif表示GIF图片，png表示png图片
        }
        options = $.extend(defaults,options);
        pRompt(
				options._pOpupTxt,
				options._pOpupImg,
				options._pOpupTime,
				options._hAvaImg,
				options._iSGif
			  );
    }
    //提示Fun
    function pRompt(_pOpupTxt,_pOpupImg,_pOpupTime,_hAvaImg,_iSGif){
		var  _pRomptHtml = '<div class="prompt">'+
				'<div class="prompt-tab">'+
				'<div class="prompt-box">'+
				'<div class="prompt-txt">';
		
		if(_hAvaImg == true){ //判断有无图片
			 _pRomptHtml +='<img class="load-img" src="'+_pOpupImg+'"/>'+_pOpupTxt;
			
		}else{
			 _pRomptHtml +=_pOpupTxt;
			pRomptHide(_pOpupTime);
			
		}
		
        $('body').append(_pRomptHtml);
        $('.prompt').stop(true,false).animate({'opacity':'1'},400);
		
		if(_iSGif == 'png'){ //是PNG添加旋转样式
			$('.load-img').addClass('rotate');
		}
    }
	
	//自动隐藏并删除popup弹窗
	function pRomptHide(_pOpupTime){ 
		var hIdeTime = setTimeout(function(){
			lOadHide();
		},_pOpupTime);
	}
	//隐藏并删除loading弹窗
	function lOadHide(){
		$('.prompt').stop(true,false).animate({'opacity':'0'},400,function(){
			$('.prompt').remove();
		});
	}
	//关闭弹窗
	$.fn.pOpup.cLosePopup = function(){
		lOadHide();
	}
	
	
})(jQuery)