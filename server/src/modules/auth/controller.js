/* eslint-disable no-console */
import userModel from './model';

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