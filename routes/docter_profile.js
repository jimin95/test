/**************************** SHOW Doctor's PROFILE ***************************/
// API ROUTES -------------------

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var pool = require('./dbConnection');
var apiRoutes = express.Router();
var token_check = require('./token_check');
//apiRoutes.use(token_check);

apiRoutes.get('/docprofile', docProfile); // 의사 정보 출력

function docProfile(req, res) {
    pool.query('select * from doctor;', function (err, cursor) {
        if(err){
            console.log(err);
            return;
        }
        console.log(cursor.length);
        if (cursor.length > 0) {
            var data = [];
            for (var i = 0; i < cursor.length; i++) {
                var info={
                    hospital: cursor[i].hospital,
                    field: cursor[i].field,
                    name: cursor[i].name,
                    email: cursor[i].email
                };
                data.push(info);
            }
            var result = {
                count : cursor.length,
                data : data
            };
            res.status(201).json({result});
            //res.send(result);
        }
        else {
            res.end('Not Found');
        }
    });
}
//res.status(201).json({result : {signresult :{success: true,message: 'Success!',token: token}}});
module.exports = apiRoutes;