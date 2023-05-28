const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    productID : String,
    quantity : Number,
    userID : String
});

module.exports = mongoose.model('cart', cartSchema);