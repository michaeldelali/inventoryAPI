const router = require('express').Router();
let User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const localStorage = require("localStorage");
require('dotenv').config()
const withAuth = require('../middleware');
const { token } = require('morgan');


router.route('/checkToken').all(withAuth).get((req,res)=>{
  // const value =jwt.decode( req.body.token);
  // res.json(value)
  console.log(req.user.name)
  // console.log(res.user)
  res.sendStatus(200);
  // res.json(req.user)
});

router.route('/getUser').get((req,res)=>{
  const token = 
      req.body.token ||
      req.query.token ||
      req.headers['x-access-token'] ||
      req.cookies.token;
    const user = jwt.decode(token)
  res.json(user)
  console.log(user) 
});

router.route('/test').post((req,res)=>{
  const value =jwt.decode( req.body.token);
  res.json(value)
});

router.route('/register').post((req,res)=>{
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const newUser = new User({
      name,
      email,
      password,
    });

    newUser.save()
    .then(()=> res.json('user registed'))
    .catch(err => res.status(400).json('Error:' + err));
});




router.route('/logout').delete((req,res)=> {
  token = token.filter(token => token !== req.body.token)
  res.sendStatus(204)
})

router.route('/login').post((req,res)=>{
  const displayName = req.body.name;
  const email = req.body.email;
  const password = req.body.password;


  User.findOne({email}, function(err,user){
    if (err) {
      console.error(err);
      res.status(500)
        .json({
        error: 'Internal error please try again'
      });
    } else if (!user) {
      res.status(401)
        .json({
        error: 'Incorrect email or password'
      });
    } else {
      user.isCorrectPassword(password, function(err, same) {
        if (err) {
          res.status(500)
            .json({
            error: 'Internal error please try again'
          });
        } else if (!same) {
          res.status(401)
            .json({
            error: 'Incorrect email or password'
          });
        } else {  
          // console.log(user.name)
          const currentUser = {
            displayName:user.name,
            email:user.email
          }
           // Issue token
           const token = jwt.sign(currentUser,process.env.ACCESS_TOKEN_SECRET, {
             expiresIn: '1h'
           });
             res.cookie('token', token).sendStatus(200);
          //  localStorage.setItem('token',token);
        }
      });
    }
  });
});

module.exports = router;



