const user = require('../controllers/user');
const notes = require("../controllers/notes.js");
const helper = require("../../utility/helper.js");
module.exports = (app) => {
    // Create a new user
    app.post('/user', user.createUser);

    // Login existing user
    app.post("/login", user.loginUser);

    //forgot password route
    app.post("/forgotPassword", user.forgotPassword)

    //reset password route
    app.post("/resetPassword", user.resetPassword)

    // Create a new note
    app.post("/notes", helper.verifyToken, notes.createNotes);

    //get all the notes
    app.get("/notes", helper.verifyToken, notes.findNotes);

    // Update a note with noteId
    app.put("/notes/:noteId", notes.updateNotes);

    // delete note by noteId
    app.delete("/notes/:noteId", notes.deleteNotes);

    // delete note by setting isdeleted flag true
    app.put("/notes/delete/:noteId", helper.verifyToken, notes.removeNote);

    // delete note by setting isdeleted flag true
    app.put("/notes/archive/:noteId", helper.verifyToken, notes.archiveNote);

    // Create a new label
    app.post("/labels", helper.verifyToken, notes.createLabel);

    // Retrieve all labels
    app.get("/labels", helper.verifyToken, notes.findLabels);

    // Update a label with labelId
    app.put("/labels/:labelId", helper.verifyToken, notes.updateLabels);

    // Delete a label with labelId
    app.delete("/labels/:labelId", helper.verifyToken, notes.deleteLabels);

}

