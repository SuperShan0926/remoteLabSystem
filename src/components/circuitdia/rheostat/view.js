import React from 'react';
require('./rheostat.less');

export default class RheostatView extends React.Component {
  static propTypes = {
    host: React.PropTypes.string,
    rheostatValue:React.PropTypes.string,
    horizontal:React.PropTypes.bool,
    changeValue: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state={
        rheostatValue:props.rheostatValue,
    };
  }

  componentWillReceiveProps(nextProps) {
    //console.log('componentWillReceiveProps',nextProps);
  }

  componentDidMount() {
  }

  handleChange(event) {
    console.log('view:handleChange')
    if(this.props.changeValue){
      var orivalue = event.target.value;

      //阻值范围为0~127 
      try{
        var value = parseInt(orivalue);
        if (isNaN(value) || !isFinite(value)) {
            throw new Error(value + " is NaN or Not Finite !");
        } else {
          if(value>=0 && value<=127){
             orivalue = value.toString();
          } else {
             if(value<0){
                orivalue = '0';
             } else {
                orivalue = '127';
             }
          }
        }        
      } catch (e) {
          orivalue = '0';
          console.error(e);
      }
      

      /*if(orivalue.indexOf('0.')==0){
        //以小数点开始
        if(orivalue.length>3){
            //只允许有一位小数
            orivalue = orivalue.substring(0,3);
        }
      } else {
        if(orivalue.indexOf('.')==-1){
          //没有小数点的数字
          if(orivalue.indexOf('0')==0){
            //以0开始的数字
            orivalue = orivalue.substring(1,orivalue.length);
          }
        } else {
          //包含小数点的数字
          if(orivalue.length-orivalue.indexOf('.')>1){
            //有一位小数
            debugger;
            var index = orivalue.indexOf('.');
            var lastint = parseInt(orivalue.substring(index+1,index+2));
            if(lastint>=5){
              //最后一位小数大于5,四舍五入
              var largeint = parseInt(orivalue.substring(0,orivalue.indexOf('.')))+1;
              orivalue = largeint.toString();
            } else {
              orivalue = orivalue.substring(0,orivalue.indexOf('.'));
            }
          }
        }
      }*/
      this.props.changeValue(orivalue);
      this.setState({rheostatValue:orivalue});
    }
  }

  render() {  
    return (
         <div className='rheostat'>
             <input type='text' onChange={this.handleChange.bind(this)} value={this.state.rheostatValue}/>
         </div>
    );
  }
}