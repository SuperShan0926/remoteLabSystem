import React from 'react';
require('./index.less');
var agent = require('superagent-promise')(require('superagent'), Promise);


class ArrangeTime extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'ArrangeTime';
        this.slot = null;
        this.state ={choosen:-1};

    }
    postData(){
        if(this.slot){
            var data = this.slot;
            agent.post("/postAppointment").send(data).then(res=>{
                console.log(res.body);
            });
        }else{
            console.log("empty!");
        }
    }
    
    ChooseSlot(i,event){
        this.setState({choosen:i});
        var result = event.target;
        this.slot=[result];
        var startTime = event.target.innerHTML.slice(0,8);
        var endTime = event.target.innerHTML.slice(9,17);
        this.slot = this.buildPostData(startTime,endTime);
    }

    buildPostData(startTime,endTime){
        var postdata = {"timeSlot":{"startTime":startTime,"endTime":endTime},
                        "date":this.props.date,
                        "lab":this.props.labName,
                        "student":"Shan"};
                        console.log(postdata);
                    return postdata;
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(nextProps.arrangableExp===null){
            return true;
        }else if(nextProps.arrangableExp.time){
            return true;
        }else{return false}
    }
    render() {
    	const {arrangableExp,date} = this.props;
        var that = this;
        
        if(!arrangableExp){return null} 
            
        else{
            return(<div className="arrange" 
            style={{display:(that.props.display?"block":"none")}}>
                <h4>here are available time period supply,choose suitable time</h4>
        	
            {arrangableExp.time.map(function (slot,i) {
                var timeAvail= slot.startTime+'-'+slot.endTime;
        		return ( <div className={that.state.choosen == i?"arrange_selected":"arrange_time"} 
                        key={that.props.date+'---'+i}
                        onClick={that.ChooseSlot.bind(that,i)}
                        >
                        {timeAvail}
                          </div>);
        	})}
            <button 
                style={{display:(that.props.display?"block":"none"),
                        margin:"10px",
                        backgroundColor:"green",
                        border:"none"}}
                onClick = {this.postData.bind(this)}
                >submit
            </button>
            </div>)
        }
        
    }
}

export default ArrangeTime;
