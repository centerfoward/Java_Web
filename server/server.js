const  express = require('express');
const app = express();  //; 없어도됨

const path = require('path'); //없어도 실행됨(책에서 있음)

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