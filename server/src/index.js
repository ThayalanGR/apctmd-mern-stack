/* eslint-disable no-console */
import express from 'express';
import middlewares from './config/middlewares';
import dbconfig from './config/dbconfig';
import {
    authRoute,
    sensorRoute
} from './modules';

//constants
const PORT = process.env.PORT || 4000;
const app = express();

//middleware
middlewares(app);

//dbconnection
dbconfig();

//routes
app.use('/api', [authRoute, sensorRoute]);

//listen on port
app.listen(PORT, (err) => {
    if (err)
        console.log(err);
    else
        console.log(`express server started on the port - ${PORT}`);
});