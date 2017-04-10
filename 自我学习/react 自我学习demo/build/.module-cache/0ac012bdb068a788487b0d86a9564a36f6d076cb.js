/**
 * Created by leo on 2016/10/27.
 */
const { Slider } = antd;

ReactDOM.render(React.createElement("div", null, 
        React.createElement(Slider, {defaultValue: 90}), 
        React.createElement(Slider, {range: true, defaultValue: [10, 150]}), 
        React.createElement(Slider, {range: true, defaultValue: [20, 50], disabled: true})
    )
    , document.getElementById('container'));

const { Carousel } = antd;

function onChange(a, b, c) {
    console.log(a, b, c);
}

ReactDOM.render(
    React.createElement(Carousel, {afterChange: onChange}, 
        React.createElement("div", null, React.createElement("h3", {class: "two"}, "1")), 
        React.createElement("div", null, React.createElement("h3", {className: "one"}, "2")), 
        React.createElement("div", null, React.createElement("h3", {id: "three"}, "3")), 
        React.createElement("div", {id: "four"}, React.createElement("h3", null, "4"))
    )
    ,  document.getElementById('container1'));