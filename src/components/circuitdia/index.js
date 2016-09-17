import React from 'react';
require ('./circuitdia.less');
import Changer from './changer';
import Rheostat from './rheostat';
import Measureport from './measureport';
import Channel from './channel';

export default class Circuitdia extends React.Component {
  static propTypes = {
    host: React.PropTypes.string,
    bgsrc:React.PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state={
      currentMeasureportCH1:undefined,
      currentMeasureportCH2:undefined,
      marray:[{
        name:'m1',
        num:'1',
        ch1:false,//标记是否为ch1通道
        status:false,//标记是否点亮
        top:'282px',
        left:'342px',
        position:'verticaldown',
      },
      {
        name:'m2',
        num:'2',
        ch1:false,//标记是否为ch1通道
        status:false,//标记是否点亮
        top:'455px',
        left:'678px',
        position:'verticaldown',
      },
      {
        name:'m3',
        num:'3',
        ch1:false,//标记是否为ch1通道
        status:false,//标记是否点亮
        top:'498px',
        left:'678px',
        position:'verticaldown',
      },
      {
        name:'m4',
        num:'4',
        ch1:false,//标记是否为ch1通道
        status:false,//标记是否点亮
        top:'431px',
        left:'750px',
        position:'horizontalleft',
      },
      {
        name:'m5',
        num:'5',
        ch1:false,//标记是否为ch1通道
        status:false,//标记是否点亮
        top:'534px',
        left:'750px',
        position:'horizontalleft',
      },
      {
        name:'m6',
        num:'6',
        ch1:false,//标记是否为ch1通道
        status:false,//标记是否点亮
        top:'476px',
        left:'922px',
        position:'verticaldown',
      },
      {
        name:'m7',
        num:'7',
        ch1:false,//标记是否为ch1通道
        status:false,//标记是否点亮
        top:'720px',
        left:'322px',
        position:'verticaldown',
      },
      {
        name:'m8',
        num:'8',
        ch1:false,//标记是否为ch1通道
        status:false,//标记是否点亮
        top:'720px',
        left:'403px',
        position:'verticaldown',
      },
      {
        name:'m9',
        num:'9',
        ch1:false,//标记是否为ch1通道
        status:false,//标记是否点亮
        top:'720px',
        left:'495px',
        position:'verticaldown',
      }],

      karray:[{
        name:'K1',
        num:'1',
        status:false,
        top:'180px',
        left:'460px',
        horizontal:true,
        issingle:true,
        position:'rightup',
      },
      {
        name:'K2',
        num:'2',
        status:false,
        top:'130px',
        left:'612px',
        horizontal:true,
        issingle:true,
        position:'rightup',
      },
      {
        name:'K3',
        num:'3',
        status:false,
        top:'324px',
        left:'460px',
        horizontal:true,
        issingle:true,
        position:'rightup',
      },
      {
        name:'K4',
        num:'4',
        status:false,
        top:'264px',
        left:'612px',
        horizontal:true,
        issingle:true,
        position:'rightup',
      },
      {
        name:'K5',
        num:'5',
        status:false,
        top:'476px',
        left:'603px',
        horizontal:true,
        issingle:true,
        position:'rightup',
      },
      {
        name:'K6',
        num:'6',
        status:false,
        top:'264px',
        left:'715px',
        horizontal:true,
        issingle:true,
        position:'rightup',
      },
      {
        name:'K7',
        num:'7',
        status:false,
        top:'589px',
        left:'603px',
        horizontal:true,
        issingle:true,
        position:'rightup',
      },
      {
        name:'K8',
        num:'8',
        status:false,
        top:'762px',
        left:'357px',
        horizontal:true,
        issingle:true,
        position:'rightup',
      },
      {
        name:'K9',
        num:'9',
        status:false,
        top:'762px',
        left:'440px',
        horizontal:true,
        issingle:true,
        position:'rightup',
      },
      {
        name:'K10',
        num:'10',
        status:false,
        top:'702px',
        left:'602px',
        horizontal:true,
        issingle:true,
        position:'rightup',
      },
      {
        name:'K11',
        num:'11',
        status:false,
        top:'388px',
        left:'748px',
        horizontal:false,
        issingle:true,
        position:'rightup',
      },
      {
        name:'K12',
        num:'12',
        status:false,
        top:'590px',
        left:'747px',
        horizontal:false,
        issingle:false,
        position:'downright',
      },
      {
        name:'K13',
        num:'13',
        status:false,
        top:'506px',
        left:'880px',
        horizontal:false,
        issingle:true,
        position:'rightup',
      },
      {
        name:'K14',
        num:'14',
        status:false,
        top:'581px',
        left:'880px',
        horizontal:false,
        issingle:false,
        position:'downright',
      },
      {
        name:'K15',
        num:'15',
        status:false,
        top:'68px',
        left:'670px',
        horizontal:true,
        issingle:true,
        position:'rightup',
      },
      {
        name:'K16',
        num:'16',
        status:false,
        top:'720px',
        left:'258px',
        horizontal:true,
        issingle:false,
        position:'leftdown',
      }],

      rarray:[{
        name:'R1',
        top:'683px',
        left:'540px',
        value:'0',
        horizontal:true,
      },
      {
        name:'R2',
        top:'243px',
        left:'840px',
        value:'0',
        horizontal:true,
      }],
      channel:{
        top:'22px',
        left:'914px',
      },
    };
  }

