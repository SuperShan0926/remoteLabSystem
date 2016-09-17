import React from 'react';
require ('./wave.less');
var LineChart = require('react-d3-basic').LineChart;

export default class WaveView extends React.Component {
  static propTypes = {
    ch1: React.PropTypes.object,
    ch2: React.PropTypes.object,
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
    // console.log('render',this.state);
    var width = 500,
    height = 400,
    margins = {left: 30, right: 30, top: 50, bottom: 50},
    title="示波器";
    const chart1={
        field: 'c1',
        name: 'ch1',
        color: '#ff7f0e'
      };
    const chart2={
        field: 'c2',
        name: 'ch2',
        color: '#24C0D9'
      };
    var chartSeries=[];
    const {ch1,ch2}=this.state;
    var wd1=JSON.parse(ch1.WaveData);
    var wd2=JSON.parse(ch2.WaveData);
    // console.log('wave:view',this.state);
    var data=[];
    var l1=wd1.length;
    var l2=wd2.length;
    // console.log(l1,l2);
    if(l1>0&&l2>0){
      // console.log('show both');
      data=wd1.map((c1,idx)=>({c1,c2:wd2[idx],idx}));
      chartSeries=[chart1,chart2];
    }
    if(l1>0&&!l2){
      // console.log('show l1');
      data=wd1.map((c1,idx)=>({c1,idx}));
      chartSeries=[chart1];
    }
    if(l2>0&&!l1){
      // console.log('show l2');
      data=wd2.map((c2,idx)=>({c2,idx}));
      chartSeries=[chart2];
    }
    const x = function(d) {
      return d.idx;
    };
    // console.log('data',data);
    return (
      <div className='wave'>
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
    );
  }
}
