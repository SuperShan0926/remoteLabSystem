import React from 'react';
import {Modal,Button} from 'react-bootstrap';
import ExpExportView from './expExportView';
var agent = require('superagent-promise')(require('superagent'), Promise);

class ExpReport extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'ExpReport';
        this.state = {showModal:false,content:[],editIdx:-1};
        this.imgs = [];
        this.contents=[];
    }

    comfirmImg(e){
      this.contents.push({type:'image',
                          data:e.target.src
                          });
      this.setState({content:this.contents});
    }

    clickBlock(i){
      this.contents.splice(i,1);
      this.setState({content:this.contents});
    }

    editBlock(txt,i){
      if(this.state.editIdx == -1){
        this.contents[i].data = txt;
        console.log(this.contents[i].data);
        this.setState({content:this.contents,editIdx:i});}
    }

  //当作props传给view让其调用新增文字块。
    addTextBlock(){
      if(this.state.editIdx == -1){    
      this.contents.push({type:'text',
                          data:''});
      this.setState({content:this.contents,editIdx:this.contents.length-1});
      }
    }

    updateTextBlock(a,i){
      this.contents[i].data = a;
      this.setState({content:this.contents,editIdx:-1});
    }

    cancel(i){
      this.contents.splice(i,1);
      this.setState({content:this.contents,editIdx:-1});
    }


    componentDidMount() {
      const {id} = this.props.params;
      var url = 'http://localhost:3000/imgsReview/'+id;
      agent.get(url).then(res=>{
        res.body.forEach((item,i)=>{
          this.imgs.push(item);
        })
        this.forceUpdate();
      });     
    }

    render() {
      //根据dataType类型分类。
      const {content,editIdx} = this.state;
        return <ExpExportView content={content} 
                              imgs={this.imgs} 
                              editIdx={editIdx} 
                              addTextBlock={this.addTextBlock.bind(this)} 
                              clickBlock={this.clickBlock.bind(this)}
                              editBlock={this.editBlock.bind(this)}
                              comfirmImg={this.comfirmImg.bind(this)} 
                              cancel={this.cancel.bind(this)} 
                              updateTextBlock={this.updateTextBlock.bind(this)}/>;
    }
}

export default ExpReport;
