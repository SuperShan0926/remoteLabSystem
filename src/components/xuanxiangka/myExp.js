import React from 'react';
import {Link} from 'react-router';
// import myExpView from './myExpView';

class MyExp extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'MyExp';
    }
    render() {
    	return <div>
    		<Link to='/newExp'>新实验</Link>
    		<Link to='/oldExp'>旧实验</Link>
    			{this.props.children}
    		</div>
    }
}

export default MyExp;
