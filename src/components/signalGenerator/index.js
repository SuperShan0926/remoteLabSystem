import React from 'react';
require ('./signalGenerator.less');
import Chans from './chans';

export default class SignalGenerator extends React.Component {
  static propTypes = {
    host: React.PropTypes.string,
    save: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.data = {};
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.data){
      this.data = nextProps.data;
      this.forceUpdate();
    }     
  }
  
  render() {
    const {host}=this.props;
    return (
      <div className='signalGenerator' >
        <Chans host={host} save={this.props.save} data={this.data}/>
      </div>
    );
  }

}
