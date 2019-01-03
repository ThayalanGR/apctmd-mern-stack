import sensorModel from './model';
import Joi from 'joi';

const sensorSchema = {
    gas1: Joi.number(),
    gas2: Joi.number(),
    gas3: Joi.number()
};

export const gasinputcontroller = (req, res) => {
    Joi.validate(req.body.sensor, sensorSchema, (err, data) => {
        if (err) {
            return res.status(422).send({
                success: false,
                error: err.details[0].message
            });
        } else {
            const user = new sensorModel(data);
            user.save()
                .then(() => {
                    return res.status(201).send({
                        success: true
                    });
                });
        }
    });
};

export const gasoutcontroller = (req, res) => {
    sensorModel.findOne().sort({
        field: 'asc',
        _id: -1
    }).limit(1).exec((err, data) => {
        if (err) return res.status(422).send({
            success: false,
            message: 'internal server error'
        });
        else return res.status(200).send({
            data
        });
    });
};