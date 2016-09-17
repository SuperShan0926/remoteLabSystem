import React, { Component } from 'react';
import Async from 'babel!react-promise';

export default class RemoteView extends Component {
  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
      super(props);
      const {url} = this.props;
      this.prom = new Promise(
        function(resolve, reject) {
          requirejs([url], function(lib) {
            resolve(lib.v);
          });
        });
  }

  render() {
    const {node}=this.props;
    return (
       <Async promise={this.prom} then={v => v({node})}/>
    );
  }
}
