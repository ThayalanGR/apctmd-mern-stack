import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import session from 'express-session';

export default (app) => {
    app.use(morgan('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(cors());
    app.use(session({
        secret: 'apctmd',
        cookie: {
            maxAge: 60000
        },
        resave: false,
        saveUninitialized: false
    }));
};