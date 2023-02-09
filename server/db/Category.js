const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    category_name: String,
    adminId : String
});

module.exports = mongoose.model("category", categorySchema);