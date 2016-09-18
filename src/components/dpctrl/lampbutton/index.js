import React from 'react';
import LampButtonView from './view.js';
var agent = require('superagent-promise')(require('superagent'), Promise);

export default class LampButton extends React.Component {

  static propTypes = {
    host: React.PropTypes.string,
    channelName:React.PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state={
      checked:false
    };
  }

  render() {
    const {host}=this.props;
    return (
      <LampButtonView changeState={this.changeState.bind(this)} checked={this.state.checked}/>
    );
  }

  changeState(value){
    console.log('open:',value);
    var state = 'ON';
    if(!value)
      state = 'OFF';
    const {host,channelName}=this.props;
    agent.post(host+'DP-OUTP-State?Channel='+channelName+'&State='+state,"").then(res => {
      var data=res.body;
      console.log('result',data);
    }).catch(e=>console.log(e))
  }

  obtainState(){
    console.log('obtainState');
    const {host,channelName}=this.props;
    agent.post(host+'DP-OUTP-State?Channel='+channelName).then(res => {
      var data=res.body;
      console.log('result',data);
      var state=false;
      if(data.return=='ON')
        state=true;
      this.setState({checked:state});
    }).catch(e=>console.log(e));
  }

  componentDidMount() {
    this.obtainState();
  }
  componentWillUnmount() {
  }
}