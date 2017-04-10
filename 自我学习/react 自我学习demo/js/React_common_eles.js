/*  crated by 张寿海 2016.10.25*/
/*********  react的组件库，包含多种常用组件      *************/

// 图文组件
// 图片在上，文字在下，居中显示，
// 组件属性传入SRC，Name

var  All_eles=React.createClass(
    {
   render:function(){
    return (
    <div id="All_eles">
     <Text_img src="../img/personal/12_3.png" name="图文配合"/>  
    </div> 
            )
        } 
    }
);
 var Text_img = React.createClass(
    {
        render: function () {
            return (
                <div className="mode">
                    <div className="imgBox">
                        <img src={this.props.src} alt=""/>
                    </div>
                    <div className="imgName">{this.props.name}</div>             
                </div>
            )
        }
    }
)