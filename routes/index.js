var express = require('express');
var router = express.Router();

var UserModel = require('../models/user');
var TripModel = require('../models/trip');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/addTrip', async function(req, res) {
  var addTrip = await new TripModel({
    departure: req.body.departure,
    arrival: req.body.arrival,
    hourdeparture: req.body.hourdeparture,
    price: req.body.price,
    distance: req.body.distance,
    hourDeparture: req.body.hourDeparture,
    time: req.body.time
  })

  await addTrip.save(function(err, trip) {
    console.log(err);
    console.log(trip);
    res.json({trip});
  });
})

router.get('/confirmTravel', async function(req, res) {
    var findUser = await UserModel.findById({_id: req.query.id}, function(err, user) {
      console.log(user);
      user.trips.push(req.query.idTrip);

      user.save();
      res.json({user});
    })
})

router.get('/addHomeAddress', async function(req, res) {
    var findUser = await UserModel.updateOne({_id: req.query.userid}, {homeaddress: req.query.homeaddress}, function(err, raw) {
      console.log('raw ->',raw);
      console.log('err',err)
      if(!err) {
        res.json({response: true })
      }
    })
})

router.get('/addOfficeAddress', async function(req, res) {
  var findUser = await UserModel.updateOne({_id: req.query.userid}, {officeaddress: req.query.officeaddress}, function(err, raw) {
    console.log('raw ->',raw);
    console.log('err',err)
    if(!err) {
      res.json({response: true})
    }
  })
})


router.get('/userTrip', async function(req, res) {
  var getUser = await UserModel.findOne({_id: req.query.id}).populate('trips').exec(function(err, userTrip) {
    console.log(userTrip);
    res.json({userTrip});
  })
})

module.exports = router;
