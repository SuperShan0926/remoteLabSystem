import React from 'react';
var agent = require('superagent-promise')(require('superagent'), Promise);

class Camera extends React.Component {
    constructor(props) { 
        super(props);
        this.displayName = 'Camera';
    }

    handleClick(){
        var canvas = this.refs.canvas,
            img = this.refs.img,
            {id} = this.props;
        canvas.width = img.width;
        canvas.height = img.height;
        canvas.getContext("2d").drawImage(img, 0, 0); 
        var dataURL = canvas.toDataURL('image/jpeg',0.7);
        var dataURLobj={imgData:dataURL};
        agent.post('/uploadImg/'+id,dataURLobj).then(res=>{
            alert(res.text);
        })
        
    }


    render() {
        return <div style={{margin:'0 auto'}}>
            <button 
            style={{fontSize:'18px',position:'absolute',top:'33px',right:'276px'}} 
            className='btn btn-success'
            onClick={this.handleClick.bind(this)}
            >保存实验截图</button>
        	<img src='/videostream.cgi?loginuse=admin&loginpas=' alt='这里是视频' ref='img' />
            <canvas ref='canvas' style={{display:'none'}}/>
        </div>;
    }
}

export default Camera;
