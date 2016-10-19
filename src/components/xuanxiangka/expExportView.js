import React from 'react';
import {Modal,Button} from 'react-bootstrap';
import './expExport.less';

class ExpExportView extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'ExpExportView';
        this.state={showModal:false}
    }

    chooseImg(){
        this.setState({showModal:true});
    }

    close() {
      this.setState({showModal:false});
    }

    render() {
    	const {imgs,content,addTextBlock,editIdx,clickBlock,comfirmImg,updateTextBlock,cancel,editBlock} = this.props;
    	//数据=>视图 用renderContent去渲染。
    	var renderContent = [],
          renderImg = [];
      imgs.forEach((item,idx)=>{
        renderImg.push(<img src={item}
                              key={item+idx}
                              className='imgView'
                              onDoubleClick={(e)=>{this.setState({showModal:false});
                                                  comfirmImg(e)
                                  }}
                              />)
      });
    	content.forEach((item,idx)=>{
          if(item.type=='image'){
                renderContent.push(<div className='imgContent'><img src={item.data}/>
                <div onClick={()=>{clickBlock(idx);}}
                     className='delIcon'>
                <i className="fa fa-trash"
                   style={{fontSize:'30px',zIndex:'1000'}}
                ></i>
                </div>
                </div>);
              }
             //显示状态下的文字块。
          else if(item.type=='text'&&editIdx!==idx){
                renderContent.push(<div className='txtContent' ref='editTxt'>
                {item.data}
                <div onClick={()=>{clickBlock(idx);}}
                     className='delIcon'>
                <i className="fa fa-trash"
                   style={{fontSize:'30px',zIndex:'1000'}}
                ></i></div>
                <div onClick={()=>{editBlock(this.refs.editTxt.childNodes[1].nodeValue,idx);}}
                     className='editIcon'>
                <i className="fa fa-edit"
                   style={{fontSize:'30px',zIndex:'1000'}}
                ></i>
                </div></div>)
          }
          //编辑状态下的文字块。
          else {
          	renderContent.push(<div className='txtEdit'>
                  <textarea defaultValue={item.data} ref='textContent' className='txtArea'></textarea>
                  <button className='btn btn-default save' onClick={()=>{updateTextBlock(this.refs.textContent.value,idx)}}>保存</button>
                  <button className='btn btn-default cancel' onClick={()=>{cancel(idx)}}>取消</button>
                  </div>);
          }
        });
        return (<div>
            <div style={{clear:'both'}}></div>
            {renderContent}
            <div>
          	<Modal show={this.state.showModal} onHide={this.close.bind(this)}>
            <Modal.Header closeButton>
            <Modal.Title>双击选择图片</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            {renderImg[0]?renderImg:'没有图片'}
            </Modal.Body>
            <Modal.Footer>
            <Button onClick={this.close.bind(this)}>Close</Button>
            </Modal.Footer>
          </Modal>
          <div id="addBlock">
       		 <button className='btn btn-default' onClick={addTextBlock}><i className='fa fa-edit'></i>文字</button>
        	 &nbsp;&nbsp;&nbsp;
        	 <button className='btn btn-default' onClick={this.chooseImg.bind(this)}><i className='fa fa-image'></i>图片</button>
          </div>
          </div>
        </div>)
    }
}
  export default ExpExportView;
