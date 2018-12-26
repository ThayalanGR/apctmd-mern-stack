/* eslint-disable no-console */
import mongoose from 'mongoose';

export default () => {
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/apctmd', {
        useNewUrlParser: true
    });
    mongoose.connection
        .once('open', () => console.log('mongodb connected'))
        .on('err', (err) => console.log(err));
};