var exp=require('express');
var app=exp();
var bodyParser=require('body-parser')
var routes=require('./routes/routes.js')
var session=require('express-session')
var path = require("path");
var port=process.env.PORT||8000;




//
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

//public path
app.use(exp.static(path.join(__dirname, '/public')))

//session
app.use(session({secret:"secret",resave:true,saveUninitialized:false}));

//set view 
app.set('view engine','ejs');

//It call the home page 
app.get('/',routes.homepage);

//login page
app.get('/loginpage',routes.loginpage);

//valisdate the login credientials
app.post('/login',routes.login);

//logout and redirect to home page
app.get('/logout',routes.logout);


//about page
app.get('/about',routes.about);


//Sign up page
app.get('/signup',routes.signup);

//Insert sign up details
app.post('/insert', routes.signupdetails) 

//show user details
app.get('/userinfo', routes.showdoc) 


//listen port
var server=app.listen(port,function(req,res){
    console.log('server is running on port'+port)
});