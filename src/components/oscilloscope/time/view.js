import React from 'react';
require('./time.less');
import {Label} from 'react-bootstrap';
// var Rx = require('rx');

export default class TimeView extends React.Component {
  static propTypes = {
    changeScale: React.PropTypes.func,
    chagePosition: React.PropTypes.func
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='time'>
        <Label>Time</Label>
        <div className="row">
          <div className="col-xs-4">Position</div>
          <div className="col-xs-8">
          <input  ref="position"  type="range" min="-10" max="10" onChange={this.changePosition.bind(this)}/>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-4">Scale</div>
          <div className="col-xs-8">
          <input  ref="scale" dir="rtl" type="number" min="1" max="10000" onChange={this.changeScale.bind(this)}/>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    if(!this.props.changeScale||!this.props.chagePosition){
      return;
    }
  }
  componentWillUnmount() {
    // this.scaleSubscription.dispose();
    // this.positionSubcription.dispose();
  }

  changeScale(evt){
    var scale=evt.target.value;
    // console.log('scale',scale);
    if(this.props.changeScale){//此处调用index传进来的函数
      this.props.changeScale(scale*0.000000001);
    }
  }

  changePosition(evt){
    var position = evt.target.value;
    if(this.props.chagePosition){
      this.props.chagePosition(position);
    }
  }

}
