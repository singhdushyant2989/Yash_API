const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    mobile_number:Number,
    password:String,
    main_address:String
});

module.exports = mongoose.model('users',userSchema);