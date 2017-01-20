/************************ LOGIN ******************************/
// API ROUTES -------------------
// ---------authenticate and Creating a Token------
// when the id and pwd is validate
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var pool = require('./dbConnection');
var superSecret = 'secretKetPwd';
var apiRoutes = express.Router();

function comaprePassword(pw, user_pw) {
    return bcrypt.compareSync(pw, user_pw);
}

apiRoutes.post('/authenticate', function (req, res) {
    //find the user
    var id = req.body.id;
    var pw = req.body.password;
    pool.query('select * from member where id = ?;', [id], function (err, cursor) {
        if (cursor.length > 0) {
            var validPassword = comaprePassword(pw, cursor[0].password);
            if (!validPassword) {
                res.json({ success: false, message: 'The password is not same!' })
            }
            else {
                var token = jwt.sign(cursor[0].id, superSecret,{});

                // return the information including roken as JSON
                res.json({
                    success: true,
                    message: 'Success!',
                    token: token
                });
            }
        }
        else
            res.status(503).json({ result: false, reason: "Cannot find selected article" });
    });
});

module.exports = apiRoutes;