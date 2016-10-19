import React from 'react';
require('./chans.less');
import Chan from '../chan'
import {Tabs, Tab} from 'react-bootstrap';

export default class Chans extends React.Component {

  constructor(props) {
    super(props);
    this.chans = {};
    this.data = {};
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.data){
      this.data = nextProps.data;
      this.forceUpdate();
    }     
  }
  render() {  
    return (
      <div className='chans'>
        <Tabs defaultActiveKey={2} id="uncontrolled-tab-example">
          <Tab eventKey={1} title="CH1">
            <Chan name='CHAN1' host={this.props.host} save={this.saveChan1.bind(this)} data={this.data.ch1}/>
          </Tab>
          <Tab eventKey={2} title="CH2">
            <Chan name='CHAN2' host={this.props.host} save={this.saveChan2.bind(this)} data={this.data.ch2}/>
          </Tab>
        </Tabs>
      </div>
    );
  }

  saveChan1(data){
    this.chans.ch1 = data;
    this.props.save(this.chans);
  }

  saveChan2(data){
    this.chans.ch2 = data;
    this.props.save(this.chans);
  }

}
