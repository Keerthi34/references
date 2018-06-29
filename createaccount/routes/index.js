var express = require('express');
var router = express.Router();
var request=require('request');
var winston = require('winston');
var User= require('../models/users');
var Password=require('../models/password');


winston.add(
  winston.transports.File,{
    filename: 'teacher.log',
    level: 'info',
    json: 'true',
    eol: 'rn',
    timestamp: true
  }
)


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/*router.get('/get',function(req,res,next){
url="10.10.5.4:5000/studentdetails";
  request.get(url,function(req,res,body){

  console.log(url);
 console.log(body)
})

});*/


/*Create account*/
router.post('/createaccount',function(req,res,next){
  winston.log('info',"Info level")
  var t=new User({
    stid:req.body.stid,
    name:req.body.name,
    fathername:req.body.fathername,
    phonenumber: req.body.phonenumber,
    mailid:req.body.mailid

  })
  t.save(function(err,suc){
    if(err)
    res.status(500).json(err)
    else {

    res.status(201).json({"Message":"Created", type:"internal"})
}

})
    //  res.send(suc)
})


/*password*/
/*
router.post('/newpassword',function(req,res,next){
  winston.log('info',"Info level")
  var t=new Password({
    New_Password:req.body.New_Password,
    Confirm_Password:req.body.Confirm_Password,

  })
  t.save(function(err,suc){
    if(err)
    res.status(500).json(err)
    else {

    res.status(201).json({"Message":"Created", type:"internal"})
}

})
    //  res.send(suc)
})
*/

//POST route for creating password
router.post('/password', function (req, res, next) {
  // confirm that user typed same password twice
  if (req.body.New_Password !== req.body.Confirm_Password) {
    var err = new Error('Passwords do not match.');
    err.status = 400;
    res.send("passwords dont match");
    return next(err);
  }

  if (
    req.body.New_Password &&
    req.body.Confirm_Password) {

    var userData = {
      New_Password: req.body.New_Password,
      Confirm_Password: req.body.Confirm_Password,

    }

    Password.create(userData, function (error, user) {
      if (error) {
        return next(error);
      } else {
        req.session.userId = user._id;
        return res.redirect('/profile');
      }
    });
  }
})

router.post('/login', function (req, res, next) {
    // login page verification
   if (req.body.logemail && req.body.logpassword) {
    User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
      if (error || !user) {
        var err = new Error('Wrong email or password.');
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
        return res.redirect('/profile');
      }
    });
  } else {
    var err = new Error('All fields required.');
    err.status = 400;
    return next(err);
  }
})



module.exports = router;
