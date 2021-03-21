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
}

