import React from 'react';
require('./fallingedge.less');

export default class FallingedgeView extends React.Component {
  static propTypes = {
    changeFallingedge: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <span className='fallingedge'>
          下降沿<input  ref="fallingedge"  type="number" name="fallingedge" min="1" max="10000000" onChange={this.changeFallingedge.bind(this)}/>
      </span>
    );
  }

  componentDidMount() {
    if(!this.props.changeFallingedge){
      return;
    }
  }
  componentWillUnmount() {
    // this.scaleSubscription.dispose();
  }

  changeFallingedge(evt){
    var scale=evt.target.value;
    // console.log('scale',scale);
    if(this.props.changeFallingedge){
      this.props.changeFallingedge(scale*1);
    }
  }

}
