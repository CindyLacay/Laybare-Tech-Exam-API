//[SECTION] Packages and Dependencies
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const app = express();
const dotenv = require('dotenv');



//[SECTION] Database Connection
dotenv.config();
const secret = process.env.CONNECTION_STRING;
mongoose.connect(
    secret, {
        useNewUrlParser: true,
        useUnifiedTopology: true
});

mongoose.connection.once('open', () => console.log("Now connected to MongoDB Atlas"))

//[SECTION] Server Setup
app.use(cors({
    allowedHeaders: '*',
    allowMethods: '*',
    origin: '*'
    }));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/users", userRoutes);
app.use("/products", productRoutes);


//[SECTION] Gateway Response
app.listen(process.env.PORT || 4000, () => {
    console.log(`API is now online on port ${process.env.PORT || 4000}`)
});