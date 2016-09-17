import React from 'react';
import FreqView from './view.js';
var agent = require('superagent-promise')(require('superagent'), Promise);
var _ = require('lodash');


export default class Freq extends React.Component {

  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state={
      freq:0.00005
    };
    this.setFreq=_.debounce(this._setFreq,1000, true);
  }

  render() {
    return (
      <FreqView changeFreq={this.setFreq.bind(this)}/>
    );
  }

  _setFreq(value){
    console.log('_setFreq',value);
    const {host,name}=this.props;
    agent.post(host+'/DG-FREQ?Channel='+name+'&Freq='+value).then(res => {
      this.setState({'freq':value});
    });
  }

}
