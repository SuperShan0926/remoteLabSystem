import React from 'react';
import ChannelView from './view.js';
var agent = require('superagent-promise')(require('superagent'), Promise);

export default class Channel extends React.Component {

  static propTypes = {
    host: React.PropTypes.string,
    channelName:React.PropTypes.string,
    maxVoltage:React.PropTypes.string,
    maxCurrent:React.PropTypes.string
  };

  constructor(props) {
    super(props);
  }

  render() {
    var name = this.props.channelName;
    var host=this.props.host;
    var maxVoltage = this.props.maxVoltage;
    var maxCurrent = this.props.maxCurrent;
    return (
      <div>        
        <ChannelView host={host} channelName={name} maxVoltage={maxVoltage} maxCurrent={maxCurrent}/>
      </div>
    );
  }

  componentDidMount() {
  }
  componentWillUnmount() {
  }
}
