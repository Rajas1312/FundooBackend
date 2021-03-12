const notes = require('../controllers/user');
module.exports = (app) => {
    // Create a new user
    app.post('/user', notes.createUser);

    // Login existing user
    app.post("/login", notes.loginUser);

}