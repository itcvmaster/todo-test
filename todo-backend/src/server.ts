import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';
import apiRouter from './api/routes';
import configMongoDB from './config/database';

dotenv.config();
configMongoDB();
const port = process.env.PORT || 8000;

const app = express();

// parse JSON and url-encoded query
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

// print the request log on console
app.use(morgan('dev'));

// index page, just for testing
app.get('/', (_, res) => {
    res.send('Api is running')
})

// configure api router
app.use('/', apiRouter);

// open the server
app.listen(port, () => {
    console.log(`Express is running on port ${port}`);
})
