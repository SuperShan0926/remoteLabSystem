var express = require('express');
var router = express.Router();
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
	res.send(req.session.user);
	res.end();
});

router.get('/logout',function (req,res) {
	req.session.user = null;
	res.redirect('/');
});


router.post('/register', function(req, res) {
	var username = req.body.username,
		md5 = crypto.createHash('md5'),
		password = md5.update(req.body.password).digest('hex');
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
				console.log(newUser);
				await(DB.user.insertAsync(newUser));
					res.send('注册成功');
					res.end();
  })();

});

module.exports = router;
