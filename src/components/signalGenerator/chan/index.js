import React from 'react';
require('./chan.less');
import {Tabs, Tab} from 'react-bootstrap';
import Output from '../output'
import WaveTypes from '../wavetypes'
import Sine from '../sine'
import Ramp from '../ramp'
import Square from '../square'
import Pulse from '../pulse'

export default class Chan extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.chan = {};
    this.data = {};
  }

  componentWillReceiveProps(nextProps) {
     if(nextProps.data){
      this.data = nextProps.data;
      this.forceUpdate();
    }
  }

  render() {
    const {name,host}=this.props;
    console.log('props-in-chan',this.props);
    return (
      <div className='chan'>
        <Output save={this.saveOutput.bind(this)} data={this.data.output}/>
        <Tabs defaultActiveKey={1}>
          <Tab eventKey={1} title="Sine">
            <Sine name={name} host={host} save={this.saveSine.bind(this)} data={this.data.sine}/>
          </Tab>
          <Tab eventKey={2} title="Ramp">
            <Ramp name={name} host={host} save={this.saveRamp.bind(this)} data={this.data.ramp}/>
          </Tab>
          <Tab eventKey={3} title="Square">
            <Square name={name} host={host} save={this.saveSquare.bind(this)} data={this.data.square}/>
          </Tab>
          <Tab eventKey={4} title="Pulse">
            <Pulse name={name} host={host} save={this.savePulse.bind(this)} data={this.data.pulse}/>
          </Tab>
           <Tab eventKey={5} title="Noise">
           
          </Tab>
          <Tab eventKey={6} title="Sweep">
           
          </Tab>
          <Tab eventKey={7} title="Mod">
          
          </Tab>
          <Tab eventKey={8} title="Burst">
            
          </Tab>
        </Tabs>
      </div>
    );
  }

  saveOutput(data){
    this.chan.output = data;
    this.props.save(this.chan);
  }

  saveSine(data){
    this.chan.sine = data;
    this.props.save(this.chan);
  }

  saveRamp(data){
    this.chan.ramp = data;
    this.props.save(this.chan);
  }

  saveSquare(data){
    this.chan.square = data;
    this.props.save(this.chan);
  }

  savePulse(data){
    this.chan.pulse = data;
    this.props.save(this.chan);
  }

}
