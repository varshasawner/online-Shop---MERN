const express = require("express");
// const cors = require("cors");
require("./db/conn");
const Admin = require('./db/Admin');
const Product = require("./db/Product")
const Jwt = require('jsonwebtoken');
const Category = require("./db/Category");
const jwtKey = 'e-com';
const app = express();

app.use(express.json());
// app.use(cors());

app.post("/register", (req, res) => {
    console.log(req.body);
    let admin = new Admin(req.body);
    admin.save().then(()=>{
        res.send({message : "Admin Saved"});
    });
})

app.post("/login", async (req, res) => {
    if (req.body.password && req.body.email) {
        let admin = await Admin.findOne(req.body).select("-password");
        if (admin) {
            Jwt.sign({admin}, jwtKey, {expiresIn:"2h"},(err,token)=>{
                if(err){
                    res.send("Something went wrong")  
                }
                res.send({admin,auth:token})
            })
        } else {
            res.send({ result: "No User found" })
        }
    } else {
        res.send({ result: "No User found" })
    }
});

app.post("/add-product", async (req, res) => {
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result);
});

app.post("/add-category", async (req, res) => {
    let category = new Category(req.body);
    // console.log(category);
    let result = await category.save();
    res.send(result);
});

app.get("/products", async (req, res) => {
    const products = await Product.find();
    if (products.length > 0) {
        res.send(products)
    } else {
        res.send({ result: "No Product found" })
    }
});


app.get("/category", async (req, res) => {
    const category = await Category.find();
    if (category.length > 0) {
        res.send(category)
    } else {
        res.send({ result: "No Product found" })
    }
});

app.delete("/product/:id", async (req, res) => {
    let result = await Product.deleteOne({ _id: req.params.id });
    res.send(result)
}),

app.delete("/category/:id", async (req, res) => {
    let result = await Category.deleteOne({ _id: req.params.id });
    res.send(result)
}),

    app.get("/product/:id", async (req, res) => {
        let result = await Product.findOne({ _id: req.params.id })
        if (result) {
            res.send(result)
        } else {
            res.send({ "result": "No Record Found." })
        }
    })

app.put("/product/:id", async (req, res) => {
    let result = await Product.updateOne(
        { _id: req.params.id },
        { $set: req.body }
    )
    res.send(result)
});

app.put("/product/:id", async (req, res) => {
    let result = await Product.updateOne(
        { _id: req.params.id },
        { $set: req.body }
    )
    res.send(result)
});

app.post("/add-catagory", async (req, res) => {
    let catagory = new Catagory(req.body);
    let result = await catagory.save();
    res.send(result);
});

app.get("/search/:key", async (req, res) => {
    let result = await Product.find({
        "$or": [
            {
                name: { $regex: req.params.key }  
            },
            {
                company: { $regex: req.params.key }
            },
            {
                category: { $regex: req.params.key }
            }
        ]
    });
    res.send(result);
})


app.get("/searchCategory/:key", async (req, res) => {
    // console.log(req.params.key)
    let result = await Category.find({category_name: { $regex: req.params.key }  });
    console.log(result);
    res.send(result);
})

app.listen(5000);