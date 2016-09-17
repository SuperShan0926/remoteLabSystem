import React from 'react';
require ('./oscilloscope.less');
var LineChart = require('react-d3-basic').LineChart;
import {Button} from 'react-bootstrap';

export default class OscilloscopeView extends React.Component {
  static propTypes = {
    data: React.PropTypes.object,
    measurement:React.PropTypes.number,
    setTimeScale:React.PropTypes.func,
    getMeasurement:React.PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state=props;
  }

  componentWillReceiveProps(nextProps) {
    // console.log('componentWillReceiveProps',nextProps);
    this.setState(nextProps);
  }

  render() {
    console.log('render',this.state);
    var width = 500,
    height = 400,
    margins = {left: 50, right: 50, top: 50, bottom: 50},
    title="示波器",
    chartSeries = [
      {
        field: 'v',
        name: '电压',
        color: '#ff7f0e'
      }
    ],
    data=this.state.data.WaveData.map((v,idx)=>({v,idx})),
    x = function(d) {
      return d.idx;
    };
    // console.log(data);
    return (
      <div className='oscilloscope'>
        <div className='left'>
         <LineChart
          showXGrid= {true}
          showYGrid= {true}
          margins= {margins}
          title={title}
          data={data}
          width={width}
          height={height}
          chartSeries={chartSeries}
          x={x}
        />
      </div>
      <div className='right'>
      <div>measurement:{this.props.measurement}</div>
        <Button onClick={this.props.getMeasurement}>Get Measurement</Button>
        <form onSubmit={this.setTimeScale.bind(this)}>
         <input ref='timescale' placeholder='timescale' defaultValue='8'></input>
        </form>
      </div>
      </div>
    );
  }

  setTimeScale(e){
    e.preventDefault();
    this.props.setTimeScale(this.refs.timescale.value);
    // console.log(this.refs.timescale.value);
  }
}
