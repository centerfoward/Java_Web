const  express = require('express');
var http = require("http");
var path = require("path");
var serveStatic = require("serve-static"); //특정 폴더를 패스로 접근 가능하게 하는것.
var expressErrorHandler = require("express-error-handler");
var cookieParser = require("cookie-parser");
var expressSession = require("express-session");
const app = express();  //; 없어도됨

//파일 업로드 모듈
var multer = require("multer");


//storage의 저장 기준 설정
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '/'); //파일 저장 경로
    }
})
// 파일 저장 경로설정, 현재는 uploads/ 폴더에 저장
// 파일 이름은 현재시간-기존파일이름.기존확장자

const upload = multer({ dest: 'uploads/' }) 

app.listen(8000, function(req,res){
    console.log('8000번 포트로 들어옴');
});


app.get('/',function(req,res){
    res.send('home입니다.');
});

app.get('/first', function(req, res){
    res.send('Hello');
});

app.get('/second', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.get('/first/site', function(req, res){
    res.send('World');
});

app.post('/second/profile', upload.single('profile'), (req, res)=> {
    console.log(req.file);
    res.status(200).send("ok!");
});

