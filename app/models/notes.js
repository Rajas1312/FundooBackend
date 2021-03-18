const mongoose = require("mongoose");

const NoteSchema = mongoose.Schema({
    title: { type: String, required: true, trim: true, },
    description: { type: String, required: true, trim: true, },
    isArchive: { type: Boolean, default: false },
    isDelete: { type: Boolean, default: false },
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
        });
        note.save(callback);
    };

    /**
     * @description find all notes from db
     * @param {*} callback
     */
    findAll = (callback) => {
        Note.find(callback);
    };
}
module.exports = new NoteModel()