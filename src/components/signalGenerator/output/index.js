import React from 'react';
import OutputView from './view.js';
var agent = require('superagent-promise')(require('superagent'), Promise);


export default class Output extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <OutputView/>
    );
  }
}
