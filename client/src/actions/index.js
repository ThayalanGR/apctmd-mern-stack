//action creatords => create actions -> dispactched -> middlewares -> reducers
import axios from "axios";
import {
    AUTH_SIGN_UP,
    AUTH_SIGN_IN,
    AUTH_ERROR,
    AUTH_SIGN_OUT,
    DASHBOARD_SECRET
} from './types';

export const signUp = data => {
    return async dispatch => {
        try {
            const res = await axios.post('http://localhost:4000/api/signup', data);
            dispatch({
                type: AUTH_SIGN_UP,
                payload: res.data.user.token
            });

            localStorage.setItem('JWT_TOKEN', res.data.user.token);
            axios.defaults.headers.common["Authorization"] = `Token ${localStorage.getItem('JWT_TOKEN')}`;

            // axios.defaults.headers.common["Authorization"] = `Token ${res.data.user.token}`;

        } catch (error) {
            dispatch({
                type: AUTH_ERROR,
                payload: "Account already exist"
            });

        }
    }
};

export const signIn = data => {
    return async dispatch => {
        try {
            const res = await axios.post('http://localhost:4000/api/signin', data);
            dispatch({
                type: AUTH_SIGN_IN,
                payload: res.data.user.token
            });

            localStorage.setItem('JWT_TOKEN', res.data.user.token);
            axios.defaults.headers.common["Authorization"] = `Token ${localStorage.getItem('JWT_TOKEN')}`;

        } catch (error) {
            dispatch({
                type: AUTH_ERROR,
                payload: "Email or Password is wrong"
            });

        }
    }
};

export const signOut = () => {
    return dispatch => {
        localStorage.removeItem('JWT_TOKEN');
        dispatch({
            type: AUTH_SIGN_OUT,
            payload: ''
        })
        axios.defaults.headers.common["Authorization"] = ``;
    }
}

export const getSecret = () => {
    return async dispatch => {
        try {
            const res = await axios.get('http://localhost:4000/api/current');
            console.log('res', res);
            dispatch({
                type: DASHBOARD_SECRET,
                payload: res.data.success
            });
        } catch (error) {
            console.error('error', error);
            dispatch({
                type: AUTH_ERROR,
                payload: "authorizaton error"
            });

        }
    }
}