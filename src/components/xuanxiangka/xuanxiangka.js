import React from 'react';
import MyCalendar from '../calendar/calendar';
import ArrangeExp from './innerTabs';
import DoExp from './doExpTab';
import {Tab,Col,Nav,Row,NavItem} from 'react-bootstrap';
import '../../calendar.css';
import PubSub from 'pubsub-js';

var agent = require('superagent-promise')(require('superagent'), Promise);

class Xuanxiangka extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Xuanxiangka';
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
            agent.get("/course").then(res=> {
            return res.body;
          }).then((course)=>{
            agent.get("/timeslot").then(resp=>{
              return resp.body;
            }).then(timeSlot=>{
                  agent.get("/orderRecords/"+stuId).then(res=>{
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
      PubSub.subscribe('update',(m,data)=>{
          this.fetchData(stuId);
      });


    }


    getTimeslot(timeSlot,t){
      for(let i=0;i<timeSlot.length;i++){
        if(timeSlot[i]._id===t){
          return timeSlot[i].from;
        }
      }
    }



    render() { 
        return (<div>
          <p style={{textAlign:'center'}}>用户{}您好。<a href='#'>登出</a></p>
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
    <Row className="clearfix">
      <Col sm={2}>
        <Nav bsStyle="pills" stacked>
          <NavItem eventKey="first">
          	预约情况
          </NavItem>
          <NavItem eventKey="second">
            预约实验
          </NavItem>
          <NavItem eventKey="third">
            开始实验
          </NavItem>
          <NavItem eventKey="fourth">
            个人信息
          </NavItem>
        </Nav>
      </Col>
      <Col sm={10}>
        <Tab.Content animation>
          <Tab.Pane eventKey="first">
            <MyCalendar hasArrange={this.state.hasArrange} timeSlot={this.state.timeSlot} expInfo={this.state.expInfo}/>
          </Tab.Pane>
          <Tab.Pane eventKey="second">
            <ArrangeExp expInfo={this.state.expInfo} timeslot={this.state.timeSlot}/>
          </Tab.Pane>
          <Tab.Pane eventKey="third">
            <DoExp hasArrange={this.state.hasArrange} timeSlot={this.state.timeSlot} nearly={this.state.nearly}/>
          </Tab.Pane>
          <Tab.Pane eventKey="fourth"> 
          </Tab.Pane>
        </Tab.Content>
      </Col>
    </Row>
  </Tab.Container>
  </div>);
    }
}

export default Xuanxiangka;
