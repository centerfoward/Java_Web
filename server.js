const  express = require('express');
const multer = require('multer');
const app = express();  //; 없어도됨

const path = require('path'); //없어도 실행됨(책에서 있음)

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./db/"); // cb 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname) // cb 콜백함수를 통해 전송된 파일 이름 설정
    }
})
var upload = multer({ storage: storage })


app.listen(8000, function(req,res){
    console.log('8000번 포트로 들어옴');
});


app.get('/',function(req,res){
    res.send('home입니다.');
});

app.get('/first', function(req, res){
    res.send('Hello');
});

app.get('/first/site', function(req, res){
    res.send('World');
});

app.get('/second', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.post('/second', upload.single('profile'), function(req, res){
    res.send('Uploaded! : '+req.file); // object를 리턴함
    console.log(req.file); // 콘솔(터미널)을 통해서 req.file Object 내용 확인 가능.
  });
app.use('/db', express.static('db'));