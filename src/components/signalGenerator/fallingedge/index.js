import React from 'react';
import FallingedgeView from './view.js';
var agent = require('superagent-promise')(require('superagent'), Promise);
var _ = require('lodash');


export default class Fallingedge extends React.Component {

  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state={
      fallingedge:0.00005
    };
    this.setFallingedge=_.debounce(this._setFallingedge,1000, true);
  }

  render() {
    return (
      <FallingedgeView changeFallingedge={this.setFallingedge.bind(this)}/>
    );
  }

  _setFallingedge(value){
    console.log('_setFreq',value);
    const {host,name}=this.props;
    agent.post(host+'/DG-PULS-TRAI?Channel='+name+'&VALU='+value).then(res => {
      this.setState({'fallingedge':value});
    });
  }

}
