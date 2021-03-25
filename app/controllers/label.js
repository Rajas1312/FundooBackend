const noteService = require("../services/label");
const Joi = require("joi");
const logger = require("../../logger/logger.js");
const status = require("../../utility/static.json");
const jwt = require('jsonwebtoken');

const ControllerDataValidation1 = Joi.object({
    name: Joi.string().required()
});

class LabelController {
    /**
    * @description create anew note
    * @message Create and save a new note
    * @param res is used to send the response
    */
    createLabel = (req, res) => {
        try {
            const labelInfo = {
                name: req.body.name
            };
            const token = req.headers.authorization.split(" ")[1];
            const validation1 = ControllerDataValidation1.validate(labelInfo);
            return validation1.error ?
                res.status(400).send({
                    success: false,
                    message: "please enter valid details",
                }) :
                noteService.createLabel(labelInfo, token, (error, data) => {
                    return error ?
                        (logger.error("Some error occurred while creating note"),
                            res.send({
                                success: false,
                                status_code: status.Internal_Server_Error,
                                message: "Some error occurred while creating note!!",
                            })) :
                        res.send({
                            success: true,
                            message: "note added successfully !",
                            data: data,
                        });
                });
        } catch (error) {
            res.send({
                success: false,
                status_code: status.Internal_Server_Error,
                message: "Some error occurred while creating note!!!!",
            });
        }
    };

    /**
    * @description find all notes from db
    * @message Find all the note
    * @method findAll is service class method
    */
    findLabels = (req, res) => {
        try {
            const token = req.headers.authorization.split(" ")[1];
            noteService.findLabels(token, (error, data) => {
                return error ?
                    (logger.error("Some error occurred while retrieving notes"),
                        res.send({
                            success: false,
                            status_code: status.Not_Found,
                            message: `note not found`,
                        })) :
                    (logger.info("Successfully retrieved notes !"),
                        res.send({
                            success: true,
                            message: `notes found`,
                            data: data,
                        }));
            });
        } catch (error) {
            res.send({
                success: false,
                status_code: status.Internal_Server_Error,
                message: `note not found`,
            });
        }
    };

    /**
  * @description update a note by id
  * @message update and save a note
  * @param res is used to send the response
  */
    updateLabels = (req, res) => {
        const labelInfo = {
            name: req.body.name,
            labelID: req.params.labelId
        };
        const labelData = {
            name: labelInfo.name
        };
        const validation = ControllerDataValidation1.validate(labelData);
        return validation.error ?
            res.status(400).send({
                success: false,
                message: "please enter valid details " + validation.error,
            }) :
            noteService.updateLabels(labelInfo, (error, data) => {
                return (
                    error ?
                        (logger.error("Error updating note with id : "),
                            res.send({
                                status_code: status.Internal_Server_Error,
                                message: "Error updating note with id : "
                            })) :
                        !data ?
                            (logger.error("note not found with id : "),
                                res.send({
                                    status_code: status.Not_Found,
                                    message: "note not found with id : "
                                })) :
                            logger.info("note updated successfully !"),
                    res.send({
                        message: "note updated successfully !",
                        data: data,
                    })
                );
            });
    }

    /**
   * @description Delete a note by id
   * @message Delete a note
   * @param res is used to send the response
   */
    deleteLabels(req, res) {
        const labelID = req.params.labelId;
        noteService.deleteLabels(labelID, (error, data) => {
            return (
                error ?
                    (logger.error("note not found with id " + noteID),
                        res.send({
                            status_code: status.Not_Found,
                            message: "note not found with id " + noteID,
                        })) :
                    logger.info("note deleted successfully!"),
                res.send({
                    message: "note deleted successfully!",
                })
            );
        });
    }

}
module.exports = new LabelController()