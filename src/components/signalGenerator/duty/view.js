import React from 'react';
require('./duty.less');

export default class DutyView extends React.Component {
  static propTypes = {
    changeDuty: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <span className='duty'>
          占空比<input  ref="duty"  type="number" name="duty" min="1" max="10000000" onChange={this.changeDuty.bind(this)}/>
      </span>
    );
  }

  componentDidMount() {
    if(!this.props.changeDuty){
      return;
    }
  }
  componentWillUnmount() {
    this.scaleSubscription.dispose();
  }

  changeDuty(evt){
    var scale=evt.target.value;
    // console.log('scale',scale);
    if(this.props.changeDuty){
      this.props.changeDuty(scale*0.000000001);
    }
  }

}
