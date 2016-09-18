import React from 'react';

class Camera extends React.Component {
    constructor(props) { 
        super(props);
        this.displayName = 'Camera';
    }
    render() {
        return <div style={{margin:'0 auto'}}>
        	<img src='http://192.168.3.110:81/videostream.cgi?loginuse=admin&loginpas=' alt='这里是视频'/>
        </div>;
    }
}

export default Camera;
