import React from 'react';
require('./channel.less');
import LampButton from '../lampbutton/index.js'
import Measurement from '../measurement/index.js'
import Output from '../output/index.js'
import Limit from '../limit/index.js'
import {Label} from 'react-bootstrap';

export default class ChannelView extends React.Component {
  static propTypes = {
    pc8: React.PropTypes.object,
    channelName:React.PropTypes.string,
    host: React.PropTypes.string,
    maxVoltage:React.PropTypes.string,
    maxCurrent:React.PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state=props;
  }

  componentWillReceiveProps(nextProps) {
    // console.log('componentWillReceiveProps',nextProps);
    this.setState(nextProps);
  }



  render() {
    var name = this.props.channelName;
    var host=this.props.host;
    var maxVoltage = this.props.maxVoltage;
    var maxCurrent = this.props.maxCurrent;
    return (
      <div className='channel'>
        <div style={{display:'block'}}>
          <Label>{name}</Label>
          <div style={{width:'50px',float:'right'}}>{maxVoltage}/{maxCurrent}</div>
        </div>
        <div className='childdiv'>
          <LampButton host={host} channelName={name}/>
        </div>
        <Measurement host={host} channelName={name}/>
        <Output host={host} channelName={name}/>
        <Limit host={host} channelName={name}/>
      </div>
    );
  }

}
