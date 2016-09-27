import React from 'react';
require('./offset.less');

export default class OffsetView extends React.Component {
  static propTypes = {
    changeOffset: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <span className='offset'>
          偏移<input  ref="offset"  type="number" name="offset" min="1" max="10000000" onChange={this.changeOffset.bind(this)}/>
      </span>
    );
  }

  componentDidMount() {
    if(!this.props.changeOffset){
      return;
    }
  }
  
  componentWillUnmount() {
    // this.scaleSubscription.dispose();
  }

  changeOffset(evt){
    var scale=evt.target.value;
    // console.log('scale',scale);
    if(this.props.changeOffset){
      this.props.changeOffset(scale*1);
    }
  }

}
