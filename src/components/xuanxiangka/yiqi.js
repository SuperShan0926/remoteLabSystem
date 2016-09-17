import React from 'react';
import  Oscilloscope from '../oscilloscope';

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
        <Oscilloscope host='http://localhost:3000/angal' save={this.save.bind(this)}/>
        </div>
    }
}

export default Yiqi;
