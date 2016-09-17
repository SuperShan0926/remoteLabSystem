import React from 'react';
import MyExpView from './myExpView';
import moment from 'moment';
var agent = require('superagent-promise')(require('superagent'), Promise);

class NewExp extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'NewExp';
		this.state = {mySortedExp:null};
    }

    componentDidMount() {
        agent.get('http://localhost:3000/user').then(res=>{
            const user = JSON.stringify(res.body);
            window.sessionStorage.setItem('user',user);
            var stu = JSON.parse(sessionStorage.getItem('user'));
            this.fetchData(stu._id);
        });
    }

    //因为有倒计时功能，还是换成两个组件来做算了。
    //new . old component

	sortByAttr(attr){
      return function (c,d) {
          if(c[attr]<d[attr]){
            return -1;
          }
          else if(c[attr]>d[attr]){
            return 1;
          }
          else return 0;
      }
    }

//获取实验开始时间。
	getTimeslot(timeSlot,t){
      for(let i=0;i<timeSlot.length;i++){
        if(timeSlot[i]._id===t){
          return timeSlot[i].from;
        }
      }
    }

    fetchData(stuId){
            agent.get("http://localhost:3000/course").then(res=> {
            return res.body;
          }).then((course)=>{
            agent.get("http://localhost:3000/timeslot").then(resp=>{
              return resp.body;
            }).then(timeSlot=>{
              //放入localstorage减少请求。
            		window.localStorage.setItem("course",JSON.stringify(course));
            		window.localStorage.setItem("timeSlot",JSON.stringify(timeSlot));
                  agent.get("http://localhost:3000/orderRecords/"+stuId).then(res=>{
                  var sorted = res.body.sort(this.sortByAttr('date'));
					for(let n=0;n<sorted.length;n++){
                    if(n<sorted.length-1&&sorted[n].date!==sorted[n+1].date){
					  var sameDaySort = sorted.slice(0,n+1).sort(this.sortByAttr('timeslotID'));
					  sorted = sameDaySort.concat(sorted.slice(n+1,sorted.length));
                      break;
                    }
                  }
                  //获取实验距离时间。
                  for(let k=0;k<sorted.length;k++){
                    var str = `${sorted[k].date.slice(0,4)}-${sorted[k].date.slice(4,6)}-${sorted[k].date.slice(6,8)}`,
                        startTime = moment(str +' '+this.getTimeslot(timeSlot,sorted[k].timeslotID));
                        if(moment()-startTime>0){sorted[k].fromNow = '开始';}
                        else{sorted[k].fromNow = startTime.fromNow(true);}
                  }
                  	this.setState({mySortedExp:sorted});
              })
          });
      }) 
    }

    render() {
    		return <MyExpView mySortedExp={this.state.mySortedExp}/>
	}
}
export default NewExp;


