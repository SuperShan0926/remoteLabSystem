var express = require('express');
var router = express.Router();
<<<<<<< HEAD
var DB=require('../db');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var moment=require('moment');
var debug = require('debug')('exp:route');
var crypto = require('crypto');

/* GET users listing. */
router.post('/login', function(req, res, next) {
	var username = req.body.username,
		md5 = crypto.createHash('md5'),
		password = md5.update(req.body.password).digest('hex');
		async(function () {
		var u = await(DB.user.findAsync({username:username}));
			if(u[0]&&u[0].password===password){
				req.session.user = u[0];
				return res.end('登录成功!');
			}
			else{
				res.end('密码错误或用户不存在!');
			}
	})();
});

router.get('/',function (req,res) {
	console.log(req.session);
	res.send(req.session.user);
	res.end();
});

router.get('/logout',function (req,res) {
	console.log(req.session);
	req.session.user = null;
	res.end();
});


router.post('/register', function(req, res) {
	var username = req.body.username,
		md5 = crypto.createHash('md5'),
		password = md5.update(req.body.password).digest('hex');
		console.log(username,password);
	 async(function(){
	 			var result = await(DB.user.findAsync({username:username}));
	 			if(result[0]){
	 				console.log('!!!!!');
					res.send('用户已存在!');
					res.end();
					return;
	 			}
				const newUser = {username:username,password:password};
				req.session.user =  newUser;
				await(DB.user.insertAsync(newUser));
				console.log('??????');
					res.send('注册成功');
					res.end();
  })();
=======

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
>>>>>>> 57e5c15884855eacfd7a64418fb8cb49797a4645
});

module.exports = router;
