import React from 'react';
require('./channels.less');
import Channel from '../channel/index.js';
import {Label} from 'react-bootstrap';

export default class ChannelsView extends React.Component {
  static propTypes = {
    host: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  render() {

    const {host}=this.props;
    return (
      <div className='channels'>
        <Channel host={host} channelName='CHAN1' maxVoltage='30V' maxCurrent='3A'/>
        <Channel host={host} channelName='CHAN2' maxVoltage='30V' maxCurrent='3A'/>
        <Channel host={host} channelName='CHAN3' maxVoltage='5V' maxCurrent='3A'/>
      </div>
    );
  }


  componentDidMount() {
    
  }
  componentWillUnmount() {
  }

}
