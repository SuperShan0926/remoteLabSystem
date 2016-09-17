import React from 'react';
import TimeView from './view.js';
var agent = require('superagent-promise')(require('superagent'), Promise);
var _ = require('lodash');


export default class Time extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      Position:0.001,
      TimeScale:0.00005
    };
    // console.log("constructor");
    this.setTimeScale = _.debounce(this._setTimeScale,1000,true);
    this.setPosition = _.debounce(this._setPosition,1000,true);
  }

  render() {
    this.props.save(this.state);
    return (
      <TimeView changeScale={this.setTimeScale.bind(this)} chagePosition={this.setPosition.bind(this)}/>
    );
  }

  _setTimeScale(value){
    console.log('setTimeScale',value);
    const {host}=this.props;
    agent.post(host+'/DS-TIMscal?TIMEDIV='+value).then(res => {
      this.setState({'TimeScale':value});
    });
  }

  _setPosition(value){
    console.log('setPosition',value);
    const {host}=this.props;
    agent.post(host+'/DS-TIMoffset?TIMOFFSET='+value).then(res => {
      this.setState({'Position':value});
    }).catch(err=>console.log(err));
  }


}
