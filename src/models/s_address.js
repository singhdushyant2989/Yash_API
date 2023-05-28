const mongoose = require('mongoose');

const S_AddressSchema = new mongoose.Schema({
    userID:String,
    ship_name:String,
    ship_email:String,
    ship_mobile:Number,
    ship_address:String,
    ship_country:String,
    ship_state:String,
    ship_city:String,
    ship_pin:Number
});

module.exports = mongoose.model('Shipping_Address',S_AddressSchema);