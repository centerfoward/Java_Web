const { Console } = require('console');
const express = require('express');
const multer = require('multer');
const app = express();
app.use(express.static(__dirname));
app.use('/app.js', express.static(__dirname + '/app.js'));
const {exec} = require('child_process');




const path = require('path');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./");
    },
    filename: function (req, file, cb) {
      cb(null, 'inputFile.txt') 
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




app.get('/first',async function(req,res){
    var no_RUN_py = 0;

    const spawn = require('child_process').spawn,
    //윈도우 사용시
    //result = spawn('python', ['Data_Processing.py'],);
    //맥에서 사용시
    result = spawn('python3', ['Data_Processing.py'],);
    

    result.stdout.on('data', function(data){
    no_RUN_py = data.toString();
    no_RUN_py = no_RUN_py.trim();

    
      


    if(no_RUN_py === 'True'){
        exec("node app.js", (error, stdout, stderr) => {
            stdout = stdout.trim();
            if (error) {
              console.error(`실행 중 오류 발생: ${error}`);
              return;
            }
            if(stdout === "True"){
                console.log("값 저장완료");
                res.sendFile(__dirname + '/chart1.html');
            }
            console.log(`stdout: ${stdout}`);
         
          });

        
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



const maxFileCount = 1; 

app.post('/', upload.array('profile', maxFileCount), function(req, res){
   
    if (req.files && req.files.length > maxFileCount) {
       
        for (let i = maxFileCount; i < req.files.length; i++) {
            const filePath = req.files[i].path;
            fs.unlinkSync(filePath); 
        }
        res.status(400).send(`Only ${maxFileCount} file(s) can be uploaded.`);
        return;
    }
   
    if (req.files && req.files.length > 0) {
        res.send('Uploaded! : ' + req.files[0].originalname);
        console.log(req.files[0]);
        console.log(req.files.originalname);
        var complete = "업로드 완료";
        console.log(complete);
        
    
    }
   
    else {
        res.status(400).send('File upload failed.');
    }
});


app.use('/', express.static('db'));