import React from 'react';
import './index.less';
var agent = require('superagent-promise')(require('superagent'), Promise);
import PubSub from 'pubsub-js';

class NeedRender extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'NeedRender';
        this.state={postdata:null,ExpList:[],ExpDate:''}
    }

    handleClick(expId,timeSlot,event){
        var bd = this.buildPostData(expId,timeSlot,event);
    	if(event.target.className === 'hasOrdered'){
            let ee = event.target;
            agent.del('/order/').send(bd).then(res=>{
                ee.className = 'arrange_time';
                alert('删除成功');
            }).catch(err=>{
                throw new Error('删除失败！');
            })
    	}
    	else if(event.target.className === 'arrange_time'){
            let ee = event.target;
             agent.post('/order/').send(bd).then(res=>{
                if(res.body.studentID){
                    ee.className = 'hasOrdered';
                    alert('预约成功');
                }else{
                    alert('sorry,少侠手慢了！')
                     ee.className = 'disabled';
                }
            })
    	}
    }

    buildPostData(expId,timeSlot,event){
        var postdata = {"expdesc":expId,
                        "date":this.state.ExpDate,
                        "time":timeSlot};
                        return postdata;
    }


    findTimeSlot(slot,id){
        for (let i = 0; i < slot.length; i++) {
            if(slot[i]._id==id){
                return slot[i].from+' － '+slot[i].to;
            }
        }
    }

    componentDidMount() {
         var OrderedExp = [];
         var ExpList;
         var {expId} = this.props;
        var that = this;
        //订阅消息，只要有expArrange的数据发过来，这里就能通过data拿到。
        PubSub.subscribe( 'expArrange'+expId, function(m, data){
        debugger;
        ExpList = [];
        agent.get('/exp/time/'+data+'/'+expId).then(res=>{
            that.setState({ExpList:res.body,ExpDate:data});
             });
        });
    }

    componentWillUnmount() {
        //下次再过来这个组件又是个新的实例了。之前了那个unmount掉了，但是订阅的事件还在，会出发setState,这里把弄掉。
        PubSub.clearAllSubscriptions();
    }


    render() {
        const divExp = [];
        const {ExpList,ExpDate} = this.state;
    	const {expId,timeSlot} = this.props;
        const stuId = JSON.parse(sessionStorage.getItem('user'))._id;
    	var clz;

    	ExpList.forEach((exp,i) => {
            //exp.user暂时写死
    		clz = exp.user?(exp.user===stuId?'hasOrdered':'disabled'):'arrange_time';
    		divExp.push(<div className={clz} onClick={this.handleClick.bind(this,expId,exp.timeslot)} key={i}>
    					{this.findTimeSlot(timeSlot,exp.timeslot)}
    					</div>);
    	})
        return (<div>
        	       <h4><i>这里绿色是<span style={{color:'#337ab7'}}>{ExpDate}</span>可选的实验时间段，点击即预约。
                   <br/>蓝色表明您已预约，点击可取消
                   <br/>灰色表明已被他人预约</i></h4>
        	       {divExp}
        	   </div>);
    }
}

export default NeedRender;
