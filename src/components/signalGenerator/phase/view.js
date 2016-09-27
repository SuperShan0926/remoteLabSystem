import React from 'react';
require('./phase.less');

export default class PhaseView extends React.Component {
  static propTypes = {
    changePhase: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <span className='phase'>
          相位<input  ref="phase"  type="number" name="phase" min="1" max="10000000" onChange={this.changePhase.bind(this)}/>
      </span>
    );
  }

  componentDidMount() {
    if(!this.props.changePhase){
      return;
    }
  }
  componentWillUnmount() {
    // this.scaleSubscription.dispose();
  }

  changePhase(evt){
    var scale=evt.target.value;
    // console.log('scale',scale);
    if(this.props.changePhase){
      this.props.changePhase(scale*1);
    }
  }

}
