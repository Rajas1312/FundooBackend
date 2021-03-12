/**
 * @module       models
 * @file         user.js
 * @description  UserModel class holds the databse related methods 
 * @author       Rajas Dongre <itsmerajas2@gmail.com>
 * @since        15/2/2021  
-----------------------------------------------------------------------------------------------*/
const mongoose = require('mongoose');
const bcrypt = require("bcrypt")

const UserSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, select: false }
}, {
    timestamps: true
}, { versionKey: false });

UserSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

const User = mongoose.model('User', UserSchema);

class UserModel {

    /**
     * @description saving  greetings in the database
     * @param {*} greetings 
     * @param {*}callback 
     */

    create = (user, callback) => {
        const userSchema = new User({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password
        });
        userSchema.save(callback)
    };

    /**
         * @description serching all greetings from database
         * @param {*}callback 
         */

    findAll = (callback) => {
        User.find(callback);
    }
}
module.exports = new UserModel();