/**
 * @module       Services
 * @file         user.js
 * @description  holds the methods calling from controller
 * @author       Rajas Dongre <itsmerajas2@gmail.com>
*  @since        15/02/2021  
-----------------------------------------------------------------------------------------------*/

const { error } = require('winston');
const model = require('../models/user');
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
}
module.exports = new UserService();