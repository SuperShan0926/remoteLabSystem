import React from 'react';
require('./changer.less');

export default class ChangerView extends React.Component {
  static propTypes = {
    horizontal:React.PropTypes.bool,
    issingle:React.PropTypes.bool,
    position: React.PropTypes.string,
    changeValue: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state={
        rotate:false
    };
  }

  componentWillReceiveProps(nextProps) {
    // console.log('componentWillReceiveProps',nextProps);
    this.setState(nextProps);
  }

  componentDidMount() {
  }

  handleClick(){
    //console.log('click:',this.state.rotate);
    var value = (!this.state.rotate)?'ON':'OFF';
    console.log('value:',value);
    this.setState({'rotate':!this.state.rotate});
    if(this.props.changeValue){
       this.props.changeValue(value);
    }
  }

  render() {
    var classNames = require('classnames');
    var itemClasses = classNames({
      'line2rightup': (this.props.issingle && this.props.horizontal && !this.state.rotate)||(!this.props.issingle && this.props.position=='rightup' && this.props.horizontal && !this.state.rotate),
      'linerotate2rightup': (this.props.issingle && this.props.horizontal && this.state.rotate)||(!this.props.issingle && this.props.position=='rightup' && this.props.horizontal && this.state.rotate),
      'line2rightdown': !this.props.issingle && this.props.position=='rightdown' && this.props.horizontal && !this.state.rotate,
      'linerotate2rightdown': !this.props.issingle && this.props.position=='rightdown' && this.props.horizontal && this.state.rotate,
      'line2leftup': !this.props.issingle && this.props.position=='leftup' && this.props.horizontal && !this.state.rotate,
      'linerotate2leftup': !this.props.issingle && this.props.position=='leftup' && this.props.horizontal && this.state.rotate,
      'line2leftdown': !this.props.issingle && this.props.position=='leftdown' && this.props.horizontal && !this.state.rotate,
      'linerotate2leftdown': !this.props.issingle && this.props.position=='leftdown' && this.props.horizontal && this.state.rotate,
      'linevertical2downright': (this.props.issingle && !this.props.horizontal && !this.state.rotate)||(!this.props.issingle && this.props.position=='downright' && !this.props.horizontal && !this.state.rotate),
      'lineverticalrotate2downright':(this.props.issingle && (!this.props.horizontal) && this.state.rotate)||(!this.props.issingle && this.props.position=='downright' && !this.props.horizontal && this.state.rotate),
      'linevertical2downleft': !this.props.issingle && this.props.position=='downleft' && !this.props.horizontal && !this.state.rotate,
      'lineverticalrotate2downleft':!this.props.issingle && this.props.position=='downleft' && !this.props.horizontal && this.state.rotate,
      'linevertical2upright': !this.props.issingle && this.props.position=='upright' && !this.props.horizontal && !this.state.rotate,
      'lineverticalrotate2upright':!this.props.issingle && this.props.position=='upright' && !this.props.horizontal && this.state.rotate,
      'linevertical2upleft': !this.props.issingle && this.props.position=='upleft' && !this.props.horizontal && !this.state.rotate,
      'lineverticalrotate2upleft':!this.props.issingle && this.props.position=='upleft' && !this.props.horizontal && this.state.rotate
    });

    var horizontal = this.props.horizontal;
    var issingle = this.props.issingle;
    var position=this.props.position; 
    var host=this.props.host; 
    var handlerDemo = true;
    if(issingle){
      if(horizontal){      
        return (
              <div className='changer'>
                <div ref='line' className={itemClasses}> 
                   <img  src='../components/circuitdia/changer/img/line.png' onClick={this.handleClick.bind(this)}/>
                </div>
                <div className='leftcircle'> 
                   <img src='../components/circuitdia/changer/img/circle.png'/>
                </div>
                <div className='rightcircle'> 
                   <img src='../components/circuitdia/changer/img/circle.png'/>
                </div>
              </div>
            );
      } else {
       return (
              <div className='changer'>
                <div ref='line' className={itemClasses}> 
                   <img src='../components/circuitdia/changer/img/line.png' onClick={this.handleClick.bind(this)}/>
                </div>
                <div className='leftupcircle'> 
                   <img src='../components/circuitdia/changer/img/circle.png'/>
                </div>
                <div className='leftcircle'> 
                   <img src='../components/circuitdia/changer/img/circle.png'/>
                </div>
              </div>
            );
      }
    } else {
      if(horizontal){
          if(position=='leftup'){
            return (
              <div className='changer'>
                <div ref='line' className={itemClasses}> 
                   <img  src='../components/circuitdia/changer/img/line.png' onClick={this.handleClick.bind(this)}/>
                </div>
                <div className='leftupcircle'> 
                   <img src='../components/circuitdia/changer/img/circle.png'/>
                </div>
                <div className='leftcircle'> 
                   <img src='../components/circuitdia/changer/img/circle.png'/>
                </div>
                <div className='rightcircle'> 
                   <img src='../components/circuitdia/changer/img/circle.png'/>
                </div>
              </div>
            );
          } else if(position=='leftdown') {
            return (
              <div className='changer'>
                <div ref='line' className={itemClasses}> 
                   <img  src='../components/circuitdia/changer/img/line.png' onClick={this.handleClick.bind(this)}/>
                </div>
                <div className='leftupcircle'> 
                   <img src='../components/circuitdia/changer/img/circle.png'/>
                </div>
                <div className='leftcircle'> 
                   <img src='../components/circuitdia/changer/img/circle.png'/>
                </div>
                <div className='rightupcircle'> 
                   <img src='../components/circuitdia/changer/img/circle.png'/>
                </div>
              </div>
            );
          } else if(position=='rightup') {
            return (
              <div className='changer'>
                <div ref='line' className={itemClasses}> 
                   <img  src='../components/circuitdia/changer/img/line.png' onClick={this.handleClick.bind(this)}/>
                </div>
                <div className='rightupcircle'> 
                   <img src='../components/circuitdia/changer/img/circle.png'/>
                </div>
                <div className='leftcircle'> 
                   <img src='../components/circuitdia/changer/img/circle.png'/>
                </div>
                <div className='rightcircle'> 
                   <img src='../components/circuitdia/changer/img/circle.png'/>
                </div>
              </div>
            );
          } else {
            return (
              <div className='changer'>
                <div ref='line' className={itemClasses}> 
                   <img  src='../components/circuitdia/changer/img/line.png' onClick={this.handleClick.bind(this)}/>
                </div>
                <div className='rightupcircle'> 
                   <img src='../components/circuitdia/changer/img/circle.png'/>
                </div>
                <div className='leftupcircle'> 
                   <img src='../components/circuitdia/changer/img/circle.png'/>
                </div>
                <div className='rightcircle'> 
                   <img src='../components/circuitdia/changer/img/circle.png'/>
                </div>
              </div>
            );
          } 
      } else {
          if(position=='upleft'){
            return (
              <div className='changer'>
                <div ref='line' className={itemClasses}> 
                   <img  src='../components/circuitdia/changer/img/line.png' onClick={this.handleClick.bind(this)}/>
                </div>
                <div className='rightupcircle'> 
                   <img src='../components/circuitdia/changer/img/circle.png'/>
                </div>
                <div className='leftupcircle'> 
                   <img src='../components/circuitdia/changer/img/circle.png'/>
                </div>
                <div className='rightcircle'> 
                   <img src='../components/circuitdia/changer/img/circle.png'/>
                </div>
              </div>
            );
          } else if(position=='upright') {
            return (
              <div className='changer'>
                <div ref='line' className={itemClasses}> 
                   <img  src='../components/circuitdia/changer/img/line.png' onClick={this.handleClick.bind(this)}/>
                </div>
                <div className='rightupcircle'> 
                   <img src='../components/circuitdia/changer/img/circle.png'/>
                </div>
                <div className='leftupcircle'> 
                   <img src='../components/circuitdia/changer/img/circle.png'/>
                </div>
                <div className='leftcircle'> 
                   <img src='../components/circuitdia/changer/img/circle.png'/>
                </div>
              </div>
            );
          } else if(position=='downleft') {
            return (
              <div className='changer'>
                <div ref='line' className={itemClasses}> 
                   <img  src='../components/circuitdia/changer/img/line.png' onClick={this.handleClick.bind(this)}/>
                </div>
                <div className='rightupcircle'> 
                   <img src='../components/circuitdia/changer/img/circle.png'/>
                </div>
                <div className='leftcircle'> 
                   <img src='../components/circuitdia/changer/img/circle.png'/>
                </div>
                <div className='rightcircle'> 
                   <img src='../components/circuitdia/changer/img/circle.png'/>
                </div>
              </div>
            );
          } else {
            return (
              <div className='changer'>
                <div ref='line' className={itemClasses}> 
                   <img  src='../components/circuitdia/changer/img/line.png' onClick={this.handleClick.bind(this)}/>
                </div>
                <div className='leftupcircle'> 
                   <img src='../components/circuitdia/changer/img/circle.png'/>
                </div>
                <div className='leftcircle'> 
                   <img src='../components/circuitdia/changer/img/circle.png'/>
                </div>
                <div className='rightcircle'> 
                   <img src='../components/circuitdia/changer/img/circle.png'/>
                </div>
              </div>
            );
          } 
      }
    }
  }
}
