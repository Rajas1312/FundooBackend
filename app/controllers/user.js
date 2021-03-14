/**
 * @module       controllers
 * @file         user.js
 * @description  FundooController class takes the request and sends response
 * @author       Rajas Dongre <itsmerajas2@gmail.com>
*  @since        15/02/2021  
-----------------------------------------------------------------------------------------------*/
const service = require('../services/user');
const Joi = require('joi');
const logger = require('../../logger/logger.js')
const statics = require('../../utility/static.json')
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const JWT_SECRET = "kasaks"


const ControllerUserValidation = Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required()
})
const ControllerLoginValidation = Joi.object().keys({
    emailId: Joi.string().required(),
    password: Joi.string().required()
})

class UserController {

    /**
         * @description Create and save a new Note
         * @param req is used to get the request
         * @param res is used to send resposne
         */
    createUser = (req, res,) => {
        try {
            const user = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password
            };
            const validation = ControllerUserValidation.validate(user);
            if (validation.error) {
                res.status(400).send(statics.Bad_Request)
            } else {
                service.createUser(user, (err, result) => {
                    if (err) {
                        (logger.error("Some error occurred while creating notes"),
                            res.status(500).send(statics.Internal_Server_Error)
                        )
                    } else {
                        //console.log(result)
                        logger.info("Notes added successfully !"),
                            res.status(200).send(statics.Success);
                    }
                });
            }
        } catch (error) {
            logger.error("could not create notes ");
            return res.send(statics.Internal_Server_Error)
        }
    };

    loginUser = (req, res) => {

        const userLogin = {
            emailId: req.body.email,
            password: req.body.password
        };
        const validation = ControllerLoginValidation.validate(userLogin);
        if (validation.error) {
            res.status(400).send(statics.Bad_Request)
        } else {
            service.loginUser(userLogin, (err, result) => {
                if (err) {
                    (logger.error("Some error occurred while logging in"),
                        res.status(500).send(statics.Internal_Server_Error)
                    )
                } else {
                    bcrypt.compare(userLogin.password, result.password, (error, data) => {
                        if (data) {
                            const id = result._id
                            console.log(id)
                            const token = jwt.sign({ email: result.email, id: result._id }, JWT_SECRET)
                            console.log(token)
                        } else {
                            console.log("Invalid email/password")
                            return error
                        }
                    })
                    logger.info("logged in  successfully !"),
                        res.status(200).send(statics.SuccessLogin);
                }
            });
        }
    }
}
module.exports = new UserController();