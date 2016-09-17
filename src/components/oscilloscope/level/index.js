import React from 'react';
require('./level.less');

export default class Level extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
    save: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='level'>level</div>
    );
  }
}
