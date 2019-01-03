import {
    Router
} from 'express';
import * as gascontroller from './controller';
import authorizer from '../../config/authorize';

const routes = new Router();

routes.post('/gasin', authorizer.optional, gascontroller.gasinputcontroller);
routes.get('/gasout', authorizer.optional, gascontroller.gasoutcontroller);


export default routes;