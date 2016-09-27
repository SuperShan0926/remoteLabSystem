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
    // this.state = props;
  }

  // componentWillReceiveProps(nextProps) {
  //   this.setState({
  //       range:nextProps.range,
  //       scale_range:nextProps.scale_range,
  //       channelControl:nextProps.channelControl,
  //       channelInvert:nextProps.channelInvert,
  //       verticalOffset:nextProps.verticalOffset,
  //       verticalScale:nextProps.verticalScale,
  //       inputCoupling:nextProps.inputCoupling,
  //       inputImpedance:nextProps.inputImpedance,
  //   });
  // }

  render() {
    debugger;
    const {name,range,scale_range,inputCoupling,inputImpedance,verticalOffset,verticalScale,channelControl,channelInvert}=this.props;
    const Ickd = (channelInvert=="ON"?true:false);
    const Cckd = (channelControl=="ON"?true:false);
    return (
      <div className='OSCchannel'>
        <Label>{name}</Label>
        <div className="row">
          <div className="col-xs-4"> 
            <input ref='ctrl_switch' className="mui-switch" id={'SW'+name} type="checkbox" checked={Cckd} onChange={this.channelControl.bind(this)} />         
          </div>
          <div className="col-xs-4">INV</div>
          <div className="col-xs-4">
            <input ref='inv_switch' type="checkbox" checked={Ickd} onChange={this.channelInvert.bind(this)} />
          </div>
        </div>

        <form className="form-horizontal" >
          <input onChange={this.setVerticalOffset.bind(this)} type="number" label="Offset" labelClassName="col-xs-4" wrapperClassName="col-xs-8"  placeholder="0" max={range.max} min={range.min} value={verticalOffset}/>
          <input onChange={this.setVerticalScale.bind(this)} type="number" label="Scale" labelClassName="col-xs-4" wrapperClassName="col-xs-8" placeholder="0" max={scale_range.max} min={scale_range.min} value={verticalScale}/>
          <div className="row"> 
            <div className="col-xs-4">Input Couping</div>
            <div className="col-xs-8">
              <select onChange={this.inputCoupling.bind(this)} value={inputCoupling}>
                <option value="AC">交流</option>
                <option value="DC">直流</option>
              </select>
            </div>
          </div>
          <div className="row"> 
            <div className="col-xs-4">Input Impedance</div>
            <div className="col-xs-8">
              <select onChange={this.inputImpedance.bind(this)} value={inputImpedance}>
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
    evt.preventDefault();
    var Imp=evt.target.value;
    if(this.props.pinputImpedance){
      this.props.pinputImpedance(Imp);
    }
  }

}
