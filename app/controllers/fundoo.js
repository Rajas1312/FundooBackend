/**
 * @module       controllers
 * @file         fundoo.js
 * @description  FundooController class takes the request and sends response
 * @author       Rajas Dongre <itsmerajas2@gmail.com>
*  @since        15/02/2021  
-----------------------------------------------------------------------------------------------*/
const service = require('../services/fundoo');
const Joi = require('joi');
const logger = require('../../logger/logger.js')

const ControllerDataValidation = Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required()
})

class FundooController {
    /**
         * @description Create and save a new Note
         * @param req is used to get the request
         * @param res is used to send resposne
         */

    create = (req, res,) => {
        try {
            const fundoo = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password
            };
            const validation = ControllerDataValidation.validate(fundoo);
            if (validation.error) {
                res.status(400).send({
                    success: false,
                    message: "the notes should be a string type"
                })
            } else {
                service.create(fundoo, (err, result) => {
                    if (err) {
                        (logger.error("Some error occurred while creating notes"),
                            res.status(500).send({
                                sucess: false,
                                message: "Some error occurred while creating the Note."
                            })
                        )
                    } else {
                        logger.info("Notes added successfully !"),
                            res.status(200).send({
                                sucess: true,
                                message: "created Notes sucessfully",
                                result: result
                            });
                    }
                });
            }
        } catch (error) {
            logger.error("could not create notes ");
            return res.send({
                success: false,
                status_code: 500,
                message: "error creating notes "
            })
        }
    };

    /**
           * @description Find all the Notes
           * @method findAll is service class method
           * @param req is used to get the request
           *  @param res is used to send resposne
           */

    findAll = (req, res) => {
        try {
            service.findAll((err, result) => {
                if (err) {
                    (logger.error("Some error occurred while serching notes"),
                        res.status(404).send({
                            sucess: false,
                            message: "could not find any entries"
                        })
                    )
                } else {
                    logger.info("notes found successfully !"),
                        res.status(200).send({
                            sucess: true,
                            message: "found notes sucessfully",
                            result: result
                        })
                }
            })
        } catch (error) {
            logger.error("notes not found");
            res.send({
                success: false,
                status_code: 500,
                message: `notes not found`,
            });
        }
    };
}
module.exports = new FundooController();