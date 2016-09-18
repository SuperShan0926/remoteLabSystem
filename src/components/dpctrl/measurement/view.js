import React from 'react';
require('./measurement.less');

export default class MeasurementView extends React.Component {
  static propTypes = {
    pc8: React.PropTypes.object,
    channelName:React.PropTypes.string,
    host: React.PropTypes.string,
    voltage: React.PropTypes.string,
    current: React.PropTypes.string,
    power: React.PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state=props;
  }

  componentWillReceiveProps(nextProps) {
    // console.log('componentWillReceiveProps',nextProps);
    this.setState(nextProps);
  }

  render() {
    var name = this.props.channelName;
    var host=this.props.host;
    return (
      <div className='measurement'>
        <div className='childdiv'>
          <div className="col-xs-4">电压</div>
          <div className="col-xs-4">{this.props.voltage}</div>
          <div className="col-xs-4">(V)</div>
        </div>
        <div className='childdiv'>
          <div className="col-xs-4">电流</div>
          <div className="col-xs-4">{this.props.current}</div>
          <div className="col-xs-4">(A)</div>
        </div>
        <div className='childdiv'>
          <div className="col-xs-4">功率</div>
          <div className="col-xs-4">{this.props.power}</div>
          <div className="col-xs-4">(W)</div>
        </div>
      </div>
    );
  }

}
