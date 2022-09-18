const express = require('express');
var cors = require('cors');
const connection = require('./connection')
const userRoute = require('./routes/user');
const categoryRoute = require('./routes/category');
const productRoute = require('./routes/product');
const billRoute = require('./routes/bill');
const dashboardRoute = require('./routes/dashboard');
const packagesRoute = require('./routes/packages');
const enquiryRoute = require('./routes/enquiry')
const app = express();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/user', userRoute);
app.use('/category', categoryRoute);
app.use('/product', productRoute);
app.use('/bill', billRoute);
app.use('/dashboard', dashboardRoute);
app.use('/packages', packagesRoute);
app.use('/enquiry', enquiryRoute)
module.exports = app;