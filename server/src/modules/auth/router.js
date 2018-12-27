import {
    Router
} from 'express';
import * as authcontroller from './controller';

const routes = new Router();

routes.post('/signup', authcontroller.signupcontroller);

export default routes;