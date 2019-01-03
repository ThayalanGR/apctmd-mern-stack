//action creatords => create actions -> dispactched -> middlewares -> reducers
import axios from "axios";
import {
    AUTH_SIGN_UP,
    AUTH_SIGN_IN,
    AUTH_ERROR,
    AUTH_SIGN_OUT,
    DASHBOARD_SECRET,
    GAS_SENSOR
} from './types';

export const signUp = data => {
    return async dispatch => {
        try {
            const res = await axios.post('http://192.168.15.210:4000/api/signup', data);
            axios.defaults.headers.common["Authorization"] = `Token ${res.data.user.token}`;
            dispatch({
                type: AUTH_SIGN_UP,
                payload: res.data.user.token
            });

            localStorage.setItem('JWT_TOKEN', res.data.user.token);

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
            const res = await axios.post('http://192.168.15.210:4000/api/signin', data);
            axios.defaults.headers.common["Authorization"] = `Token ${res.data.user.token}`;
            dispatch({
                type: AUTH_SIGN_IN,
                payload: res.data.user.token
            });

            localStorage.setItem('JWT_TOKEN', res.data.user.token);

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
            const res = await axios.get('http://192.168.15.210:4000/api/current');
            dispatch({
                type: DASHBOARD_SECRET,
                payload: res.data.success
            });
        } catch (error) {
            dispatch({
                type: AUTH_ERROR,
                payload: "authorizaton error"
            });

        }
    }
}
export const getSensorData = () => {
    return async dispatch => {
        try {
            const res = await axios.get('http://192.168.15.210:4000/api/gasout');
            dispatch({
                type: GAS_SENSOR,
                payload: res.data.data
            });
        } catch (error) {
            dispatch({
                type: AUTH_ERROR,
                payload: "authorizaton error"
            });

        }
    }
}