/**************************** SHOW orderby: -NAME- PATIENTLIST ***************************/
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

apiRoutes.get('/patientslist', patientsList); // 회원등록

function patientsList(req, res) {
    pool.query('select * from patient order by p_name;', function (err, cursor) {
        console.log(cursor.length);
        if (cursor.length > 0) {
            var data = [];
            for (var i = 0; i < cursor.length; i++) {
                var info={
                    patientsName: cursor[i].p_name,
                    patientsLast_treat: cursor[i].last_treat
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