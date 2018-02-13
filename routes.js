//Mongo db connection 
var MongoClient = require('mongodb').MongoClient;
//url path of databsse
var url = process.env.mongodb_url || "mongodb://localhost:27017/";

//connection variable
var dbo;
//connection establish
    MongoClient.connect(url, function(err, db) {
        if (err)
        {
          res.send('Erro in establish connection!');
          throw err;
        } else{
          dbo = db.db("userinfo_db");
        }
       
    });


//Home page
exports.homepage=function(req,res){
    if(req.session.user != null)
    {
        console.log(req.session.user.email);
        res.render("home.ejs",{'user':req.session.user.name});    
    }
    else {
    console.log("render to home page");
    res.render("home.ejs",{'user':null}); 
    }
}

//about page
exports.about=function(req,res){
    if(req.session.user != null)
    {
        console.log(req.session.user.email);
        res.render("about.ejs",{'user':req.session.user.name});    
    }
    else {
    console.log("render to about page");
    res.render("about.ejs",{'user':null}); 
    }
}


//login 
exports.loginpage=function(req,res){
    req.session.destroy();
    console.log("render login page");
    res.render("login.ejs",{'user':null});
}


//login validation
exports.login=function(req,res){
    var email=req.body.email;
    var password=req.body.password;

    dbo.collection("signup_info").findOne({email:email,password:password},function(err, docs){
        if(err)
        {
            console.log("err");
        }
        if(!docs)
        {
            console.log("user is not found");
            res.render("login.ejs",{'user':null,'invalid':"invalid username or password"});
        }else{
            console.log("you are loged in successsfully");
            req.session.user=docs;
            res.render('home.ejs',{'user':req.session.user.name});
            
        }
   });
}

//logout
exports.logout=function(req,res){
    if(req.session)
        req.session.destroy();
    else
    console.log("no session");
    res.render("home.ejs",{'user':null});
}


//signup page
exports.signup=function(req,res){
    if(req.session.user != null)
    {
        console.log(req.session.user.email);
        res.render("signup.ejs",{'user':req.session.user.name});    
    }
    else {
    console.log("render to signup page");
    res.render("signup.ejs",{user:null}); 
    }
}



//Insert signup details
exports.signupdetails=function(req, res){
    
        dbo.collection("signup_info").insertOne(req.body, function(err, res) {
          if (err) throw err;
      }); 
      console.log(req.body)
      res.render("login.ejs",{'user':null});
  }


  //show user information
  exports.showdoc=function(req, res){

        if(req.session.user != null)
        {
           // console.log(req.session.user.email);
           // res.render("home.ejs",{'user':req.session.user.email});

            dbo.collection("signup_info").find({}).toArray(function(err, docs) {
                if (err) throw err;
              res.render('userinfo.ejs',{'docs':docs,'user':req.session.user.email}); 
                //res.render('userinfo.ejs',{'docs':docs,'user':"mukund"}); 
           });

        }
        else{
            console.log("render to home page");
            res.render('login.ejs',{user:"First log in to see the information"}); 
        }
}


