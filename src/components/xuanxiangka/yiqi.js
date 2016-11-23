import React from 'react';
import  Oscilloscope from '../oscilloscope';
import  SignalGenerator from '../signalGenerator';
import  DpCtrl from '../dpctrl';
var agent = require('superagent-promise')(require('superagent'), Promise);

class Yiqi extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Yiqi';
        this.Data = {};
    }

    saveOsc(osc) {
    	this.Data.osc = osc;
    }

    saveSig(sig) {
        this.Data.sig = sig;
    }

    saveData(){
        agent.post('/postdata/'+this.props.id).send(this.Data).then(res=>{
            console.log('mmmmmm',res.body);
        });
    }

    applyEnv(){
        agent.get('/data/'+this.props.id).then(res=>{
            this.Data = res.body;
            this.forceUpdate();
        });
    }

    render() {
        return <div>
        <button 
            style={{fontSize:'18px',position:'absolute',top:'33px',right:'146px'}} 
            className='btn btn-success'
            onClick={this.saveData.bind(this)}
            >保存数据</button>
        <button 
            style={{fontSize:'18px',position:'absolute',top:'33px',right:'276px'}} 
            className='btn btn-success'
            onClick={this.applyEnv.bind(this)}
            >恢复现场</button>
        {/*<Oscilloscope host='http://192.168.3.28:8001/REMTdevice/Digital_Scope/RIGOL/DS2000A/' save={this.saveOsc.bind(this)}/>*/}
        <Oscilloscope host='/angal' save={this.saveOsc.bind(this)} data={this.Data.osc}/>
        <DpCtrl host='http://192.168.3.28:8001/REMTdevice/Power/RIGOL/DP832/'/>
        <SignalGenerator name='函数信号发生器' host='/angal' save={this.saveSig.bind(this)} data={this.Data.sig}/>
        {/*<SignalGenerator name='函数信号发生器' host='http://192.168.3.28:8001/REMTdevice/Power/RIGOL/DP832/' save={this.saveSig.bind(this)} data={this.Data.sig}/>*/}
        </div>
    }
}

export default Yiqi;
