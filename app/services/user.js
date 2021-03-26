/**
 * @module       Services
 * @file         user.js
 * @description  holds the methods calling from controller
 * @author       Rajas Dongre <itsmerajas2@gmail.com>
*  @since        15/02/2021  
-----------------------------------------------------------------------------------------------*/

const { error } = require('winston');
const model = require('../models/user');
const EventEmitter = require("events");
const helper = require('../../utility/helper')
const consume = require("../../utility/subscriber.js");
const publish = require("../../utility/publisher.js");
const auth = require('../../auth/nodemailer')
const emmiter = new EventEmitter();

emmiter.on("publish", (userInfo, callback) => {
    publish.getMessage(userInfo, callback);
});

emmiter.on("consume", (token, mailData, callback) => {
    consume.consumeMessage(token, mailData, callback);
});
class UserService {

    /**
     * @description Create and save notes then send response to controller
     * @method create is used to save the notes
     * @param callback is the callback for controller
     */
    createUser = (user, callback) => {
        model.createUser(user, callback)
    }

    loginUser = (userLogin, callback) => {
        model.findUser(userLogin, callback)
    }

    forgotPassword = (userLogin, callback) => {
        model.findUser(userLogin, (error, data) => {
            if (error) {
                logger.error("Some error occurred");
                return callback(new Error("Some error occurred"), null);
            } else if (!data) {
                logger.error("User with this email Id dosent exist");
                return callback(
                    new Error("User with this email Id dosent exist"),
                    null
                );
            } else {
                const token = helper.createToken(data);
                userLogin.token = token;
                emmiter.emit("publish", userLogin, callback);
                const mailData = {
                    subject: "Reset Password",
                    endPoint: "resetpassword",
                };
                emmiter.emit("consume", token, mailData, (error, message) => {
                    if (error)
                        callback(
                            new Error("Some error occurred while consuming message"),
                            null
                        );
                    data.token = helper.createToken(data)
                    auth.sendEmail(data)
                    return callback(null, data);
                });
            }
        });
    }

    resetPassword = (userInfo, callback) => {
        model.update(userInfo, callback)

    };
}
module.exports = new UserService();