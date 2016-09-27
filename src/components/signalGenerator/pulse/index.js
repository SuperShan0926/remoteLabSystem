import React from 'react';
require('./pulse.less');
import WaveParam from '../waveparam';
var agent = require('superagent-promise')(require('superagent'), Promise);
import Freq from '../frequency';
import Amp from '../amp';
import Offset from '../offset';
import Phase from '../phase';
import Duty from '../duty';
import Risingedge from '../risingedge';
import Fallingdege from '../fallingedge';

export default class Pulse extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className='pulse'>
          <Freq />
          <Amp />
          <Offset />
          <Phase />
          <Duty />
      </div>
    );
  }
}
