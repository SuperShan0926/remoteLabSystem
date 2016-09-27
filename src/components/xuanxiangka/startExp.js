import React from 'react';
import {Link} from 'react-router';
import {Tabs,Tab} from 'react-bootstrap';
import Dianlutu from './dianlutu';
import Yiqi from './yiqi';
import Camera from './camera';





class StartExp extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'StartExp';
    }
    render() {
        const {id} = this.props.params;
        return<Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
      <Tab eventKey={1} title={<div style={{width:'200px',textAlign:'center'}}><i style={{fontSize:'23px'}} className='fa fa-object-ungroup'></i><br/>
                    <span>电路图</span></div>}><div style={{width:'1080px',margin:'0 auto',overflow:'scroll',border:'1px solid #eee'}}>
                    <Dianlutu/>        
        </div></Tab>
      <Tab eventKey={2} title={<div style={{width:'200px',textAlign:'center'}}><i style={{fontSize:'23px'}} className='fa fa-desktop'></i><br/>
                    <span>仪器</span></div>}><div style={{width:'1080px',margin:'0 auto',overflow:'scroll',border:'1px solid #eee'}}>
                    <Yiqi id={id}/>
        </div></Tab>
      <Tab eventKey={3} title={<div style={{width:'200px',textAlign:'center'}}><i style={{fontSize:'23px'}} className='fa fa-camera'></i><br/>
                    <span>摄像</span></div>}><div style={{width:'1080px',margin:'0 auto',overflow:'scroll',border:'1px solid #eee'}}>
                    <Camera id={id}/>
        </div></Tab>
    </Tabs>
    }
}

export default StartExp;
