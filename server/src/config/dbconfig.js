/* eslint-disable no-console */
import mongoose from 'mongoose';

const Uri = 'mongodb://thayalangr:1018thayalan@ds247944.mlab.com:47944/apctmd';
// const Uri = 'mongodb://localhost/apctmd';
export default () => {
    // mongoose.Promise = global.Promise;
    mongoose.connect(Uri);
    mongoose.connection.on('connected', () => console.log('mongodb connected'));
    mongoose.connection.on('error', (err) => console.log(err));
};