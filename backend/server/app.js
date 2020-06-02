import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import "regenerator-runtime/runtime.js";
require('dotenv').config();
const cors = require('cors');

const indexRouter = require('./routes/index');
const bookRouter = require('./routes/books');

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/', indexRouter);
app.use('/books', bookRouter);


export default app;

