var express = require('express');
var app = express();
var data= require('./mock_wave_data');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/DS-WAVE', function (req, res) {
  const w=JSON.parse(data.WaveData);
  console.log(req.query);
  w.push(w.shift());//move the data
  res.json(data);
});

app.get('/DS-VOffset-Range', function(req, res){
	res.json({min:-10,max:20});
});

app.get('/DS-VScal-Range',function(req, res){
	res.json({min:-10,max:20});
});

// OSC TIME
app.post('/DS-TIMscal', function (req, res) {
	console.log(req.query);
	res.end('DS-TIMscal');
});
// OSC OFFSET
app.post('/DS-TIMoffset', function (req, res) {
	console.log(req.query);
	res.end('DS-TIMoffset');
});

// OSC Channel on or off
app.post('/DS-CHANnel', function (req, res) {
	console.log(req.query);
	res.end('DS-CHANnel');
});
// OSC Channel offset
app.post('/DS-OFFSet', function (req, res) {
	console.log(req.query);
	res.end('DS-OFFSet');
});
// OSC Channel scale
app.post('/DS-SCAL', function (req, res) {
	console.log(req.query);
	res.end('DS-SCAL');
});
// OSC Channel DS-COUPling
app.post('/DS-COUPling', function (req, res) {
	console.log(req.query);
	res.end('DS-SCAL');
});
// OSC Channel DS-IMPedance
app.post('/DS-IMPedance', function (req, res) {
	console.log(req.query);
	res.end('DS-IMPedance');
});
// OSC Channel DS-INVert
app.post('/DS-INVert', function (req, res) {
	console.log(req.query);
	res.end('DS-INVert');
});
// OSC Trig DS-TRIGmode
app.post('/DS-TRIGmode', function (req, res) {
	console.log(req.query);
	res.end('DS-TRIGmode');
});
// OSC Trig DS-TRIGsource
app.post('/DS-TRIGsource', function (req, res) {
	console.log(req.query);
	res.end('DS-TRIGsource');
});
// OSC Trig DS-TRIGsweep
app.post('/DS-TRIGsweep', function (req, res) {
	console.log(req.query);
	res.end('DS-TRIGsweep');
});


// SIG DG-FREQ
app.post('/DG-FREQ', function (req, res) {
	console.log(req.query);
	res.end('DG-FREQ');
});
// SIG DG-AMP
app.post('/DG-AMP', function (req, res) {
	console.log(req.query);
	res.end('DG-AMP');
});
// SIG DG-OFFS
app.post('/DG-OFFS', function (req, res) {
	console.log(req.query);
	res.end('DG-OFFS');
});
// SIG DG-PHAS
app.post('/DG-PHAS', function (req, res) {
	console.log(req.query);
	res.end('DG-PHAS');
});
// SIG DG-HARM-STAT
app.post('/DG-HARM-STAT', function (req, res) {
	console.log(req.query);
	res.end('DG-HARM-STAT');
});
// SIG DG-HARM-ORDE
app.post('/DG-HARM-ORDE', function (req, res) {
	console.log(req.query);
	res.end('DG-HARM-ORDE');
});
// SIG DG-HARM-TYPE
app.post('/DG-HARM-TYPE', function (req, res) {
	console.log(req.query);
	res.end('DG-HARM-TYPE');
});
// SIG DG-HARM-AMPL
app.post('/DG-HARM-AMPL', function (req, res) {
	console.log(req.query);
	res.end('DG-HARM-AMPL');
});
// SIG DG-HARM-PHAS
app.post('/DG-HARM-PHAS', function (req, res) {
	console.log(req.query);
	res.end('DG-HARM-PHAS');
});
app.listen(10010, function () {
  console.log('oscilloscope mock server listening on port 10010!');
});