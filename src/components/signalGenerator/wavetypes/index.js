import React from 'react';
import {Tabs, Tab} from 'react-bootstrap';
import Sine from '../sine'
import Ramp from '../ramp'
import Square from '../square'
var agent = require('superagent-promise')(require('superagent'), Promise);


export default class WaveTypes extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='wavetypes'>
        <Tabs defaultActiveKey={1}>
          <Tab eventKey={1} title="Sine">
            <Sine/>
          </Tab>
          <Tab eventKey={2} title="Ramp">
            <Ramp/>
          </Tab>
          <Tab eventKey={3} title="Square">
            <Square/>
          </Tab>
        </Tabs>
      </div>
    );
  }
}
