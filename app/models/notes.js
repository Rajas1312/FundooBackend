const mongoose = require("mongoose");
const User = require("../models/user.js");

const NoteSchema = mongoose.Schema({
    title: { type: String, required: true, },
    description: { type: String, required: true, },
    isArchived: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }, labelId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Label",
    },]

}, {
    timestamps: true,
});

NoteSchema.set("versionKey", false);
const Note = mongoose.model("Notes", NoteSchema);

class NoteModel {
    /**
     * @description crete new note
     * @param {*} noteInfo holds data from user
     * @param {*} callback
     */
    createNotes = (noteInfo, callback) => {
        const note = new Note({
            title: noteInfo.title,
            description: noteInfo.description,
            userId: noteInfo.userId
        });
        note.save(callback);
    };

    /**
     * @description find all notes from db
     * @param {*} callback
     */
    findNotes = (callback) => {
        Note.find(callback);
    };

    /**
    * @description update a note by Id
    * @param {*} noteInfo
    * @param {*} callback
    */
    updateNotes = (noteInfo, callback) => {
        Note.findByIdAndUpdate(
            noteInfo.noteID, {
            title: noteInfo.title,
            description: noteInfo.description,
        }, { new: true },
            callback
        );
    };

    /**
     * @description delete the id from databse and returns the result to service
     * @param {*} noteID coming from service class
     * @param {*} callback callback for service class
     */
    deleteById = (noteID, callback) => {
        Note.findByIdAndRemove(noteID, callback);
    };

    /**
    * @description remove note temporary by setting isdeleted flag true
    * @param {*} noteID
    * @param {*} callback
    */
    removeNote = (noteID, callback) => {
        Note.findByIdAndUpdate(
            noteID, { isDeleted: true }, { new: true },
            callback
        );
    };

    /**
   * @description archive note  by setting isdeleted flag true
   * @param {*} noteID
   * @param {*} callback
   */
    archiveNote = (noteID, callback) => {
        Note.findByIdAndUpdate(
            noteID, { isArchived: true }, { new: true },
            callback
        );
    };



}
module.exports = new NoteModel()