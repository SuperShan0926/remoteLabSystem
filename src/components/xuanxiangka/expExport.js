import React from 'react';
import {Modal,Button} from 'react-bootstrap';
var agent = require('superagent-promise')(require('superagent'), Promise);

class ExpReport extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'ExpReport';
        this.state = {showModal:false,content:[]};
        this.imgs = [];
        this.contents=[];

    }

    chooseImg(){
        this.setState({showModal:true});
    }

    close() {
      this.setState({showModal:false});
    }

    comfirmImg(e){
      this.contents.push(e.target.src);
      this.setState({content:this.contents,showModal:false});
    }

    clickBlock(i){
      this.contents.splice(i,1);
      this.setState({content:this.contents});
    }

    componentDidMount() {
      const {id} = this.props.params;
      var url = 'http://localhost:3000/imgsReview/'+id;
      agent.get(url).then(res=>{
        res.body.forEach((item,i)=>{
          this.imgs.push(<img src={item}
                              key={item+i}
                              style={{margin:'5px',height:'100px',width:'100px'}}
                              onDoubleClick={this.comfirmImg.bind(this)}
                              />);
        })
        this.forceUpdate();
      });     
    }

    render() {
      const {content} = this.state;
        return <div>
          <div style={{float:'right'}}>
        	<button className='btn btn-default'><i className='fa fa-edit'></i>文字</button>
        	&nbsp;&nbsp;&nbsp;
        	<button className='btn btn-default' onClick={this.chooseImg.bind(this)}><i className='fa fa-image'></i>图片</button>
          </div>
          <div>
            <div style={{marginTop:'50px',border:'2px solid #eee',minHeight:'300px',textAlign:'center'}}>
              <input type='textarea' style={{width:'200px',height:'200px'}}/>
            </div>
              {this.contents.map((item,idx)=>{
                return <div style={{position:'relative',backgroundColor:'#eee'}}><img src={item}/>
                <div onClick={()=>{this.clickBlock(idx);}}
                     style={{position:'absolute',top:'10px',border:'1px solid #eee',right:'-20px'}}>
                <i className="fa fa-trash"
                   style={{fontSize:'30px',zIndex:'1000'}}
                ></i></div></div>
              })}
          </div>
          <div>
          	<Modal show={this.state.showModal} onHide={this.close.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>双击选择图片</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.imgs[0]?this.imgs:'没有图片'}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal>
          </div>
          <div style={{clear:'both'}}/>
        </div>;
    }
}

export default ExpReport;
