import React from 'react';
import ChannelsView from './view.js';
var agent = require('superagent-promise')(require('superagent'), Promise);

export default class Channels extends React.Component {

  static propTypes = {
    host: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {host}=this.props;
    return (
      <ChannelsView host={host}/>
    );
  }
}
