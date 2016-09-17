import React from 'react';
require('./sweep.less');
import {Label} from 'react-bootstrap';
var Rx = require('rx');


export default class SweepView extends React.Component {
  static propTypes = {
    changeSweep: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
          
        <div className="row">
        <div className="col-xs-1"></div>
         
          <div className="col-xs-3">Sweep</div>
           <div className="col-xs-4">
            <select name="select"  onChange={this.changeSweep.bind(this)}>
           <option>AUTO</option>
           <option>NORM</option>
           <option>SING</option>
           </select>
           </div>
        </div>
      </div>
    );
  }

changeSweep(evt){
    var mysweep=evt.target.value;
    console.log('mysweep',mysweep);
    if(this.props.changeSweep){
      this.props.changeSweep(mysweep);
    }
  }




}