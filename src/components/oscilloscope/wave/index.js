import React from 'react';
import WaveView from './view';
var agent = require('superagent-promise')(require('superagent'), Promise);

export default class Wave extends React.Component {
  static propTypes = {
    host: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
    var ch1={"Time": 0, "WaveData": "[]"};
    var ch2={"Time": 0, "WaveData": "[]"};
    this.state={
      ch1,ch2
    };
  }
 
  tick() {
    // console.log("tick()");
    const {host}=this.props;
    agent.get(host+'/DS-WAVE?Channel=CHAN1').then(res => {
      var data=res.body;
      this.setState({'ch1':data});
    });

    agent.get(host+'/DS-WAVE?Channel=CHAN2').then(res => {
      console.log('tick',res.body);
      var data=res.body;
      this.setState({'ch2':data});
    });
  }
  componentDidMount() {
    this.interval = setInterval(this.tick.bind(this), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    this.props.save(this.state);
    const {ch1,ch2}=this.state;
    return (
      <WaveView ch1={ch1} ch2={ch2}/>
    );
  }
}
