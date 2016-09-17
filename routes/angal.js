//模拟实验数据路由
var express = require('express');
var router = express.Router();
var data= require('../src/mock/mock_wave_data');

router.get('/DS-WAVE', function (req, res) {
  const w=JSON.parse(data.WaveData);
  console.log(req.query);
  w.push(w.shift());//move the data
  res.json(data);
});

router.get('/DS-VOffset-Range', function(req, res){
    res.json({min:-10,max:20});
});

router.get('/DS-VScal-Range',function(req, res){
    res.json({min:-10,max:20});
});

// OSC TIME
router.post('/DS-TIMscal', function (req, res) {
    console.log(req.query);
    res.end('DS-TIMscal');
});
// OSC OFFSET
router.post('/DS-TIMoffset', function (req, res) {
    console.log(req.query);
    res.end('DS-TIMoffset');
});

// OSC Channel on or off
router.post('/DS-CHANnel', function (req, res) {
    console.log(req.query);
    res.end('DS-CHANnel');
});
// OSC Channel offset
router.post('/DS-OFFSet', function (req, res) {
    console.log(req.query);
    res.end('DS-OFFSet');
});
// OSC Channel scale
router.post('/DS-SCAL', function (req, res) {
    console.log(req.query);
    res.end('DS-SCAL');
});
// OSC Channel DS-COUPling
router.post('/DS-COUPling', function (req, res) {
    console.log(req.query);
    res.end('DS-SCAL');
});
// OSC Channel DS-IMPedance
router.post('/DS-IMPedance', function (req, res) {
    console.log(req.query);
    res.end('DS-IMPedance');
});
// OSC Channel DS-INVert
router.post('/DS-INVert', function (req, res) {
    console.log(req.query);
    res.end('DS-INVert');
});
// OSC Trig DS-TRIGmode
router.post('/DS-TRIGmode', function (req, res) {
    console.log(req.query);
    res.end('DS-TRIGmode');
});
// OSC Trig DS-TRIGsource
router.post('/DS-TRIGsource', function (req, res) {
    console.log(req.query);
    res.end('DS-TRIGsource');
});
// OSC Trig DS-TRIGsweep
router.post('/DS-TRIGsweep', function (req, res) {
    console.log(req.query);
    res.end('DS-TRIGsweep');
});


// SIG DG-FREQ
router.post('/DG-FREQ', function (req, res) {
    console.log(req.query);
    res.end('DG-FREQ');
});
// SIG DG-AMP
router.post('/DG-AMP', function (req, res) {
    console.log(req.query);
    res.end('DG-AMP');
});
// SIG DG-OFFS
router.post('/DG-OFFS', function (req, res) {
    console.log(req.query);
    res.end('DG-OFFS');
});
// SIG DG-PHAS
router.post('/DG-PHAS', function (req, res) {
    console.log(req.query);
    res.end('DG-PHAS');
});
// SIG DG-HARM-STAT
router.post('/DG-HARM-STAT', function (req, res) {
    console.log(req.query);
    res.end('DG-HARM-STAT');
});
// SIG DG-HARM-ORDE
router.post('/DG-HARM-ORDE', function (req, res) {
    console.log(req.query);
    res.end('DG-HARM-ORDE');
});
// SIG DG-HARM-TYPE
router.post('/DG-HARM-TYPE', function (req, res) {
    console.log(req.query);
    res.end('DG-HARM-TYPE');
});
// SIG DG-HARM-AMPL
router.post('/DG-HARM-AMPL', function (req, res) {
    console.log(req.query);
    res.end('DG-HARM-AMPL');
});
// SIG DG-HARM-PHAS
router.post('/DG-HARM-PHAS', function (req, res) {
    console.log(req.query);
    res.end('DG-HARM-PHAS');
});


module.exports = router;
