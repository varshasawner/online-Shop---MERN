const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    price: String,
    category: String,
    adminId:String,
    company:String,
    picture:String,
    description:String
});

module.exports = mongoose.model("products", productSchema);