const noteService = require("../services/notes.js");
const Joi = require("joi");
const logger = require("../../logger/logger.js");
const status = require("../../utility/static.json");

const ControllerDataValidation = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
});

class NoteController {
    /**
     * @description create anew note
     * @message Create and save a new note
     * @param res is used to send the response
     */
    createNotes = (req, res) => {
        try {
            const noteInfo = {
                title: req.body.title,
                description: req.body.description,
            };
            const validation = ControllerDataValidation.validate(noteInfo);
            return validation.error ?
                res.status(400).send({
                    success: false,
                    message: "please enter valid details",
                }) :
                noteService.create(noteInfo, (error, data) => {
                    return error ?
                        (logger.error("Some error occurred while creating note"),
                            res.send({
                                success: false,
                                status_code: status.Internal_Server_Error,
                                message: "Some error occurred while creating note",
                            })) :
                        res.send({
                            success: true,
                            //status_code: status.Success,
                            message: "note added successfully !",
                            data: data,
                        });
                });
        } catch (error) {
            res.send({
                success: false,
                status_code: status.Internal_Server_Error,
                message: "Some error occurred while creating note",
            });
        }
    };
}
module.exports = new NoteController()