import React from 'react';
require('./ramp.less');
import WaveParam from '../waveparam';
var agent = require('superagent-promise')(require('superagent'), Promise);
import Freq from '../frequency';
import Amp from '../amp';
import Offset from '../offset';
import Phase from '../phase';
import Duty from '../duty';


export default class Ramp extends React.Component {

  constructor(props) {
    super(props);
    this.data = {};
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.data){
      this.data = nextProps.data;
      this.forceUpdate();
    }     
  }

  // saveFreq(data){
  //   this.props.save(data);
  // }

  render() {
    return (
      <div className='ramp'>
      	  <Freq />
          <Amp />
          <Offset />
          <Phase />
          <Duty />
      </div>
    );
  }
}
