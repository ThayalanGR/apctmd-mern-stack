import mongoose, {
    Schema
} from 'mongoose';
import crypto from 'crypto';
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
    var genRandomString = function (length) {
        return crypto.randomBytes(Math.ceil(length / 2))
            .toString('hex') /** convert to hexadecimal format */
            .slice(0, length); /** return required number of characters */
    };

    this.salt = genRandomString(10); //10 rounds of hashes

    var sha512 = function (password, salt) {
        var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
        hash.update(password);
        var value = hash.digest('hex');
        return {
            salt: salt,
            passwordHash: value
        };
    };
    var user = sha512(password, this.salt);
    this.hash = user.passwordHash;

    // this.hash = bcrypt.hashSync(password, this.salt);
};


userSchema.methods.validatePassword = function (password) {
    var sha512 = function (password, salt) {
        var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
        hash.update(password);
        var value = hash.digest('hex');
        return {
            salt: salt,
            passwordHash: value
        };
    };
    const validate = sha512(password, this.salt);
    if (validate.passwordHash === this.hash) {
        return true;
    } else {
        return false;
    }
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