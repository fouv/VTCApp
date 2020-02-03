var express = require('express');
var router = express.Router();
var uid2 = require("uid2");
var SHA256 = require("crypto-js/sha256");
var encBase64 = require("crypto-js/enc-base64");

var UserSchema = require('../models/user');

router.post('/signup', async function(req, res) {
  var userExist = await UserSchema.findOne({email: req.body.email});

  console.log(userExist);
  if(userExist) {
    console.log('User Exist');
    res.json({response: false});
  } else {
    var salt = uid2(32);
    var newUser = await new UserSchema({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email, 
      salt: salt,
      tel: req.body.tel, 
      password: SHA256(req.body.password + salt).toString(encBase64) , 
      token: uid2(32),
      role: 'User',
      homeaddress: req.body.homeaddress,
      officeaddress: req.body.officeaddress
    });

    await newUser.save(function(err, user) {
      console.log(err);
      console.log(user)
      res.json({user});
    });
  }
});

router.get('/signin', async function(req, res, next) {
  var userExist = await UserSchema.findOne({email: req.query.email}, function(err, user) {
    console.log(user);
    if(user) {
      var hash = SHA256(req.query.password + user.salt).toString(encBase64);

      if(hash === user.password) {
        console.log(user);
        res.json({response: true, user});
      } else {
        console.log('Not a valid password')
        res.json({response: false});
      }
    }
  });

  if(!userExist) {
    console.log('User not valid')
    res.json({response: false});
  }
})

module.exports = router;
