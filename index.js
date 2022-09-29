const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// import ProductsRouter from './routes/ProductRoute';
const router = require('./routes')
dotenv.config();

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);

module.exports = app;