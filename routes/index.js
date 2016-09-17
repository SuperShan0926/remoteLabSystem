var express = require('express');
var router = express.Router();
var DB=require('../db');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var moment=require('moment');
var debug = require('debug')('exp:route');

<<<<<<< HEAD

router.get('/',function (req,res) {
	if(req.session.user){ 
		console.log('fuck???????');
		return res.redirect('/public/index.html');}
	res.redirect('/user/login');
});

=======
>>>>>>> 57e5c15884855eacfd7a64418fb8cb49797a4645
router.get('/course', function(req, res, next) {

 async(function(){
    var course = await(DB.course.findOneAsync({}));
    course.exps=await(DB.expDesc.findAsync({_id:{"$in":course.expIDs}}));
    delete course.expIDs;
    res.json(course);
  })();

});

//实验的可预定日期
router.get('/exp/date/:expDescID',function(req, res, next){
	var expDescID=req.params.expDescID;
  async(function(){
    var config = await(DB.config.findOneAsync({}));
    var expDesc=await(DB.expDesc.findOneAsync({_id:expDescID}));
    debug(config,expDesc);
    var begin=moment(expDesc.begin);
    var end=moment(expDesc.end);
    var duration=moment.duration(end-begin).asDays();
    if(duration<0){
    	return res.status(500).end();
    }
    var days=[];
    for (var i = 0;i<duration;i++) {
    	var day=moment(expDesc.begin).add(i,'days').format('YYYY-MM-DD');
    	days.push(day);
    }
    res.json(days);
  })();
	
});

//所有时间段
router.get('/timeslot',function(req,res,next){
 async(function(){
    var timeslots = await(DB.timeslot.findAsync({}));
    res.json(timeslots);
  })();
})

//某天某实验各时段的分配状况 {timeslotID:userid}
router.get('/exp/time/:date/:expDescID',function(req,res,next){
	//查找时间槽。检查当天的时间槽分配。
	var expDescID=req.params.expDescID;

	var date=moment(req.params.date).format('YYYYMMDD');
	debug(date);
<<<<<<< HEAD
    async(function(){
=======
  async(function(){
>>>>>>> 57e5c15884855eacfd7a64418fb8cb49797a4645
		var timeslots = await(DB.timeslot.findAsync({}));
		var orders=timeslots.map(timeslot=>{
			var order=await(DB.exp.findOneAsync({timeslotID:timeslot._id,date,expDescID}));
			var user=order?order.studentID:null;
			return {timeslot:timeslot._id,user};
		})
		res.json(orders);
  })();

})

//创建某天某时段预定
//TODO:某人在同一个时间段应该只能预定一张桌子
router.post('/order',function(req,res,next){
	var expDescID=req.body.expdesc;
	var date=req.body.date;
	var timeslotID=req.body.time;

	var date=moment(date).format('YYYYMMDD');
	async(function(){
		//查询所有桌子。寻找可用桌子。
    	var expDesc=await(DB.expDesc.findOneAsync({_id:expDescID}));
    	var deskIDs=expDesc.deskIDs;
    	debug(deskIDs);
    	var order;
    	for (var i = 0;i<deskIDs.length;i++){
    		var record={timeslotID,date,deskID:deskIDs[i],expDescID};
			var exp=await(DB.exp.findOneAsync(record));//查找是否被占用
			console.log(i,exp);
			if(!exp){
				order=record;
				break;
			}
    	}	

		if(!order){
			res.status(400).end("occupied");
		}else{
<<<<<<< HEAD
			order.studentID=req.session.user._id;
=======
			order.studentID="aaa";//暂时写死
>>>>>>> 57e5c15884855eacfd7a64418fb8cb49797a4645
			order=await(DB.exp.insertAsync(order));
			res.json(order);
		}

	})();
})

//取消某天某时段预定
router.delete('/order',function(req,res,next){
	var expDescID=req.body.expdesc;
	var date=req.body.date;
	var timeslotID=req.body.time;

	var date=moment(date).format('YYYYMMDD');
<<<<<<< HEAD
	var studentID=req.session.user._id;
=======
	var studentID="aaa";//应该从sesssion里取得
>>>>>>> 57e5c15884855eacfd7a64418fb8cb49797a4645
	async(function(){
		var record={timeslotID,date,studentID};
		debug(record);
		var numRemoved=await(DB.exp.removeAsync(record, {}));
		debug(numRemoved);
		res.end("ok");
	})();
<<<<<<< HEAD
});

//查询预订情况
router.get('/orderRecords/:stuId',function (req,res,next) {
   var stuId = req.params.stuId;
   async(function () {
       var record = await(DB.exp.findAsync({studentID:stuId}));
       res.json(record);
   })();
});




=======
})
>>>>>>> 57e5c15884855eacfd7a64418fb8cb49797a4645


module.exports = router;