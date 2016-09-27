import React from 'react';
require('./square.less');
import WaveParam from '../waveparam';
var agent = require('superagent-promise')(require('superagent'), Promise);
import Freq from '../frequency';
import Amp from '../amp';
import Offset from '../offset';
import Phase from '../phase';
import Duty from '../duty';

export default class Square extends React.Component {

  constructor(props) {
    super(props);
    this.data = {};
  }

  render() {
    return (
      <div className='square'>
            <Freq />
            <Amp />
            <Offset />
            <Phase />
            <Duty />
      </div>
    );
  }
}
