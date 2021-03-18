const user = require('../controllers/user');
const notes = require("../controllers/notes.js");
const helper = require("../../utility/helper.js");
module.exports = (app) => {
    // Create a new user
    app.post('/user', user.createUser);

    // Login existing user
    app.post("/login", user.loginUser);

    app.post("/forgotPassword", user.forgotPassword)

    app.post("/resetPassword", user.resetPassword)

    // Create a new note
    app.post("/notes", notes.createNotes);

    app.get("/notes", notes.findAll);
}

