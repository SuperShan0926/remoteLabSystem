import React from 'react';
var agent = require('superagent-promise')(require('superagent'), Promise);

class HasOrdered extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'HasOrdered';
    }
    cancelExp(){
    	var r = confirm('confirm cancel?');
    	if(r){
    		agent.get("http://localhost:3000/cancelOrder").then(res=>{
    			alert('deleted!!');
    		});
    	}else{
    		console.log('do nothing');
    	}
    }

    switchTimeSlot(timeslot){
        switch(timeslot) {
            case 1:
        return "8:00-8:40";
                break;
            case 2:
        return "9:00-9:40";  
                break;
            case 3:
        return "10:00-10:40";
            case 4:
        return "11:00-11:40";
            case 5:
        return "13:20-14:00";
            case 6:
        return "14:20-15:00";
            case 7:
        return "15:20-16:00";
            case 8:
        return "16:20-17:00";
            default:
        return "Your mother Boom!";
        }
    }

    render() {
        return <div style={{display:(this.props.display?"block":"none")}}>
        <h4>you have arranged,click to <i>Cancel</i> </h4>
        <div className="hasOrdered"        		
        		onClick = {this.cancelExp.bind(this)}
        >

		{this.switchTimeSlot(this.props.arrangableExp[0].timeSlot)}    
				</div>
		</div>
    }
}

export default HasOrdered;
