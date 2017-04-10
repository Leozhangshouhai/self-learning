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
    {displayName: "Demo",
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
for (var i = 0; i < data.info1.length; i++) {
    if (i == 0 || i == 4) {
        var ele = "<div class='containerBox'></div>";
        document.getElementById("container").innerHTML += ele;
    }
    var index = parseInt(i / 4);
    var box = "<div class='demoBox'></div>";
    document.getElementsByClassName("containerBox")[index].innerHTML += box;
    React.render(
        React.createElement(Demo, {src: data.info1[i].src, name: data.info1[i].name}),
        document.getElementsByClassName("demoBox")[i]
    )
}


