import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';

export default (app) => {
    app.use(morgan('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(cors());
};