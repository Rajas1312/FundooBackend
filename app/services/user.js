/**
 * @module       Services
 * @file         user.js
 * @description  holds the methods calling from controller
 * @author       Rajas Dongre <itsmerajas2@gmail.com>
*  @since        15/02/2021  
-----------------------------------------------------------------------------------------------*/

const model = require('../models/user');
class UserService {

    /**
     * @description Create and save notes then send response to controller
     * @method create is used to save the notes
     * @param callback is the callback for controller
     */
    create = (user, callback) => {
        model.create(user, callback)
    }

    /**
     * @description Find all the notes and return response to controller
     * @method findAll is used to retrieve notes
     * @param callback is the callback for controller
     */
    findAll = (callback) => {
        model.findAll(callback);
    }
}
module.exports = new UserService();