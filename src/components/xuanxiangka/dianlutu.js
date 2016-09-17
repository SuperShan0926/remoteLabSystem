import React from 'react';
import Circuitdia from '../circuitdia';




class Dianlutu extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Dianlutu';
    }
    render() {
    	return <Circuitdia host='http://localhost:3000/' bgsrc='http://localhost:3000/components/circuitdia/circuitdia.png'/>
    }
}

export default Dianlutu;
