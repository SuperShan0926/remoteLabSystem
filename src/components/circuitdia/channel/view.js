import React from 'react';
require('./channel.less');

export default class ChannelView extends React.Component {
  static propTypes = {
    changeValue: React.PropTypes.func,
    portarray:React.PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state={
    };
  }

  componentWillReceiveProps(nextProps) {
    // console.log('componentWillReceiveProps',nextProps);
  }

  componentDidMount() {

  }

  handleChange(event){
    console.log('handleChange');
    if(this.props.changeValue){
       this.props.changeValue(event.target.id, event.target.value);
    }
  }

  render() {  
    return (
         <div className='channel'>
            <div className="col-xs-4">CH1:</div>
            <div className="col-xs-8">
              <select id='ch1' onChange={this.handleChange.bind(this)}>
              {
                this.props.portarray.map(m=><option value ={m.num}>{m.num}</option>)
              }
              </select>
            </div>
            <div className="col-xs-4">CH2:</div>
            <div className="col-xs-8">
              <select id='ch2' onChange={this.handleChange.bind(this)}>
              {
                this.props.portarray.map(m=><option value ={m.num}>{m.num}</option>)
              }
              </select>
            </div>
         </div>
    );
  }
}