var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var jwt = require('jsonwebtoken');
var formidable = require('formidable');
var fs = require('fs-extra');
var mysql = require('mysql');
var port = process.env.PORT || 3000; 
var dbConnection = require('./routes/dbConnection');
var index = require('./routes/index');
var member_insert = require('./routes/member_insert');
var member_login = require('./routes/member_login');
var token_check = require('./routes/token_check');
var upload_image = require('./routes/upload_image');
var patientslist = require('./routes/patientlist_name');
var plistLatest = require('./routes/patientlist_latest');
var docprof = require('./routes/docter_profile');
var app = express();

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');
app.use(morgan('dev'));

//app.use('/index',index);
app.use(member_insert);
app.use(member_login);
app.use(upload_image);
app.use(patientslist);
app.use(plistLatest);
app.use(docprof);
//404
app.use(function(req,res,next){
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

//192.168.1.129
//app.listen(port);
app.listen(port);
console.log('Sever is running at http://localhost:' + port);

module.exports = app;