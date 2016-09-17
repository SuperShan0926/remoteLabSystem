import React from 'react';
require('./sine.less');
import {Input} from 'react-bootstrap';
import {Label} from 'react-bootstrap';
import Freq from '../frequency';
import Amp from '../amp';
import Offset from '../offset';
import Phase from '../phase';


export default class SineView extends React.Component {
  static propTypes = {
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {host,name}=this.props;
    console.log('SineView',this.props);
    return (
      <div className='sine'>
          <Freq name={name} host={host}/>
          <Amp name={name} host={host}/>
          <Offset name={name} host={host}/>
          <Phase name={name} host={host}/>
          <div className='harmonic'>
              <Label>谐波</Label>
              <div className="row"> 
                <div className="col-xs-1">
                </div>
                <div className="col-xs-2">
                    <select onChange={this.setHarmonicState.bind(this)}>
                      <option value="ON">打开</option>
                      <option value="OFF">关闭</option>
                    </select>
                </div>
                <div className="col-xs-1">
                </div>
                <div className="col-xs-3">
                    <div className="col-xs-6">类型</div>
                    <div className="col-xs-6">
                      <select onChange={this.setHarmonicType.bind(this)}>
                        <option value="EVEN">偶次谐波</option>
                        <option value="ODD">奇次谐波</option>
                        <option value="ALL">顺序谐波</option>
                        <option value="USER">自定义</option>
                      </select>
                    </div>
                </div>
              </div>
              <div className="row"> 
                <div className="col-xs-1">
                </div>
                <form className="form-horizontal" >
                  <div className="col-xs-3"> 
                    <Input type="number" label="次数" labelClassName="col-xs-5" wrapperClassName="col-xs-7"  placeholder="0" onChange={this.setHarmonicOrder.bind(this)} max='8' min='2' />
                  </div>
                  <div className="col-xs-3"> 
                    <Input type="number" label="幅度" labelClassName="col-xs-5" wrapperClassName="col-xs-7"  placeholder="0" onChange={this.setHarmonicAmplitude.bind(this)} max='360' min='0'/>
                  </div>
                  <div className="col-xs-3"> 
                    <Input type="number" label="相位" labelClassName="col-xs-5" wrapperClassName="col-xs-7"  placeholder="0" onChange={this.setHarmonicPhase.bind(this)}/>
                  </div>
                </form>
              </div>
          </div>
      </div>
      
      
    );
  }

  componentDidMount() {
  }
  componentWillUnmount() {
  }

  setFrequency(evt){
    console.log("call setFrequency"+evt.target.value);
    var Freq=evt.target.value;
    if(this.props.psetFrequency){
      this.props.psetFrequency(Freq);
    }
  }


  //C_H1
  setHarmonicState(evt){
    var Hstate=evt.target.value;
    if(this.props.psetHarmonicState){
      this.props.psetHarmonicState(Hstate);
    }
  }

  //C_H5
  setHarmonicType(evt){
    var Htype=evt.target.value;
    if(this.props.psetHarmonicType){
      this.props.psetHarmonicType(Htype);
    }
  }

  //C_H2
  setHarmonicOrder(evt){
    var MaxOrder=evt.target.value;
    if(this.props.psetHarmonicOrder){
      this.props.psetHarmonicOrder(MaxOrder);
    }
  }

  //C_H3
  setHarmonicAmplitude(evt){
    console.log("call setHarmonicAmplitude"+evt.target.value);
    var Hamp=evt.target.value;
    if(this.props.psetHarmonicAmplitude){
      this.props.psetHarmonicAmplitude(Hamp);
    }
  }

  //C_H4
  setHarmonicPhase(evt){
    var Hphase=evt.target.value;
    if(this.props.psetHarmonicPhase){
      this.props.psetHarmonicPhase(Hphase);
    }
  }


}
