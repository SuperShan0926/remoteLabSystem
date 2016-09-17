import React from 'react';
import WaveParamView from './view.js';
var agent = require('superagent-promise')(require('superagent'), Promise);


export default class WaveParam extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <WaveParamView/>
    );
  }
}
