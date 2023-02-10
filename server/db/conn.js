const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// dotenv.config();
// dotenv.config({path: "./config.env"})
require('dotenv').config({ path: "./config.env" });

const DB = process.env.DATABASE;
mongoose.set("strictQuery", false);
mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected");
}).catch((err) => { console.log(err + " error in connection") });