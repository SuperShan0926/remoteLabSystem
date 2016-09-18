import React from 'react';
import MeasurementView from './view.js';
var agent = require('superagent-promise')(require('superagent'), Promise);

export default class Measurement extends React.Component {

  static propTypes = {
    host: React.PropTypes.string,
    channelName:React.PropTypes.string
  };

  constructor(props) {
    super(props);
    //var pc8={"VOLT":"0","CURR":"0","POWE":"0"};
    var fpower = 0;
    fpower = fpower.toFixed(3);
    this.state={
      voltage:'0.000',
      current:'0.000',
      power:'0.000'
    };
  }

  render() {
    const {pc8}=this.state;
    var name = this.props.channelName;
    var host=this.props.host;
    return (
      <div>        
        <MeasurementView host={host} channelName={name} voltage={this.state.voltage} current={this.state.current} power={this.state.power}/>
      </div>
    );
  }

  tick() {
    const {host,channelName}=this.props;

     /*agent.get(host+'DP-Meas-all?Channel='+channelName).then(res => {
       console.log('tick',res.body);
       var data=res.body;
       this.setState({'pc8':data});
     });*/
  
    /*agent.get(host+'DP-MEAS-POWE?Channel='+channelName).then(res => {
      var data=res.body;
      console.log('tick-powe',data);
      if(data.Power=='')
         data.Power='0.000';
      this.setState({'power':data.Power});
      //console.log(this.state.pc8);
    }).catch(e=>console.log(e));*/
    agent.get(host+'DP-MEAS-VOLT?Channel='+channelName).then(res => {
      var data=res.body;
      console.log('tick-volt:',data);
      if(data.Volt=='')
         data.Volt='0.000';
      this.setState({'voltage':data.Volt});
      var fpower = parseFloat(this.state.voltage)*parseFloat(this.state.current);
      console.log('fpower:',fpower);
      fpower = fpower.toFixed(3);
      var spower = fpower+'';
      // if(fpower == 0)
      //   spower = '0.000';
      this.setState({'power':spower});
    }).catch(e=>console.log(e));
    agent.get(host+'DP-MEAS-CURR?Channel='+channelName).then(res => {
      var data=res.body;
      console.log('tick-curr:',data);
      if(data.Current=='')
         data.Current='0.000';
      this.setState({'current':data.Current});
      var fpower = parseFloat(this.state.voltage)*parseFloat(this.state.current);
      console.log('fpower:',fpower);
      fpower = fpower.toFixed(3);
      var spower = fpower+'';
      // if(fpower == 0)
      //   spower = '0.000';
      this.setState({'power':spower});
    }).catch(e=>console.log(e));

  }

  componentDidMount() {
    this.interval = setInterval(this.tick.bind(this), 5000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
}
