import React from 'react';
require('./channels.less');
import Channel from '../channel';

export default class Channels extends React.Component {

  static propTypes = {
    host: React.PropTypes.string,
    save: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.chans = {};
    this.data = {};
  }

  componentWillReceiveProps(nextProps) {
    if(!nextProps){this.data = nextProps.data;}
    this.forceUpdate();
  }

  render() {
    return (
      <div className='OSCchannels'>
        <Channel name='CHAN1' host={this.props.host} save={this.saveCh1.bind(this)} data={this.data.chan1}/>
        <Channel name='CHAN2' host={this.props.host} save={this.saveCh2.bind(this)} data={this.data.chan2}/>
      </div>
    );
  }

  saveCh1(data){
    this.chans.chan1=data;
    console.log('save in chan1');
    this.props.save(this.chans);
  }

  saveCh2(data){
    this.chans.chan2=data;
    console.log('save in chan2');
    this.props.save(this.chans);
  }

}
