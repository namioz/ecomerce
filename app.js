// ** Express ** //
const express = require ('express');

// ** App ** //
const app = express();

// ** Import Mongoose ** //
const mongoose = require('mongoose');

// ** Import CORS ** //
const cors = require('cors')

// ** Morgan ** // give us the route sort of roads have been requested
const morgan = require('morgan')

// ** Body-Parser + Cookie-Parser** //
const bodyPaser = require('body-parser')
const cookiePaser = require('cookie-parser')

// ** Import Express-Validator ** // 
const expressValidator = require('express-validator')

// ** Load env variables ** //
const dotenv = require('dotenv');
dotenv.config()

// ** Import Routes ** // 
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const categoryRoutes = require('./routes/category')
const productRoutes = require('./routes/product')
const braintreeRoutes = require('./routes/braintree')
const orderRoutes = require('./routes/order')

//db Connection 
mongoose.connect(
    process.env.DATABASE,
    {useNewUrlParser: true,
    useCreateIndex : true,
    useUnifiedTopology: true})
    .then(() => console.log('DB Connected'))



mongoose.connection.on('error', err => {
    console.log(`DB connection errer : ${err.message}`)
})

// ** Routes ** //
// app.get('/', (req,resp) =>{
//     resp.send("hello from Node");
// });

// ** Middlewares ** //
app.use(morgan('dev'));
app.use(bodyPaser.json()); // data from requisite body
app.use(cookiePaser());  // because we eill saving the user credentials in the cookie
app.use(expressValidator());
app.use(cors());

// ** Routes Middleware ** //
app.use('/api',authRoutes)
app.use('/api',userRoutes)
app.use("/api", categoryRoutes)
app.use("/api", productRoutes)
app.use("/api", braintreeRoutes)
app.use("/api", orderRoutes)

const port = process.env.PORT || 8000;


app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`)
})
// console.log("Nami");

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWJjMTQwYzVkMGIwYzQ3YTQ4YjdkNjIiLCJpYXQiOjE1ODk3MzM0MzF9.OASmMpow90M0yN4m6mKHTXqdsBnFbpiNNmt2jql5XCg
