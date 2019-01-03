import {
    GAS_SENSOR
} from '../actions/types';


const DEFAULT_STATE = {
    sensorData: ''
};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case GAS_SENSOR:
            return {
                ...state,
                sensorData: action.payload
            };
        default:
            return state;
    }
};