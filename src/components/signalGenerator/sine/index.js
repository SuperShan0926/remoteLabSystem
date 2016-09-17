import React from 'react';
require('./sine.less');
import SineView from './view.js'
var agent = require('superagent-promise')(require('superagent'), Promise);


export default class Sine extends React.Component {

  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state={
      Hstate:"OFF",
      Horder: 8,
      Hamp: 0,
      Hphase:0,
      Htype:"ALL",
    };
  }

  render() {
    const {host,name}=this.props;
    console.log('Sine.this.props',this.props);
    this.props.save(this.state);
    return (
      <SineView 
      name={name}
      host={host}
      psetFrequency={this.setFrequency.bind(this)}
      psetHarmonicState={this.setHarmonicState.bind(this)}
      psetHarmonicType={this.setHarmonicType.bind(this)}
      psetHarmonicOrder={this.setHarmonicOrder.bind(this)}
      psetHarmonicAmplitude={this.setHarmonicAmplitude.bind(this)}
      psetHarmonicPhase={this.setHarmonicPhase.bind(this)}
      />
    );
  }

  //C_F1
  setFrequency(value){
    console.log('setFrequency',value);
    const {host,name}=this.props;
    console.log('setFrequency props',this.props);
    agent.post(host+'/DG-FREQ?Channel='+name+'&Freq='+value).then(res => {
      this.setState({'Frequency':value});
    }); 
  }

   //C_H1 OK
  setHarmonicState(value){
    console.log('setHarmonicState',value);
    const {host,name}=this.props;
    //console.log('setHarmonicState props',this.props);
    agent.post(host+'/DG-HARM-STAT?Channel='+name+'&Hstate='+value).then(res => {
      this.setState({'Hstate':value});
    }); 
  }

    //C_H2 OK
  setHarmonicOrder(value){
    console.log('setHarmonicOrder',value);
    const {host,name}=this.props;
    //测试用，实际使用时注释掉
    this.setState({Horder:value});
    //console.log('setHarmonicOrder props',this.props);
    agent.post(host+'/DG-HARM-ORDE?Channel='+name+'&MaxOrder='+value).then(res => {
      this.setState({Horder:value});
    }); 
    //console.log('setState',this.state);
  }

  //C_H3
  setHarmonicAmplitude(value){
    console.log('setHarmonicAmplitude',value);
    const {host,name}=this.props;
    console.log('setHarmonicAmplitude props',this.props);
    agent.post(host+'/DG-HARM-AMPL?Channel='+name+'&Horder='+this.state.Horder+'&Hamp='+value).then(res => {
      this.setState({'Hamp':value});
    }); 
  }

  //C_H4
  setHarmonicPhase(value){
    console.log('setHarmonicPhase',value);
    const {host,name}=this.props;
    console.log('setHarmonicPhase props',this.props);
    agent.post(host+'/DG-HARM-PHAS?Channel='+name+'&Horder='+this.state.Horder+'&Hphase='+value).then(res => {
      this.setState({'Hphase':value});
    }); 
  }

  //C_H5
  setHarmonicType(value){
    console.log('setHarmonicType',value);
    const {host,name}=this.props;
    console.log('setHarmonicType props',this.props);
    agent.post(host+'/DG-HARM-TYPE?Channel='+name+'&Htype='+value).then(res => {
      this.setState({'Htype':value});
    }); 
  }

}
