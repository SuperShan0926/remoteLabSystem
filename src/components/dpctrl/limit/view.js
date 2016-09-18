import React from 'react';
require('./limit.less');
require('../switchless/index.less');
var Switch = require('rc-switch');

export default class LimitView extends React.Component {
  static propTypes = {
    changeLimitVoltage: React.PropTypes.func,
    changeLimitCurrent: React.PropTypes.func,
    changeLimitVoltageState: React.PropTypes.func,
    changeLimitCurrentState: React.PropTypes.func,
    valueVoltage: React.PropTypes.string,
    valueCurrent:React.PropTypes.string,
    voltageChecked:React.PropTypes.bool,
    currentChecked:React.PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.state = {
      disabledvoltage: true,
      disabledcurrent: true,
      valueVoltage:'0.000',
      valueCurrent:'0.000',
      voltageChecked:false,
      currentChecked:false
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps);
  }

  handleLimitVoltageState(value){
      console.log('view:handleLimitVoltageState')
      if(this.props.changeLimitVoltageState){
         this.props.changeLimitVoltageState(value);
      }
      this.setState({'voltageChecked':value});
      this.setState({disabledvoltage:!value});
  }

  handleLimitCurrentState(value){
      console.log('view:handleLimitCurrentState')
      if(this.props.changeLimitCurrentState){
         this.props.changeLimitCurrentState(value);
      }
      this.setState({'currentChecked':value});
      this.setState({disabledcurrent:!value});
  }

  handleChangeVoltage(event) {
    console.log('view:handleChangeVoltage')
    if(this.props.changeLimitVoltage){
       this.props.changeLimitVoltage(event.target.value);
       this.setState({valueVoltage:event.target.value});
    }
  }

  handleChangeCurrent(event) {
    console.log('view:handleChangeCurrent')
    if(this.props.changeLimitCurrent){
       this.props.changeLimitCurrent(event.target.value);
       this.setState({valueCurrent:event.target.value});
    }
  }

  render() {
    return (
      <div className='limit'>
        <div style={{width:'250px',float:'left',margin:'5px',fontSize:'16px'}}>限制</div>
        <div style={{width:'250px',float:'left',margin:'5px',fontSize:'16px'}}>
          <div style={{width:'60px',float:'left',textAlign:'center'}}>限压</div>
          <div style={{width:'120px',float:'left'}}>
            <input disabled={!this.state.voltageChecked} style={{width:'110px',height:'30px'}} type='text' onChange={this.handleChangeVoltage.bind(this)} value={this.state.valueVoltage}/>
          </div>
          <div style={{width:'20px',float:'left'}}>V</div>
          <div style={{width:'50px',float:'left'}}>
             <Switch 
                onChange={this.handleLimitVoltageState.bind(this)}
                checkedChildren={'开'}
                unCheckedChildren={'关'}
                checked={this.state.voltageChecked}
             />
          </div>
        </div>
        <div style={{width:'250px',float:'left',margin:'5px',fontSize:'16px'}}>
          <div style={{width:'60px',float:'left',textAlign:'center'}}>限流</div>
          <div style={{width:'120px',float:'left'}}>
            <input disabled={!this.state.currentChecked} style={{width:'110px',height:'30px'}} type='text' onChange={this.handleChangeCurrent.bind(this)} value={this.state.valueCurrent}/>
          </div>
          <div style={{width:'20px',float:'left'}}>A</div>
          <div style={{width:'50px',float:'left'}}>
             <Switch 
                onChange={this.handleLimitCurrentState.bind(this)}
                checkedChildren={'开'}
                unCheckedChildren={'关'}
                checked={this.state.currentChecked}
             />
          </div>
        </div>
      </div>
    );
  }

}