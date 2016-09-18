import React from 'react';
import {Link} from 'react-router';

class StartExp extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'StartExp';
    }
    render() {
        return <div>
    {/*头部信息*/}
        <div style={{width:'1080px',height:'60px', margin:'0 auto',overflow:'hidden',border:'1px solid #eee'}}>
        	<div style={{float:'left',width:'80px', margin:'10px 80px 0',textAlign:'center',height:'40px'}}>
        		<Link to='/circuitdia'>
        			<i style={{fontSize:'23px'}} className='fa fa-object-ungroup'></i><br/>
        			<span>电路图</span>
        		</Link>
        	</div>
        	<div style={{float:'left',width:'80px',margin:'10px 80px 0',textAlign:'center',height:'40px'}}>
        		<Link to='/equipment'>
                    <i style={{fontSize:'23px'}} className='fa fa-desktop'></i><br/>
        		    <span>仪器</span>
                </Link>
        	</div>
        	<div style={{float:'left',width:'80px',margin:'10px 80px 0',textAlign:'center',height:'40px'}}>
                <Link to='/camera'>
        			<i style={{fontSize:'23px'}} className='fa fa-camera'></i><br/>
        			<span>摄像</span>
                </Link>
        	</div>
        </div>
    {/*主体部分*/}
            <div style={{width:'1080px',margin:'0 auto',overflow:'scroll',border:'1px solid #eee'}}>
    	{this.props.children}
        </div>
        </div>;
    }
}

export default StartExp;
