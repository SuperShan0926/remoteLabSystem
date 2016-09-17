import React from 'react';
import PhaseView from './view.js';
var agent = require('superagent-promise')(require('superagent'), Promise);
var _ = require('lodash');


export default class Phase extends React.Component {

  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state={
      phase:0.00005
    };
    this.setPhase=_.debounce(this._setPhase,1000, true);
  }

  render() {
    return (
      <PhaseView changePhase={this.setPhase.bind(this)}/>
    );
  }

  _setPhase(value){
    console.log('setPhase',value);
    const {host,name}=this.props;
    agent.post(host+'/DG-PHAS?Channel='+name+'&Phase='+value).then(res => {
      this.setState({'phase':value});
    });
  }

}
