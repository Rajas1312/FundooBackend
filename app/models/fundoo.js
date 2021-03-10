/**
 * @module       models
 * @file         fundoo.js
 * @description  FundooModel class holds the databse related methods 
 * @author       Rajas Dongre <itsmerajas2@gmail.com>
 * @since        15/2/2021  
-----------------------------------------------------------------------------------------------*/
const mongoose = require('mongoose');

const FundooSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, select: false }
}, {
    timestamps: true
}, { versionKey: false });

const Fundoo = mongoose.model('Greetings', FundooSchema);

class FundooModel {

    /**
     * @description saving  greetings in the database
     * @param {*} greetings 
     * @param {*}callback 
     */

    create = (fundoo, callback) => {
        const fundo = new Fundoo({
            firstName: fundoo.firstName,
            lastName: fundoo.lastName,
            email: fundoo.email,
            password: fundoo.password
        });

        fundo.save(callback)
    };

    /**
         * @description serching all greetings from database
         * @param {*}callback 
         */

    findAll = (callback) => {
        Fundoo.find(callback);
    }
}
module.exports = new FundooModel();