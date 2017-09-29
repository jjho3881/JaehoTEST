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

app.get('/',function(req,res){
	if(req.cookies.auth){ //로그인 정보가 있을경우
		res.send('<html><body><h1>Login Success</h1>'+
			'<form method="POST" action="/logout"/>'+
			'<input type="submit" value="Logout"/>'+
			'</form></body></html>');
	}else{ // 로그인을 하지않았으면  무조건 로그인 페이지로
		res.redirect('/login');
	}
});
app.get('/login',function(req,res){
	fs.readFile(__dirname+'/public/login.html', function(err,data){
		if(err){
			res.send(JSON.stringify(err));		
		}else {
			res.send(data.toString());
		}
	});
});
app.post('/logout',function(req,res){
	console.log('/logout');
	res.clearCookie('auth');
	res.redirect('/');
});
app.post('/login',function(req,res){
	var username = req.body.username;
	var password = req.body.password;
	if(username == 'Jung' && password == '1234'){
		res.cookie('auth',true);
		res.redirect('/');
	}else {
		res.redirect('/login');
	}
});

app.get('/a',function(req,res){
	res.send("<a href='/b'>Go to B</a");
});

app.get('/b',function(req,res){
	res.send("<a href='/a'>Go to A</a>");
});

app.get('/page/:id',function(req,res){
	var id = req.params.id;
	res.send("<h1>"+id+' Page</h1>');
});
/*
app.use(function(req,res){
	// res.writeHead(200, {'Content-Type':'text/html'});
	// res.end('<h1>Hello, Express</h1>');
	// res.send('<h1>Hello, Express2</h1>');
	// console.log(req);
	var name = req.query.name;
	var region = req.query.region;
	var agent = req.header('User-Agent');
	if(agent.toLowerCase().match(/chrome/)){
		res.send('<h1>Hello, chrome</h1>'+
			'name: '+name+'<br>region: '+region);
	} else {
		res.send('<h1>Hello, others</h1>')
	}
	
	var object = {
		name: 'Jung',
		age: 29,
		marriage:false,
		friends:['John','Sue'],
		job:{
			name:'salaryman',
			income:100
		}

	}
	
	res.send(JSON.stringify(object));
})
*/
app.listen(52273, function(){
	console.log('Sever Running...');
})