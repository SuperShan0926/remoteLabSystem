import React from 'react';
require ('./signalGenerator.less');
import Chans from './chans';
// import Time from './time';
// import Channels from './channels';
// import Trig from './trig';
// import Level from './level';
// import Sweep from './sweep';


export default class SignalGenerator extends React.Component {
  static propTypes = {
    host: React.PropTypes.string,
    save: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
  }
  
  render() {
    const {host}=this.props;
    return (
      <div className='signalGenerator' >
        <Chans host={host} save={this.props.save}/>
      </div>
    );
  }

}
