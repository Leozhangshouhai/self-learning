import $$ from '../../third-party/zepto';
const supportCss3d = "WebKitCSSMatrix" in window && "m11" in new WebKitCSSMatrix();
const MINBARWIDTH = 100;
(function ( $ ) {
    "use strict";

    [ 'width', 'height' ].forEach( function ( dimension ) {

        var Dimension = dimension.replace( /./, function ( m ) {
            return m[ 0 ].toUpperCase();
        } );

        //outerWidth or outerHeight

        $.fn[ 'outer' + Dimension ] = function ( margin ) {
            var elem = this;

            if ( elem ) {


                // elem.width(); or  elem.height();
                var size = elem[ dimension ]();

                var sides = {
                    'width': [ 'left', 'right' ],
                    'height': [ 'top', 'bottom' ]
                };

                sides[ dimension ].forEach( function ( side ) {
                    if ( margin ) {
                        size += parseInt( elem.css( 'margin-' + side ), 10 );
                    }
                } );

                return size;
            } else {
                return null;
            }
        }


    } );
})( $$ );
export default function ( selector, params = {} ) {
    // 目标元素
    const $target = $$( selector );
    // 配置
    const config = {
        // 放置滚动条的元素
        holder: $$( params.holder || "html" ),
        // 滚动条的方向
        direction: params.dir || "x",
        // 目标元素的父容器
        parent: $$( params.parent ).length ? $$( params.parent ) : $target.parent()
    };

    const $barWrapper = $$( [
        '<div class="mod-scrollable">',
        // 滚动条的背景
        '<div class="bar-background"></div>',
        // 滚动条
        '<div class="bar"></div>',
        '</div>'
    ].join( "" ) );

    Object.assign( config, params );

    if ( !$target.length || (config.direction !== "x" && config.direction !== "y") || !$$( config.holder ).length ) {
        ;
        return this;
    }

    let direction = config.direction;
    let $holder = config.holder;
    let holderWidth = $holder.width();
    let parentWidth = config.parent.width();
    let targetWidth = $target.outerWidth();

    if ( targetWidth <= parentWidth ) {
        let $main = $$( ".mod-scrollable" );
        $main.length && $main.remove();
        return;
    }

    if ( config.holder.is( "html" ) ) {
        $holder = $$( "body" );
        $barWrapper.css( "position", "fixed" );
    }

    // IE需要补上滚动条的宽度
    if ( navigator.userAgent.indexOf( "MSIE" ) != -1 ) {
        targetWidth = targetWidth + 14;
    }

    // 目标滚动区宽度
    let overflowWidth = targetWidth - parentWidth;
    // 滚动条宽度
    let barWidth = $holder.width() - (targetWidth - parentWidth);
    // 如果滚动条宽度小于100px, 就固定为100
    if ( barWidth < MINBARWIDTH ) {
        barWidth = MINBARWIDTH;
    }

    // 滑动区的宽度
    let slipWidth = holderWidth - barWidth;
    // 滚动比率
    let coefficient = overflowWidth / slipWidth;

    $barWrapper.addClass( "scrollable-wrapper-" + direction );

    // 同一页面可能会多次初始化组件
    // 所以这里要先把所有相关的事件都清理掉
    $barWrapper.find( ".bar" ).off( "scrollable" );
    $barWrapper.find( ".bar-background" ).off( "scrollable" );
    $$( document ).off( "scrollable" );
    $target.parent().css( { "transform": "translateX(0px)" } );

    let $bar = $barWrapper.find( ".bar" ).addClass( "bar-" + direction ).width( barWidth )
        .on( "mousedown.scrollable", function ( e ) {
            const $this = $$( this );
            // 起始位置
            const startPosition = e.pageX;
            // 偏移
            const targetLeft = $this.position().left;

            $$( document ).on( "mousemove.scrollable", function ( e ) {
                var distance = targetLeft + e.pageX - startPosition;
                e.preventDefault();
                move( distance );
            } );
        } );

    $barWrapper.find( ".bar-background" ).addClass( "bg-" + direction )
        .on( "click.scrollable", function ( e ) {
            const clickPosition = e.pageX;
            const curPostion = $bar.position().left;
            const distance = curPostion + (clickPosition < curPostion ? -150 : 150);
            move( distance );
        } );

    $$( document ).on( "mouseup.scrollable", function () {
        $$( this ).off( "mousemove.scrollable" );
    } );

    $$( document ).on( document.onmousewheel !== undefined ? "mousewheel.scrollable" : "DOMMouseScroll.scrollable", function ( e ) {
        const delta = getDelta( e );

        if ( delta.x !== 0 && Math.abs( delta.x ) > Math.abs( delta.y ) ) {
            const curPostion = $bar.position().left;
            const distance = curPostion - delta.x * 20;
            move( distance );
        }
        if ( delta.y === 0 ) {
            e.preventDefault();
        }

    } );

    // re-caluculate && reset
    //$$( document ).on( "e-switch-sidenav.scrollable", function () {
    //    $target.parent().css( { "transform": "translateX(0px)" } );
    //    $target.scrollable();
    //} );

    $target.wrap( "<div>" );
    $holder.find( ".mod-scrollable" ).remove();
    $holder.append( $barWrapper );

    function move( distance ) {
        // 边界
        if ( distance < 0 || distance + barWidth > holderWidth ) {
            distance = distance < 0 ? 0 : holderWidth - barWidth;
        }

        if ( supportCss3d ) {
            $bar.css( { "transform": "translateX(" + distance + "px)" } );
            $target.parent().css( { "transform": "translateX(" + -distance * coefficient + "px)" } );
        } else {
            $bar.css( "left", distance );
            $target.parent().css( "marginLeft", -distance * coefficient );
        }
    }
};

function selectable( isPrevent, $el ) {
    $el || $$( "body" ).css( "user-select", isPrevent ? "none" : "text" )
        .prop( "unselectable", isPrevent ? "on" : "off" )[ isPrevent ? "on" : "off" ]( "selectstart.scroll", false );
}

function getDelta( e ) {
    e = e.originalEvent || e;
    const delta = {
        delta: 0
        , x: 0
        , y: 0
    };

    // stupid bugs, but who cares
    // 1. early safari float bug: e.wheelDelta ==> Math.round(e.wheelDelta)
    // 2. opera 9 bug: e.wheelDelta ==> -e.wheelDelta
    delta.delta = e.wheelDelta !== undefined
        ? e.wheelDelta / 120
        : -(e.detail || 0) / 3;

    // Gecko
    if ( e.axis ) delta[ e.axis === e.HORIZONTAL_AXIS ? "x" : "y" ] = delta.delta;

    // Webkit
    else if ( e.wheelDeltaX !== undefined ) {
        delta.x = e.wheelDeltaX / 120;
        delta.y = e.wheelDeltaY / 120;
    }

    // fallback
    else delta.y = delta.delta;
    return delta;
}