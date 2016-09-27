import React from 'react';
import AmpView from './view.js';
var agent = require('superagent-promise')(require('superagent'), Promise);
var _ = require('lodash');


export default class Amp extends React.Component {

  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state={
      amp:0.00005
    };
    this.setAmp=_.debounce(this._setAmp,1000, true);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.data){
      this.setState({amp:nextProps.data});
    }     
  }

  render() {
    return (
      <AmpView changeAmp={this.setAmp.bind(this)}/>
    );
  }

  _setAmp(value){
    console.log('_setAmp',value);
    const {host,name}=this.props;
    agent.post(host+'/DG-AMP?Channel='+name+'&Amp='+value).then(res => {
      this.setState({'amp':value});
    });
  }

}
