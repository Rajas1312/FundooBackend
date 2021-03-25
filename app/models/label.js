const mongoose = require("mongoose");

const LabelSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
}, {
    timestamps: true,
});
LabelSchema.set("versionKey", false);
const Label = mongoose.model("Label", LabelSchema);

class LabelModel {
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

module.exports = new LabelModel()