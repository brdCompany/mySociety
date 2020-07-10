const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const ownerSchema = mongoose.Schema({
  name: {type:String, required:true},
  coownername: {type:String},
  societyname: {type:String, required:true},
  block: {type:String, required:true},
  flatno: {type:String, required:true},
  primarymobile: {type:String, required:true},
  secondarymobile: {type:String},
  primaryemail: {type:String, required:true},
  isresident: {type:String, required:true}
});

//ownerSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Owner', ownerSchema);
