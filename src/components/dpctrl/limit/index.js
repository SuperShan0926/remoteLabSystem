import React from 'react';
import LimitView from './view.js';
var agent = require('superagent-promise')(require('superagent'), Promise);

export default class Limit extends React.Component {

  static propTypes = {
    host: React.PropTypes.string,
    channelName:React.PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state={
      voltage:'0.000',
      current:'0.000',
      voltageChecked:false,
      currentChecked:false
    };
  }

  render() {
    var name = this.props.channelName;
    var host=this.props.host;
    return (
      <div>        
        <LimitView valueVoltage={this.state.voltage} valueCurrent={this.state.current} changeLimitVoltage={this.changeLimitVoltage.bind(this)}  changeLimitCurrent={this.changeLimitCurrent.bind(this)} changeLimitVoltageState={this.changeLimitVoltageState.bind(this)} changeLimitCurrentState={this.changeLimitCurrentState.bind(this)} voltageChecked={this.state.voltageChecked} currentChecked={this.state.currentChecked}/>
      </div>
    );
  }
  obtainVoltage(){
    console.log('obtainVoltage');
    const {host,channelName}=this.props;
    agent.post(host+'DP-OVP-Value?Channel='+channelName).then(res => {
      var data=res.body;
      console.log('result',data);
      this.setState({voltage:data.return});
    }).catch(e=>console.log(e));
  }

  obtainCurrent(){
    console.log('obtainCurrent');
    const {host,channelName}=this.props;
    agent.post(host+'DP-OCP-Value?Channel='+channelName).then(res => {
      var data=res.body;
      console.log('result',data);
      this.setState({current:data.return});
    }).catch(e=>console.log(e));
  }

  obtainVoltageChecked(){
    console.log('obtainVoltageChecked');
    const {host,channelName}=this.props;
    agent.post(host+'DP-OVP-State?Channel='+channelName).then(res => {
      var data=res.body;
      console.log('result',data);
      var state = false;
      if(data.return=='ON')
        state = true;
      this.setState({voltageChecked:state});
    }).catch(e=>console.log(e));
  }

  obtainCurrentChecked(){
    console.log('obtainCurrentChecked');
    const {host,channelName}=this.props;
    agent.post(host+'DP-OCP-State?Channel='+channelName).then(res => {
      var data=res.body;
      console.log('result',data);
       var state = false;
      if(data.return=='ON')
        state = true;
      this.setState({currentChecked:state});
    }).catch(e=>console.log(e));
  }

  changeLimitVoltage(value){
    console.log('Voltage value:',value);
    const {host,channelName}=this.props;
    agent.post(host+'DP-OVP-Value?Channel='+channelName+'&Value='+value,"").then(res => {
      var data=res.body;
      console.log('result',data);
    }).catch(e=>console.log(e));
  }

  changeLimitCurrent(value){
    console.log('Current value:',value);
    const {host,channelName}=this.props;
    agent.post(host+'DP-OCP-Value?Channel='+channelName+'&Value='+value,"").then(res => {
      var data=res.body;
      console.log('result',data);
    }).catch(e=>console.log(e));
  }

  changeLimitVoltageState(value){
    console.log('State value:',value);
    const {host,channelName}=this.props;
    var state = 'ON';
    if(!value)
      state = 'OFF';
    agent.post(host+'DP-OVP-State?Channel='+channelName+'&State='+state,"").then(res => {
      var data=res.body;
      console.log('result',data);
    }).catch(e=>console.log(e));
  }

  changeLimitCurrentState(value){
    console.log('State value:',value);
    const {host,channelName}=this.props;
    var state = 'ON';
    if(!value)
      state = 'OFF';
    agent.post(host+'DP-OCP-State?Channel='+channelName+'&State='+state,"").then(res => {
      var data=res.body;
      console.log('result',data);
    }).catch(e=>console.log(e));
  }

  componentDidMount() {
    this.obtainVoltage();
    this.obtainCurrent();
    this.obtainCurrentChecked();
    this.obtainVoltageChecked();
  }
  componentWillUnmount() {

  }
}
