/* eslint-disable no-console */
import userModel from './model';
import passport from 'passport';
import passportInit from './passport';

//initialize passport
passportInit();

export const signupcontroller = (req, res) => {
    const {
        name,
        email,
        mobile,
        password
    } = req.body.user;

    //422 status code for unprocessable entity

    if (!name) {
        return res.status(422).send({
            response: {
                success: false,
                message: 'name is required'
            }
        });
    }
    if (!email) {
        return res.status(422).send({
            response: {
                success: false,
                message: 'email is required'
            }
        });
    }
    if (!mobile) {
        return res.status(422).send({
            response: {
                success: false,
                message: 'mobile number is required'
            }
        });
    }
    if (!password) {
        return res.status(422).send({
            response: {
                success: false,
                message: 'password is required'
            }
        });
    }

    //creating instance of userModel
    const user = new userModel(req.body.user);

    //creating salt and hash
    user.setpassword(password);

    user.save()
        .then(() => {
            return res.status(201).send({
                user: user.toAuthJSON()
            });
        });
};

export const signincontroller = (req, res) => {
    const {
        email,
        password
    } = req.body.user;

    //422 status code for unprocessable entity

    if (!email) {
        return res.status(422).send({
            response: {
                success: false,
                message: 'email is required'
            }
        });
    }
    if (!password) {
        return res.status(422).send({
            response: {
                success: false,
                message: 'password is required'
            }
        });
    }

    return passport.authenticate('local', {
        session: false
    }, (err, passportuser, info) => {
        //internal server error
        if (err) {
            return res.status(400).send({
                response: {
                    success: false,
                    message: err
                }
            });
        }
        //auth success provide user jwt token 
        if (passportuser) {
            const user = passportuser;
            user.token = passportuser.generateToken();

            return res.status(200).send({
                user: user.toAuthJSON()
            });
        }

        //other than internal error reflected in info variable callback
        return res.status(400).send({
            response: {
                success: false,
                message: info
            }
        });


    })(req, res);
};