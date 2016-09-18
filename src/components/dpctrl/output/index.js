import React from 'react';
import OutputView from './view.js';
var agent = require('superagent-promise')(require('superagent'), Promise);

export default class Output extends React.Component {

  static propTypes = {
    host: React.PropTypes.string,
    channelName:React.PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state={
      voltage:'0.000',
      current:'0.000'
    };
  }

  render() {
    var name = this.props.channelName;
    var host=this.props.host;
    return (
      <div>        
        <OutputView  valueVoltage={this.state.voltage} valueCurrent={this.state.current} changeOutputVoltage={this.changeOutputVoltage.bind(this)}  changeOutputCurrent={this.changeOutputCurrent.bind(this)}/>
      </div>
    );
  }

  obtainVoltage(){
    console.log('obtainVoltage');
    const {host,channelName}=this.props;
    agent.post(host+'DP-Voltage?Channel='+channelName).then(res => {
      var data=res.body;
      console.log('result',data);
      this.setState({voltage:data.return});
    }).catch(e=>console.log(e));
  }

  obtainCurrent(){
    console.log('obtainCurrent');
    const {host,channelName}=this.props;
    agent.post(host+'DP-Current?Channel='+channelName).then(res => {
      var data=res.body;
      console.log('result',data);
      this.setState({current:data.return});
    }).catch(e=>console.log(e));
  }

  changeOutputVoltage(value){
    console.log('Voltage value:',value);
    const {host,channelName}=this.props;
    agent.post(host+'DP-Voltage?Channel='+channelName+'&Value='+value,"").then(res => {
      var data=res.body;
      console.log('result',data);
    }).catch(e=>console.log(e));
  }

  changeOutputCurrent(value){
    console.log('Current value:',value);
    const {host,channelName}=this.props;
    agent.post(host+'DP-Current?Channel='+channelName+'&Value='+value,"").then(res => {
      var data=res.body;
      console.log('result',data);
    }).catch(e=>console.log(e));
  }

  componentDidMount() {
    this.obtainVoltage();
    this.obtainCurrent();
  }
  componentWillUnmount() {
    
  }
}
