import React from 'react';
require('./measureport.less');

export default class MeasureportView extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
    position: React.PropTypes.string,
    status: React.PropTypes.bool,
    ch1: React.PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.state={
        status:false,
        ch1:false,
    };
  }

  componentWillReceiveProps(nextProps) {
    // console.log('componentWillReceiveProps',nextProps);
    this.setState({'status':nextProps.status});
    this.setState({'ch1':nextProps.ch1});
  }

  componentDidMount() {
  }

  handleClick(){
    console.log('click');
    if(this.props.changeValue){
       this.props.changeValue(!this.state.highlight);
    }
    this.setState({'highlight':!this.state.highlight});
  }

  render() {  
    var imgsrcnormal='../components/circuitdia/measureport/img/greenmeasureport.png';
    var imgsrcch1='../components/circuitdia/measureport/img/bluemeasureport.png';
    var imgsrcch2='../components/circuitdia/measureport/img/yellowmeasureport.png';
    var classNames = require('classnames');
    var positionClasses = classNames({
      'horizontalright': this.props.position=='horizontalright',
      'horizontalleft': this.props.position=='horizontalleft',
      'verticalup': this.props.position=='verticalup',
      'verticaldown': this.props.position=='verticaldown',
    });

    return (
         <div className='measureport'>
            <div className='name'>{this.props.name}</div>
            <div ref='port' className={positionClasses}> 
                <img src={(this.state.status)?((this.state.ch1)?imgsrcch1:imgsrcch2):imgsrcnormal} />
            </div>
         </div>
    );
  }
}