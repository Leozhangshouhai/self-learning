function GetPos( el ) {
    const pos = {
        x: el.offsetLeft,
        y: el.offsetTop
    };

    // while ( el = el.offsetParent ) {
    //     // 对于有transform属性时, 获取的数值就会有差异, 需要考虑transform的位移变换 @Kongkong
    //     // 无transform时
    //     let trans = getComputedStyle(el).transform;
    //     if ( trans === "none") {
    //         pos.x += el.offsetLeft;
    //         pos.y += el.offsetTop;
    //     } else {
    //         // 计算transform的矩阵
    //         let transArr = trans.match(/[-]?\d+/g);
    //         // TODO: 目前不考虑3D变换及中心点偏移, 换算得x, y结果分别等于矩阵的第4第5个数值
    //         // 矩阵x偏移量
    //         let x = transArr[4];
    //         // 矩阵y偏移量
    //         let y = transArr[5];
    //
    //         pos.x += el.offsetLeft + +x;
    //         pos.y += el.offsetTop + +y;
    //     }
    // }

    return pos;
};

function randomKey() {
    return (+(new Date)).toString( 36 ) + '_' + Math.ceil( (10e6 * Math.random()) ).toString( 36 );
}

const tips = {
    el: null,
    createTip (targetEl) {
        const tempDiv = this.el = document.createElement( "div" );
        // document.body.appendChild( tempDiv );
        // 将生成的tips插入body不能满足所有场景的布局要求, 比如需要使用fiexd的场景下使用absolute就不可行
        // 这里将tip模板插入到目标元素的同级下, 可以适应目前所需的大部分布局场景
        targetEl.offsetParent.appendChild( tempDiv );
        tempDiv.className = "ui-tips";

        return tempDiv;
    },
    show ( targetEl, msg ) {
        const pos = GetPos( targetEl );
        const id = `tips${randomKey()}`;
        const tip = this.createTip(targetEl);

        this.clear( targetEl );

        targetEl.setAttribute( 'aria-describedby', id );

        tip.innerHTML = `<b>${msg}</b><span class="arrow a-inner"></span><span class="arrow a-outer"></span>`;
        tip.id = id;
        tip.style.left = `${targetEl.offsetWidth + pos.x + 5}px`;
        tip.style.top = `${pos.y + (targetEl.offsetHeight / 2) - (tip.offsetHeight / 2)}px`;
        document.querySelectorAll( "#" + id + " .arrow" ).forEach((el) => {
            el.style.top = `${(tip.offsetHeight / 2) - 9}px`;
        });
    },
    hide ( el ) {
        this.clear( el );
    },
    clear ( el ) {
        const id = el.getAttribute( 'aria-describedby' );
        const tip = document.querySelector( `#${id}` );

        if ( id ) {
            // document.body.removeChild( tip );
            el.offsetParent.removeChild( tip );
            el.removeAttribute( 'aria-describedby' );
        }
    }
};

export default {
    show ( targetEl, msg ) {
        tips.show( targetEl, msg );
    },
    hide( targetEl ){
        tips.hide( targetEl );
    }
}
