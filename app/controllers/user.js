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
const helper = require('../../utility/helper')
const nodemailer = require('nodemailer');

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
            service.loginUser(userLogin, (error, result) => {
                if (!result) {
                    logger.error("Some error occurred while logging in"),
                        res.status(500).send(statics.InvalidCredentials)

                } else {
                    bcrypt.compare(userLogin.password, result.password, (err, data) => {
                        if (data) {
                            result.token = helper.createToken(result)
                            logger.info("logged in  successfully !"),
                                res.status(200).send({ token: result.token, satus: statics.SuccessLogin });
                        }
                        if (!data) {
                            res.status(500).send(statics.InvalidCredentials)
                        }
                    })
                }

            });
        }
    }

    forgotPassword = (req, res) => {
        const userLogin = {
            emailId: req.body.email
        }
        service.forgotPassword(userLogin, (error, result) => {
            if (!result) {
                logger.error("Some error occurred while logging in"),
                    res.status(500).send(statics.InvalidCredentials)

            } else {

                result.token = helper.createToken(result)
                console.log(result.token)
                res.send({ message: "ok" })

                let transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'itsmerajas2@gmail.com',
                        pass: 'Rajas123'
                    },
                    tls: {
                        rejectUnauthorized: false
                    }
                });

                var mailOptions = {
                    from: 'itsmerajas2@gmail.com',
                    to: 'itsmerajas2@gmail.com',
                    subject: 'Sending Email using Node.js',
                    text: ` JWT-:${result.token} ${'http://localhost:3000'}`

                };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
            }
        })
    }
}
module.exports = new UserController();