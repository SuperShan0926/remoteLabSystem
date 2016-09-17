import React from 'react';
import ChannelView from './view.js';
var agent = require('superagent-promise')(require('superagent'), Promise);

export default class Channel extends React.Component {

  static propTypes = {
    changeValue:React.PropTypes.func,
    host: React.PropTypes.string,
    property:React.PropTypes.object,
    portarray:React.PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state={
      ch1:'1',
      ch2:'1',
    };
  }

  setChannelValue(channelname,value){
    console.log('setChannelValue',channelname+' '+value);
    if(channelname=='ch1'){
      this.sendChannelValue(value,this.state.ch2);
      this.setState({'ch1':value});
    } else if(channelname=='ch2'){
      this.sendChannelValue(this.state.ch1,value);
      this.setState({'ch2':value});
    }
  }

  sendChannelValue(ch1value, ch2value){
    const {host}=this.props;
    
    agent.post(host+'SetProbe?OCH1='+ch1value+'&OCH2='+ch2value).then(res => {
        if(this.props.changeValue){
            this.props.changeValue(ch1value,ch2value);
        }
    });
  }
  
  render() {
    var property=this.props.property;
    return (
      <div style={{position:'absolute',top:property.top,left:property.left}}>        
        <ChannelView changeValue={this.setChannelValue.bind(this)} portarray={this.props.portarray}/>
      </div>
    );
  }

  componentDidMount() {
    this.sendChannelValue(this.state.ch1, this.state.ch2);
  }
  componentWillUnmount() {
  }
}