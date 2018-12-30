//action creatords => create actions -> dispactched -> middlewares -> reducers
import axios from "axios";
import {
    AUTH_SIGN_UP,
    AUTH_ERROR
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

        } catch (error) {
            console.error('err:', error);
            dispatch({
                type: AUTH_ERROR,
                payload: "Account already exist"
            });

        }
    }
};