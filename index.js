const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");

const app = express();

mongoose.connect(
    "mongodb+srv://admin:1CDDrtrncQD7MEcZ@wdc028-course-booking.rd7vc.mongodb.net/csp3-ecommerce?retryWrites=true&w=majority",{
        useNewUrlParser: true,
        useUnifiedTopology: true
});

mongoose.connection.once('open', () => console.log("Now connected to MongoDB Atlas"))

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/users/", userRoutes);
app.use("/books/", productRoutes);

app.listen(process.env.PORT || 4000, () => {
    console.log(`API is now online on port ${process.env.PORT || 4000}`)
});