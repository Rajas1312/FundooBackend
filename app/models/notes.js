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
    }

}, {
    timestamps: true,
});

NoteSchema.set("versionKey", false);
const Note = mongoose.model("Notes", NoteSchema);

const LabelSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
}, {
    timestamps: true,
});
LabelSchema.set("versionKey", false);
const Label = mongoose.model("Label", LabelSchema);

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

    /**
     * @description crete new note
     * @param {*} noteInfo holds data from user
     * @param {*} callback
     */
    createLabel = (labelInfo, callback) => {
        const label = new Label({
            name: labelInfo.name,
            userId: labelInfo.userId

        });
        label.save(callback);
    };

    /**
    * @description find all notes from db
    * @param {*} callback
    */
    findLabels = (callback) => {
        Label.find(callback);
    };


    /**
    * @description update a note by Id
    * @param {*} noteInfo
    * @param {*} callback
    */
    updateLabels = (labelInfo, callback) => {
        Label.findByIdAndUpdate(
            labelInfo.labelID, {
            name: labelInfo.name
        }, { new: true },
            callback
        );
    };

    /**
    * @description delete the id from databse and returns the result to service
    * @param {*} noteID coming from service class
    * @param {*} callback callback for service class
    */
    deleteLabels = (labelID, callback) => {
        Label.findByIdAndRemove(labelID, callback);
    };

}
module.exports = new NoteModel()