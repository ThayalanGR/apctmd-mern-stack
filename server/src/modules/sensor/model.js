import mongoose, {
    Schema
} from 'mongoose';


const sensorSchema = Schema({
    gas1: {
        type: String,
    },
    gas2: {
        type: String,
    },
    gas3: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});


export default mongoose.model('sensors', sensorSchema);