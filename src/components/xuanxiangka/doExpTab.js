import React from 'react';
import MyCalendar from '../react-calendar/demo';
import './default.css';
import './style.css';
import PubSub from 'pubsub-js';
import Oscilloscope from '../oscilloscope';
import Circuitdia from '../circuitdia';
import moment from 'moment';
import Count from './CountdownTimer';
var agent = require('superagent-promise')(require('superagent'), Promise);


class DoExp extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'DoExp';
        this.expData = {};
    }

    save(osc) {
    	this.expData = osc;
    	console.log('oooooccccccc',this.expData);
    }

    postData(){
    	if(this.expData.wave){
    		alert('????');
    		agent.post('http://localhost:3000/saveData/stuId')
    			 .send(this.expData)
    			 .then(res=>{
    			 	alert('数据提交完成!');
    			 });
    	}
    	else{alert('没有数据不能提交!')}
    }


    render() {
    	moment.locale('zh-cn');
    	var {nearly} = this.props;
    	if(!nearly){
    		return (<h2>您还没选择实验！</h2>);
    	}
    	if(moment(nearly.date)>moment()){
    		return (<Count secondsRemaining={moment(nearly.date)/1000}/>)
    	}
        return (<div className="main_abc">
	        	<ul className="tabs_abc">
	        			<li>
	        				<input type="radio"  name="doExp" id="tabA_abc" defaultChecked/>
					          <label htmlFor="tabA_abc">示波器</label>
					          <div id="tab-contentA_abc" className="tab-content_abc animated fadeIn">
					          		<Oscilloscope host='http://localhost:3000/angal' save={this.save.bind(this)}/>
					          		<button onClick={this.postData.bind(this)}>保存数据</button>
					          </div>
					       </li>
					       <li>
					          <input type="radio"  name="doExp" id="tabB_abc" />
					          <label htmlFor="tabB_abc">函数信号发生器</label>
					          <div id="tab-contentB_abc" className="tab-content_abc animated fadeIn">
					          </div>
					       </li>
						   <li>
					          <input type="radio"  name="doExp" id="tabC_abc" />
					          <label htmlFor="tabC_abc">电路图</label>
					          <div id="tab-contentC_abc" className="tab-content_abc animated fadeIn">
					          	{/*<Circuitdia host='http://localhost:3000/' bgsrc='http://localhost:3000/components/circuitdia/circuitdia.png'/>*/}
					          </div>
					       </li>
							<li>
					          <input type="radio" name="doExp" id="tabD_abc" />
					          <label htmlFor="tabD_abc">摄像头</label>
					          <div id="tab-contentD_abc" className="tab-content_abc animated fadeIn">
					          </div>
					       </li>
				</ul>
	      	</div>)
    }
}

export default DoExp;
