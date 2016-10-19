import React from 'react';
import ChangerView from './view.js';
var agent = require('superagent-promise')(require('superagent'), Promise);

export default class Changer extends React.Component {

  static propTypes = {
    host: React.PropTypes.string,
    property:React.PropTypes.object,
  };

  constructor(props) {
    super(props);
  }

  setChangerValue(value){
    console.log('setChangerValue',value);
    const {host}=this.props;

    agent.post(host+'SetSwitch?K='+ this.props.property.name +'&State='+value).then(res => {
    });

  }

  render() {
    var property=this.props.property;
    return (
      <div style={{position:'absolute',top:property.top,left:property.left}}>        
        <ChangerView horizontal={property.horizontal} issingle={property.issingle} position={property.position} changeValue={this.setChangerValue.bind(this)}/>
      </div>
    );
  }

  componentDidMount() {
    var value = (this.props.property.status)?'ON':'OFF';
    this.setChangerValue(value);
  }
}
