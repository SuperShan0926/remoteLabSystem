import React from 'react';
import moment from 'moment';
import {Link} from 'react-router';

moment.locale('zh-cn');

class MyExpView extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'MyExpView';
    }
    render() {
        const {mySortedExp} = this.props;
        console.log(mySortedExp);
        if(!mySortedExp){
            return null;
        }
        if(!mySortedExp[0]){
            return <h3><i className="fa fa-plug"></i>您还没有选择任何实验!</h3>
        }
        //旧实验 模拟的数据，所以_id暂时写死为gUQMZSPGBDtMmyoo。
        if(mySortedExp[0].time){
            var old = [];
            mySortedExp.forEach((item,index)=>{
                old.push(<div key={index} style={{height:'100px',backgroundColor:'#eee',width:'600px',border:'1px solid pink',margin:'0 auto',textAlign:'center'}}>
                <i className="fa fa-plug" style={{fontSize:'30px'}}></i>
                <a style={{color:'#000',cursor:'default',lineHeight:'100px',margin:'0 80px 0 50px',fontSize:'18px',textDecoration:'none'}}>
                    {moment(item.time).format('LL')+' '+item.exp}
                </a>
                    <Link to='/expExport/gUQMZSPGBDtMmyoo' style={{width:'87px'}} className='btn btn-default'>实验报告</Link>
                </div>);
            }) 
            return (<div>{old}</div>)
        }
        //新实验
        const course = JSON.parse(window.localStorage.getItem('course'));
        const exp = course.exps;
        var tt = [];
        mySortedExp.forEach((item,index)=>{
            for(let i=0,len=exp.length;i<len;i++){
                if(item.expDescID === exp[i]._id){
                    item.expName = exp[i].name
                }
            }
            tt.push(<div key={index} style={{height:'100px',backgroundColor:'#eee',width:'600px',border:'1px solid pink',margin:'0 auto',textAlign:'center'}}>
                <i className="fa fa-plug" style={{fontSize:'30px'}}></i>
                <a style={{color:'#000',cursor:'default',lineHeight:'100px',margin:'0 80px 0 50px',fontSize:'18px',textDecoration:'none'}}>
                    {moment(item.date).format('LL')+' '+item.expName}
                </a>
                {item.fromNow=='开始'?<Link to={'/startExp/'+item._id} style={{width:'87px'}} className='btn btn-success'>
                {item.fromNow}</Link>:<button style={{width:'87px',cursor:'default'}} disabled className='btn btn-default'>{item.fromNow+'后'}</button>}
                </div>)
        })
        return <div>
                    {tt}
        	</div>;
    }
}

export default MyExpView;

