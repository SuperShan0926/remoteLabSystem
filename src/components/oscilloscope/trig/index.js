import React from 'react';
import TrigView from './view.js';
require('./trig.less');
var agent = require('superagent-promise')(require('superagent'), Promise);

export default class Trig extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
    save: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state={
      mode:'EDGE',
      source:'EDGE'
    };
  }

  componentWillReceiveProps(nextProps) {
   if(nextProps.data){
    this.setState({mode:nextProps.data.mode,source:nextProps.data.source});
    this.forceUpdate();
   }
  }
  render() {
    this.props.save(this.state);
    return (
      <div className='trig'>
        <TrigView changeMode={this.setmode.bind(this)} changeSource={this.setsource.bind(this)}/>
      </div>

    );
    
  }

setmode(value){
    console.log('setmode',value);
    const {host}=this.props;
    agent.post(host+'/DS-TRIGmode?Tmode='+value).then(res => {
      this.setState({'mode':value});
    });
  }




setsource(value){
    console.log('setsource',value);
    const {host}=this.props;
    const {mode}=this.state;
    agent.post(host+'/DS-TRIGsource?TSource='+value).then(res => {
      this.setState({'source':value});
    });
  }



}

