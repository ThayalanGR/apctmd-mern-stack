import mongoose, {
    Schema
} from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    hash: {
        type: String,
        required: true
    }
});

userSchema.methods.setpassword = function (password) {
    this.salt = bcrypt.genSaltSync(10); //10 rounds of hashes
    this.hash = bcrypt.hashSync(password, this.salt);
};

userSchema.methods.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hash);
};

userSchema.methods.generateToken = function () {
    const today = new Date();
    const expiration = new Date(today);
    expiration.setDate(today.getDate() + 10); //token will be expired after 10 days

    return jwt.sign({
        email: this.email,
        id: this._id,
        exp: parseInt(expiration.getTime() / 1000, 10) //here gettime is time is the string and 10 is the radix
    }, 'apctmd'); //here apctmd is the secret for jwt
};

userSchema.methods.toAuthJSON = function () {
    return {
        _id: this._id,
        email: this.email,
        token: this.generateToken()
    };
};


export default mongoose.model('users', userSchema);