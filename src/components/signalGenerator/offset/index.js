import React from 'react';
import OffsetView from './view.js';
var agent = require('superagent-promise')(require('superagent'), Promise);
var _ = require('lodash');


export default class Offset extends React.Component {

  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state={
      offset:0.00005
    };
    this.setOffset=_.debounce(this._setOffset,1000, true);
  }

  render() {
    return (
      <OffsetView changeOffset={this.setOffset.bind(this)}/>
    );
  }

  _setOffset(value){
    console.log('_setOffset',value);
    const {host,name}=this.props;
    agent.post(host+'/DG-OFFS?Channel='+name+'&Offset='+value).then(res => {
      this.setState({'offset':value});
    });
  }

}
