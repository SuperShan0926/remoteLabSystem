import React from 'react';
require('./frequency.less');

export default class FreqView extends React.Component {
  static propTypes = {
    changeFreq: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <span className='frequency'>
          频率<input  ref="frequency"  type="number" name="frequency" min="1" max="10000000" onChange={this.changeFreq.bind(this)}/>
      </span>
    );
  }

  componentDidMount() {
    if(!this.props.changeFreq){
      return;
    }
  }
  componentWillUnmount() {
    this.scaleSubscription.dispose();
  }

  changeFreq(evt){
    var scale=evt.target.value;
    // console.log('scale',scale);
    if(this.props.changeFreq){
      this.props.changeFreq(scale*1);
    }
  }

}
