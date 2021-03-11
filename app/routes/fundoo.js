module.exports = (app) => {
    const notes = require('../controllers/fundoo');

    // Create a new Note
    app.post('/notes', notes.create);

    // Retrieve all Notes
    app.get('/notes', notes.findAll);

}