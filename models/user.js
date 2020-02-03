const mongoose = require('mongoose');


const UserSchema = mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  salt: String,
  tel: Number, 
  password: String, 
  token: String,
  role: String, 
  homeaddress: String, 
  officeaddress: String, 
  trips:[{type:mongoose.Schema.Types.ObjectId, ref:'trips'}]
  
});

const userModel = mongoose.model('users', UserSchema);

module.exports = userModel;