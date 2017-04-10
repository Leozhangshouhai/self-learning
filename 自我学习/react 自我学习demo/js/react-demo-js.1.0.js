/**
 * Created by leo on 2016/10/27.
 */
const { Slider } = antd;

ReactDOM.render(<div>
        <Slider defaultValue={90} className='ppppp' />
        <Slider range defaultValue={[10, 150]} />
        <Slider range defaultValue={[20, 50]} disabled />
    </div>
    , document.getElementById('container'));

const { Carousel } = antd;

function onChange(a, b, c) {
    console.log(a, b, c);
}

ReactDOM.render(
    <Carousel afterChange={onChange}>
        <div><h3 class='two'>1</h3></div>
        <div><h3 className='one'>2</h3></div>
        <div><h3 id='three'>3</h3></div>
        <div id='four' className='five'><h3>4</h3></div>
    </Carousel>
    ,  document.getElementById('container1'));