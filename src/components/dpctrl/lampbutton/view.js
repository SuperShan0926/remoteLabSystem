import React from 'react';
import {Label} from 'react-bootstrap';
var Switch = require('rc-switch');
require('./lampbutton.less');
require('../switchless/index.less');

export default class LampButtonView extends React.Component {
  static propTypes = {
    changeState: React.PropTypes.func,
    checked:React.PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.state = {
      checked:false
    };
  }

  componentWillReceiveProps(nextProps) {
    // console.log('componentWillReceiveProps',nextProps);
    this.setState(nextProps);
  }

  handleChange(value) {
    console.log('view:handleChange')
    this.setState({'checked':value});
    if(this.props.changeState){
       this.props.changeState(value);
    }
  }

  render() {

    const {host}=this.props;
    return (
      <div className='switch'>
        <div className="col-xs-4">输出</div>
        <div className="col-xs-8">
          <Switch onChange={this.handleChange.bind(this)}
            checkedChildren={'开'}
            unCheckedChildren={'关'}
            checked={this.state.checked}
           />
        </div>
      </div>
      // <a className="lampbutton lampbutton--on" onclick={this.changeState.bind(this)}></a>
    );
  }

  componentDidMount() {

  }
  componentWillUnmount() {
  }

}
