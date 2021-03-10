/**
 * @module       Services
 * @file         Fundoo.js
 * @description  holds the methods calling from controller
 * @author       Rajas Dongre <itsmerajas2@gmail.com>
*  @since        15/02/2021  
-----------------------------------------------------------------------------------------------*/

const model = require('../models/fundoo');
class FundooService {

    /**
     * @description Create and save notes then send response to controller
     * @method create is used to save the notes
     * @param callback is the callback for controller
     */
    create = (fundoo, callback) => {
        model.create(fundoo, callback)
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
module.exports = new FundooService();