var data = {
    info1: [{
        src: "../img/personal/12_2.png",
        name: "我的订单"
    }, {
        src: "../img/personal/12_3.png",
        name: "我的退换货"
    }, {
        src: "../img/personal/12_4.png",
        name: "我的退换货"
    }, {
        src: "../img/personal/12_6.png",
        name: "我的退换货"
    }, {
        src: "../img/personal/12_21.png",
        name: "我的退换货"
    }, {
        src: "../img/personal/12_07.png",
        name: "我的退换货"
    }
    ]
}
var Demo = React.createClass(
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
for (var i = 0; i < data.info1.length; i++) {
    if (i == 0 || i == 4) {
        var ele = "<div class='containerBox'></div>";
        document.getElementById("container").innerHTML += ele;
    }
    var index = parseInt(i / 4);
    var box = "<div class='demoBox'></div>";
    document.getElementsByClassName("containerBox")[index].innerHTML += box;
    React.render(
        <Demo src={data.info1[i].src} name={data.info1[i].name}/>,
        document.getElementsByClassName("demoBox")[i]
    )
}


