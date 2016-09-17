import React from 'react';
import MeasureportView from './view.js';
var agent = require('superagent-promise')(require('superagent'), Promise);

export default class Measureport extends React.Component {

  static propTypes = {
    host: React.PropTypes.string,
    property:React.PropTypes.object,
    changeValue: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state={
      status:false,
      ch1:false,
    };
  }

  componentWillReceiveProps(nextProps) {
    // console.log('componentWillReceiveProps',nextProps);
    this.setState({'status':nextProps.property.status});
    this.setState({'ch1':nextProps.property.ch1});
  }

  setMeasureportValue(value){
    const {host}=this.props;
   if(this.props.changeValue){
        this.props.changeValue(this.props.property.name,value);
    }
    agent.post(host+'SetProbe?OCH1=1&OCH2=1').then(res => {
         
    });

  }
  
  render() {
    var host=this.props.host;
    var property=this.props.property;
    return (
      <div style={{position:'absolute',top:property.top,left:property.left}}>        
        <MeasureportView name={property.name} position={property.position} status={this.state.status} ch1={this.state.ch1}/>
      </div>
    );
  }

  componentDidMount() {
  }
  componentWillUnmount() {
  }
}