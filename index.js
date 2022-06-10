require('dotenv').config();
require("express-async-errors");

const express = require("express");
const app = express();
const connect = require("./db/connect");
const productsRouter = require("./routes/products");

const errorHandlerMidd = require("./middleware/errorHandlerMidd")
const notFound = require("./middleware/notFound");

//middleware
app.use(express.json());

//routes
app.get("/", (req, res) => {
    res.send("welcome")
})

app.use("/api/v1/products", productsRouter);


//products

app.use(errorHandlerMidd);
app.use(notFound);

//server setup

const port = process.env.PORT || 5000;

const start = async () => {
    try {
        //connect DB
        await connect(process.env.MONGO_URI);
        app.listen(port, console.log("server is running on port 5000..."));
    } catch (err) {
        console.log(err);
    }
}

start();