const model = require("../models/notes.js");
const redis = require("redis");
const client = redis.createClient();
var redisCache = require("../../utility/redis.js");
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
    findNotes = (token, callback) => {
        const key = "note";
        const userEmail = helper.getEmailFromToken(token);
        redisCache.redisGet(userEmail, key, (err, result) => {
            if (result) {
                //console.log(result)
                return callback(null, result);
            } else if (!result) {
                model.findNotes((error, data) => {
                    if (error) {
                        console.log("here")
                        logger.error("Some error occurred");
                        return callback(new Error("Some error occurred"), null);
                    } else if (data) {
                        console.log("here!")
                        redisCache.setRedis(data, userEmail, key);
                        return callback(null, data);
                    }
                });
            }
        });
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

    /**
         * @description Delete Note by id and return response to controller
         * @method deleteById is used to remove Note by ID
         * @param callback is the callback for controller
         */
    removeNote = (noteID, callback) => {
        return model.removeNote(noteID, callback);
    };

    /**
         * @description archive Note by id and return response to controller
         * @method archiveById is used to remove Note by ID
         * @param callback is the callback for controller
         */
    archiveNote = (noteID, callback) => {
        return model.archiveNote(noteID, callback);
    };

    /**
    * @description Create and save Note then send response to controller
    * @method create is used to save the Note
    * @param callback is the callback for controller
    */
    createLabel = (labelInfo, token, callback) => {
        labelInfo = helper.decodeToken(labelInfo, token);
        return model.createLabel(labelInfo, callback);
    };

    /**
     * @description Find all the Notes and return response to controller
     * @method findAll is used to retrieve Notes
     * @param callback is the callback for controller
     */
    findLabels = (token, callback) => {
        const key = "note";
        const userEmail = helper.getEmailFromToken(token);
        redisCache.redisGet(userEmail, key, (err, result) => {
            if (result) {
                //console.log(result)
                return callback(null, result);
            } else if (!result) {
                model.findLabels((error, data) => {
                    if (error) {
                        logger.error("Some error occurred");
                        return callback(new Error("Some error occurred"), null);
                    } else if (data) {
                        redisCache.setRedis(data, userEmail, key);
                        return callback(null, data);
                    }
                });
            }
        });
    };

    /**
* @description Update Note by id and return response to controller
* @method update is used to update Note by ID
* @param callback is the callback for controller
*/
    updateLabels = (noteInfo, callback) => {
        return model.updateLabels(noteInfo, callback);
    };

    /**
     * @description Delete Note by id and return response to controller
     * @method deleteById is used to remove Note by ID
     * @param callback is the callback for controller
     */
    deleteLabels = (labelID, callback) => {
        return model.deleteLabels(labelID, callback);
    };

}
module.exports = new NoteService()