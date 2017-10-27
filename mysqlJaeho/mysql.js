var mysql = require('mysql');
var client = mysql.createConnection({
	user: 'jsadmin',
	password: '0000'
});


client.connect(function(error){  
if(!error) {  
    console.log("Database is connected ... \n\n");    
} else {  
    console.log("Error connecting database ... \n\n");    
}  
});  


//복붙구문 시작
//모듈추출
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var fs = require('fs');

//서버생성
var app = express();

//미들웨어 생성
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(__dirname+'/public'));
//복붙구문 끝

app.get('/login',function(req,res){
	client.query('USE Company');
	client.query('SELECT * FROM products', function(error, result, fields){	
		if(error){	
			res.send(error);
			console.log('error log..');
		}else {
			res.send(result);	
			console.log('good log...');
		}
	});

	// res.send('done2');
});


//라스트 복붙구문
app.listen(52273, function(){
	console.log('Sever Running...');
});