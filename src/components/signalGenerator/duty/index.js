import React from 'react';
import DutyView from './view.js';
var agent = require('superagent-promise')(require('superagent'), Promise);
var _ = require('lodash');


export default class Duty extends React.Component {

  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state={
      duty:0.00005
    };
    this.setDuty=_.debounce(this._setDuty,1000, true);
  }

  render() {
    return (
      <DutyView changeDuty={this.setDuty.bind(this)}/>
    );
  }

  _setDuty(value){
    console.log('_setDuty',value);
    const {host,name}=this.props;
    agent.post(host+'/DG-FUNC-PULSdcyc?Channel='+name+'&Dcyc='+value).then(res => {
      this.setState({'duty':value});
    });
  }

}
