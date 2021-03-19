const model = require("../models/notes.js");

const helper = require("../../utility/helper.js");

class NoteService {
    /**
     * @description Create and save Note then send response to controller
     * @method create is used to save the Note
     * @param callback is the callback for controller
     */
    createNotes = (noteInfo, token, callback) => {
        noteInfo = helper.decodeToken(noteInfo, token);
        return model.createNotes(noteInfo, callback);
    };

    /**
     * @description Find all the Notes and return response to controller
     * @method findAll is used to retrieve Notes
     * @param callback is the callback for controller
     */
    findNotes = (callback) => {
        model.findNotes(callback)
    };

    /**
 * @description Update Note by id and return response to controller
 * @method update is used to update Note by ID
 * @param callback is the callback for controller
 */
    updateNotes = (noteInfo, callback) => {
        return model.updateNotes(noteInfo, callback);
    };

    /**
     * @description Delete Note by id and return response to controller
     * @method deleteById is used to remove Note by ID
     * @param callback is the callback for controller
     */
    deleteNotes = (noteID, callback) => {
        return model.deleteById(noteID, callback);
    };

}
module.exports = new NoteService()