const Note = require("../models/notes.js");

const helper = require("../../utility/helper.js");

class NoteService {
    /**
     * @description Create and save Note then send response to controller
     * @method create is used to save the Note
     * @param callback is the callback for controller
     */
    createNotes = (noteInfo, callback) => {
        return Note.createNotes(noteInfo, callback);
    };


}
module.exports = new NoteService()