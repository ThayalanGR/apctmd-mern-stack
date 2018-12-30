import {
    DASHBOARD_SECRET
} from '../actions/types';


const DEFAULT_STATE = {
    secret: ''
};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case DASHBOARD_SECRET:
            return {
                ...state,
                secret: action.payload
            };
        default:
            return state;
    }
};