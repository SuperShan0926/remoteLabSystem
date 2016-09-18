import React from 'react';
require ('./dpcontroller.less');
import Channels from './channels';


export default class DPController extends React.Component {
  static propTypes = {
    host: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
  }
  
  render() {
    const {host}=this.props;
    return (
      <div className='dpcontroller'>
        <Channels  host={host}/>
      </div>
      
    );
  }
}