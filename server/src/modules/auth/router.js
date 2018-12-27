import {
    Router
} from 'express';
import * as authcontroller from './controller';
import authorizer from '../../config/authorize';

const routes = new Router();

routes.post('/signup', authorizer.optional, authcontroller.signupcontroller);
routes.post('/signin', authorizer.optional, authcontroller.signincontroller);

export default routes;