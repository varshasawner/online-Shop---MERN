const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    catagory_name: String,
    adminId : String
});

module.exports = mongoose.model("category", categorySchema);