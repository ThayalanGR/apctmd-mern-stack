/* eslint-disable no-console */
import jwt from 'express-jwt';

const getTokenFromHeaders = (req) => {
    const {
        authorization
    } = req.headers;
    if (authorization && authorization.split(' ')[0] === 'Token') {
        console.log(authorization.split(' ')[1]);
        return authorization.split(' ')[1];
    }
    return null;
};

export default {
    required: jwt({
        secret: 'apctmd',
        userProperty: 'payload',
        getToken: getTokenFromHeaders,
    }),
    optional: jwt({
        secret: 'apctmd',
        userProperty: 'payload',
        getToken: getTokenFromHeaders,
        credentialsRequired: false,
    })
};