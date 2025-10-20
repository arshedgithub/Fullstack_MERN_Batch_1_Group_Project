const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// const productRoute = require('./routes/productRoutes');

const app = express();

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
    .then(() => console.log("MongoDB connected Successful!"))
    .catch(err => console.log("MongoDB connection failed: ", err));

app.use(express.json());

app.get('/', function (req, res) {
    res.send("Welcome !");
});

// app.use('/api/products', productRoute);

const port = 4000;
app.listen(port, function () {
    console.log(`Server is running on port ${port}...`);
});
