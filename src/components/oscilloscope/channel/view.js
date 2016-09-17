import React from 'react';
require('./channel.less');
import {Label,FormControl} from 'react-bootstrap';
var Rx = require('rx');
// console.log('Input',Input)

export default class ChannelView extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state={
      checked:false,
      range:{min:-10,max:10},
      scale_range:{min:-10,max:10}
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps',nextProps)
    this.setState({
      range:nextProps.range,
      scale_range:nextProps.scale_range
    });
  }

  render() {
    const {name}=this.props;
    const {range,scale_range}=this.state;
    // console.log('render',this.state)
    return (
      <div className='channel'>
        <Label>{name}</Label>
        <div className="row">
          <div className="col-xs-4"> 
            <input ref='ctrl_switch' className="mui-switch" id={'SW'+name} type="checkbox" onChange={this.channelControl.bind(this)} />         
          </div>
          <div className="col-xs-4">INV</div>
          <div className="col-xs-4">
            <input ref='inv_switch' type="checkbox" onChange={this.channelInvert.bind(this)} />
          </div>
        </div>

        <form className="form-horizontal" >
          <input onChange={this.setVerticalOffset.bind(this)} type="number" label="Offset" labelClassName="col-xs-4" wrapperClassName="col-xs-8"  placeholder="0" max={range.max} min={range.min}/>
          <input onChange={this.setVerticalScale.bind(this)} type="number" label="Scale" labelClassName="col-xs-4" wrapperClassName="col-xs-8" placeholder="0" max={scale_range.max} min={scale_range.min}/>
          <div className="row"> 
            <div className="col-xs-4">Input Couping</div>
            <div className="col-xs-8">
              <select onChange={this.inputCoupling.bind(this)}>
                <option value="AC">交流</option>
                <option value="DC">直流</option>
              </select>
            </div>
          </div>
          <div className="row"> 
            <div className="col-xs-4">Input Impedance</div>
            <div className="col-xs-8">
              <select onChange={this.inputImpedance.bind(this)}>
                <option value="50">50 Ohm</option>
                <option value="1M">1M Ohm</option>
              </select>
            </div>
          </div>
        </form>

      </div>
        
    );
  }



  componentDidMount() {
  }
  componentWillUnmount() {
    
  }


  channelControl(evt){
    console.log("Clicked, new value = "+evt.target.checked);
    //console.log("Clicked, new value = "+this.refs.ctrl_switch.checked);
    var ctrl_state=(evt.target.checked)?"ON":"OFF";
    if(this.props.pchangeControl){
      this.props.pchangeControl(ctrl_state);
    }
  }

  channelInvert(evt){
    //console.log("Clicked, new value = "+evt.target.checked);
    //console.log("Clicked, new value = "+this.refs.inv_switch.checked);
    var ch_inv=(evt.target.checked)?"ON":"OFF";
    if(this.props.pchangeInvert){
      this.props.pchangeInvert(ch_inv);
    }
  }


  setVerticalOffset(evt){
    var voffset=evt.target.value;
    // if( voffset < scale_range.max && voffset > scale_range.min ){
    //   revalue=value;
    // }
    // else if(voffset < scale_range.min){
    //   revalue=scale_range.min;
    // }
    // else{
    //   revalue=scale_range.max;
    // }
    if(this.props.psetVerticalOffset){
      this.props.psetVerticalOffset(voffset);
    }
  }

  setVerticalScale(evt){
    var vdiv=evt.target.value;
    if(this.props.psetVerticalScale){
      this.props.psetVerticalScale(vdiv);
    }
  }

  inputCoupling(evt){
    var Type=evt.target.value;
    if(this.props.pinputCoupling){
      this.props.pinputCoupling(Type);
    }
  }

  inputImpedance(evt){
    var Imp=evt.target.value;
    if(this.props.pinputImpedance){
      this.props.pinputImpedance(Imp);
    }
  }

}
