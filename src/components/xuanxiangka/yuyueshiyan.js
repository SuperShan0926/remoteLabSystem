import React from 'react';
import ArrangeExp from './innerTabs';

var agent = require('superagent-promise')(require('superagent'), Promise);

class Yysy extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Yysy';
        this.state = {expInfo:null,timeSlot:[],hasArrange:[],nearly:null};
    }

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

    fetchData(stuId){
            agent.get("http://localhost:3000/course").then(res=> {
            return res.body;
          }).then((course)=>{
            agent.get("http://localhost:3000/timeslot").then(resp=>{
              return resp.body;
            }).then(timeSlot=>{
                  agent.get("http://localhost:3000/orderRecords/"+stuId).then(res=>{
                  var sorted = res.body.sort(this.sortByAttr('date'));
                  if(sorted.length===1){var nearly = sorted[0]}
                    else{for(let n=0;n<sorted.length;n++){
                    if(n<sorted.length-1&&sorted[n].date!==sorted[n+1].date){
                      nearly = sorted.slice(0,n+1).sort(this.sortByAttr('timeslotID'))[0];
                      var ts = this.getTimeslot(timeSlot,nearly.timeslotID);
                      nearly.date = `${nearly.date.slice(0,4)}-${nearly.date.slice(4,6)}-${nearly.date.slice(6,8)} ${ts}`;
                      break;
                    }
                  }
                }
                  this.setState({expInfo:course,timeSlot:timeSlot,hasArrange:sorted,nearly:nearly});
              })
          });
      }) 
    }

    componentDidMount() {
      const stuId = this.props.stuId || 'aaa';
      this.fetchData(stuId);
    }


    getTimeslot(timeSlot,t){
      for(let i=0;i<timeSlot.length;i++){
        if(timeSlot[i]._id===t){
          return timeSlot[i].from;
        }
      }
    }



    render() { 
        return (
            <ArrangeExp expInfo={this.state.expInfo} timeslot={this.state.timeSlot}/>
          );
    }
}

export default Yysy;
