import React from 'react';
require('./trig.less');
import {Label} from 'react-bootstrap';
var Rx = require('rx');

export default class TrigView extends React.Component {
  static propTypes = {
    changeMode: React.PropTypes.func,
    changeSource: React.PropTypes.func,

  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Label>trig</Label>  
        <div className="row">
          <div className="col-xs-1"></div>
          <div className="col-xs-3">Mode</div>
           <div className="col-xs-4">
            <select name="select"  onChange={this.changeMode.bind(this)}>
           <option>EDGE</option>
           <option>PULS</option>
           <option>RUNT</option>
           <option>NEDG</option>
           <option>SLOP</option>
           <option>PATT</option>
           <option>RS232</option>
           </select>
           </div>
        </div> 





         <div className="row">
         <div className="col-xs-1"></div>
          <div className="col-xs-3">Source</div>
           <div className="col-xs-4">
            <select name="select"  onChange={this.changeSource.bind(this)}>
           <option>CHAN1</option>
           <option>CHAN2</option>
           <option>EXT</option>
           <option>D0</option>
           <option>D1</option>
           <option>D2</option>
           <option>D3</option>
           <option>D4</option>
           <option>D5</option>
           <option>D6</option>
           <option>D7</option>
           <option>D8</option>
           <option>D9</option>
           <option>D10</option>
           <option>D11</option>
           <option>D12</option>
           <option>D13</option>
           <option>D14</option>
           <option>D15</option>
           <option>ACL</option>
           </select>
           </div>
        </div> 
       









      </div>
    );
  }
s




  changeMode(evt){
    var mymode=evt.target.value;
    console.log('mymode',mymode);
    if(this.props.changeMode){
      this.props.changeMode(mymode);
    }
  }

  changeSource(evt){
    var mysource=evt.target.value;
    console.log('mysource',mysource);
    if(this.props.changeSource){
      this.props.changeSource(mysource);
    }
  }


}








