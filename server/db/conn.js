const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// dotenv.config();
// dotenv.config({path: "./config.env"})
require('dotenv').config({ path: "./config.env" });


const DB = process.env.DATABASE;
mongoose.set("strictQuery", false);
mongoose.connect("mongodb+srv://varsha:tdf3iL6XDFr8hfY0@cluster0.w9f7sj1.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected");
}).catch((err) => { console.log(err + " error in connection") });