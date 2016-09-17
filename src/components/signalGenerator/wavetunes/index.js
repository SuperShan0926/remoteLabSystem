import React from 'react';
import WaveTunesView from './view.js';
var agent = require('superagent-promise')(require('superagent'), Promise);


export default class WaveTunes extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <WaveTunesView/>
    );
  }
}
