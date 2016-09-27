import React from 'react';
require('./risingedge.less');

export default class RisingedgeView extends React.Component {
  static propTypes = {
    changeRisingedge: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <span className='risingedge'>
          上升沿<input  ref="risingedge"  type="number" name="risingedge" min="1" max="10000000" onChange={this.changeRisingedge.bind(this)}/>
      </span>
    );
  }

  componentDidMount() {
    if(!this.props.changeRisingedge){
      return;
    }
  }
  componentWillUnmount() {
    // this.scaleSubscription.dispose();
  }

  changeRisingedge(evt){
    var scale=evt.target.value;
    // console.log('scale',scale);
    if(this.props.changeRisingedge){
      this.props.changeRisingedge(scale*0.000000001);
    }
  }

}
