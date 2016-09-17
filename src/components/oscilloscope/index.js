import React from 'react';
require ('./oscilloscope.less');
import Wave from './wave';
import Time from './time';
import Channels from './channels';
import Trig from './trig';
import Level from './level';
import Sweep from './sweep';
var agent = require('superagent-promise')(require('superagent'), Promise);


export default class Oscilloscope extends React.Component {
  static propTypes = {
    host: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.osc = {};
  }
  
  render() {
    const {host}=this.props;
    console.log(host);
    return (
      <div className='oscilloscope'>
        <Level  host={host} save={this.saveLevel.bind(this)}/>
        <Wave  host={host} save={this.saveWave.bind(this)}/>
        <Time  host={host} save={this.saveTime.bind(this)}/>
        <Channels  host={host} save={this.saveChannels.bind(this)}/>
        <Trig  host={host} save={this.saveTrig.bind(this)}/>
        <Sweep  host={host} save={this.saveSweep.bind(this)}/>
      </div>
    );
  }


  saveChannels(data){
    this.osc.channels = data;
    this.props.save(this.osc);
  }

  saveTime(data){
    this.osc.time = data;
    this.props.save(this.osc);
  }

  saveLevel(data){
    this.osc.level = data;
    this.props.save(this.osc);
  }

  saveWave(data){
    this.osc.wave = data;
    this.props.save(this.osc);
  }

  saveTrig(data){
    this.osc.trig = data;
    this.props.save(this.osc);
  }

  saveSweep(data){
    this.osc.sweep = data;
    this.props.save(this.osc);
  }

}
