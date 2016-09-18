import React from 'react';
require('./output.less');

export default class OutputView extends React.Component {
  static propTypes = {
    changeOutputVoltage: React.PropTypes.func,
    changeOutputCurrent: React.PropTypes.func,
    valueVoltage: React.PropTypes.string,
    valueCurrent:React.PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state=props;
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps);
  }

  handleChangeVoltage(event) {
    console.log('view:handleChangeVoltage')
    if(this.props.changeOutputVoltage){
       this.props.changeOutputVoltage(event.target.value);
       this.setState({valueVoltage:event.target.value});
    }
  }

  handleChangeCurrent(event) {
    console.log('view:handleChangeCurrent')
    if(this.props.changeOutputCurrent){
       this.props.changeOutputCurrent(event.target.value);
       this.setState({valueCurrent:event.target.value});
    }
  }

  render() {
    return (
      <div className='output'>
        <div style={{width:'250px',float:'left',margin:'5px',fontSize:'16px'}}>设置</div>

        <div style={{width:'250px',float:'left',margin:'5px',fontSize:'16px'}}>
          <div style={{width:'60px',float:'left',textAlign:'center'}}>电压</div>
          <div style={{width:'120px',float:'left'}}>
            <input style={{width:'110px',height:'30px'}} type='text' onChange={this.handleChangeVoltage.bind(this)} value={this.state.valueVoltage}/>
          </div>
          <div style={{width:'50px',float:'left'}}>V</div>
        </div>
        <div style={{width:'250px',float:'left',margin:'5px',fontSize:'16px'}}>
          <div style={{width:'60px',float:'left',textAlign:'center'}}>电流</div>
          <div style={{width:'120px',float:'left'}}>
            <input style={{width:'110px',height:'30px'}} type='text' onChange={this.handleChangeCurrent.bind(this)} value={this.state.valueCurrent}/>
          </div>
          <div style={{width:'50px',float:'left'}}>A</div>
        </div>
      </div>
    );
  }

}