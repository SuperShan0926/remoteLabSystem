var nedb = require('nedb');
var Promise = require('bluebird');
// var nedb = require('nedb-promise');
var exp = Promise.promisifyAll(new nedb({ filename: './db/exp.json', autoload: true }));
var course = Promise.promisifyAll(new nedb({ filename: './db/course.json', autoload: true }));
var expDesc = Promise.promisifyAll(new nedb({ filename: './db/expDesc.json', autoload: true }));
var desk = Promise.promisifyAll(new nedb({ filename: './db/desk.json', autoload: true })); 
var device = Promise.promisifyAll(new nedb({ filename: './db/device.json', autoload: true })); 
var config = Promise.promisifyAll(new nedb({ filename: './db/config.json', autoload: true })); 
var timeslot = Promise.promisifyAll(new nedb({ filename: './db/timeslot.json', autoload: true })); 
var user = Promise.promisifyAll(new nedb({ filename: './db/user.json', autoload: true })); 

module.exports={
	exp,
	course,
	expDesc,
	desk,
	device,
	config,
	timeslot,
	user
}