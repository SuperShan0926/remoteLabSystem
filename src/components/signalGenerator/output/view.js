import React from 'react';
require('./output.less');


export default class OutputView extends React.Component {
  static propTypes = {
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='output'>
        <div className="row">
          <div className="col-xs-1"> 
          </div>
          <div className="col-xs-5"> 
              <div className="col-xs-3">Input</div>
              <input ref='ctrl_switch' className="mui-switch" type="checkbox"></input>         
          </div>
          <div className="col-xs-5">
              <form className="form-horizontal" >
                <div className="row"> 
                    <div className="col-xs-5">输出阻抗</div>
                    <select>
                      <option value="50">50 Ohm</option>
                      <option value="1M">1M Ohm</option>
                    </select>
                </div>
              </form>
          </div>
          <div className="col-xs-1"> 
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
  }
  componentWillUnmount() {
  }

}
