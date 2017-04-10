/*  crated by 张寿海 2016.10.25*/
/*********  react的组件库，包含多种常用组件      *************/

// 图文组件
// 图片在上，文字在下，居中显示，
// 组件属性传入SRC，Name

var  All_eles=React.createClass(
    {displayName: "All_eles",
   render:function(){
    return (
    React.createElement("div", {id: "All_eles"}, 
     React.createElement(Text_img, {src: "../img/personal/12_3.png", name: "图文配合"})
    ) 
            )
        } 
    }
);
 var Text_img = React.createClass(
    {displayName: "Text_img",
        render: function () {
            return (
                React.createElement("div", {className: "mode"}, 
                    React.createElement("div", {className: "imgBox"}, 
                        React.createElement("img", {src: this.props.src, alt: ""})
                    ), 
                    React.createElement("div", {className: "imgName"}, this.props.name)
                )
            )
        }
    }
)