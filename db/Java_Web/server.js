const { Console } = require('console');
const express = require('express');
const multer = require('multer');
const app = express();  //; 없어도됨
//const myDropzone = require("script");

const path = require('path'); //없어도 실행됨(책에서 있음)

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./"); // cb 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
    },
    filename: function (req, file, cb) {
      cb(null, '.txt') // cb 콜백함수를 통해 전송된 파일 이름 설정
      console.log(file.originalname)
    }
})
var upload = multer({ storage: storage })


app.listen(8000, function(req,res){
    console.log('8000번 포트로 들어옴');
});


app.get('/home',function(req,res){
    res.send('home입니다.');
});


app.get('/first',function(req,res){
    var no_RUN_py = 0;
    const spawn = require('child_process').spawn,
    //윈도우 사용시
    //result_no = spawn('python', ['Data_Processing.py'],);
    //맥에서 사용시
    result = spawn('python3', ['Data_Processing.py'],);

    result.stdout.on('data', function(data){
    no_RUN_py = data.toString();
    no_RUN_py = no_RUN_py.trim();
    if(no_RUN_py === 'True'){
            res.sendFile(__dirname + '/chart1.html');
    }
    if(no_RUN_py !== 'True'){
        console.log('텍스트 파일 오류');
        res.sendFile(__dirname + '/error.html');
    }
    });

    result.stderr.on('data', function(data){
        console.log('파이썬 실행 오류');
        res.sendFile(__dirname + '/error.html');
    });
});


app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});


app.get('/chart', function (req, res) {
    console.log(RUN_py);
    res.sendFile(path.join(__dirname, 'chart1.html'));
});


// app.post('/second', upload.single('profile', maxFileCount), function(req, res){
//     console.log(req.file);
//     res.redirect('/'); // 파일 업로드 완료 후 페이지 이동
// });

const maxFileCount = 1; // 최대 업로드 가능한 파일 수

app.post('/', upload.array('profile', maxFileCount), function(req, res){
    // 파일 업로드 수가 최대 허용 수를 초과한 경우
    if (req.files && req.files.length > maxFileCount) {
        // 업로드된 파일 제거
        for (let i = maxFileCount; i < req.files.length; i++) {
            const filePath = req.files[i].path;
            fs.unlinkSync(filePath); // 파일 삭제
        }
        res.status(400).send(`Only ${maxFileCount} file(s) can be uploaded.`);
        return;
    }
    
    // 파일 저장 성공 시
    if (req.files && req.files.length > 0) {
        res.send('Uploaded! : ' + req.files[0].originalname);
        console.log(req.files[0]);
        console.log(req.files.originalname);
        var complete = "업로드 완료";
        console.log(complete);
        
        // // 드롭존 초기화
        // myDropzone.removeAllFiles();
        // myDropzone.enable(); // 드롭존 활성화
        
        // // 한 개의 파일만 선택 가능한 안내문 출력
        // var message = document.createElement('p');
        // message.innerText = 'You can only select one file.';
        // document.querySelector('.dropzone').appendChild(message);
    }
    // 파일 저장 실패 시
    else {
        res.status(400).send('File upload failed.');
    }
});


app.use('/db', express.static('db'));