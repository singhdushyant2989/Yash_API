const mongoose = require('mongoose');

const B_AddressSchema = new mongoose.Schema({
    userID:String,
    bill_name:String,
    bill_email:String,
    bill_mobile:Number,
    bill_address:String,
    bill_country:String,
    bill_state:String,
    bill_city:String,
    bill_pin:Number
});

module.exports = mongoose.model('Billing_Address',B_AddressSchema);