import React from 'react';
import ChannelView from './view.js'
var agent = require('superagent-promise')(require('superagent'), Promise);
require('./channel.less');
export default class Channel extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
    save: React.PropTypes.func,
  };

  componentDidMount() {
    //console.log('componentDidMount');
    this.getRange();
    this.getScaleRange();
  }

  constructor(props) {
    super(props);
    this.data = {};
    this.state={
      channelControl:"OFF",
      channelInvert:"OFF",
      verticalOffset: 0,
      verticalScale:0.0005,
      inputCoupling:"AC",
      inputImpedance:"50",
      range:{min:-10,max:20},
      scale_range:{min:-10,max:20},
    };
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.data){
      debugger;
      this.channelControl(nextProps.data.channelControl);
      this.channelInvert(nextProps.data.channelInvert);
      this.setVerticalOffset(nextProps.data.verticalOffset);
      this.setVerticalScale(nextProps.data.verticalScale);
      this.inputCoupling(nextProps.data.inputCoupling);
      this.inputImpedance(nextProps.data.inputImpedance);
      }     
  }

  render() {
    const {name}=this.props;
    this.props.save(this.state);
    return (
      <ChannelView 
      name={name}
      pchangeControl={this.channelControl.bind(this)}
      pchangeInvert={this.channelInvert.bind(this)}
      psetVerticalOffset ={this.setVerticalOffset.bind(this)}
      psetVerticalScale ={this.setVerticalScale.bind(this)}
      pinputCoupling ={this.inputCoupling.bind(this)}
      pinputImpedance ={this.inputImpedance.bind(this)}
      range={this.state.range}
      scale_range={this.state.scale_range}
      channelControl={this.state.channelControl}
      channelInvert={this.state.channelInvert}
      verticalOffset={this.state.verticalOffset}
      verticalScale={this.state.verticalScale}
      inputImpedance={this.state.inputImpedance}
      inputCoupling={this.state.inputCoupling}
      />
    );
  }

  getRange(){
    const {name,host}=this.props;
    //范围检查
    agent.get(host+'/DS-VOffset-Range?Channel='+name).then(res=>{
      var range=res.body;
      this.setState({range:range});
    });
  }

  getScaleRange(){
    const {name,host}=this.props;

    //范围检查
    return agent.get(host+'/DS-VScal-Range?Channel='+name).then(res => {
      var scale_range=res.body;
      this.setState({scale_range:scale_range});
    });
  }

  //C_V1
  channelControl(value){
    console.log('channelControl',value);
    debugger;
    const {host,name}=this.props;
    agent.post(host+'/DS-CHANnel?Channel='+name+'&State='+value).then(res => {
      this.setState({'channelControl':value});
    }); 
  }

    //C_V2
  channelInvert(value){
    console.log('channelInvert',value);
    const {host,name}=this.props;
    agent.post(host+'/DS-INVert?Channel='+name+'&INVert='+value).then(res => {
      this.setState({'channelInvert':value});
    }); 
  }

    //C_V3
  setVerticalOffset(value){
    value=Number(value);
    console.log('VerticalOffset',value);
    const {name,host}=this.props;
    const {range}=this.state;
    // console.log('range',range.min,range.max);

    var revalue=0;
    if( value < range.max && value > range.min ){
      revalue=value;
    }
    else if(value < range.min){
      revalue=range.min;
    }
    else{
      revalue=range.max;
    }

    //更新值
    agent.post(host+'/DS-OFFSet?Channel='+name+'&OFFSet='+revalue).then(res => {
      this.setState({'verticalOffset':revalue});
    }); 
  }

    //C_V4
  setVerticalScale(value){
    console.log('VerticalScale',value);
    const {name,host}=this.props;
    const {scale_range}=this.state;
    console.log('scale_range',scale_range.min,scale_range.max);

    var revalue=0;
    if( value < scale_range.max && value > scale_range.min ){
      revalue=value;
    }
    else if(value < scale_range.min){
      revalue=scale_range.min;
    }
    else{
      revalue=scale_range.max;
    }
    console.log(revalue);
    agent.post(host+'/DS-SCAL?Channel='+name+'&SCAL='+revalue).then(res => {
      this.setState({'verticalScale':revalue});
    }); 


    //每当C_V4发生变化，应调用Get Voltage Offset Range [/DS-VOffset-Range{?Channel}]更新C_V3控件的设定范围；

    //应调用Get Time Offset Range [/DS-TIMOffset-Range{?}]更新C_T1控件的设定范围
  }

    //C_V5
  inputCoupling(value){
    console.log('inputCoupling',value);
    const {name,host}=this.props;

    agent.post(host+'/DS-COUPling?Channel='+name+'&Type='+value).then(res => {
      this.setState({'inputCoupling':value});
    }); 
  }

  //C_V6
  inputImpedance(value){
    console.log('inputImpedance',value);
    const {name,host}=this.props;

    agent.post(host+'/DS-IMPedance?Channel='+name+'&Imp='+value).then(res => {
      debugger;
      this.setState({'inputImpedance':value});
    }); 

    //C_V6发生变化，应调用Get Voltage Offset Range [/DS-VOffset-Range{?Channel}]更新C_V3控件的设定范围；

    //调用Get Voltage Scale Range [/DS-VScal-Range{?Channel}]更新C_V4控件的设定范围；
  }

}


