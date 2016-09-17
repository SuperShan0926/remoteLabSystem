import React from 'react';
import RisingedgeView from './view.js';
var agent = require('superagent-promise')(require('superagent'), Promise);
var _ = require('lodash');


export default class Risingedge extends React.Component {

  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state={
      risingedge:0.00005
    };
    this.setRisingedge=_.debounce(this._setRisingedge,1000, true);
  }

  render() {
    return (
      <RisingedgeView changeRisingedge={this.setRisingedge.bind(this)}/>
    );
  }

  _setRisingedge(value){
    console.log('_setFreq',value);
    const {host,name}=this.props;
    agent.post(host+'/DG-PULS-LEAD?Channel='+name+'&VALU='+value).then(res => {
      this.setState({'risingedge':value});
    });
  }

}
