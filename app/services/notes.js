const model = require("../models/notes.js");

const helper = require("../../utility/helper.js");

class NoteService {
    /**
     * @description Create and save Note then send response to controller
     * @method create is used to save the Note
     * @param callback is the callback for controller
     */
    createNotes = (noteInfo, callback) => {
        return model.createNotes(noteInfo, callback);
    };

    /**
     * @description Find all the Notes and return response to controller
     * @method findAll is used to retrieve Notes
     * @param callback is the callback for controller
     */
    findAll = (callback) => {
        model.findAll(callback)
    };

}
module.exports = new NoteService()