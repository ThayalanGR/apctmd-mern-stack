import userModel from './model';
import passport from 'passport';
import passportInit from './passport';
import Joi from 'joi';

//initialize passport
passportInit();

const signUpSchema = {
    name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email({
        minDomainAtoms: 2
    }).required(),
    mobile: Joi.number().integer().required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
};

export const signupcontroller = (req, res) => {
    Joi.validate(req.body.user, signUpSchema, (err, data) => {
        if (err) {
            return res.status(422).send({
                success: false,
                error: err.details[0].message
            });
        } else {
            userModel.findOne({
                email: data.email
            }, (err, alreadyExist) => {
                if (err) {
                    return res.status(500).send({
                        error: err
                    });
                }
                if (alreadyExist == null) {
                    //creating instance of userModel
                    const user = new userModel(data);

                    //creating salt and hash
                    user.setpassword(data.password);

                    user.save()
                        .then(() => {
                            return res.status(201).send({
                                user: user.toAuthJSON()
                            });
                        });
                } else {
                    return res.status(409).send({
                        error: 'Account already exist!'
                    });
                }
            });
        }
    });

};

const signInSchema = {
    email: Joi.string().email({
        minDomainAtoms: 2
    }).required(),
    password: Joi.string().required()
};

export const signincontroller = (req, res) => {
    // eslint-disable-next-line no-unused-vars
    Joi.validate(req.body.user, signInSchema, (err, user) => {

        if (err) {
            return res.status(422).send({
                success: false,
                error: err.details[0].message
            });
        } else {
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
        }
    });

};


export const current = (req, res) => {
    res.send({
        success: 'secret'
    });
};