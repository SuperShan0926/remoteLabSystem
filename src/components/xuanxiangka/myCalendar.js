import moment from 'moment';
import React from 'react';

import {Calendar} from 'react-calendar';
var agent = require('superagent-promise')(require('superagent'), Promise);

require('../../../public/css/bootstrap-theme.less');
import PubSub from 'pubsub-js';
const DateRange = [];

const PagingCalendar = React.createClass({
  getInitialState: function () {
    return {
      date: moment().startOf('month'),
      dateArr:[]
    };
  },

  componentDidMount:function(){
        var date = [];
        agent.get('/exp/date/'+this.props.expId).then(res=>{
                  res.body.forEach(d=>{
                  date.push({date:moment(d),classNames:['current'],component: [ 'day' ]});
                  });
                  return date
            }
          ).then(date=>{this.setState({dateArr:date})});
  },

  handlePrevMonth:function(){
    this.setState({date:this.state.date.clone().subtract(3, 'Month')});

  },
  handleNextMonth:function(){
    this.setState({date:this.state.date.clone().add(3, 'Month')});
  },

  render: function () {
    if(this.state.dateArr.length>0){
      this.state.dateArr.forEach((d)=>{
          DateRange.push(d.date.format("YYYY-MM-DD"));
      })
    }
    var mods = this.state.dateArr.concat({
                      component: 'day',
                      events: {
                        onClick: (date, e) => {
                          var day = date.format("YYYY-MM-DD");
                          if(DateRange.indexOf(day)>-1){
                              PubSub.publish('expArrange'+this.props.expId,day);
                            }
                          }
                      }
                    });
    if(!this.props.expId){return null;}
    return (
      <div>
        <a onClick={this.handlePrevMonth} id="leftA">
        &lt;
        </a>
        <a onClick={this.handleNextMonth} id="rightA">
        &gt;
        </a>
        <Calendar locale='zh-cn'
                  startDate={ this.state.date }
                  endDate={ this.state.date.clone().add(2, 'month').endOf('month') }
                  mods={mods}/>
      </div>
    );
  }
});

export default PagingCalendar;
