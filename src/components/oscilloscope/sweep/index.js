
import React from 'react';
import SweepView from './view.js';
require('./sweep.less');
var agent = require('superagent-promise')(require('superagent'), Promise);



export default class Sweep extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
    save: React.PropTypes.func,

  };

  constructor(props) {
    super(props);
  }

  render() {
  this.props.save(this.state);
   return (
      <div className='sweep'>
        <SweepView changeSweep={this.setsweep.bind(this)}/>
      </div>

    );
  }


  setsweep(value){
    console.log('setsweep',value);
    const {host}=this.props;
    agent.post(host+'/DS-TRIGsweep?TrigSweep='+value).then(res => {
      this.setState({'setsweep':value});
    });
  }
}
