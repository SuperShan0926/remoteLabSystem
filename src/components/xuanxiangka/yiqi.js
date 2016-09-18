import React from 'react';
import  Oscilloscope from '../oscilloscope';
import  SignalGenerator from '../signalGenerator';
import  DpCtrl from '../dpctrl';

class Yiqi extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Yiqi';
        this.expData = {};
    }

    save(osc) {
    	this.expData = osc;
    	console.log('oooooccccccc',this.expData);
    }

    render() {
        return <div>
        <button style={{fontSize:'18px',position:'absolute',top:'33px',right:'146px'}} className='btn btn-success'>保存数据</button>
        <Oscilloscope host='http://192.168.3.28:8001/REMTdevice/Digital_Scope/RIGOL/DS2000A/' save={this.save.bind(this)}/>
        <DpCtrl host='http://192.168.3.28:8001/REMTdevice/Power/RIGOL/DP832/'/>
        </div>
    }
}

export default Yiqi;