  /*setMeasureportStatus(name,value){
    for (var i = 0; i < this.state.marray.length; i++) {
      var m = this.state.marray[i];
      if(name==m.name){
        //当前选中的测量点
        m.status = value;//修改状态
        this.state.marray[i] = m;
        if(this.state.currentMeasureport!=null){
          //上次选中的测量点
          if(this.state.currentMeasureport.name == name){
            //上次和当前测量点是同一点
            this.state.currentMeasureport = m;//更新
          } else {
            //上次和当前测量点不是同一点
            if(this.state.currentMeasureport.status){
              //上次测量点状态为true
              var num = parseInt(this.state.currentMeasureport.num);
              this.state.marray[num-1].status = false;
              this.state.currentMeasureport = m;//更新
            }
          }
        } else {
          if(m.status){
            this.state.currentMeasureport = m;
          }
        }
        this.setState({'marray':this.state.marray});
      }
    }
  }*/

  setMeasureportStatus(ch1,ch2){
    debugger;
    this.state.marray.map(m=> {
      if(m.num == ch1){
        m.status=true;
        m.ch1=true;
        var num = parseInt(m.num);
        this.state.marray[num-1] = m;
        if(this.state.currentMeasureportCH1!=null){
          if(this.state.currentMeasureportCH1.num == ch1){
            //上次和当前测量点是同一点
            this.state.currentMeasureportCH1 = m;//更新
          } else {
            //上次和当前测量点不是同一点
            if(this.state.currentMeasureportCH1.status){
              //上次测量点状态为true
              if(this.state.currentMeasureportCH2.num!=this.state.currentMeasureportCH1.num){
                var numori = parseInt(this.state.currentMeasureportCH1.num);
                this.state.marray[numori-1].status = false;
              }
              this.state.currentMeasureportCH1 = m;//更新
            }
          } 
        } else {
          if(m.status){
            this.state.currentMeasureportCH1 = m;
          }
        } 
      }
      if(m.num == ch2){
        m.status=true;
        m.ch1=false;
        var num = parseInt(m.num);
        this.state.marray[num-1] = m;
        if(this.state.currentMeasureportCH2!=null){
          if(this.state.currentMeasureportCH2.num == ch2){
            //上次和当前测量点是同一点
            this.state.currentMeasureportCH2 = m;//更新
          } else {
            //上次和当前测量点不是同一点
            if(this.state.currentMeasureportCH2.status){
              //上次测量点状态为true
              if(this.state.currentMeasureportCH2.num!=this.state.currentMeasureportCH1.num){
                 var numori = parseInt(this.state.currentMeasureportCH2.num);
                 this.state.marray[numori-1].status = false;
              }
              this.state.currentMeasureportCH2 = m;//更新
            }
          } 
        } else {
          if(m.status){
            this.state.currentMeasureportCH2 = m;
          }
        } 
      }

      this.setState({'marray':this.state.marray});
    });
  }
  
  render() {
    const {host}=this.props;

    return (
      <div>
        <div className='circuitdia'>
          <img src={this.props.bgsrc}/>
          {
             this.state.karray.map(k=><Changer host={host} property={k}/>)
          }
          {
            this.state.rarray.map(r=><Rheostat host={host} property={r}/>)
          }
          {
            this.state.marray.map(m=> <Measureport host={host} property={m}/>)
          }

          <Channel host={host} property={this.state.channel} portarray={this.state.marray} changeValue={this.setMeasureportStatus.bind(this)}/>
        </div>
      </div>
    );
  }
}