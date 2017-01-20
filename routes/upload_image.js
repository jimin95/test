var express = require('express');
var app = express();
var apiRoutes = express.Router();
var pool = require('./dbConnection');
var formidable = require('formidable');
var fs = require('fs-extra');

apiRoutes.post('/upload/:userId', function (req, res) {
    var userId = req.params.userId;
    var name = "";
    var filePath = "";
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
        name = userId;
    });

    form.on('end', function (fields, files) {
        for (var i = 0; i < this.openedFiles.length; i++) {
            var temp_path = this.openedFiles[i].path;
            var file_name = this.openedFiles[i].name;
            var index = file_name.indexOf('/');
            var new_file_name = file_name.substring(index + 1);
            var new_location = './../public/resources/images/' + name + '/';
            var db_new_location = 'resources/images/' + name + '/';
            //실제 저장하는 경로와 db에 넣어주는 경로로 나눠 주었는데 나중에 편하게 불러오기 위해 따로 나눠 주었음
            filePath = db_new_location + file_name;
            fs.copy(temp_path, new_location + file_name, function (err) { // 이미지 파일 저장하는 부분임
                if (err) {
                    console.error(err);
                }
            });
        }
        /*
                db.images.insert({ "id": userId, "name": name, "filePath": filePath }, function (err, doc) {
                    //디비에 저장
                });*/
        pool.query('insert into images values(?,?,?);', [userId, new_file_name, filePath]);
    });
    //res.redirect("/"); // http://localhost:3000/ 으로 이동!
    res.send('Success!');
});

module.exports = apiRoutes;