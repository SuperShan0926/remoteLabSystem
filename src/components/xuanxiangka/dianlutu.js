import React from 'react';
import Circuitdia from '../circuitdia';




class Dianlutu extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Dianlutu';
    }
    render() {
    	return <Circuitdia host='http://192.168.3.28:8001/REMTdevice/Board/101_Opamp/' bgsrc='/img/circuitdia/circuitdia.png'/>
    }
}

export default Dianlutu;
