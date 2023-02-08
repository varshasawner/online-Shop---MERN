const mongoose = require('mongoose');

const catagorySchema = new mongoose.Schema({
    catagory_name: String,
});

module.exports = mongoose.model("catagory", catagorySchema);