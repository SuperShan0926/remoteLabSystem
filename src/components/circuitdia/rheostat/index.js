import React from 'react';
import RheostatView from './view.js';
var agent = require('superagent-promise')(require('superagent'), Promise);

export default class Rheostat extends React.Component {

  static propTypes = {
    host: React.PropTypes.string,
    property:React.PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state={
      rheostatValue:props.property.value,
    };
  }

  setRheostatValue(value){
    console.log('setRheostatValue',value);
    const {host}=this.props;

    agent.post(host+'SetSwitch?K='+ this.props.property.name +'&State='+value).then(res => {
    });

  }
  
  render() {
    var host=this.props.host;
    var property=this.props.property;
    return (
      <div style={{position:'absolute',top:property.top,left:property.left}}>        
        <RheostatView host={host} changeValue={this.setRheostatValue.bind(this)} horizontal={property.horizontal} rheostatValue={property.value}/>
      </div>
    );
  }

  componentDidMount() {
    this.setRheostatValue(this.state.rheostatValue);
  }
  componentWillUnmount() {
  }
}