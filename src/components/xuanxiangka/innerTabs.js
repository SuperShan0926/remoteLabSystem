import React from 'react';
import MyCalendar from '../react-calendar/demo';
require('./default.css');
require('./style.css');
var agent = require('superagent-promise')(require('superagent'), Promise);
import NeedRenderExp from '../ChooseExp/NeedRenderExp.js';

//循环生成的独立部分切勿共享state

class InnerTabs extends React.Component {
    constructor(props) {
        super(props);
        this.ExpList = [];
        this.state = {ExpList:this.ExpList,lab:-1};

    }

    hideSlot(){
        this.setState({display:false})
    }

    render() {
    	var that = this,
    	{expInfo,timeslot} = this.props;
        if(expInfo == null){
            return null;
        }
        else { return (<div className="main_abc">
	        	<ul className="tabs_abc">
	        	{expInfo.exps.map(function (exp,i) {
	        		return (<li key={i}>
                                {/*点击实验名称标签时获取日期范围,默认加载第一个实验的数据*/}
					          <input type="radio" defaultChecked={i==0?true:false} name="tabs" id={"tab"+i+"_abc"} 
                              />
					          <label htmlFor={"tab"+i+"_abc"}>{exp.name}</label>
					          <div id={"tab-content"+i+"_abc"} className="tab-content_abc animated fadeIn">
                    			<MyCalendar expId={exp._id}/>
                                <NeedRenderExp timeSlot={timeslot} expId={exp._id}/>
					          </div>
					        </li>
	        			);})}
				</ul>
	      	</div>);}
    }
}

export default InnerTabs;
