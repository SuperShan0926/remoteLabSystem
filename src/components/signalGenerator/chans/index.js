import React from 'react';
require('./chans.less');
import Chan from '../chan'
import {Tabs, Tab} from 'react-bootstrap';

export default class Chans extends React.Component {

  constructor(props) {
    super(props);
    this.chans = {};
  }

  render() {
    console.log("props-in-chans",this.props);
    return (
      <div className='chans'>
        <Tabs defaultActiveKey={2}>
          <Tab eventKey={1} title="CH1">
            <Chan name='CHAN1' host={this.props.host} save={this.saveChan1.bind(this)}/>
          </Tab>
          <Tab eventKey={2} title="CH2">
            <Chan name='CHAN2' host={this.props.host} save={this.saveChan2.bind(this)}/>
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
