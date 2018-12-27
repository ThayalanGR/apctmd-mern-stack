import passport from 'passport';
import LocalStrategy from 'passport-local';
import userModel from './model';

export default () => {
    passport.use(new LocalStrategy({
        usernameField: 'user[email]',
        passwordField: 'user[password]'
    }, (email, password, done) => {
        userModel.findOne({
                email
            })
            .then((user) => {
                if (!user || !user.validatePassword(password)) {
                    return done(null, false, 'email or password is invalid');
                }
                return done(null, user);
            }).catch(done);
    }));
};