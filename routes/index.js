var express = require('express');
var router = express.Router();
var DB=require('../db');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var moment=require('moment');
var debug = require('debug')('exp:route');

router.get('/',function (req,res) {
		if(req.session.user){ 
			return res.redirect('/index.html');}
	res.redirect('/login.html');
});

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
    async(function(){
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
			order.studentID=req.session.user._id;
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
	var studentID=req.session.user._id;
	async(function(){
		var record={timeslotID,date,studentID};
		debug(record);
		var numRemoved=await(DB.exp.removeAsync(record, {}));
		debug(numRemoved);
		res.end("ok");
	})();

});

//查询预订情况
router.get('/orderRecords/:stuId',function (req,res,next) {
   var stuId = req.params.stuId;
   async(function () {
       var record = await(DB.exp.findAsync({studentID:stuId}));
       res.json(record);
   })();
});

//插入所有实验数据
router.post('/postdata/:expId',function (req,res) {
	var expId = req.params.expId;
	async(function(){
	await(DB.exp.update({_id:expId },
		{ $push:{datas:req.body } }
	));
	res.json(req.body);
})();	
});

//获得实验数据以恢复现场
router.get('/data/:expId',function (req,res) {
	var expId = req.params.expId;
	async(function(){	
	var d = await(DB.exp.findAsync({_id:expId})),
			data = d[0].datas,
			len = data.length;
	res.json(data[len-1]);
})();	
});

//图片当作base64编码存入数据库。
router.post('/uploadImg/:expId',function(req,res) {
	var expId = req.params.expId,
		imgData = req.body.imgData;
		async(function() {
		await(DB.exp.update({_id:expId },
		{ $push:{imgData:imgData}}
	));
		res.end('图片保存成功!');
	})();

});

router.get('/imgsReview/:expId',function(req,res) {
	var expId = req.params.expId;
		async(function() {
		ret = await(DB.exp.findAsync({_id:expId }));
		if(!ret[0]){res.json([])};
		res.json(ret[0].imgData);
	})();

});








module.exports = router;
