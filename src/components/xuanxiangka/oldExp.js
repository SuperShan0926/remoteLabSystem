import React from 'react';
import MyExpView from './myExpView';
import moment from 'moment';
var agent = require('superagent-promise')(require('superagent'), Promise);

class NewExp extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'NewExp';
        this.oldExp =[{time:'2016-8-10',exp:'实验A'},{time:'2016-8-11',exp:'实验A'},{time:'2016-8-12',exp:'实验C'},{time:'2016-8-14',exp:'实验B'}];
    }




    render() {
    		return <MyExpView mySortedExp={this.oldExp}/>
	}
}
export default NewExp;
