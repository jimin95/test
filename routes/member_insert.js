/**************************** REGISTER ***********************/
// API ROUTES -------------------

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var pool = require('./dbConnection');
var bcrypt = require('bcrypt-nodejs');
var apiRoutes = express.Router();

apiRoutes.post('/register', memberReg); // 회원등록

function memberReg(req, res, next) {
    var photo = 'NO';
    var id = req.body.d_id;   //post맨 입력 값
    var pw1 = req.body.password1; //포스트맨 비밀번호 입력칸
    var pw2 = req.body.password2; // 포스트맨 비밀번호 확인칸
    var password;
    password = bcrypt.hashSync(pw1); // 포스트맨 비번입력(password1)을 암호화해서 password에 저장
    console.log(password);
    var idcheck;

    if (id == "") {
        res.end('아이디를 입력하세요'); return;
    }
    else if (pw1 == "") {
        res.end('비밀번호를 입력하세요'); return;
    }
    else if (pw1 != pw2) {
        res.end('비밀번호를 확인하세요'); return;
    }
    else {
        pool.query('select d_id from doctor where d_id = ?;', [id], function (err, cursor) {
            if (cursor.length > 0) {
                res.end('이미 존재하는 아이디입니다.'); return;
            }
            else {
                pool.query('insert into doctor (hospital, d_id, password, name, field, email, college, graduate, p_cnt, c_cnt, sum_point, sur_point, con_point, cli_point, photo, birth, gender) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);',   //18
                    [req.body.hospital, req.body.d_id, password, req.body.name, req.body.field, req.body.email, req.body.college, req.body.graduate, 0, 0, 0, 0, 0, 0, photo, req.body.birth, req.body.gender], function (error, info) {
                        if (error == null)
                            res.status(201).json({ result: { signresult: { success: true, reason: "Success" } } });
                        else{
                            res.status(201).json({ result: { signresult: { success: false, reason: "Invaild process" } } });
                            console.log(error);
                        }
                    });
            }
        });
        //  }
    }
}
//res.status(201).json({result : {signresult :{success: true,message: 'Success!',token: token}}});
module.exports = apiRoutes;