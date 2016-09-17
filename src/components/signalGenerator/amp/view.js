import React from 'react';
require('./amp.less');

export default class AmpView extends React.Component {
  static propTypes = {
    changeAmp: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <span className='amp'>
          幅度<input  ref="amp"  type="number" name="amp" min="1" max="10000000" onChange={this.changeAmp.bind(this)}/>
      </span>
    );
  }

  componentDidMount() {
    if(!this.props.changeAmp){
      return;
    }
  }
  componentWillUnmount() {
    this.scaleSubscription.dispose();
  }

  changeAmp(evt){
    var scale=evt.target.value;
    // console.log('scale',scale);
    if(this.props.changeAmp){
      this.props.changeAmp(scale*1);
    }
  }

}
